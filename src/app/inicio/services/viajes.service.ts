import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Viajes } from '../models/viajes';

@Injectable({
  providedIn: 'root'
})
export class ViajesService {

  constructor(private http:HttpClient) { }

  fetchViajes(status:number): Observable<Viajes[]> {
    return this.http.get<Viajes[]>(`api/Travel/2/${status}`)
  } 

}
