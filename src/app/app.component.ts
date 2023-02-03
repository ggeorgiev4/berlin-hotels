import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Observable, tap } from 'rxjs';
import { Hotel } from './models/hotel.model';
import { BackendService } from './services/backend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChildren('hotelCard', { read: ElementRef }) private readonly hotelCards: QueryList<ElementRef> | undefined;
  @ViewChild(MapInfoWindow, { static: false }) private readonly info!: MapInfoWindow;
  @ViewChildren(MapMarker) private readonly markers: QueryList<MapMarker> | undefined;
  @ViewChild('hotelCardsWrapper') private readonly hotelCardsWrapper: ElementRef<HTMLDivElement> | undefined;

  public options: google.maps.MapOptions = { zoom: 15 };
  public activeHotel!: number;
  public infoContent!: string;
  public hotels: Observable<Array<Hotel>>;

  constructor(private readonly backendService: BackendService) {
    this.hotels = this.backendService.hotels.pipe(
      tap((hotels) => {
        this.options.center = hotels[0].position;
      }),
    );
  }

  hotelClick(hotelId: number, title: string, position: google.maps.MapOptions['center']): void {
    if (hotelId === this.activeHotel)
      return;

    this.activeHotel = hotelId;
    this.infoContent = title;
    this.options.center = position;
    const marker = this.markers?.toArray()[hotelId];
    this.info.open(marker);

    if (this.hotelCards && this.hotelCardsWrapper) {
      console.log('scrollLeft: ', this.hotelCardsWrapper.nativeElement.scrollLeft)
      console.log(this.hotelCards.toArray()[this.activeHotel].nativeElement.getBoundingClientRect())
      this.hotelCards.toArray()[this.activeHotel].nativeElement.scrollIntoView({behavior: 'smooth', inline: 'center'});


      // const elementRect = this.hotelCards.toArray()[this.activeHotel].nativeElement.getBoundingClientRect();
      // const absoluteElementLeft = elementRect.left + window.pageXOffset;
      // const middle = absoluteElementLeft - (elementRect.width / 2);
      // console.log(middle);
      // this.hotelCardsWrapper.nativeElement.scrollTo(middle, 0);
    }
  }

  getMarkerOptions(hotel: Hotel): google.maps.MarkerOptions {
    return {
      icon: hotel.id === this.activeHotel ? '../assets/home-icon-active.svg' : '../assets/home-icon.svg'
    }
  }

  get mapHeight(): string {
    return window.innerHeight - 70 + 'px'
  }
}
