import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

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

export interface Category {
  cat_name: string;
  cat_id: number;
  cat_img: string;
  count: number;
}

export interface User {
  _id: any;
  loginName: string;
  password: string;
  roles: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public product: Product;
  private localProduct: Product = {
    _id: 1,
    name: 'Javascript для дітей',
    img: 'https://i1.rozetka.ua/goods/4116170/vydavnytstvo_staroho_leva_9786176794790_images_4116170096.jpg',
    cat_name: 'Дитячі книги',
    cat_id: 1,
    cat_img: 'https://blogs.ntu.edu.sg/files/2014/07/change_default_category.jpg',
    author: 'Морґан Нік',
    isbn: '978-617-679-479-0',
    price: 221,
    old_price: 320,
    description: '«JavaScript для детей» — веселое пособие, вступление к основам программирования, с которым вы шаг за шагом овладеете работой со строками, массивами и циклами, инструментами DOM и jQuery и элементом canvas для рисования графики. Вы сможете писать и модифицировать HTML-элементы для создания динамических веб-страниц и напишите классные онлайн игры «Найди спрятанный клад», «Виселица» и «Змейка».',
    additional: 'В этой книге — множество интересных примеров и забавных иллюстраций, а задача по программированию в конце каждого раздела, вдохновят на создание собственных потрясающих программ. Сотворим что-то крутое с JavaScript!'
  };
  public addedProduct: Product;

