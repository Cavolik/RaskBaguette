import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User } from "../app.component";

@Injectable({
  providedIn: 'root'
})
export class AdminPageService {

  constructor(private http: HttpClient) { }
  getUsers = () => {
    return this.http.get('/api/users');
  }

  postInfo = (info: User) => {
    return this.http.post<string>('/api/info', info);
  }
}
