import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

    addToCartForm: FormGroup;

    constructor(private dataService: DataService, private activateRoute: ActivatedRoute) {}

    addToCart() {
        const cartItem: any = {
            count: this.addToCartForm.value.count,
            cartBody: this.dataService.product
        };
        console.log(cartItem);

        this.dataService.addToCart(cartItem);
    }

    ngOnInit() {
        this.dataService.getProduct(this.activateRoute.snapshot.params.id).subscribe();
        this.addToCartForm = new FormGroup({
            count: new FormControl(1, Validators.required)
        });
    }

}

