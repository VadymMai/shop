import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getProducts().subscribe();
    this.dataService.getCategories().subscribe();
  }

  addItem() {
    this.dataService.test.push('item100');
  }

  showItem() {
    console.log('home ', this.dataService.test);
  }
}
