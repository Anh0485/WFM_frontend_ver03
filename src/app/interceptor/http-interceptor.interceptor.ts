import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable()
export class MyInterceptorInterceptor implements HttpInterceptor {
  constructor(private authService: LoginService) {}
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     const jwt = this.authService.getToken()
    return next.handle(httpRequest.clone({ setHeaders: { authorization: `Bearer ${jwt}`  } 
  }));
  }
}

