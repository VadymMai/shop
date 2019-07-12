const mongo = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

mongo.connect(url,{useNewUrlParser: true}, (err, client) => {
    if (err) {
        console.error(err);
        return;
    }
    const db = client.db('data');
    const products = db.collection('products');
    const customers = db.collection('customers');

    let product = {
        id: 1,
        img: 'https://i1.rozetka.ua/goods/4116170/vydavnytstvo_staroho_leva_9786176794790_images_4116170096.jpg',
        cat_name: 'Дитячі книги',
        cat_id: 1,
        cat_img: 'https://blogs.ntu.edu.sg/files/2014/07/change_default_category.jpg',
        author: 'Nigel Rees',
        name: 'Javascript для дітей - Морґан Нік',
        isbn: '0-553-21311-3',
        price: 8.95,
        old_price: 15,
        description: '«JavaScript для детей» — веселое пособие, вступление к основам программирования, с которым вы шаг за шагом овладеете работой со строками, массивами и циклами, инструментами DOM и jQuery и элементом canvas для рисования графики. Вы сможете писать и модифицировать HTML-элементы для создания динамических веб-страниц и напишите классные онлайн игры «Найди спрятанный клад», «Виселица» и «Змейка».',
        additional: 'В этой книге — множество интересных примеров и забавных иллюстраций, а задача по программированию в конце каждого раздела, вдохновят на создание собственных потрясающих программ. Сотворим что-то крутое с JavaScript!'
    };

    products.insertOne(product, (err, result) => {
        console.log('product added');
    });

    let myobj = [
        { name: 'John', address: 'Highway 71'},
        { name: 'Peter', address: 'Lowstreet 4'},
        { name: 'Amy', address: 'Apple st 652'},
        { name: 'Hannah', address: 'Mountain 21'},
        { name: 'Michael', address: 'Valley 345'},
        { name: 'Sandy', address: 'Ocean blvd 2'},
        { name: 'Betty', address: 'Green Grass 1'},
        { name: 'Richard', address: 'Sky st 331'},
        { name: 'Susan', address: 'One way 98'},
        { name: 'Vicky', address: 'Yellow Garden 2'},
        { name: 'Ben', address: 'Park Lane 38'},
        { name: 'William', address: 'Central st 954'},
        { name: 'Chuck', address: 'Main Road 989'},
        { name: 'Viola', address: 'Sideway 1633'}
    ];

    customers.insertMany(myobj, (err, result) => {
        console.log('add customers');
    });

    customers.find().toArray((err, items) => {
        console.log(items);
    });

    client.close();
});