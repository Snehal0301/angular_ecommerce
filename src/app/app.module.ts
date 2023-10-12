import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './containers/navbar/navbar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { DialogModule } from 'primeng/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CarouselComponent } from './containers/carousel/carousel.component';
import { CarouselModule } from '@coreui/angular';
import { CategoryComponent } from './containers/category/category.component';
import { FeaturedComponent } from './containers/featured/featured.component';
import { LatestComponent } from './containers/latest/latest.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CarouselComponent,
    CategoryComponent,
    FeaturedComponent,
    LatestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
    InputTextModule,
    AvatarModule,
    DialogModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    CarouselModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
