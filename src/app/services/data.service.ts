import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface Product {
  _id: number;
  name: string;
  img: string;
  cat_name: string;
  cat_id: number;
  cat_img: string;
  author: string;
  isbn: string;
  price: number;
  old_price: number;
  description: string;
  additional: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public products1: Product[] = [];

  private data: any[] = [
    {
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
    },
    {
      id: 2,
      img: 'https://i1.rozetka.ua/goods/12100714/59451100_images_12100714656.jpg',
      cat_name: 'Художня література',
      cat_id: 2,
      cat_img: 'https://blogs.ntu.edu.sg/files/2014/07/change_default_category.jpg',
      author: 'Evelyn Waugh',
      name: 'Sword of Honour',
      isbn: '0-553-21311-3',
      price: 12.99,
      old_price: 15,
      description: '«JavaScript для детей» — веселое пособие, вступление к основам программирования, с которым вы шаг за шагом овладеете работой со строками, массивами и циклами, инструментами DOM и jQuery и элементом canvas для рисования графики. Вы сможете писать и модифицировать HTML-элементы для создания динамических веб-страниц и напишите классные онлайн игры «Найди спрятанный клад», «Виселица» и «Змейка».',
      additional: 'В этой книге — множество интересных примеров и забавных иллюстраций, а задача по программированию в конце каждого раздела, вдохновят на создание собственных потрясающих программ. Сотворим что-то крутое с JavaScript!'
    },
    {
      id: 3,
      img: 'https://i2.rozetka.ua/goods/10642517/copy_popurri_9789851535169_5c51a3516de6f_images_10642517612.jpg',
      cat_name: 'Бізнес література',
      cat_id: 3,
      cat_img: 'https://blogs.ntu.edu.sg/files/2014/07/change_default_category.jpg',
      author: 'Herman Melville',
      name: 'Moby Dick',
      isbn: '0-553-21311-3',
      price: 8.99,
      old_price: 15,
      description: '«JavaScript для детей» — веселое пособие, вступление к основам программирования, с которым вы шаг за шагом овладеете работой со строками, массивами и циклами, инструментами DOM и jQuery и элементом canvas для рисования графики. Вы сможете писать и модифицировать HTML-элементы для создания динамических веб-страниц и напишите классные онлайн игры «Найди спрятанный клад», «Виселица» и «Змейка».',
      additional: 'В этой книге — множество интересных примеров и забавных иллюстраций, а задача по программированию в конце каждого раздела, вдохновят на создание собственных потрясающих программ. Сотворим что-то крутое с JavaScript!'
    },
    {
      id: 4,
      img: 'https://i1.rozetka.ua/goods/10932453/42335872_images_10932453573.jpg',
      cat_name: 'Книги для батьків',
      cat_id: 4,
      cat_img: 'https://blogs.ntu.edu.sg/files/2014/07/change_default_category.jpg',
      author: 'J. R. R. Tolkien',
      name: 'The Lord of the Rings',
      isbn: '0-395-19395-8',
      price: 22.99,
      old_price: 35,
      description: '«JavaScript для детей» — веселое пособие, вступление к основам программирования, с которым вы шаг за шагом овладеете работой со строками, массивами и циклами, инструментами DOM и jQuery и элементом canvas для рисования графики. Вы сможете писать и модифицировать HTML-элементы для создания динамических веб-страниц и напишите классные онлайн игры «Найди спрятанный клад», «Виселица» и «Змейка».',
      additional: 'В этой книге — множество интересных примеров и забавных иллюстраций, а задача по программированию в конце каждого раздела, вдохновят на создание собственных потрясающих программ. Сотворим что-то крутое с JavaScript!'
    },
    {
      id: 5,
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
    },
    {
      id: 6,
      img: 'https://i1.rozetka.ua/goods/12100714/59451100_images_12100714656.jpg',
      cat_name: 'Художня література',
      cat_id: 2,
      cat_img: 'https://blogs.ntu.edu.sg/files/2014/07/change_default_category.jpg',
      author: 'Evelyn Waugh',
      name: 'Sword of Honour',
      isbn: '0-553-21311-3',
      price: 12.99,
      old_price: 15,
      description: '«JavaScript для детей» — веселое пособие, вступление к основам программирования, с которым вы шаг за шагом овладеете работой со строками, массивами и циклами, инструментами DOM и jQuery и элементом canvas для рисования графики. Вы сможете писать и модифицировать HTML-элементы для создания динамических веб-страниц и напишите классные онлайн игры «Найди спрятанный клад», «Виселица» и «Змейка».',
      additional: 'В этой книге — множество интересных примеров и забавных иллюстраций, а задача по программированию в конце каждого раздела, вдохновят на создание собственных потрясающих программ. Сотворим что-то крутое с JavaScript!'
    },
    {
      id: 7,
      img: 'https://i2.rozetka.ua/goods/10642517/copy_popurri_9789851535169_5c51a3516de6f_images_10642517612.jpg',
      cat_name: 'Бізнес література',
      cat_id: 3,
      cat_img: 'https://blogs.ntu.edu.sg/files/2014/07/change_default_category.jpg',
      author: 'Herman Melville',
      name: 'Moby Dick',
      isbn: '0-553-21311-3',
      price: 8.99,
      old_price: 15,
      description: '«JavaScript для детей» — веселое пособие, вступление к основам программирования, с которым вы шаг за шагом овладеете работой со строками, массивами и циклами, инструментами DOM и jQuery и элементом canvas для рисования графики. Вы сможете писать и модифицировать HTML-элементы для создания динамических веб-страниц и напишите классные онлайн игры «Найди спрятанный клад», «Виселица» и «Змейка».',
      additional: 'В этой книге — множество интересных примеров и забавных иллюстраций, а задача по программированию в конце каждого раздела, вдохновят на создание собственных потрясающих программ. Сотворим что-то крутое с JavaScript!'
    },
    {
      id: 8,
      img: 'https://i1.rozetka.ua/goods/10932453/42335872_images_10932453573.jpg',
      cat_name: 'Книги для батьків',
      cat_id: 4,
      cat_img: 'https://blogs.ntu.edu.sg/files/2014/07/change_default_category.jpg',
      author: 'J. R. R. Tolkien',
      name: 'The Lord of the Rings',
      isbn: '0-395-19395-8',
      price: 22.99,
      old_price: 35,
      description: '«JavaScript для детей» — веселое пособие, вступление к основам программирования, с которым вы шаг за шагом овладеете работой со строками, массивами и циклами, инструментами DOM и jQuery и элементом canvas для рисования графики. Вы сможете писать и модифицировать HTML-элементы для создания динамических веб-страниц и напишите классные онлайн игры «Найди спрятанный клад», «Виселица» и «Змейка».',
      additional: 'В этой книге — множество интересных примеров и забавных иллюстраций, а задача по программированию в конце каждого раздела, вдохновят на создание собственных потрясающих программ. Сотворим что-то крутое с JavaScript!'
    },
    {
      id: 9,
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
    },
    {
      id: 10,
      img: 'https://i1.rozetka.ua/goods/12100714/59451100_images_12100714656.jpg',
      cat_name: 'Художня література',
      cat_id: 2,
      cat_img: 'https://blogs.ntu.edu.sg/files/2014/07/change_default_category.jpg',
      author: 'Evelyn Waugh',
      name: 'Sword of Honour',
      isbn: '0-553-21311-3',
      price: 12.99,
      old_price: 15,
      description: '«JavaScript для детей» — веселое пособие, вступление к основам программирования, с которым вы шаг за шагом овладеете работой со строками, массивами и циклами, инструментами DOM и jQuery и элементом canvas для рисования графики. Вы сможете писать и модифицировать HTML-элементы для создания динамических веб-страниц и напишите классные онлайн игры «Найди спрятанный клад», «Виселица» и «Змейка».',
      additional: 'В этой книге — множество интересных примеров и забавных иллюстраций, а задача по программированию в конце каждого раздела, вдохновят на создание собственных потрясающих программ. Сотворим что-то крутое с JavaScript!'
    },
    {
      id: 11,
      img: 'https://i2.rozetka.ua/goods/10642517/copy_popurri_9789851535169_5c51a3516de6f_images_10642517612.jpg',
      cat_name: 'Бізнес література',
      cat_id: 3,
      cat_img: 'https://blogs.ntu.edu.sg/files/2014/07/change_default_category.jpg',
      author: 'Herman Melville',
      name: 'Moby Dick',
      isbn: '0-553-21311-3',
      price: 8.99,
      old_price: 15,
      description: '«JavaScript для детей» — веселое пособие, вступление к основам программирования, с которым вы шаг за шагом овладеете работой со строками, массивами и циклами, инструментами DOM и jQuery и элементом canvas для рисования графики. Вы сможете писать и модифицировать HTML-элементы для создания динамических веб-страниц и напишите классные онлайн игры «Найди спрятанный клад», «Виселица» и «Змейка».',
      additional: 'В этой книге — множество интересных примеров и забавных иллюстраций, а задача по программированию в конце каждого раздела, вдохновят на создание собственных потрясающих программ. Сотворим что-то крутое с JavaScript!'
    },
    {
      id: 12,
      img: 'https://i1.rozetka.ua/goods/10932453/42335872_images_10932453573.jpg',
      cat_name: 'Книги для батьків',
      cat_id: 4,
      cat_img: 'https://blogs.ntu.edu.sg/files/2014/07/change_default_category.jpg',
      author: 'J. R. R. Tolkien',
      name: 'The Lord of the Rings',
      isbn: '0-395-19395-8',
      price: 22.99,
      old_price: 35,
      description: '«JavaScript для детей» — веселое пособие, вступление к основам программирования, с которым вы шаг за шагом овладеете работой со строками, массивами и циклами, инструментами DOM и jQuery и элементом canvas для рисования графики. Вы сможете писать и модифицировать HTML-элементы для создания динамических веб-страниц и напишите классные онлайн игры «Найди спрятанный клад», «Виселица» и «Змейка».',
      additional: 'В этой книге — множество интересных примеров и забавных иллюстраций, а задача по программированию в конце каждого раздела, вдохновят на создание собственных потрясающих программ. Сотворим что-то крутое с JavaScript!'
    }
  ];

  constructor(private http: HttpClient) {}

  getProducts(): object[] {
    return this.data;
  }

  getCategories(): object[] {
    const filteredList: string[] = [];
    const categories: object[] = this.data.filter((item) => {
      if (filteredList.includes(item.cat_id)) {
        return false;
      } else {
        filteredList.push(item.cat_id);
        return true;
      }
    });
    return categories;
  }

  fetchProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('https://github.com/VadymMai/db/blob/master/db.json')// http://localhost:3000/products,products.json
      .pipe(tap(products => this.products1 = products));
  }

  test() {
    console.log(this.products1);
  }

}
