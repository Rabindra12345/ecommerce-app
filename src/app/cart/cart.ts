import { Injectable, signal } from '@angular/core';

import { CartService } from './cartservice';

import { Authservice } from '../login/authservice';


export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  addedAt?: number; 

}

@Injectable({
  providedIn: 'root',
})
export class Cart {

  items = signal<CartItem[]>([]);

  constructor(private cartService: CartService, private authService: Authservice){
    this.cartService=cartService;
    this.authService=authService;
  }

  addItem1(product: { id: number; title: string; price: number; image: string }) {
    this.items.update(current => {
      const existing = current.find(i => i.id === product.id);
      if (existing) {
        return current.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...current, { ...product, quantity: 1, addedAt: Date.now() }];
    });
  }

  // addItem(product: { id: number; title: string; price: number; image: string }) {
  //   const payload = {
  //     productId: product.id,
  //     quantity: 1
  //   };
  
  //   this.cartService.addToCart(this.userId, payload).subscribe({
  //     next: (res) => {
  //       // backend returns FULL updated cart
  //       const cart = res.data;
  
  //       this.items.set(
  //         cart.items.map(i => ({
  //           id: i.productId,
  //           title: i.productName,
  //           price: i.price,
  //           image: product.image, // FE-only (or move image to backend later)
  //           quantity: i.quantity,
  //           addedAt: Date.now()
  //         }))
  //       );
  //     },
  
  //     error: (err) => {
  //       console.error('Failed to add item to cart', err);
  //     }
  //   });
  // }
  addItem(product: { id: number; title: string; price: number; image: string }) {
    if (!product?.id) {
      console.log("Invalid product");
      return;
    }

    // const userId = Number(localStorage.getItem('userId'));
    const userId = this.authService.getUsername();
    console.log("TOKEN ___________________:)"+this.authService.getAccessToken());
    
    if (!userId) {
      console.log("User not logged in");
      return;
    }
    const payload = {
      productId: String(product.id),
      price:product.price,
      title:product.title,
      quantity: 1
    };
    
  
    this.cartService.addToCart(userId, payload).subscribe({
      next: (res) => {
  
        const cart = res.data;
  
        this.items.set(
          cart.items.map((i: any) => ({
            id: i.productId,
            title: i.productName,
            price: i.price,
            image: product.image,
            quantity: i.quantity,
            addedAt: Date.now()
          }))
        );
      },
  
      error: (err) => {
        console.error('Failed to add item to cart', err);
      }
    });
  }

  


  get totalCount() {
    return this.items().reduce((sum, i) => sum + i.quantity, 0);
  }

  get totalPrice() {
    return this.items().reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2);
  }

  setItems(newItems: CartItem[]) {
    this.items.set(newItems);
  }

  getSections(): { label: string; items: CartItem[] }[] {
    const items = this.items();
  
    const today: CartItem[] = [];
    const recent: CartItem[] = [];
  
    const now = new Date();
  
    items.forEach(item => {
      const addedAt = item.addedAt ?? 0;
      const diffDays = (now.getTime() - addedAt) / (1000 * 60 * 60 * 24);
  
      if (diffDays < 1) {
        today.push(item);
      } else if (diffDays <= 7) {
        recent.push(item);
      }
    });
  
    const sections = [];
    if (today.length) sections.push({ label: 'Added today', items: today });
    if (recent.length) sections.push({ label: 'Added recently', items: recent });
  
    return sections;
  }

  removeItem(id: number) {
    this.items.update(current => current.filter(i => i.id !== id));
  }
  
  updateQuantity(id: number, delta: number) {
    this.items.update(current =>
      current
        .map(i => i.id === id ? { ...i, quantity: i.quantity + delta } : i)
        .filter(i => i.quantity > 0)
    );
  }

  clearCart() {
    this.items.set([]);
  }
  
}
