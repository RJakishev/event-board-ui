import { Injectable, signal } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = environment.apiUrl;
  token = signal<string | null>(localStorage.getItem('token'));

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/auth/login`, { email, password });
  }

  setToken(t: string) {
    this.token.set(t);
    localStorage.setItem('token', t);
  }

  clear() {
    this.token.set(null);
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    return !!this.token();
  }
}
