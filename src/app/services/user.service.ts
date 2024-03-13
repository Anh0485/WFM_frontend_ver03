import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {
    constructor(private _http: HttpClient) { }
    getUserProfile(): Observable<any>{
      return this._http.get('http://localhost:5000/api/user/getUserProfile')
    }
  }
  