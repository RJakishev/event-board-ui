import { HttpContextToken, HttpErrorResponse, HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";
import {catchError, switchMap} from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor1: HttpInterceptorFn = (
    req: HttpRequest<any>,
    next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  // const cookieService = inject(CookieService);
    // console.log(req);
  const token = localStorage.getItem('token');
  // alert(token);
  if (token) {
    // console.log(req.headers);
    
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      },
    });
    // console.log(cloned);
    
    return next(cloned);
  } else {
    return next(req);
  }
};

export const authInterceptor11: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const authToken = localStorage.getItem('token');

  if (authToken) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
  }
  return next(req).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        router.navigate(['login']);
      }
      return throwError(() => error);
    })
  );
};

export const authInterceptor2: HttpInterceptorFn = (req, next) => {
  // console.log('authInterceptor2');
  
  // localStorage.removeItem('token');
  // let token = localStorage.getItem('token');
  
  const authSvc = inject(AuthService);
  if (authSvc.isAuthenticated()) {
    // console.log('token=', token);
    const authRequest = addAuthorizationHeader(req);
    // debugger
    return next(authRequest);
  }
  return next(req);
};

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('authInterceptor');
  const authSvc = inject(AuthService);

  console.log('req.context.get(IS_PUBLIC)', req.context);
  console.log('authSvc.isAuthenticated()=', authSvc.isAuthenticated());
  if (req.context.get(IS_PUBLIC)) {
    
    return next(req);
  }

  if (authSvc.isAuthenticated()) {
    const authRequest = addAuthorizationHeader(req);
    return next(authRequest);
  } else {
    return authSvc.refreshToken().pipe(
      switchMap(() => {
        console.log('not isAuthenticated');
        
        const authRequest = addAuthorizationHeader(req);
        return next(authRequest);
      })
    );
  }
};

const addAuthorizationHeader = (req: HttpRequest<any>) => {
  const token = localStorage.getItem('token');
  // alert(token)
  console.log('token in header: ', token);

  if (token) {
    req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }
  return req;  

  // return req.clone({
  //   headers: req.headers.set('Authorization', `Bearer ${token}`)
  // });
};


export const IS_PUBLIC = new HttpContextToken(() => false);