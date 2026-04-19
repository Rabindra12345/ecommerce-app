import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductLayout } from './product-layout/product-layout';
import { ProductDetail } from './product-detail/product-detail';
import { Checkout } from './checkout/checkout';
import { Dashboard } from './dashboard/dashboard';
import { AddProduct } from './dashboard/add-product/add-product';
import {Login} from './login/login.js';
import { authGuard as AuthGuard } from './guards/auth-guard';


export const routes: Routes = [
  { path: 'products/:id', component: ProductDetail }, 
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductLayout, pathMatch: 'full' },
  { path: 'checkout', component: Checkout },
  // { path: 'dashboard', component: Dashboard },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [AuthGuard]
  },
  { path: 'dashboard/add-product', component: AddProduct },
  { path: 'login', component: Login }

];

// export const routes: Routes = [
//   {
//     path: 'products',
//     component: ProductLayout
//   },
//   {
//     path: '',
//     redirectTo: 'products',
//     pathMatch: 'full'
//   },
//   { path: 'products/:id', component: ProductDetail },


// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
