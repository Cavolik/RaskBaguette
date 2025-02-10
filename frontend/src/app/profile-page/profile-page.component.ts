import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from "@angular/material/card";
import {ProfilePageService} from "./profile-page.service";

@Component({
  selector: 'app-profile-page',
  standalone: true,
    imports: [CommonModule, MatCardModule],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit{
  user: any;
  ngOnInit() {
    this.service.getCurrentUser().subscribe(response => {
      this.user = response;
    });
  }

  constructor(private service: ProfilePageService) {}
}
