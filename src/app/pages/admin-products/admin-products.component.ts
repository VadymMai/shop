import { Component, OnInit } from '@angular/core';
import { DataService, Product } from '../../services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  id = 0;
  name = '';
  img = '';
  catName = '';
  catId = 0;
  catImg = '';
  author = '';
  isbn = '';
  price = 0;
  oldPrice = 0;
  description = '';
  additional = '';

  products: object[] = [];

  /*products1: Observable<Product[]> = [];*/

  constructor(private dataService: DataService) {}

  addProduct() {
    const product: Product = {
      _id: this.id,
      name: this.name,
      img: this.img,
      cat_name: this.catName,
      cat_id: this.catId,
      cat_img: this.catImg,
      author: this.author,
      isbn: this.isbn,
      price: this.price,
      old_price: this.oldPrice,
      description: this.description,
      additional: this.additional
    };
  }

  ngOnInit() {
    this.dataService.test();
    this.dataService.fetchProducts();
  }

}