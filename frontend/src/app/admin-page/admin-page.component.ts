import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPageService } from "./admin-page.service";

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent {

  constructor(private adminService: AdminPageService) {
  }

  logAction() {
    this.adminService.postInfo('Test').subscribe();
  }

}
