import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient } from "@angular/common/http";
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpApiInterceptor } from "./http-api.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(), provideAnimations(), { provide: HTTP_INTERCEPTORS, useClass: HttpApiInterceptor, multi: true },]

};
