import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router, CanActivate } from '@angular/router';
import { map } from 'rxjs/operators';
import { BackendResponse } from '../model/getModule';

@Injectable({
  providedIn: 'root',
})
export class AccountService {

  constructor(private _http: HttpClient, private router: Router) {
   
  }

  getAllAccount():Observable<any>{
    return this._http.get(`http://localhost:5000/api/account`)
  }

}
