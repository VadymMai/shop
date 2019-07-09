import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from "./app-routing.module";
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactsComponent } from './contacts/contacts.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { ComponentsModule } from '../components/components.module';



@NgModule({
  declarations: [HomeComponent, AboutComponent, ContactsComponent, CategoriesComponent, CategoryComponent, ProductComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    ComponentsModule
  ]
})
export class PagesModule { }
