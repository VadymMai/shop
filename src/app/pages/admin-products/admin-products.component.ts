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

  addProductForm: FormGroup;
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
      cat_id: Number(this.addProductForm.value.catId),
      cat_img: this.addProductForm.value.catImg,
      author: this.addProductForm.value.author,
      isbn: this.addProductForm.value.isbn,
      price: this.addProductForm.value.price,
      old_price: this.addProductForm.value.oldPrice,
      description: this.addProductForm.value.description,
      additional: this.addProductForm.value.additional
    };
    console.log(product);
    this.dataService.addProduct(product);
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

  ngOnInit() {
    this.dataService.getProducts().subscribe();
    this.dataService.getCategories().subscribe();
    this.addProductForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      img: new FormControl(null, Validators.required),
      catName: new FormControl(null, Validators.required),
      catId: new FormControl('', Validators.required),
      catImg: new FormControl(null, Validators.required),
      author: new FormControl(null, Validators.required),
      isbn: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      oldPrice: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      additional: new FormControl(null, Validators.required)
    });
  }

}
