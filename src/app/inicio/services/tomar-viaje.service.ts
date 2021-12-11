import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TomarViajes } from '../models/tomarViajes';

@Injectable({
  providedIn: 'root'
})
export class TomarViajeService {

  constructor(private http:HttpClient) { }

  postViaje(travel:number, statusTravel:number): Observable<TomarViajes> {
    return this.http.post<TomarViajes>(`api/Travel?travelId=${travel}&statusTravel=${statusTravel + 1}&userOperation=2&cadeteId=${localStorage.getItem('id')}&isReasigned=false&observations=Se%toma%viaje`,travel)
  } 

}
