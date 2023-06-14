import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credentials } from '../models/credentials.model';
import { Observable, map, tap } from 'rxjs';
import { FullUserInfo } from '../models/fulluserinfo.model';
import { UserToken } from '../models/user.model';
import { AuthToken } from '../models/authtoken.model';
import { envNet, envLocal } from 'src/env/index';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE_URL = `${envLocal.api}/auth`;

  constructor(private http: HttpClient) {}

  

  logIn(user: Credentials): Observable<AuthToken> {
    const url = `${this.BASE_URL}/login`;
    return this.http.post<AuthToken>(url, user).pipe(
    );
  }

  // public logIn(user: Credentials) {
  //   return this.http.get<Credentials[]>(
  //     this.BASE_URL + `/users` + `?username=${user.email}&password=${user.password}`
  //   ).pipe(
  //     map((users: Credentials[]) => users[0])
  //   )
  // }

  signUp(user: FullUserInfo): Observable<AuthToken> {
    const url = `${this.BASE_URL}/signup`;
    return this.http.post<AuthToken>(url, user).pipe(
    );
  }

  loadFullUser() : Observable<FullUserInfo>{
    const url = `${envLocal.api}/users/me`;
    return this.http.get<FullUserInfo>(url).pipe(
    );
  }

  deleteUser(user:string): Observable<any>{
    const url = `${envLocal.api}/auth/obrisi`;
    return this.http.delete<any>(`${url}/user`);
  }
}
