import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { Authservice as AuthService} from './authservice';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  username = '';
  password = '';
  error = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  login() {
    const success = this.auth.login(this.username, this.password);

    if (success) {
      this.router.navigate(['/dashboard']);
    } else {
      this.error = true;
    }
  }

}
