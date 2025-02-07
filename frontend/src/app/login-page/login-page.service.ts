import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginPageService {
  private loginStatusSubject = new BehaviorSubject(false); //subject can be updated from an observable
  userIsLoggedIn = this.loginStatusSubject.asObservable(); //we make the subject an observable so we can use the async pipe in template

  constructor(private http: HttpClient) { }
  logIn = (loginValue: { userName: string, password: string }) => {
    return this.http.post('/api/login', loginValue, { observe: 'response' }).pipe(
      //when response.status is 200 we can push a change to the observable
      tap((response) => response.status===200 ? this.loginStatusSubject.next(true):this.loginStatusSubject.next(false)),
    );
  };
  logout = () => {
    return this.http.delete('/api/login', { observe: 'response' })
      .pipe(
        tap(
          (response) => response.status===200 ? this.loginStatusSubject.next(false):''), //dersom delete er success så setter den subjectet til false dvs userIsLoggedIn oppdaterer alle som ser på den observablen med false
      );
  };
  getSessionStatus = () => {
    return this.http.get('api/session-status', { observe: 'response' })
      .pipe(
        tap((response) => response.status===200 ? this.loginStatusSubject.next(true):this.loginStatusSubject.next(false)),
      );
  };
}
