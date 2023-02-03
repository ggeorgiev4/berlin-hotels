import { FormControl } from "@angular/forms";

export interface BookingFormModel {
    email: FormControl<string>,
    name: FormControl<string>,
    phoneNumber: FormControl<string>,
    hotel: FormControl<string>
}