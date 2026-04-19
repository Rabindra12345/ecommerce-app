import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class Authservice {

  private loggedIn = signal(false);
  private user = signal<string | null>(null);

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {

    // STATIC AUTH (for now)
    if (username === 'admin' && password === '1234') {
      this.loggedIn.set(true);
      this.user.set(username);
      return true;
    }

    return false;
  }

  logout() {
    this.loggedIn.set(false);
    this.user.set(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return this.loggedIn();
  }

  getUsername() {
    return this.user();
  }
  
}
