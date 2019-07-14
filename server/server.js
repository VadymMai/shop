const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const mongoClient = new MongoClient("mongodb://localhost:27017/", {useNewUrlParser: true});
let clientDb;
let db;
let products;

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

app.post('/products', function (req, res) {
    if(!req.body) return res.sendStatus(400);

    class Product {
        constructor(_id, name, img, cat_name, cat_id, cat_img, author, isbn, price, old_price, description, additional) {
            this._id = _id;
            this.name = name;
            this.img = img;
            this.cat_name = cat_name;
            this.cat_id = cat_id;
            this.cat_img = cat_img;
            this.author = author;
            this.isbn = isbn;
            this.price = price;
            this.old_price = old_price;
            this.description = description;
            this.additional = additional;
        }
    }

    let cursor = products.find().sort({"_id": -1}).limit(1);
    cursor.toArray().then(arr => {
        let _id=1;
        if(arr.length > 0) _id = arr[0]._id+1;

        const product = new Product(
            _id,
            req.body.name,
            req.body.img,
            req.body.cat_name,
            req.body.cat_id,
            req.body.cat_img,
            req.body.author,
            req.body.isbn,
            req.body.price,
            req.body.old_price,
            req.body.description,
            req.body.additional
        );

        /*const product = new Product(
            _id,
            'Javascript для дітей - Морґан Нік',
            'https://i1.rozetka.ua/goods/4116170/vydavnytstvo_staroho_leva_9786176794790_images_4116170096.jpg',
            'Дитячі книги',
            1,
            'https://blogs.ntu.edu.sg/files/2014/07/change_default_category.jpg',
            'Nigel Rees',
            '0-553-21311-3',
            8.95,
            15,
            '«JavaScript для детей» — веселое пособие, вступление к основам программирования, с которым вы шаг за шагом овладеете работой со строками, массивами и циклами, инструментами DOM и jQuery и элементом canvas для рисования графики. Вы сможете писать и модифицировать HTML-элементы для создания динамических веб-страниц и напишите классные онлайн игры «Найди спрятанный клад», «Виселица» и «Змейка».',
            'В этой книге — множество интересных примеров и забавных иллюстраций, а задача по программированию в конце каждого раздела, вдохновят на создание собственных потрясающих программ. Сотворим что-то крутое с JavaScript!',
        );*/

        products.insertOne(product, (err, result) => {
            if(err) return console.log(err);
            res.send(product);
            console.log('product added');
        });
    });
});

// прослушиваем прерывание работы программы (ctrl-c)
process.on('SIGINT', () => {
    clientDb.close();
    process.exit();
});
