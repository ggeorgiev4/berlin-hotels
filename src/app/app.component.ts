import { Component, ElementRef, OnDestroy, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { BookingFormEventModel } from './booking-form/booking-form.event-model';
import { HotelCardEventModel } from './hotel-card/hotel-card.event-model';
import { HotelViewModel } from './models/hotel.model';
import { BackendService } from './services/backend.service';
import { BookingService } from './services/booking.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
    @ViewChild(MapInfoWindow, { static: false }) private readonly info!: MapInfoWindow;
    @ViewChildren('hotelCard', { read: ElementRef }) private readonly hotelCards: QueryList<ElementRef> | undefined;
    @ViewChildren(MapMarker) private readonly markers: QueryList<MapMarker> | undefined;

    public options: google.maps.MapOptions = { zoom: 15 };
    public activeHotel!: HotelViewModel;
    public infoContent!: string;
    public hotels: Observable<Array<HotelViewModel>>;

    private readonly destroy = new Subject<void>();
    public showForm: Observable<boolean> = this.bookingService.showBookingForm.pipe(
        takeUntil(this.destroy)
    )

    constructor(private readonly backendService: BackendService,
                private readonly bookingService: BookingService) {
        this.hotels = this.backendService.hotels.pipe(
            tap((hotels) => {
                this.activeHotel = hotels[0];
                this.options.center = hotels[0].position;
            })
        );
    }

    onHotelClick(hotel: HotelViewModel): void {
        if (hotel.id === this.activeHotel.id)
            return;
        
        this.activeHotel = hotel;
        this.infoContent = hotel.title;
        this.options.center = hotel.position;
        
        if (this.markers) {
            const marker = this.markers.toArray()[hotel.id];
            this.info.open(marker);
        }
        
        this.scrollActiveHotelCardIntoView();
    }
    
    private scrollActiveHotelCardIntoView(): void {
        if (!this.hotelCards)
            return;
            
        const activeHotelCard = this.hotelCards.toArray()[this.activeHotel.id];

        if (!activeHotelCard)
            return;

        activeHotelCard.nativeElement.scrollIntoView({behavior: 'smooth', inline: 'center'});
    }

    getMarkerOptions(hotel: HotelViewModel): google.maps.MarkerOptions {
        return {
            icon: hotel.id === this.activeHotel.id ? '../assets/home-icon-active.svg' : '../assets/home-icon.svg'
        }
    }

    get mapHeight(): string {
        return `${window.innerHeight - 70}px`;
    }

    handleCardAction(event: HotelCardEventModel): void {
        this.bookingService.handle(event);
    }

    handleFormAction(event: BookingFormEventModel): void {
        this.bookingService.handle(event);
    }

    ngOnDestroy(): void {
        this.destroy.next();
    }
}
