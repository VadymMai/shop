import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  categories: object[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.categories = this.dataService.getСategories();
    console.log(this.categories);
  }

}
