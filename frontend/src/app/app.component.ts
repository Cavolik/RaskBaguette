import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatButtonModule } from "@angular/material/button";
import { AppComponentService } from "./app.component.service";
import { LoginPageService } from "./login-page/login-page.service";
import { of } from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'frontend';
  userIsLoggedIn = of (false);
  constructor(private service: AppComponentService, private loginService: LoginPageService) {
    this.userIsLoggedIn = this.loginService.userIsLoggedIn;
    this.loginService.getSessionStatus().subscribe();
  }

  logOut() {
    this.loginService.logout().subscribe();
  }
}

export type User = {
  firstName: string,
  lastName: string,
  userName: string
}
