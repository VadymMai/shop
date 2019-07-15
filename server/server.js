const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const mongoClient = new MongoClient("mongodb://localhost:27017/", {useNewUrlParser: true});;
const jsonParser = express.json();
let clientDb, db, products;

mongoClient.connect(function(err, client){
    if(err) return console.log(err);
    clientDb = client;
    db = client.db('data');
    products = db.collection('products');
    app.listen(3000, (err) => {
        if (err) return console.log('something bad happened', err)
        console.log('Сервер ожидает подключения...');
    });
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (request, response) => {
    response.send('Hello from Express!')
});

app.get('/products', function(req, res){
    products.find({}).toArray(function(err, products){
        if(err) return console.log(err);
        console.log(products);
        res.send(products);
    });
});

app.post('/products', jsonParser, function (req, res) {
    if(!req.body) {
        console.log('Помилка отриманих даних');
        return res.sendStatus(400);
    }
    console.log(req.body);

    let cursor = products.find().sort({"_id": -1}).limit(1);
    cursor.toArray().then(arr => {
        let _id=1;
        if(arr.length > 0) _id = arr[0]._id+1;

        let product = req.body;
        product._id = _id;

        products.insertOne(product, (err, result) => {
            if(err) {
                console.log(err);
                return res.sendStatus(400);
            }
            console.log('Доданий 1 товар:', result.ops[0]);
            res.send(result.ops[0]);
        });
    });
});

app.get('/productinsert', function(req, res){
    let cursor = products.find().sort({"_id": -1}).limit(1);
    cursor.toArray().then(arr => {
        let _id=1;
        if(arr.length > 0) _id = arr[0]._id+1;

        let product = {
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
        product._id = _id;

        products.insertOne(product, (err, result) => {
            if(err) {
                console.log(err);
                return res.sendStatus(400);
            }
            console.log('Доданий 1 товар:', result.ops[0]);
            res.send(result.ops[0]);
        });
    });
});

// прослушиваем прерывание работы программы (ctrl-c)
process.on('SIGINT', () => {
    clientDb.close();
    process.exit();
});
