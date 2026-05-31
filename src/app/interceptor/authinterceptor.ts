import {
  HttpInterceptorFn
} from '@angular/common/http';

import { inject } from '@angular/core';
import { Authservice  as AuthService} from '../login/authservice';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
  } from '@angular/common/http';
  
  import { Injectable } from '@angular/core';
  import { Observable } from 'rxjs';
  
  
  @Injectable()
  export class AuthInterceptor implements HttpInterceptor {
  
    constructor(
      private authService: AuthService
    ) {}
  
    intercept(
      req: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
  
      const token = this.authService.getAccessToken();
  
      console.log('==============');
      console.log('REQUEST URL:', req.url);
      console.log('METHOD:', req.method);
  
     
      if (
        req.url.includes('/auth/login') ||
        req.url.includes('/auth/refresh')
      ) {
  
        console.log('Auth endpoint - skipping token');
  
        return next.handle(req);
      }
  
   
      if (!token) {
  
        console.log('NO TOKEN FOUND');
        return next.handle(req);
      }
  
  
      const clonedReq = req.clone({
        setHeaders: {
          'X-Api-Authorization': `Bearer ${token}`
        },
        withCredentials: true
      });
  
      console.log("TOKS:",token);
      console.log('Authorization header attached');
  
      return next.handle(clonedReq);
    }
  }