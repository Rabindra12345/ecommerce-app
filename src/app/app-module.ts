import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { ProductLayout } from './product-layout/product-layout';
import { ProductDetail } from './product-detail/product-detail';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CartDrawer } from './cart-drawer/cart-drawer';
import { FormsModule } from '@angular/forms';
import { Checkout } from './checkout/checkout';



@NgModule({
  declarations: [
    App,
    Header,
    Footer,
    ProductLayout,
    ProductDetail,
    CartDrawer,
    Checkout
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    FormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay()),
  ],
  bootstrap: [App]
})
export class AppModule {
  
 }
