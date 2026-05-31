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
import { Dashboard } from './dashboard/dashboard';
import { AddProduct } from './dashboard/add-product/add-product';
import { Login } from './login/login';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule
} from '@angular/common/http';
import { AuthInterceptor } from './interceptor/authinterceptor.js';

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
@NgModule({
  declarations: [
    App,
    Header,
    Footer,
    ProductLayout,
    ProductDetail,
    CartDrawer,
    Checkout,
    Dashboard,
    AddProduct,
    Login
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [App]
})
export class AppModule {
  
 }
