import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatButtonModule } from "@angular/material/button";
import { AppComponentService } from "./app.component.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(private service: AppComponentService) {}

  title = 'frontend';
  userStatus = false;
  logOut() {
    localStorage.clear();
  }

  getLoggedInUser() {
    this.service.getLoggedInUser().subscribe(response => {
      if (response.status === 200) {
        this.userStatus = true;
      }
    });
  }

  protected readonly localStorage = localStorage;
}

export type User = {
  firstName: string,
  lastName: string,
  userName: string
}
