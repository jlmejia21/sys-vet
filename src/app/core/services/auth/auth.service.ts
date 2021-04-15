import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';
import { TokenService } from '../token/token.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { UsersService } from '../users.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {



  constructor(
    private http: HttpClient,
    private router: Router,
    private token: TokenService,
    private usersService: UsersService
  ) { }

  loginUser(username: string, password: string) {
    // if (email === password) {
    //   this.isLoggedIn = true;
    //   this.token.saveToken('1324654564545612456');
    //   return observableOf(true);
    // }
    // return observableOf(false);
    return this.http.post(`${environment.url_api}/users/login`, { username, password })
      .pipe(
        tap((rpta: any) => {
          if (rpta.status === "success") {
            this.token.saveToken(JSON.stringify(rpta.user));
          }
        })
      )
  }

  logout() {
    this.token.removeToken();
    this.router.navigate(['./auth/login']);
  }


  hasUser() {
    console.log(this.token.getToken());
    return observableOf(this.token.getToken() !== null);
  }


}
