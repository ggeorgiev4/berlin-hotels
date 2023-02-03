import { EventModelWithEventType } from "../models/generics";
import { HotelViewModel } from "../models/hotel.model";

export type HotelCardEventModel = HotelCardBookEventModel;
export type HotelCardEventType = typeof HotelCardBookEventType;


// clicked on Book now button
export interface HotelCardBookEventModel extends EventModelWithEventType {
    readonly eventType: typeof HotelCardBookEventType;
    readonly hotel: HotelViewModel;
}
export const HotelCardBookEventType = 'HotelCardBookEvent';