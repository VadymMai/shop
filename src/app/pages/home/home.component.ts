import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DataService]
})
export class HomeComponent implements OnInit {

  categories: object[] = this.dataService.getСategories();
  products: object[] = this.dataService.getProducts();

  constructor(private dataService: DataService) {}

  ngOnInit() {}

}
