import { Component } from '@angular/core';
import { Cart as CartService } from '../cart/cart';

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout {
  constructor(public cartService: CartService) { }

  placeOrder() {
    const orderPayload = {
      items: this.cartService.items(),
      total: this.cartService.totalPrice,
      createdAt: new Date()
    };

    console.log("ORDER PLACED:", orderPayload);

    // TODO:
    // call backend API here
    // this.orderService.createOrder(orderPayload)

    // clear cart after success
    this.cartService.clearCart();
  }

}
