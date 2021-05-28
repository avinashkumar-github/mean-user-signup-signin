import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  constructor(private http: HttpClient) {}

  create(data: User): Observable<User> {
    return this.http.post(baseUrl, data);
  }
}
