import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { LoginPageService } from "./login-page.service";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private service: LoginPageService) {
    this.loginForm = this.fb.group({
        userName: ['', Validators.required],
        password: ['', Validators.required]
      });
  }

  logIn() {
    this.service.logIn(this.loginForm.value).subscribe(user => {
      const userArray = user as Array<any>;
      if (userArray.length > 0) {
        localStorage.clear();
        localStorage.setItem('loggedInUser', JSON.stringify(userArray[0]));
        const obj = JSON.parse(localStorage.getItem('loggedInUser')||'{}');
        console.log(obj);
      }
    });
  }

  logOut() {
    localStorage.clear();
  }
}
