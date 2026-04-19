import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Product {

  private baseUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) {}

  addProduct(product: any): Observable<any> {
    return this.http.post(this.baseUrl, product);
  }
  
}
