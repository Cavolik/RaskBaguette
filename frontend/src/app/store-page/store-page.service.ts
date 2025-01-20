import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StorePageService {

  constructor(private http: HttpClient) { }
  updateUser = (id:string, user:any) => {
    return this.http.put(`/api/update/${id}`, user);
  }
}
