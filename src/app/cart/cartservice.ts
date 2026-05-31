import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseUrl = 'http://localhost:8080/api/v1/cart';

  constructor(private http: HttpClient) {
    this.http=http;
  }

  addToCart(userId: string, payload: { productId: string; quantity: number }): Observable<any> {
    console.log("User ID ______________________________:)"+userId);
    return this.http.post<any>(
      `${this.baseUrl}/${userId}/items`,
      payload
    );
  }
}