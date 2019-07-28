import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService, User } from '../../services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../components/snackbar/snackbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logInForm: FormGroup;

  constructor(private dataService: DataService, private snackBar: MatSnackBar) {
    /*if (this.dataService.addUserCheck.value !== null) {
      console.log('this.dataService.addUserCheck.value !== null');
    } else {
      console.log('NOT this.dataService.addUserCheck.value !== null');
    }*/
    /*this.dataService.addUserCheck.subscribe((value: any) => {
      if (value) {
        this.openSnackBar(value);
        if (value.loginName) {
          this.dataService.goHome();
          this.dataService.resetAddUserCheck();
        }
      }
    });*/
  }

  openSnackBar(value) {
    const data = (value.message) ? 'Такий Email вже використовується. Спробуйте авторизуватись, або використовуйте інший Email.' : 'Реєстрація успішна';
    const panelClass = (value.message) ? 'snack-error' : 'snack-success';
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: 5000,
      data,
      panelClass
    });
  }

  logIn() {
    const user: User = {
      _id: 0,
      loginName: this.logInForm.value.loginName,
      password: this.logInForm.value.password,
      roles: 'user'
    };
    console.log(user);
    this.dataService.logIn(user);
  }

  ngOnInit() {
    this.logInForm = new FormGroup({
      loginName: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(4)
      ])
    });
  }

}

