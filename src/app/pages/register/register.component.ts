import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService, User } from '../../services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  addUserForm: FormGroup;

  constructor(private dataService: DataService, private snackBar: MatSnackBar) { }

  openSnackBar() {
    this.snackBar.openFromComponent(PizzaPartyComponent, {
      duration: 2000
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
      loginName: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

}

@Component({
  selector: 'app-snack-bar',
  template: `<span class="example-pizza-party">
                Pizza party!!! 🍕
             </span>`,
  styles: [`
    .example-pizza-party {
      color: hotpink;
    }
  `],
})
export class PizzaPartyComponent {}
