import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';
import { TokenService } from '../token/token.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  isLoggedIn = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private token: TokenService
  ) { }

  loginUser(email: string, password: string): Observable<boolean> {
    if (email === password) {
      this.isLoggedIn = true;
      this.token.saveToken('1324654564545612456');
      return observableOf(true);
    }
    return observableOf(false);
  }

  logout() {
    this.token.removeToken();
    this.router.navigate(['./auth/login']);
  }


  hasUser() {
    console.log(this.isLoggedIn);
    console.log(this.token.getToken());
    return observableOf(this.isLoggedIn || this.token.getToken() !== null);
  }


}
