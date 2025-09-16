import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly jwtHelper = inject(JwtHelperService);


  isAuthenticated(): boolean {
    if(this.jwtHelper.isTokenExpired()){
      localStorage.removeItem('username');
      localStorage.removeItem('token');
      return false;
    }
    return true;
  }

  storeTokens(data: any): void {
    localStorage.setItem('token', data.token);
  }
}