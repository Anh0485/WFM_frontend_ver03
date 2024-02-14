import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router, CanActivate } from '@angular/router';
import { map } from 'rxjs/operators';

import { User } from '../model/user';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;
  private apiUrl = 'http://localhost:5000/api/account/login';
  private token: string = '';

  constructor(private http: HttpClient, private router: Router) {
    this.userSubject = new BehaviorSubject(
      JSON.parse(localStorage.getItem('user')!)
    );
    this.user = this.userSubject.asObservable();
  }

  login(data: any) {
    return this.http.post<User>(this.apiUrl, data).pipe(
      map((user) => {
        console.log('login',user)
        localStorage.setItem('token', user.token);
        this.userSubject.next(user);
        return user;
      })
    );
  }

  // login(data:any){
  //   this.http.post(this.apiUrl,data).subscribe((result:any)=>{
  //     console.log(result)
  //     localStorage.setItem("token", result.token);
  //     this.userSubject.next(result);
  //     return result;
  //     // this.router.navigate(["/dashboard/"]);
  //   })
  // }

  logout() {
    return this.http
      .post('http://localhost:5000/api/account/logout', {})
      .subscribe((result: any) => {
        console.log(this.token);
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
        window.location.reload();
      });
  }

  getToken() {
    if (!this.token) {
      this.token = localStorage.getItem('token') ?? '';
    }
    return this.token;
  }
}
