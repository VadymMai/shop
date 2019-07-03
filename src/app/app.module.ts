import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { PagesModule } from './modules/pages/pages.module';
//import { ComponentsModule } from './modules/components/components.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HeaderComponent} from "./modules/components/header/header.component";
import {FooterComponent} from "./modules/components/footer/footer.component";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    //ComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