  public products: Product[] = [];
  private localProducts: Product[] = [
    {
      _id: 1,
      name: 'Javascript для дітей',
      img: 'https://i1.rozetka.ua/goods/4116170/vydavnytstvo_staroho_leva_9786176794790_images_4116170096.jpg',
      cat_name: 'Дитячі книги',
      cat_id: 1,
      cat_img: 'https://blogs.ntu.edu.sg/files/2014/07/change_default_category.jpg',
      author: 'Морґан Нік',
      isbn: '978-617-679-479-0',
      price: 221 ,
      old_price: 320,
      description: '«JavaScript для детей» — веселое пособие, вступление к основам программирования, с которым вы шаг за шагом овладеете работой со строками, массивами и циклами, инструментами DOM и jQuery и элементом canvas для рисования графики. Вы сможете писать и модифицировать HTML-элементы для создания динамических веб-страниц и напишите классные онлайн игры «Найди спрятанный клад», «Виселица» и «Змейка».',
      additional: 'В этой книге — множество интересных примеров и забавных иллюстраций, а задача по программированию в конце каждого раздела, вдохновят на создание собственных потрясающих программ. Сотворим что-то крутое с JavaScript!'
    },
    {
      _id: 2,
      name: 'Происхождение',
      img: 'https://i1.rozetka.ua/goods/12100714/59451100_images_12100714656.jpg',
      cat_name: 'Художня література',
      cat_id: 2,
      cat_img: 'https://blogs.ntu.edu.sg/files/2014/07/change_default_category.jpg',
      author: 'Дэн Браун',
      isbn: '978-5-17-106150-0',
      price: 149,
      old_price: 249,
      description: 'Роберт Лэнгдон прибывает в музей Гуггенхайма в Бильбао по приглашению друга и бывшего студента Эдмонда Кирша. Миллиардер и компьютерный гуру, он известен своими удивительными открытиями и предсказаниями. И этим вечером Кирш собирается «перевернуть все современные научные представления о мире», дав ответ на два главных вопроса, волнующих человечество на протяжении всей истории: Откуда мы? Что нас ждет?',
      additional: 'Однако прежде, чем Эдмонд успевает сделать заявление, роскошный прием превращается в хаос. Лэнгдону и директору музея, красавице Амбре Видаль, чудом удается бежать. Теперь их путь лежит в Барселону, где Кирш оставил для своего учителя закодированный ключ к тайне, способной потрясти сами основы представлений человечества о себе. Тайне, которая была веками похоронена во тьме забвения. Тайне, которой, возможно, лучше бы никогда не увидеть света, – по крайней мере, так считают те, кто преследует Лэнгдона и Видаль и готов на все, чтобы помешать им раскрыть истину.'
    },
    {
      _id: 3,
      name: 'Богатый папа, бедный папа',
      img: 'https://i2.rozetka.ua/goods/10642517/copy_popurri_9789851535169_5c51a3516de6f_images_10642517612.jpg',
      cat_name: 'Бізнес література',
      cat_id: 3,
      cat_img: 'https://blogs.ntu.edu.sg/files/2014/07/change_default_category.jpg',
      author: 'Роберт Кийосаки',
      isbn: '978-985-15-3517-6',
      price: 297,
      old_price: 397,
      description: 'Роберт Кийосаки убежден, что в школе наши дети не получают нужных финансовых знаний и потом всю жизнь работают ради денег, вместо того чтобы заставить деньги работать на себя. Он порадовал читателей новым изданием ставшей уже культовой книги — с изменениями и дополнениями для сегодняшнего мира, сегодняшних рыночных условий и 9 новыми разделами.',
      additional: 'К сожалению, в сфере образования мало что поменялось — школа до сих пор не дает подрастающему поколению финансовых азов. Научите детей обращаться с деньгами раньше, чем они столкнутся с материальными трудностями в нашем нестабильном мире!'
    },
    {
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
    },
    {
      _id: 5,
      name: 'Javascript для дітей',
      img: 'https://i1.rozetka.ua/goods/4116170/vydavnytstvo_staroho_leva_9786176794790_images_4116170096.jpg',
      cat_name: 'Дитячі книги',
      cat_id: 1,
      cat_img: 'https://blogs.ntu.edu.sg/files/2014/07/change_default_category.jpg',
      author: 'Морґан Нік',
      isbn: '978-617-679-479-0',
      price: 220 ,
      old_price: 320,
      description: '«JavaScript для детей» — веселое пособие, вступление к основам программирования, с которым вы шаг за шагом овладеете работой со строками, массивами и циклами, инструментами DOM и jQuery и элементом canvas для рисования графики. Вы сможете писать и модифицировать HTML-элементы для создания динамических веб-страниц и напишите классные онлайн игры «Найди спрятанный клад», «Виселица» и «Змейка».',
      additional: 'В этой книге — множество интересных примеров и забавных иллюстраций, а задача по программированию в конце каждого раздела, вдохновят на создание собственных потрясающих программ. Сотворим что-то крутое с JavaScript!'
    },
    {
      _id: 6,
      name: 'Происхождение',
      img: 'https://i1.rozetka.ua/goods/12100714/59451100_images_12100714656.jpg',
      cat_name: 'Художня література',
      cat_id: 2,
      cat_img: 'https://blogs.ntu.edu.sg/files/2014/07/change_default_category.jpg',
      author: 'Дэн Браун',
      isbn: '978-5-17-106150-0',
      price: 149,
      old_price: 249,
      description: 'Роберт Лэнгдон прибывает в музей Гуггенхайма в Бильбао по приглашению друга и бывшего студента Эдмонда Кирша. Миллиардер и компьютерный гуру, он известен своими удивительными открытиями и предсказаниями. И этим вечером Кирш собирается «перевернуть все современные научные представления о мире», дав ответ на два главных вопроса, волнующих человечество на протяжении всей истории: Откуда мы? Что нас ждет?',
      additional: 'Однако прежде, чем Эдмонд успевает сделать заявление, роскошный прием превращается в хаос. Лэнгдону и директору музея, красавице Амбре Видаль, чудом удается бежать. Теперь их путь лежит в Барселону, где Кирш оставил для своего учителя закодированный ключ к тайне, способной потрясти сами основы представлений человечества о себе. Тайне, которая была веками похоронена во тьме забвения. Тайне, которой, возможно, лучше бы никогда не увидеть света, – по крайней мере, так считают те, кто преследует Лэнгдона и Видаль и готов на все, чтобы помешать им раскрыть истину.'
    },
    {
      _id: 7,
      name: 'Богатый папа, бедный папа',
      img: 'https://i2.rozetka.ua/goods/10642517/copy_popurri_9789851535169_5c51a3516de6f_images_10642517612.jpg',
      cat_name: 'Бізнес література',
      cat_id: 3,
      cat_img: 'https://blogs.ntu.edu.sg/files/2014/07/change_default_category.jpg',
      author: 'Роберт Кийосаки',
      isbn: '978-985-15-3517-6',
      price: 297,
      old_price: 397,
      description: 'Роберт Кийосаки убежден, что в школе наши дети не получают нужных финансовых знаний и потом всю жизнь работают ради денег, вместо того чтобы заставить деньги работать на себя. Он порадовал читателей новым изданием ставшей уже культовой книги — с изменениями и дополнениями для сегодняшнего мира, сегодняшних рыночных условий и 9 новыми разделами.',
      additional: 'К сожалению, в сфере образования мало что поменялось — школа до сих пор не дает подрастающему поколению финансовых азов. Научите детей обращаться с деньгами раньше, чем они столкнутся с материальными трудностями в нашем нестабильном мире!'
    },
    {
      _id: 8,
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
    },
    {
      _id: 9,
      name: 'Javascript для дітей',
      img: 'https://i1.rozetka.ua/goods/4116170/vydavnytstvo_staroho_leva_9786176794790_images_4116170096.jpg',
      cat_name: 'Дитячі книги',
      cat_id: 1,
      cat_img: 'https://blogs.ntu.edu.sg/files/2014/07/change_default_category.jpg',
      author: 'Морґан Нік',
      isbn: '978-617-679-479-0',
      price: 220 ,
      old_price: 320,
      description: '«JavaScript для детей» — веселое пособие, вступление к основам программирования, с которым вы шаг за шагом овладеете работой со строками, массивами и циклами, инструментами DOM и jQuery и элементом canvas для рисования графики. Вы сможете писать и модифицировать HTML-элементы для создания динамических веб-страниц и напишите классные онлайн игры «Найди спрятанный клад», «Виселица» и «Змейка».',
      additional: 'В этой книге — множество интересных примеров и забавных иллюстраций, а задача по программированию в конце каждого раздела, вдохновят на создание собственных потрясающих программ. Сотворим что-то крутое с JavaScript!'
    },
    {
      _id: 10,
      name: 'Происхождение',
      img: 'https://i1.rozetka.ua/goods/12100714/59451100_images_12100714656.jpg',
      cat_name: 'Художня література',
      cat_id: 2,
      cat_img: 'https://blogs.ntu.edu.sg/files/2014/07/change_default_category.jpg',
      author: 'Дэн Браун',
      isbn: '978-5-17-106150-0',
      price: 149,
      old_price: 249,
      description: 'Роберт Лэнгдон прибывает в музей Гуггенхайма в Бильбао по приглашению друга и бывшего студента Эдмонда Кирша. Миллиардер и компьютерный гуру, он известен своими удивительными открытиями и предсказаниями. И этим вечером Кирш собирается «перевернуть все современные научные представления о мире», дав ответ на два главных вопроса, волнующих человечество на протяжении всей истории: Откуда мы? Что нас ждет?',
      additional: 'Однако прежде, чем Эдмонд успевает сделать заявление, роскошный прием превращается в хаос. Лэнгдону и директору музея, красавице Амбре Видаль, чудом удается бежать. Теперь их путь лежит в Барселону, где Кирш оставил для своего учителя закодированный ключ к тайне, способной потрясти сами основы представлений человечества о себе. Тайне, которая была веками похоронена во тьме забвения. Тайне, которой, возможно, лучше бы никогда не увидеть света, – по крайней мере, так считают те, кто преследует Лэнгдона и Видаль и готов на все, чтобы помешать им раскрыть истину.'
    },
    {
      _id: 11,
      name: 'Богатый папа, бедный папа',
      img: 'https://i2.rozetka.ua/goods/10642517/copy_popurri_9789851535169_5c51a3516de6f_images_10642517612.jpg',
      cat_name: 'Бізнес література',
      cat_id: 3,
      cat_img: 'https://blogs.ntu.edu.sg/files/2014/07/change_default_category.jpg',
      author: 'Роберт Кийосаки',
      isbn: '978-985-15-3517-6',
      price: 297,
      old_price: 397,
      description: 'Роберт Кийосаки убежден, что в школе наши дети не получают нужных финансовых знаний и потом всю жизнь работают ради денег, вместо того чтобы заставить деньги работать на себя. Он порадовал читателей новым изданием ставшей уже культовой книги — с изменениями и дополнениями для сегодняшнего мира, сегодняшних рыночных условий и 9 новыми разделами.',
      additional: 'К сожалению, в сфере образования мало что поменялось — школа до сих пор не дает подрастающему поколению финансовых азов. Научите детей обращаться с деньгами раньше, чем они столкнутся с материальными трудностями в нашем нестабильном мире!'
    },
    {
      _id: 12,
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
    }
  ];

