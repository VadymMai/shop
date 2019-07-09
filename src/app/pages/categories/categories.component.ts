import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories = [
      {
          id: '001',
          title: 'Дитячі книги',
          img: 'https://blogs.ntu.edu.sg/files/2014/07/change_default_category.jpg'
      },
      {
          id: '002',
          title: 'Художня література',
          img: 'https://blogs.ntu.edu.sg/files/2014/07/change_default_category.jpg'
      },
      {
          id: '003',
          title: 'Бізнес література',
          img: 'https://blogs.ntu.edu.sg/files/2014/07/change_default_category.jpg'
      },
      {
          id: '004',
          title: 'Книги для батьків',
          img: 'https://blogs.ntu.edu.sg/files/2014/07/change_default_category.jpg'
      },
      {
          id: '005',
          title: 'Підручники',
          img: 'https://blogs.ntu.edu.sg/files/2014/07/change_default_category.jpg'
      },
      {
          id: '006',
          title: 'Комікси',
          img: 'https://blogs.ntu.edu.sg/files/2014/07/change_default_category.jpg'
      },
  ];

  constructor() { }

  ngOnInit() {
  }

}
