import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OvertimeService {

  constructor(private _http: HttpClient) { }
  getAllOT(): Observable<any>{
    return this._http.get('http://localhost:5000/api/overtime')
  }

  getPendingOT(): Observable<any>{
    return this._http.get('http://localhost:5000/api/overtime/pending')
  }

  getApprovedOT(): Observable<any>{
    return this._http.get('http://localhost:5000/api/overtime/approved')
  }

  getRejectOT(): Observable<any>{
    return this._http.get('http://localhost:5000/api/overtime/reject')
  }

  reviewOT(id: number,status:string): Observable<any>{
    return this._http.put(`http://localhost:5000/api/overtime/reviewRequest/${id}`, {Status: status})
  }

  createdOT(data:any): Observable<any>{ 
    return this._http.post('http://localhost:5000/api/overtime/createdOT', data);
  }

  deleteOT(id:number):Observable<any>{
    return this._http.delete(`http://localhost:5000/api/overtime/${id}`)
  }
  

  
}
