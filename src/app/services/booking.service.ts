import { Injectable } from '@angular/core';
import { HotelCardEventModel, HotelCardBookEventType, HotelCardFavoriteEventType } from '../hotel-card/hotel-card.event-model';
import { UnreachableCaseError } from '../models/generics';

@Injectable({
    providedIn: 'root'
})
export class BookingService {
    handle(event: HotelCardEventModel): void {
        console.debug(event);
        switch(event.eventType){
            case HotelCardBookEventType:
                return console.debug('TODO Implementation');
            case HotelCardFavoriteEventType:
                return console.debug('TODO Implementation');
            default:
                // try to remove one of the cases to check this
                throw new UnreachableCaseError(event);
        }
        
    }
}
