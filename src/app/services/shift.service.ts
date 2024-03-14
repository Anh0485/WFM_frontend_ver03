import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShiftService {

  constructor(private _http: HttpClient) { }

  getAllShift(): Observable<any>{
    return this._http.get('http://localhost:5000/api/shift')
  }

  updateShift(id:number, data:any): Observable<any>{
    return this._http.put(`http://localhost:5000/api/shift/${id}`,data)
  }
  
  createdShift(data:any): Observable<any>{
    return this._http.post('http://localhost:5000/api/shift/createdShift', data)
  }

  deleteShift(id:number):Observable<any>{
    return this._http.delete(`http://localhost:5000/api/shift/${id}`)
  }

  getNumberOfEmployeeOnTime(): Observable<any>{
    return this._http.get('http://localhost:5000/api/shift/workschedule/ontime')
  }
}
