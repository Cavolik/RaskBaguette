import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPageService } from "./admin-page.service";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent {
  userForm: FormGroup

  constructor(private adminService: AdminPageService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required]
    });
  }



  createUser() {
    if (this.userForm.valid) {
      console.log(this.userForm.value)
      this.adminService.postInfo(this.userForm.value).subscribe();
    }
  }

  logAction() {

  }

}
