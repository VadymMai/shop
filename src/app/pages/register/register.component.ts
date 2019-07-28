import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService, User } from '../../services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../components/snackbar/snackbar.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  addUserForm: FormGroup;

  constructor(private dataService: DataService, private snackBar: MatSnackBar) {
    /*if (this.dataService.addUserCheck.value !== null) {
      console.log('this.dataService.addUserCheck.value !== null');
    } else {
      console.log('NOT this.dataService.addUserCheck.value !== null');
    }*/
    this.dataService.addUserCheck.subscribe((value: any) => {
      if (value) {
        this.openSnackBar(value);
        if (value.loginName) {
          this.dataService.goBack();
        }
        this.dataService.resetAddUserCheck();
      }
    });
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

  addUser() {
    const user: User = {
      _id: 0,
      loginName: this.addUserForm.value.loginName,
      password: this.addUserForm.value.password,
      roles: 'user'
    };
    console.log(user);
    this.dataService.addUser(user);
  }

  ngOnInit() {
    this.addUserForm = new FormGroup({
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

