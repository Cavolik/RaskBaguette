import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {
  user: any;
  constructor() {
    this.user = JSON.parse(localStorage.getItem('loggedInUser')||'{firstName: "User", lastName: "Name", orderHistory: []}');
  }
}