  public productsById: Product[] = [];
  private localProductsById: Product[] = [
    {
      _id: 1,
      name: 'Javascript для дітей',
      img: 'https://i1.rozetka.ua/goods/4116170/vydavnytstvo_staroho_leva_9786176794790_images_4116170096.jpg',
      cat_name: 'Дитячі книги',
      cat_id: 1,
      cat_img: 'https://blogs.ntu.edu.sg/files/2014/07/change_default_category.jpg',
      author: 'Морґан Нік',
      isbn: '978-617-679-479-0',
      price: 221 ,
      old_price: 320,
      description: '«JavaScript для детей» — веселое пособие, вступление к основам программирования, с которым вы шаг за шагом овладеете работой со строками, массивами и циклами, инструментами DOM и jQuery и элементом canvas для рисования графики. Вы сможете писать и модифицировать HTML-элементы для создания динамических веб-страниц и напишите классные онлайн игры «Найди спрятанный клад», «Виселица» и «Змейка».',
      additional: 'В этой книге — множество интересных примеров и забавных иллюстраций, а задача по программированию в конце каждого раздела, вдохновят на создание собственных потрясающих программ. Сотворим что-то крутое с JavaScript!'
    },
    {
      _id: 2,
      name: 'Происхождение',
      img: 'https://i1.rozetka.ua/goods/12100714/59451100_images_12100714656.jpg',
      cat_name: 'Художня література',
      cat_id: 2,
      cat_img: 'https://blogs.ntu.edu.sg/files/2014/07/change_default_category.jpg',
      author: 'Дэн Браун',
      isbn: '978-5-17-106150-0',
      price: 149,
      old_price: 249,
      description: 'Роберт Лэнгдон прибывает в музей Гуггенхайма в Бильбао по приглашению друга и бывшего студента Эдмонда Кирша. Миллиардер и компьютерный гуру, он известен своими удивительными открытиями и предсказаниями. И этим вечером Кирш собирается «перевернуть все современные научные представления о мире», дав ответ на два главных вопроса, волнующих человечество на протяжении всей истории: Откуда мы? Что нас ждет?',
      additional: 'Однако прежде, чем Эдмонд успевает сделать заявление, роскошный прием превращается в хаос. Лэнгдону и директору музея, красавице Амбре Видаль, чудом удается бежать. Теперь их путь лежит в Барселону, где Кирш оставил для своего учителя закодированный ключ к тайне, способной потрясти сами основы представлений человечества о себе. Тайне, которая была веками похоронена во тьме забвения. Тайне, которой, возможно, лучше бы никогда не увидеть света, – по крайней мере, так считают те, кто преследует Лэнгдона и Видаль и готов на все, чтобы помешать им раскрыть истину.'
    },
    {
      _id: 3,
      name: 'Богатый папа, бедный папа',
      img: 'https://i2.rozetka.ua/goods/10642517/copy_popurri_9789851535169_5c51a3516de6f_images_10642517612.jpg',
      cat_name: 'Бізнес література',
      cat_id: 3,
      cat_img: 'https://blogs.ntu.edu.sg/files/2014/07/change_default_category.jpg',
      author: 'Роберт Кийосаки',
      isbn: '978-985-15-3517-6',
      price: 297,
      old_price: 397,
      description: 'Роберт Кийосаки убежден, что в школе наши дети не получают нужных финансовых знаний и потом всю жизнь работают ради денег, вместо того чтобы заставить деньги работать на себя. Он порадовал читателей новым изданием ставшей уже культовой книги — с изменениями и дополнениями для сегодняшнего мира, сегодняшних рыночных условий и 9 новыми разделами.',
      additional: 'К сожалению, в сфере образования мало что поменялось — школа до сих пор не дает подрастающему поколению финансовых азов. Научите детей обращаться с деньгами раньше, чем они столкнутся с материальными трудностями в нашем нестабильном мире!'
    },
    {
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
    },
    {
      _id: 5,
      name: 'Javascript для дітей',
      img: 'https://i1.rozetka.ua/goods/4116170/vydavnytstvo_staroho_leva_9786176794790_images_4116170096.jpg',
      cat_name: 'Дитячі книги',
      cat_id: 1,
      cat_img: 'https://blogs.ntu.edu.sg/files/2014/07/change_default_category.jpg',
      author: 'Морґан Нік',
      isbn: '978-617-679-479-0',
      price: 220 ,
      old_price: 320,
      description: '«JavaScript для детей» — веселое пособие, вступление к основам программирования, с которым вы шаг за шагом овладеете работой со строками, массивами и циклами, инструментами DOM и jQuery и элементом canvas для рисования графики. Вы сможете писать и модифицировать HTML-элементы для создания динамических веб-страниц и напишите классные онлайн игры «Найди спрятанный клад», «Виселица» и «Змейка».',
      additional: 'В этой книге — множество интересных примеров и забавных иллюстраций, а задача по программированию в конце каждого раздела, вдохновят на создание собственных потрясающих программ. Сотворим что-то крутое с JavaScript!'
    },
    {
      _id: 6,
      name: 'Происхождение',
      img: 'https://i1.rozetka.ua/goods/12100714/59451100_images_12100714656.jpg',
      cat_name: 'Художня література',
      cat_id: 2,
      cat_img: 'https://blogs.ntu.edu.sg/files/2014/07/change_default_category.jpg',
      author: 'Дэн Браун',
      isbn: '978-5-17-106150-0',
      price: 149,
      old_price: 249,
      description: 'Роберт Лэнгдон прибывает в музей Гуггенхайма в Бильбао по приглашению друга и бывшего студента Эдмонда Кирша. Миллиардер и компьютерный гуру, он известен своими удивительными открытиями и предсказаниями. И этим вечером Кирш собирается «перевернуть все современные научные представления о мире», дав ответ на два главных вопроса, волнующих человечество на протяжении всей истории: Откуда мы? Что нас ждет?',
      additional: 'Однако прежде, чем Эдмонд успевает сделать заявление, роскошный прием превращается в хаос. Лэнгдону и директору музея, красавице Амбре Видаль, чудом удается бежать. Теперь их путь лежит в Барселону, где Кирш оставил для своего учителя закодированный ключ к тайне, способной потрясти сами основы представлений человечества о себе. Тайне, которая была веками похоронена во тьме забвения. Тайне, которой, возможно, лучше бы никогда не увидеть света, – по крайней мере, так считают те, кто преследует Лэнгдона и Видаль и готов на все, чтобы помешать им раскрыть истину.'
    },
    {
      _id: 7,
      name: 'Богатый папа, бедный папа',
      img: 'https://i2.rozetka.ua/goods/10642517/copy_popurri_9789851535169_5c51a3516de6f_images_10642517612.jpg',
      cat_name: 'Бізнес література',
      cat_id: 3,
      cat_img: 'https://blogs.ntu.edu.sg/files/2014/07/change_default_category.jpg',
      author: 'Роберт Кийосаки',
      isbn: '978-985-15-3517-6',
      price: 297,
      old_price: 397,
      description: 'Роберт Кийосаки убежден, что в школе наши дети не получают нужных финансовых знаний и потом всю жизнь работают ради денег, вместо того чтобы заставить деньги работать на себя. Он порадовал читателей новым изданием ставшей уже культовой книги — с изменениями и дополнениями для сегодняшнего мира, сегодняшних рыночных условий и 9 новыми разделами.',
      additional: 'К сожалению, в сфере образования мало что поменялось — школа до сих пор не дает подрастающему поколению финансовых азов. Научите детей обращаться с деньгами раньше, чем они столкнутся с материальными трудностями в нашем нестабильном мире!'
    },
    {
      _id: 8,
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
    },
    {
      _id: 9,
      name: 'Javascript для дітей',
      img: 'https://i1.rozetka.ua/goods/4116170/vydavnytstvo_staroho_leva_9786176794790_images_4116170096.jpg',
      cat_name: 'Дитячі книги',
      cat_id: 1,
      cat_img: 'https://blogs.ntu.edu.sg/files/2014/07/change_default_category.jpg',
      author: 'Морґан Нік',
      isbn: '978-617-679-479-0',
      price: 220 ,
      old_price: 320,
      description: '«JavaScript для детей» — веселое пособие, вступление к основам программирования, с которым вы шаг за шагом овладеете работой со строками, массивами и циклами, инструментами DOM и jQuery и элементом canvas для рисования графики. Вы сможете писать и модифицировать HTML-элементы для создания динамических веб-страниц и напишите классные онлайн игры «Найди спрятанный клад», «Виселица» и «Змейка».',
      additional: 'В этой книге — множество интересных примеров и забавных иллюстраций, а задача по программированию в конце каждого раздела, вдохновят на создание собственных потрясающих программ. Сотворим что-то крутое с JavaScript!'
    },
    {
      _id: 10,
      name: 'Происхождение',
      img: 'https://i1.rozetka.ua/goods/12100714/59451100_images_12100714656.jpg',
      cat_name: 'Художня література',
      cat_id: 2,
      cat_img: 'https://blogs.ntu.edu.sg/files/2014/07/change_default_category.jpg',
      author: 'Дэн Браун',
      isbn: '978-5-17-106150-0',
      price: 149,
      old_price: 249,
      description: 'Роберт Лэнгдон прибывает в музей Гуггенхайма в Бильбао по приглашению друга и бывшего студента Эдмонда Кирша. Миллиардер и компьютерный гуру, он известен своими удивительными открытиями и предсказаниями. И этим вечером Кирш собирается «перевернуть все современные научные представления о мире», дав ответ на два главных вопроса, волнующих человечество на протяжении всей истории: Откуда мы? Что нас ждет?',
      additional: 'Однако прежде, чем Эдмонд успевает сделать заявление, роскошный прием превращается в хаос. Лэнгдону и директору музея, красавице Амбре Видаль, чудом удается бежать. Теперь их путь лежит в Барселону, где Кирш оставил для своего учителя закодированный ключ к тайне, способной потрясти сами основы представлений человечества о себе. Тайне, которая была веками похоронена во тьме забвения. Тайне, которой, возможно, лучше бы никогда не увидеть света, – по крайней мере, так считают те, кто преследует Лэнгдона и Видаль и готов на все, чтобы помешать им раскрыть истину.'
    },
    {
      _id: 11,
      name: 'Богатый папа, бедный папа',
      img: 'https://i2.rozetka.ua/goods/10642517/copy_popurri_9789851535169_5c51a3516de6f_images_10642517612.jpg',
      cat_name: 'Бізнес література',
      cat_id: 3,
      cat_img: 'https://blogs.ntu.edu.sg/files/2014/07/change_default_category.jpg',
      author: 'Роберт Кийосаки',
      isbn: '978-985-15-3517-6',
      price: 297,
      old_price: 397,
      description: 'Роберт Кийосаки убежден, что в школе наши дети не получают нужных финансовых знаний и потом всю жизнь работают ради денег, вместо того чтобы заставить деньги работать на себя. Он порадовал читателей новым изданием ставшей уже культовой книги — с изменениями и дополнениями для сегодняшнего мира, сегодняшних рыночных условий и 9 новыми разделами.',
      additional: 'К сожалению, в сфере образования мало что поменялось — школа до сих пор не дает подрастающему поколению финансовых азов. Научите детей обращаться с деньгами раньше, чем они столкнутся с материальными трудностями в нашем нестабильном мире!'
    },
    {
      _id: 12,
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
    }
  ];
  public productsByIdLoadCheck = false;

