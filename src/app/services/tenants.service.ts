import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TenantService {

  constructor(private _http: HttpClient) { }

  getAllTenant(): Observable<any>{
    return this._http.get('http://localhost:5000/api/tenant')
  }
  
  deleteTenant(id:number):Observable<any>{
    return this._http.delete(`http://localhost:5000/api/tenant/${id}`)
  }

  createdTenant(data:any): Observable<any>{ 
    console.log('created tenant', data)
    return this._http.post('http://localhost:5000/api/tenant/createTenant', data);
  }

  updateTenant(id:number, data:any): Observable<any>{
    return this._http.put(`http://localhost:5000/api/tenant/${id}`,data)
  }

}
