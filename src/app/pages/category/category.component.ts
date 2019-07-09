import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
    products = [
        {
            id: '001',
            img: 'https://i2.rozetka.ua/goods/4116170/vydavnytstvo_staroho_leva_9786176794790_images_4116170232.jpg',
            category: 'Дитячі книги',
            cat_id: '001',
            author: 'Nigel Rees',
            title: 'Sayings of the Century',
            isbn: '0-553-21311-3',
            price: 8.95
        },
        {
            id: '002',
            img: 'https://i1.rozetka.ua/goods/12100714/59451100_images_12100714656.jpg',
            category: 'Художня література',
            cat_id: '002',
            author: 'Evelyn Waugh',
            title: 'Sword of Honour',
            isbn: '0-553-21311-3',
            price: 12.99
        },
        {
            id: '003',
            img: 'https://i2.rozetka.ua/goods/10642517/copy_popurri_9789851535169_5c51a3516de6f_images_10642517612.jpg',
            category: 'Бізнес література',
            cat_id: '003',
            author: 'Herman Melville',
            title: 'Moby Dick',
            isbn: '0-553-21311-3',
            price: 8.99
        },
        {
            id: '004',
            img: 'https://i1.rozetka.ua/goods/10932453/42335872_images_10932453573.jpg',
            category: 'Книги для батьків',
            cat_id: '004',
            author: 'J. R. R. Tolkien',
            title: 'The Lord of the Rings',
            isbn: '0-395-19395-8',
            price: 22.99
        },
        {
            id: '001',
            img: 'https://i2.rozetka.ua/goods/4116170/vydavnytstvo_staroho_leva_9786176794790_images_4116170232.jpg',
            category: 'Дитячі книги',
            cat_id: '001',
            author: 'Nigel Rees',
            title: 'Sayings of the Century',
            isbn: '0-553-21311-3',
            price: 8.95
        },
        {
            id: '002',
            img: 'https://i1.rozetka.ua/goods/12100714/59451100_images_12100714656.jpg',
            category: 'Художня література',
            cat_id: '002',
            author: 'Evelyn Waugh',
            title: 'Sword of Honour',
            isbn: '0-553-21311-3',
            price: 12.99
        },
        {
            id: '003',
            img: 'https://i2.rozetka.ua/goods/10642517/copy_popurri_9789851535169_5c51a3516de6f_images_10642517612.jpg',
            category: 'Бізнес література',
            cat_id: '003',
            author: 'Herman Melville',
            title: 'Moby Dick',
            isbn: '0-553-21311-3',
            price: 8.99
        },
        {
            id: '004',
            img: 'https://i1.rozetka.ua/goods/10932453/42335872_images_10932453573.jpg',
            category: 'Книги для батьків',
            cat_id: '004',
            author: 'J. R. R. Tolkien',
            title: 'The Lord of the Rings',
            isbn: '0-395-19395-8',
            price: 22.99
        },
        {
            id: '001',
            img: 'https://i2.rozetka.ua/goods/4116170/vydavnytstvo_staroho_leva_9786176794790_images_4116170232.jpg',
            category: 'Дитячі книги',
            cat_id: '001',
            author: 'Nigel Rees',
            title: 'Sayings of the Century',
            isbn: '0-553-21311-3',
            price: 8.95
        },
        {
            id: '002',
            img: 'https://i1.rozetka.ua/goods/12100714/59451100_images_12100714656.jpg',
            category: 'Художня література',
            cat_id: '002',
            author: 'Evelyn Waugh',
            title: 'Sword of Honour',
            isbn: '0-553-21311-3',
            price: 12.99
        },
        {
            id: '003',
            img: 'https://i2.rozetka.ua/goods/10642517/copy_popurri_9789851535169_5c51a3516de6f_images_10642517612.jpg',
            category: 'Бізнес література',
            cat_id: '003',
            author: 'Herman Melville',
            title: 'Moby Dick',
            isbn: '0-553-21311-3',
            price: 8.99
        },
        {
            id: '004',
            img: 'https://i1.rozetka.ua/goods/10932453/42335872_images_10932453573.jpg',
            category: 'Книги для батьків',
            cat_id: '004',
            author: 'J. R. R. Tolkien',
            title: 'The Lord of the Rings',
            isbn: '0-395-19395-8',
            price: 22.99
        }
    ];

    constructor() {
    }

    ngOnInit() {
    }

}
