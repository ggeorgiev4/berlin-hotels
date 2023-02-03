import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BackendService } from './services/backend.service';
import { HotelCardComponent } from './hotel-card/hotel-card.component';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { BookingService } from './services/booking.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HotelCardComponent,
    BookingFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    GoogleMapsModule,
  ],
  providers: [
    BackendService,
    BookingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
