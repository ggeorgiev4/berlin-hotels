import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BookingFormModel } from '../models/booking-form.model';
import { UnreachableCaseError } from '../models/generics';
import { BookingFormSubmitEventType, BookingFormCloseEventType, BookingFormEventType } from './booking-form.event-model';

@Component({
    selector: 'app-booking-form',
    templateUrl: './booking-form.component.html',
    styleUrls: ['./booking-form.component.scss']
})
export class BookingFormComponent {
    @Input() set hotel(next: string) {
        this.form.controls['hotel'].setValue(next);
    };
    @Output() action = new EventEmitter<any>();
    
    readonly form: FormGroup<BookingFormModel> = new FormGroup<BookingFormModel>({
        email: new FormControl('', { validators: [Validators.required, Validators.email], nonNullable: true}),
        name: new FormControl('', { validators: [Validators.required, Validators.minLength(2)], nonNullable: true}),
        phoneNumber: new FormControl('', { validators: [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(8)], nonNullable: true}),
        hotel: new FormControl('test', { validators: [Validators.required], nonNullable: true }),
    });

    submitted = false;
    
    readonly BookingFormSubmitEventType = BookingFormSubmitEventType;
    readonly BookingFormCloseEventType = BookingFormCloseEventType;
    
    get f() { return this.form.controls; }

    onClick(eventType: BookingFormEventType): void {
        switch(eventType) {
            case BookingFormSubmitEventType:
                this.submitted = true;
                if (!this.form.valid)
                    return;
                return this.action.next({
                    eventType: BookingFormSubmitEventType,
                    form: this.form.getRawValue()
                });
            case BookingFormCloseEventType:
                return this.action.next({
                    eventType: BookingFormCloseEventType,
                });
            default:
                throw new UnreachableCaseError(eventType);
        }
    }
}
