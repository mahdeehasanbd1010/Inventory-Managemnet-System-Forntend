import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private loginPath = 'https://localhost:44326/api/account/login';
  private signUpPath = 'https://localhost:44326/api/account/signup';
  constructor(private http: HttpClient) { }

  public loginToTheServer(login: any): Observable<any>{
    return this.http.post(this.loginPath, login);
  }
  public signUpToTheServer(user: any): Observable<any>{
    return this.http.post(this.signUpPath, user);
  }  
}
