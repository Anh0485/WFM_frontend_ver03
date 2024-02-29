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

  
}