  public categories: Category[] = [];
  private localCategories: Category[] = [
    {
      cat_id: 1,
      cat_name: 'Дитячі книги',
      cat_img: 'https://blogs.ntu.edu.sg/files/2014/07/change_default_category.jpg',
      count: 3
    },
    {
      cat_id: 2,
      cat_name: 'Художня література',
      cat_img: 'https://blogs.ntu.edu.sg/files/2014/07/change_default_category.jpg',
      count: 3
    },
    {
      cat_id: 3,
      cat_name: 'Бізнес література',
      cat_img: 'https://blogs.ntu.edu.sg/files/2014/07/change_default_category.jpg',
      count: 3
    },
    {
      cat_id: 4,
      cat_name: 'Книги для батьків',
      cat_img: 'https://blogs.ntu.edu.sg/files/2014/07/change_default_category.jpg',
      count: 3
    }
    ];

  public users: User[] = [];
  private localUsers: User[] = [
    {
      _id: '5d3e975fb5a0972f8833ea00',
      loginName: 'qq@qq',
      password: 'qqqq',
      roles: 'user'
    },
    {
      _id: '5d3ea6abb5a0972f8833ea02',
      loginName: 'admin@admin',
      password: 'admin@admin',
      roles: 'admin'
    }
  ];
  public addUserCheck = new BehaviorSubject(null);
  public logInCheck = new BehaviorSubject(null);
  public loggedCheck = false;
  public adminCheck = false;
  public loggedUser: User = null;

