import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPageService } from "./admin-page.service";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { MatInputModule } from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent {
  userForm = new FormGroup({
    firstName: new FormControl({ value: '', disabled: false }, { nonNullable: true, validators: [Validators.required]}),
    lastName: new FormControl({ value: '', disabled: false }, { nonNullable: true, validators: [Validators.required]}),
    userName: new FormControl({ value: '', disabled: false }, { nonNullable: true, validators: [Validators.required]}),
    password: new FormControl({ value: '', disabled: false }, { nonNullable: true , validators: [Validators.required]}),
  })
  users: Observable<any>|undefined;

  constructor(private adminService: AdminPageService) {}

  createUser() {
    if (this.userForm.valid) {
      console.log(this.userForm.value)
      this.adminService.postInfo(this.userForm.getRawValue()).subscribe();
    }
  }

  getUsers() {
    this.users = this.adminService.getUsers();
    this.users.subscribe(user => console.log(user));
  }
}
