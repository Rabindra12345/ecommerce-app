import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map, tap, catchError, of } from 'rxjs';
import { U } from '@angular/cdk/keycodes';

@Injectable({
  providedIn: 'root',
})
export class Authservice {

  private loggedIn = signal(false);
  private user = signal<string | null>(null);

  constructor(private http: HttpClient,private router: Router) {}

  private accessToken = signal<string | null>(null);

  login1(username: string, password: string): boolean {

    if (username === 'admin' && password === '1234') {
      this.loggedIn.set(true);
      this.user.set(username);
      return true;
    }

    return false;
  }

  login(username: string, password: string) {
    return this.http.post<any>(
      'http://localhost:8080/api/auth/login',
      { username, password },
      { withCredentials: true }
    ).pipe(
      tap(response => {
        this.accessToken.set(response.accessToken);
        this.loggedIn.set(true);
        this.user.set(username);
      }),
      map(response => !!response?.accessToken), 
      catchError(() => {
        this.loggedIn.set(false);
        return of(false);
      })
    );
  }


  getAccessToken():string |null{
    //returning the value not the signal itself
    return this.accessToken();
    // return this.accessToken;
  }

  

  logout() {
    this.loggedIn.set(false);
    this.user.set(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return this.loggedIn();
  }

  // getUsername() {
  //   return this.user()?.toString;
  // }

  getUsername(): string | null {
    return this.user(); 
  }

  // getUsername(): string | null {
  //   return this.user();
  // }
  
}
