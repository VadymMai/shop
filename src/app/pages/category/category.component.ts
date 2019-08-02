import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [DataService]
})
export class CategoryComponent implements OnInit {

  private subscription: Subscription;

  constructor(public dataService: DataService, private activateRoute: ActivatedRoute) {
    this.subscription = activateRoute.params.subscribe(params => {
      console.log(params.id);
      this.dataService.getProductsById(this.activateRoute.snapshot.params.id).subscribe();
    });
  }

  ngOnInit() {
    this.dataService.getProductsById(this.activateRoute.snapshot.params.id).subscribe();
    this.dataService.getCategories().subscribe();
  }

}
