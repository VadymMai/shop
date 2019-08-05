/**
 * *** NOTE ON IMPORTING FROM ANGULAR AND NGUNIVERSAL IN THIS FILE ***
 *
 * If your application uses third-party dependencies, you'll need to
 * either use Webpack or the Angular CLI's `bundleDependencies` feature
 * in order to adequately package them for use on the server without a
 * node_modules directory.
 *
 * However, due to the nature of the CLI's `bundleDependencies`, importing
 * Angular in this file will create a different instance of Angular than
 * the version in the compiled application code. This leads to unavoidable
 * conflicts. Therefore, please do not explicitly import from @angular or
 * @nguniversal in this file. You can export any needed resources
 * from your application's main.server.ts file, as seen below with the
 * import for `ngExpressEngine`.
 */

import 'zone.js/dist/zone-node';

import * as express from 'express';
import {join} from 'path';

// Express server
const app = express();
const MongoClient = require('mongodb').MongoClient;
const jsonParser = express.json();

const mongoClient = new MongoClient('mongodb+srv://root:Ghbdtngh1@cluster0-yhi5k.gcp.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});
let clientDb;
let db;
let products;
let users;

mongoClient.connect((err, client) => {
  if (err) {
    return console.log(err);
  }
  clientDb = client;
  db = client.db('data');
  products = db.collection('products');
  users = db.collection('users');
  users.createIndex({loginName: 1}, {unique: true});
});

const PORT = process.env.PORT || 8080;
const DIST_FOLDER = join(process.cwd(), 'dist/browser');

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {AppServerModuleNgFactory, LAZY_MODULE_MAP, ngExpressEngine, provideModuleMap} = require('./dist/server/main');

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

// Example Express Rest API endpoints
// app.get('/api/**', (req, res) => { });
// Serve static files from /browser

app.get('/api/BookShop/GetBook/:id', (req, res) => {
  console.log(req.params.id);
  products.findOne({_id: +req.params.id}, (err, product) => {
    if (err) { return console.log(err); }
    console.log(product);
    res.send(product);
  });
});

app.get('/api/BookShop/GetBooksById/:id', (req, res) => {
  console.log(req.params.id);
  products.find({cat_id: +req.params.id}).toArray((err, prods) => {
    if (err) { return console.log(err); }
    // console.log(prods);
    res.send(prods);
  });
});

app.get('/api/BookShop/GetAllBooks', (req, res) => {
  products.find({}).toArray((err, prods) => {
    if (err) { return console.log(err); }
    // console.log(prods);
    res.send(prods);
  });
});

app.get('/api/BookShop/DeleteBook/:id', (req, res) => {
  console.log(req.params.id);
  products.deleteOne({_id: +req.params.id}, (err, obj) => {
    if (err) { return console.log(err); }
    if (obj.result.n) {
      console.log('Товар видалено успішно');
      res.send('Товар видалено успішно');
    } else {
      console.log('Такого товару не знайдено');
      res.send('Такого товару не знайдено');
    }
  });
});

app.get('/api/BookShop/DeleteAllBooks', (req, res) => {
  products.deleteMany({}, (err, obj) => {
    if (err) { return console.log(err); }
    if (obj.result.n) {
      console.log('Всі товари видалено успішно');
      res.send('Всі товари видалено успішно');
    } else {
      console.log('Товарів не знайдено');
      res.send('Товарів не знайдено');
    }
  });
});

app.get('/api/BookShop/GetAllCategories', (req, res) => {
  products.find({}).toArray((err, prods) => {
    if (err) { return console.log(err); }
    const filteredList = [];
    const categories = prods.reduce((result, item) => {
      if (!filteredList.includes(item.cat_id)) {
        filteredList.push(item.cat_id);
        result.push({
          cat_id: item.cat_id,
          cat_name: item.cat_name,
          cat_img: item.cat_img,
          count: 1
        });
      } else {
        result.map((cat) => (cat.cat_id === item.cat_id) ? cat.count++ : cat.count);
      }
      return result;
    }, []);
    // console.log(categories);
    res.send(categories);
  });
});

app.post('/api/BookShop/CreateNewBook', jsonParser, (req, res) => {
  if (!req.body) {
    console.log('Помилка отриманих даних');
    return res.sendStatus(400);
  }
  console.log(req.body);

  const cursor = products.find().sort({_id: -1}).limit(1);
  cursor.toArray().then(arr => {
    let id = 1;
    if (arr.length > 0) { id = arr[0]._id + 1; }

    const product = req.body;
    product._id = id;

    if (product.cat_id === 0) {
      product.cat_id = 0;
    }

    products.insertOne(product, (err, result) => {
      if (err) {
        console.log(err);
        return res.sendStatus(400);
      }
      console.log('Доданий 1 товар:', result.ops[0]);
      res.send(result.ops[0]);
    });
  });
});

app.post('/api/Account/AddUser', jsonParser, (req, res) => {
  if (!req.body) {
    console.log('Помилка отриманих даних');
    return res.sendStatus(400);
  }
  console.log(req.body);
  const user = {
    loginName: req.body.loginName,
    password: req.body.password,
    roles: req.body.roles
  };
  users.insertOne(user, (err, result) => {
    if (err) {
      console.log(err);
      if (err.code === 11000) {
        return res.send({message: 'notUnique'});
      }
      return res.sendStatus(400);
    }
    console.log('Доданий 1 user:', result.ops[0]);
    res.send(result.ops[0]);
  });
});

app.post('/api/Account/LogIn', jsonParser, (req, res) => {
  if (!req.body) {
    console.log('Помилка отриманих даних');
    return res.sendStatus(400);
  }
  console.log(req.body);
  users.findOne({loginName: req.body.loginName}, (err, user) => {
    if (err) { return console.log(err); }
    console.log('login', user);
    if (user && user.password === req.body.password) {
      res.send(user);
    } else {
      res.send({message: 'authFailed'});
    }
  });
});

app.get('/api/BookShop/GetAllUsers', (req, res) => {
  users.find({}).toArray((err, usersArr) => {
    if (err) { return console.log(err); }
    // console.log(usersArr);
    res.send(usersArr);
  });
});

app.get('/productinsert', (req, res) => {
  const cursor = products.find().sort({_id: -1}).limit(1);
  cursor.toArray().then(arr => {
    let id = 1;
    if (arr.length > 0) { id = arr[0]._id + 1; }

    const product = {
      _id: 4,
      name: 'Що робити коли...',
      img: 'https://i2.rozetka.ua/goods/2969930/32598239_images_2969930215.jpg',
      cat_name: 'Книги для батьків',
      cat_id: 4,
      cat_img: 'https://blogs.ntu.edu.sg/files/2014/07/change_default_category.jpg',
      author: 'Петрановская Л.В.',
      isbn: '978-966-942-091-6',
      price: 22.99,
      old_price: 35,
      description: '«Що робити, коли ...» - повчальна книга для дітей, яка навчить взаємодіяти з незнайомими людьми, відповідати на образливі слова, запобігати виникненню небезпечних ситуацій, вести себе в людних місцях. Написана вона кваліфікованим психологом і педагогом та стане добрим другом і порадником для дитини! Ця книжка допоможе дитині не розгубитися, знайти правильний вихід з різноманітних складних ситуацій, які можуть трапитися в житті кожної людини.',
      additional: 'Психологічні поради, схеми дій, багатий ілюстративний матеріал сприятимуть легкому засвоєнню матеріалу. Можливо, ця книга не зможе зберегти дітей від усіх неприємностей, але в першу чергу вона навчить слідувати головному - не втрачати голову і бути готовими діяти!'
    };
    product._id = id;

    products.insertOne(product, (err, result) => {
      if (err) {
        console.log(err);
        return res.sendStatus(400);
      }
      console.log('Доданий 1 товар:', result.ops[0]);
      res.send(result.ops[0]);
    });
  });
});

app.get('*.*', express.static(DIST_FOLDER, {
  maxAge: '1y'
}));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', {req});
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
