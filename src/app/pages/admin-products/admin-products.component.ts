import { Component, OnInit } from '@angular/core';
import { DataService, Product } from '../../services/data.service';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})

export class AdminProductsComponent implements OnInit {

  addProductForm = new FormGroup({
    name: new FormControl('', Validators.required),
    img: new FormControl('', Validators.required),
    catName: new FormControl('', Validators.required),
    catId: new FormControl('', Validators.required),
    catImg: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    isbn: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    oldPrice: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    additional: new FormControl('', Validators.required)
  });

  newCategory = false;

  /*id = 0;
  name = '';
  img = '';
  catName = '';
  catId = 0;
  catImg = '';
  author = '';
  isbn = '';
  price: number;
  oldPrice: number;
  description = '';
  additional = '';*/

  constructor(private dataService: DataService) {}

  addProduct() {
    const product: Product = {
      _id: 0,
      name: this.addProductForm.value.name,
      img: this.addProductForm.value.img,
      cat_name: this.addProductForm.value.catName,
      cat_id: this.addProductForm.value.catId,
      cat_img: this.addProductForm.value.catImg,
      author: this.addProductForm.value.author,
      isbn: this.addProductForm.value.isbn,
      price: this.addProductForm.value.price,
      old_price: this.addProductForm.value.oldPrice,
      description: this.addProductForm.value.description,
      additional: this.addProductForm.value.additional
    };
    console.log(product);
    // this.dataService.addProduct(product);
  }

  newCategoryCheck() {
    if (this.addProductForm.value.catId === '0') {
      this.newCategory = true;
      this.addProductForm.get('catName').setValue('');
    } else {
      this.newCategory = false;
      this.addProductForm.get('catName').setValue(document.querySelector('.custom-select option:checked').innerHTML);
    }
  }

  test() {
    console.log(this.addProductForm.value.catName);
  }

  ngOnInit() {
    this.dataService.getProducts().subscribe();
    this.dataService.getCategories().subscribe();
  }

}
