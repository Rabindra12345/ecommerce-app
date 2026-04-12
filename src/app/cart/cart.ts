import { Injectable, signal } from '@angular/core';


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

  addItem(product: { id: number; title: string; price: number; image: string }) {
    this.items.update(current => {
      const existing = current.find(i => i.id === product.id);
      if (existing) {
        return current.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...current, { ...product, quantity: 1, addedAt: Date.now() }];
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
  
}
