import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WScheduleService {

  constructor(private _http: HttpClient) { }
  getAllWSchedule(): Observable<any>{
    return this._http.get('http://localhost:5000/api/shift/workschedule')
  }

  createdWShedule(data:any): Observable<any>{
    return this._http.post('http://localhost:5000/api/shift/createdWSchedule', data)
  }

  updatedWSchedule(id:number, data:any):Observable<any>{
    return this._http.put(`http://localhost:5000/api/shift/${id}`,data)
  }

  deleteWSchedule(id:number):Observable<any>{
    return this._http.delete(`http://localhost:5000/api/shift/wschedule/${id}`)
  }

  getTotalWorkHour(startDate: any, endDate: any): Observable<any>{
    return this._http.get(`http://localhost:5000/api/shift/workschedule/totalWorkHour?startDate=${startDate}&endDate=${endDate}`)
  }
}