  public cart: any = {
    count: 0,
    total: 0,
    items: []
  };

  // public apiUrl = 'http://localhost:3001/api/';
  // public apiUrl = 'http://185.227.108.238:3001/api/';
  public apiUrl = 'https://uashop.cf:8443/api/';

  constructor(private http: HttpClient, private router: Router, private location: Location) {}

  getCategories(): Observable<Category[]> {
    if (!this.categories.length) {
      return this.http.get<Category[]>(this.apiUrl + 'BookShop/GetAllCategories').pipe(
        tap((categories: Category[]) => {
          // console.log('getCategories: ', categories);
          this.categories = categories;
          // console.log('getCategories length: ', categories.length);
        }),
        catchError(err => {
          console.log('getCategories: ', err.message);
          this.categories = this.localCategories;
          return throwError(err);
        })
      );
    } else {
      console.log('Список категорій був завантажений раніше.');
    }
  }

  /*getProducts() {
    this.http.get<Product[]>('http://localhost:3000/api/BookShop/GetAllBooks').subscribe(
      (products: Product[]) => {
        this.products = products;
        console.log('products: ', products);
      },
      (err) => {
        this.products = this.localProducts;
        console.log('Error: ', err);
      }
    );
  }*/

  getProduct(id: number) {
    return this.http.get<Product>(this.apiUrl + 'BookShop/GetBook/' + id).pipe(
      tap((product: Product) => {
        console.log('getProduct: ', product);
        this.product = product;
      }),
      catchError(err => {
        console.log('getProduct: ', err.message);
        this.product = this.localProduct;
        return throwError(err);
      })
    );
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl + 'BookShop/GetAllBooks').pipe(
      tap((products: Product[]) => {
        // console.log('getProducts: ', products);
        this.products = products;
      }),
      catchError(err => {
        console.log('getProducts: ', err.message);
        this.products = this.localProducts;
        return throwError(err);
      })
    );
  }

  getProductsById(id: number): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl + 'BookShop/GetBooksById/' + id).pipe(
      tap((products: Product[]) => {
        console.log('getProductsById: ', products);
        this.productsById = products;
        this.productsByIdLoadCheck = true;
        console.log('productsLoadCheck: ', this.productsByIdLoadCheck);
      }),
      catchError(err => {
        console.log('getProductsById: ', err.message);
        this.productsById = this.localProductsById;
        return throwError(err);
      })
    );
  }

  deleteProduct(id: number) {
    return this.http.delete<Product>(this.apiUrl + 'BookShop/DeleteBook/' + id).pipe(
      tap((product: Product) => {
        console.log('deleteProduct: ', product);
      }),
      catchError(err => {
        console.log('deleteProduct: ', err.message);
        return throwError(err);
      })
    );
  }

  addProduct(product: Product) {
    return this.http.post<Product>(this.apiUrl + 'BookShop/CreateNewBook', product).subscribe(
      (data: Product) => {
        this.addedProduct = data;
        console.log(data);
      },
      err => console.log(err)
    );
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + 'BookShop/GetAllUsers').pipe(
      tap((users: User[]) => {
        // console.log('getAllUsers: ', users);
        this.users = users;
      }),
      catchError(err => {
        console.log('getAllUsers: ', err.message);
        this.products = this.localProducts;
        return throwError(err);
      })
    );
  }

  addUser(user: User) {
    return this.http.post<User>(this.apiUrl + 'Account/AddUser', user).subscribe(
      (data: User) => {
        console.log(data);
        this.addUserCheck.next(data);
        if (data.loginName) {
          this.loggedCheck = true;
          console.log('logged as :', data.loginName);
          this.loggedUser = data;
        }
      },
      err => console.log(err)
    );
  }

  logIn(user: User) {
    return this.http.post<User>(this.apiUrl + 'Account/LogIn', user).subscribe(
      (data: User) => {
        console.log(data);
        this.logInCheck.next(data);
        if (data.loginName) {
          this.loggedCheck = true;
          console.log('logged as :', data.loginName);
          this.loggedUser = data;
          if (data.roles === 'admin') {
            this.adminCheck = true;
          }
        }
      },
      err => console.log(err)
    );
  }

  addToCart(cartItem) {
    let found = false;
    this.cart.items.forEach(item => {
      if (item.cartBody._id === cartItem.cartBody._id) {
        // console.log('знайдено');
        item.count += cartItem.count;
        found = true;
        return false;
      }
    });
    if (!found) {
      // console.log('незнайдено');
      this.cart.items.push(cartItem);
    }
    this.cart.count += cartItem.count;
    this.cart.total += cartItem.count * cartItem.cartBody.price;
    console.log('cart', this.cart);
  }

  resetAddUserCheck() {
    this.addUserCheck.next('');
  }

  resetLogInCheck() {
    this.logInCheck.next('');
  }

  goBack() {
    this.location.back();
  }

  goHome() {
    this.router.navigate(['']);
  }

  signOut() {
    this.loggedCheck = false;
    this.adminCheck = false;
    console.log('logged out');
    this.loggedUser = null;
  }

}
