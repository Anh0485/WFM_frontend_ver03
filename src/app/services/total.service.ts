import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TotalService {

    constructor(private _http: HttpClient) { }
    getAllWSchedule(): Observable<any>{
      return this._http.get('http://localhost:5000/api/shift/workschedule')
    }
  
    getTotalAgent():Observable<any>{
        return this._http.get('http://localhost:5000/api/total/totalAgent')
    }

    getTotalSupervisor():Observable<any>{
      return this._http.get('http://localhost:5000/api/total/totalSupervisor')
    }

    getTotalWorkHourandOvertimeHour(startDate:any, endDate:any):Observable<any>{
      return this._http.get(`http://localhost:5000/api/total/getTotalWorkHourandOvertimeHour?startDate=${startDate}&endDate=${endDate}`)
    }
    
  
  }
  