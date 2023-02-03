import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UnreachableCaseError } from '../models/generics';
import { HotelViewModel } from '../models/hotel.model';
import { HotelCardBookEventType, HotelCardEventModel, HotelCardEventType, HotelCardFavoriteEventType } from './hotel-card.event-model';

@Component({
    selector: 'app-hotel-card',
    templateUrl: './hotel-card.component.html',
    styleUrls: ['./hotel-card.component.scss']
})
export class HotelCardComponent {
    @Input() hotel!: HotelViewModel;
    @Output() action = new EventEmitter<HotelCardEventModel>();

    readonly HotelCardBookEventType = HotelCardBookEventType;
    readonly HotelCardFavoriteEventType = HotelCardFavoriteEventType;

    onClick(eventType: HotelCardEventType): void {
        switch(eventType) {
            case HotelCardBookEventType:
                return this.action.next({
                    eventType: HotelCardBookEventType,
                    hotel: this.hotel
                });
            case HotelCardFavoriteEventType:
                return this.action.next({
                    eventType: HotelCardFavoriteEventType,
                    hotel: this.hotel
                });
            default:
                throw new UnreachableCaseError(eventType);
        }

    }
}
