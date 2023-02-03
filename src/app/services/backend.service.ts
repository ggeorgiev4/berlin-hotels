import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HotelsResponse, HotelViewModel, makeHotelViewModel } from '../models/hotel.model';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

    constructor(private readonly http: HttpClient) {}
    
    get hotels(): Observable<Array<HotelViewModel>> {
            return this.http.get<HotelsResponse>('http://localhost:3001/hotels').pipe(
                map((response) => response.items.map((hotel, index) => makeHotelViewModel(hotel, index)))
            )
    }
}
