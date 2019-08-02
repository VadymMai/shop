import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DataService]
})
export class HomeComponent implements OnInit {

  constructor(public dataService: DataService) {}

  ngOnInit() {
    this.dataService.getProducts().subscribe();
    this.dataService.getCategories().subscribe();
  }

}
