import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet,} from '@angular/router';
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'frontend';

  logOut() {
    localStorage.clear();
  }

  protected readonly localStorage = localStorage;
}

export type User = {
  firstName: string,
  lastName: string,
  userName: string
}
