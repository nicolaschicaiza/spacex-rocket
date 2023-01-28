import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { SwiperModule } from 'swiper/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RocketComponent } from './components/rocket/rocket.component';
import { RocketsComponent } from './components/rockets/rockets.component';
import { ImgComponent } from './components/img/img.component';

@NgModule({
    declarations: [
        AppComponent,
        RocketComponent,
        RocketsComponent,
        ImgComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        SwiperModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
