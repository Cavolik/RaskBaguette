import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AdminPageService {

  constructor(private http: HttpClient) { }
  getInfo = () => {
    return this.http.get('/api/info');
  }

  postInfo = (info:string) => {
    return this.http.post<string>('/api/info', 'test');
  }

}
