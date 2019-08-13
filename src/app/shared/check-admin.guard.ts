import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class CheckAdminGuard implements CanActivate {

  constructor(private dataService: DataService) {}

  adminChecktrue() {
    console.log('adminCheck: true');
    return true;
  }

  adminCheckfalse() {
    console.log('adminCheck: false');
    return false;
  }

  canActivate(): Observable<boolean> | boolean {
    // return confirm('Вы уверены, что хотите перейти?');
    return this.dataService.adminCheck ? this.adminChecktrue() : this.adminCheckfalse();
  }
}
