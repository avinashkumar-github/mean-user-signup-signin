import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';

const baseUrl = 'http://localhost:3000/api/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  selectedUser: User = {
    name: '',
    email: '',
    password: '',
  };

  noAuthHeader = { headers: new HttpHeaders({ NoAuth: 'True' }) };
  constructor(private http: HttpClient) {}

  create(data: User): Observable<User> {
    return this.http.post(baseUrl, data, this.noAuthHeader);
  }

  authenticate(data: User): Observable<User> {
    return this.http.post(baseUrl + '/authenticate', data, this.noAuthHeader);
  }

  getUserProfile(): Observable<User> {
    return this.http.get(baseUrl + '/me');
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getPayload() {
    let token = this.getToken();
    if (!token) {
      return null;
    }
    let userPayload = atob(token.split('.')[1]);
    return JSON.parse(userPayload);
  }

  isLoggedIn() {
    let userPayload = this.getPayload();
    if (userPayload) {
      return userPayload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }
}
