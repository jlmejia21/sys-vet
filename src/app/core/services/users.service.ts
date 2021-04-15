import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get<User[]>(`${environment.url_api}/users`);
    // .pipe(
    //   catchError(this.handleError),
    // );
  }

  getUserTypes(typeUserId: number) {
    return this.http.get<any[]>(`${environment.url_api}/users/userType/${typeUserId}`)
    // .pipe(
    //   catchError(this.handleError),
    // );
  }
  getUser(id: number) {
    return this.http.get(`${environment.url_api}/users/${id}`)
    // .pipe(
    //   catchError(this.handleError),
    // );
  }
  createUser(user: Partial<User>) {
    return this.http.post(`${environment.url_api}/users`, user)
    // .pipe(
    //   catchError(this.handleError),
    // );
  }

  updateUser(user: User) {
    return this.http.put(`${environment.url_api}/users`, user)
    // .pipe(
    //   catchError(this.handleError),
    // );
  }

  deleteUser(id: number) {
    return this.http.delete(`${environment.url_api}/users/${id}`)
    // .pipe(
    //   catchError(this.handleError),
    // );
  }

}
