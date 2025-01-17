import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginPageService {

  constructor(private http: HttpClient) { }
  logIn = (loginValue: {userName: string, password: string}) => {
    return this.http.post('/api/login', loginValue);
  }
}
