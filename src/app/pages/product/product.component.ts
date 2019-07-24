import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

    constructor(private dataService: DataService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.dataService.getProduct(this.route.snapshot.params.id).subscribe();
    }

}

