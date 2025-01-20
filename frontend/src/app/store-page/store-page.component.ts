import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StorePageService} from "./store-page.service";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-store-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './store-page.component.html',
  styleUrls: ['./store-page.component.scss']
})
export class StorePageComponent {
  user: any;

  constructor(private service: StorePageService) {
    this.user = JSON.parse(localStorage.getItem('loggedInUser')||'{}');
  }

  purchase(item: {productName: string, productPrice: number, image: string}) {
    this.user.orderHistory.push(item);

    localStorage.setItem('loggedInUser', JSON.stringify(this.user));
    this.service.updateUser(this.user._id, this.user).subscribe();
  }
}
