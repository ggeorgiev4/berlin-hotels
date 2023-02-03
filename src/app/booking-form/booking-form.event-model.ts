import { EventModelWithEventType } from "../models/generics";

export type BookingFormEventModel = BookingFormSubmitEventModel |
                                    BookingFormCloseEventModel;

export type BookingFormEventType = typeof BookingFormSubmitEventType |
                                    typeof BookingFormCloseEventType;


// clicked on Submit now button
export interface BookingFormSubmitEventModel extends EventModelWithEventType {
    readonly eventType: typeof BookingFormSubmitEventType;
    readonly form: any;
}
export const BookingFormSubmitEventType = 'BookingFormSubmitEvent';


// clicked on Close button
export interface BookingFormCloseEventModel extends EventModelWithEventType {
    readonly eventType: typeof BookingFormCloseEventType;
}
export const BookingFormCloseEventType = 'BookingFormCloseEvent';