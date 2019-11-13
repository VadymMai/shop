import { Injectable } from '@angular/core';
import {CanActivate, NavigationStart, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class CheckAdminGuard implements CanActivate {

  private historyLength = false;

  constructor(private dataService: DataService, private router: Router, private snackBar: MatSnackBar) {
    this.router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        this.historyLength = event.id > 1;
      }
    });
  }

  openSnackBar() {
    const data = 'Помилка авторизації';
    const panelClass = 'snack-error';
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: 5000,
      data,
      panelClass
    });
  }

  adminCheckSuccess() {
    console.log('adminCheck: Success');
    return true;
  }

  adminCheckFail() {
    console.log('adminCheck: Fail');
    this.openSnackBar();
    if (!this.historyLength) {
      this.router.navigate(['']);
    }
    return false;
  }

  canActivate(): Observable<boolean> | boolean {
    // return confirm('Вы уверены, что хотите перейти?');
    return this.dataService.adminCheck ? this.adminCheckSuccess() : this.adminCheckFail();
  }
}
