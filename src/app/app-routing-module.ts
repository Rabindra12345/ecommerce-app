import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductLayout } from './product-layout/product-layout';
import { ProductDetail } from './product-detail/product-detail';
import { Checkout } from './checkout/checkout';


export const routes: Routes = [
  { path: 'products/:id', component: ProductDetail }, 
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductLayout, pathMatch: 'full' },
  { path: 'checkout', component: Checkout }
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
