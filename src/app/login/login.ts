import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Authservice as AuthService} from './authservice';
import { map, tap, catchError, of } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {

  username = '';
  password = '';
  error = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    console.log("ASM ...");
  }


  login(event?: Event) {
  // login() {
    event?.preventDefault();
    console.log("LOGIN CLICKED.");
    return this.auth.login(this.username, this.password).subscribe(success => {
      if (success) {
        this.router.navigate(['/dashboard']);
      } else {
        this.error = true;
      }
    });
    // const success = this.auth.login(this.username, this.password);

    // if (success) {
    //   console.log("ON IF BLOCK");
    //   this.router.navigate(['/dashboard']);
    // } else {
    //   console.log("ON ELSE BLOCK");
    //   this.error = true;
    // }
  }

}
