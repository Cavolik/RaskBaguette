import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { LoginPageService } from "./login-page.service";
import { RouterLink } from "@angular/router";
import { MatInputModule } from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, MatInputModule, MatButtonModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  loginForm = new FormGroup({
    userName: new FormControl({ value: '', disabled: false }, { nonNullable: true, validators: [Validators.required]}),
    password: new FormControl({ value: '', disabled: false }, { nonNullable: true , validators: [Validators.required]}),
  })
  constructor(private service: LoginPageService) {}

  logIn() {
    this.service.logIn(this.loginForm.getRawValue()).subscribe(user => {
      const userArray = user as Array<any>;
      if (userArray.length > 0) {
        localStorage.clear();
        localStorage.setItem('loggedInUser', JSON.stringify(userArray[0]));
        const obj = JSON.parse(localStorage.getItem('loggedInUser')||'{}');
        console.log(obj);
      }
    });
  }
}
