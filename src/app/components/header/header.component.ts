import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public historyLength = false;

  constructor(public dataService: DataService, private router: Router) {
    this.router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        this.historyLength = event.id > 1;
        // console.log('event: ', event.id);
      }
      // NavigationEnd
      // NavigationCancel
      // NavigationError
      // RoutesRecognized
    });
  }

  ngOnInit() {
    this.dataService.getProducts().subscribe();
    this.dataService.getCategories().subscribe();
  }

}
