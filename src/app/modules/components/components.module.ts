import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule,
  MatMenuModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatButtonModule,
  MatCardModule
} from '@angular/material';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavMainComponent } from './header/nav-main/nav-main.component';
import { CatCardComponent } from './cat-card/cat-card.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavMainComponent,
    CatCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    LayoutModule,
    MatToolbarModule,
    MatMenuModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MDBBootstrapModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    CatCardComponent
  ]
})
export class ComponentsModule { }
