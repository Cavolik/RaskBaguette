import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpApiInterceptor } from "./http-api.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), importProvidersFrom(HttpClientModule), provideAnimations(), { provide: HTTP_INTERCEPTORS, useClass: HttpApiInterceptor, multi: true },]

};
