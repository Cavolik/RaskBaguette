import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AppComponentService {

  constructor(private http: HttpClient) { }
  getLoggedInUser = () => {
    return this.http.get('/api/session-status', {observe: "response"})
  }
}
