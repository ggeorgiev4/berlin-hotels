import { EventModelWithEventType } from "../models/generics";
import { HotelViewModel } from "../models/hotel.model";

export type HotelCardEventModel = HotelCardBookEventModel |
                        HotelCardFavoriteEventModel;

export type HotelCardEventType = typeof HotelCardBookEventType |
                                typeof HotelCardFavoriteEventType;


// clicked on Book now button
export interface HotelCardBookEventModel extends EventModelWithEventType {
    readonly eventType: typeof HotelCardBookEventType;
    readonly hotel: HotelViewModel;
}
export const HotelCardBookEventType = 'HotelCardBookEvent';


// clicked on Favorite button
export interface HotelCardFavoriteEventModel extends EventModelWithEventType {
    readonly eventType: typeof HotelCardFavoriteEventType;
    readonly hotel: HotelViewModel;
}
export const HotelCardFavoriteEventType = 'HotelCardFavoriteEvent';