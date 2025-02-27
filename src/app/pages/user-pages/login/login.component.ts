import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    FormsModule,
    NgIf
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = {
    email: '',
    password: ''
  };
  loginFailed = false;
  loginError = '';

  constructor(
    private authService: AuthService,
    private router: Router
    )
  {}


  onSubmit() {
    this.authService.login(this.user).subscribe(
      (response) => {
        console.log("Response", response);
        localStorage.setItem('token', response.token); // зберігаємо токен
        if(!response.token) {
          console.log("email or password is invalid");
          return this.router.navigate(['/']);
        }
        return this.router.navigate(['/expenses']);
      },
      (error) => {
        this.loginFailed = true;
        this.loginError = error.error.message;
        console.log('error', error.error);
      }
    );
  }

  protected readonly JSON = JSON;
  protected readonly RegExp = RegExp;
}

