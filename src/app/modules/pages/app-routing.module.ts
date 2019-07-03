import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { ContactsComponent } from "./contacts/contacts.component";
import { AboutComponent } from "./about/about.component";
import { CategoriesComponent } from "./categories/categories.component";
import { CategoryComponent } from "./category/category.component";
import { ProductComponent } from "./product/product.component";


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'categories/:id', component: CategoryComponent },
  { path: 'categories/:id/:id', component: ProductComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
