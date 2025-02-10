import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { Router } from "@angular/router";


@Injectable()
export class HttpApiInterceptor implements HttpInterceptor {
  constructor(private router: Router) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next
      .handle(req)
      .pipe(catchError((err: HttpErrorResponse) => this.handleApiError(err)));
  }

  private handleApiError(res: HttpErrorResponse) {
    if (res.status === 401) {
      if (!(this.router.url === '/login')) {
        this.router.navigate(['/login']);
      }
    }
    return throwError(() => res);
  }
}
