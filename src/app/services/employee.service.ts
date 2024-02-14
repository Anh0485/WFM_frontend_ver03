import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router, CanActivate } from '@angular/router';
import { map } from 'rxjs/operators';
import { BackendResponse } from '../model/getModule';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {

  constructor(private _http: HttpClient, private router: Router) {
   
  }
  addEmployee(data: any): Observable<any> {
    console.log('add employee data', data)
    return this._http.post('http://localhost:5000/api/employee/addEmployee', data);
  }
  updateEmployee(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:5000/api/employee/${id}`, data);
  }

  getEmployeeList(): Observable<any> {
    return this._http.get('http://localhost:5000/api/employee');
  }

  getAllRole(): Observable<any>{
    return this._http.get('http://localhost:5000/api/employee/allRole');
  }

  getEmployeeByID(id: number): Observable<any>{
    return this._http.get(`http://localhost:5000/api/employee/${id}`)
  }

  deleteEmployee(id: number): Observable<any> {
    return this._http.delete(`http://localhost:5000/api/employee/${id}`);
  }

  getModulePermission(): Observable<BackendResponse>{
    return this._http.get<BackendResponse>('http://localhost:5000/api/module/permission');
  }
  
}
