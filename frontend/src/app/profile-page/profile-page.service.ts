import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProfilePageService {

  constructor(private http: HttpClient) { }

  getCurrentUser = () => {
    return this.http.get('/api/current-user');
  }

}
