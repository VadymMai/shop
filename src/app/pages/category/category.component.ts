import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [DataService]
})
export class CategoryComponent implements OnInit {

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.dataService.getProducts().subscribe();
  }

}
