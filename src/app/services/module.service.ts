import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router, CanActivate } from '@angular/router';
import { map } from 'rxjs/operators';
import { BackendResponse } from '../model/getModule';

@Injectable({
  providedIn: 'root',
})
export class ModuleService {

  constructor(private _http: HttpClient, private router: Router) {
   
  }

  getAllModule():Observable<any>{
    return this._http.get(`http://localhost:5000/api/module`)
  }

  getModuleByModuleName(): Observable<any>{
    return this._http.get('http://localhost:5000/api/module/ModuleName');
  }

  getAccountProfile(): Observable<any>{
    return this._http.get('http://localhost:5000/api/module/accountProfile');
  }

  getModuleAndPermission(id: any): Observable<any>{
    return this._http.get(`http://localhost:5000/api/module/getModuleAndPermission?AccountID=${id}`);
  }

  createPermission(data:any): Observable<any>{
    return this._http.post(`http://localhost:5000/api/module/createPermission`, data);
  }

}
