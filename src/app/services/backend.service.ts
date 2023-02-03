import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Hotel } from '../models/hotel.model';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private readonly http: HttpClient) {}
  
  get hotels(): Observable<Array<Hotel>> {
    return this.http.get<{items: Array<Hotel>}>('http://localhost:3001/hotels').pipe(
      map((response) => response.items.map((hotel, index) => {
        return {
          ...hotel,
          id: index,
          price: Math.floor(Math.random() * (300 - 50 + 1) + 50)
        }
      }))
    )
  }
}
