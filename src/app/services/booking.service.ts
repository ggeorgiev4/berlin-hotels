import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BookingFormCloseEventType, BookingFormEventModel, BookingFormSubmitEventType } from '../booking-form/booking-form.event-model';
import { HotelCardEventModel, HotelCardBookEventType } from '../hotel-card/hotel-card.event-model';
import { UnreachableCaseError } from '../models/generics';

type EventModel = HotelCardEventModel | BookingFormEventModel;

@Injectable({
    providedIn: 'root'
})
export class BookingService {
    readonly showBookingForm = new BehaviorSubject<boolean>(false);

    handle(event: EventModel): void {
        console.debug(event);
        switch(event.eventType){
            case HotelCardBookEventType:
                return this.showBookingForm.next(true);
            case BookingFormSubmitEventType:
                return console.debug('TODO Implementation');
            case BookingFormCloseEventType:
                return this.showBookingForm.next(false);
            default:
                // try to remove one of the cases to check this
                throw new UnreachableCaseError(event);
        }
        
    }
}
