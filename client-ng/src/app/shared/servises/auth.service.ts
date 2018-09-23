import { Injectable } from '@angular/core';
import { User } from '../interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  token = null;
  constructor(public httpClient: HttpClient) { }

  register(user: User): Observable<User> {
    return this.httpClient.post<User>('/api/auth/register', user)
  }

  login(user: User): Observable<{ token: string }> {
    return this.httpClient.post<{ token: string }>('/api/auth/login', user)
      .pipe(
        tap(
          ({ token }) => {
            localStorage.setItem('token', token);
            this.setToken(token);
          }
        )
      )
  }

  setToken(token) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }
  isAuthentificated(): boolean {
    return !!this.token;
  }
  logout() {
    this.setToken(null);
    localStorage.clear();
  }





}
