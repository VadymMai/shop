import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories = [
    {
      title: 'Category 1',
      img: 'https://i2.rozetka.ua/goods/9211976/64164322_images_9211976970.png'
    },
    {
      title: 'Category 2',
      img: 'https://starylev.com.ua/files/books/python_for_kids_0.png'
    },
    {
      title: 'Category 3',
      img: 'https://homeoutlet.co/img/us/300/B00IE94WY4_homeoutlet.jpg'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
