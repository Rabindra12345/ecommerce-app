import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Product {

  products: any[] = [];

  setProducts(data: any[]) {
    this.products = data;
  }

  getProductById(id: string) {
    return this.products.find(p => p.id === id);
  }

  getProducts() {
    return this.products;
  }
  
}
