import {DestroyRef, inject, Injectable, Injector, signal, WritableSignal} from '@angular/core';
import { HttpClient, HttpContext } from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable, of, tap} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";
// import {environment} from "../../environments/environment.development";
// import {Login} from "./login/interfaces";
// import {User} from "./user.interface";
// import {LoginResponse} from "./login/types/login-response.type";
// import {LoginSuccess} from "./login/interfaces";
import {IS_PUBLIC} from "./auth.interceptor";
import {catchError} from "rxjs/operators";
// import {ToastrService} from "ngx-toastr";
// import {TranslateService} from "@ngx-translate/core";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
// import { Login } from './login/interfaces/login.interface';
// import { User } from '../../car';
// import { LoginSuccess } from './login/interfaces/login-success.interface';
// import { LoginResponse } from './login/types/login-response.type';
import { environment } from '../../environments/environment';
// import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly jwtHelper = inject(JwtHelperService);
  // private readonly toastrSvc = inject(ToastrService);
  private readonly injector = inject(Injector);
  private readonly destroyRef = inject(DestroyRef);
  private readonly CONTEXT = {context: new HttpContext().set(IS_PUBLIC, true)};
  private readonly TOKEN_EXPIRY_THRESHOLD_MINUTES = 5;


  isAuthenticated(): boolean {
    if(this.jwtHelper.isTokenExpired()){
      localStorage.removeItem('username');
      localStorage.removeItem('token');
      return false;
    }
    return true;
    // return !this.jwtHelper.isTokenExpired();
  }

  refreshToken(): Observable<any> {
    const refresh_token = localStorage.getItem('refresh_token');
    if (!refresh_token) {
      return of();
    }

    return this.http.post<any>(
      `${environment.apiUrl}/token/refresh`, {refresh_token}, this.CONTEXT)
      .pipe(
        catchError(() => of()),
        tap(data => {
          // const loginSuccessData = data as LoginSuccess;
          this.storeTokens(data.token);
          // this.scheduleTokenRefresh(loginSuccessData.token);
        })
      );
  }

  storeTokens(data: any): void {
    localStorage.setItem('token', data.token);
    // localStorage.setItem('refresh_token', data.refresh_token);
  }
}