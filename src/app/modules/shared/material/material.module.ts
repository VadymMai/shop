import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
} from '@angular/material';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
  ]
})
export class MaterialModule { }
