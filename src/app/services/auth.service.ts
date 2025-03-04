import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {SignUp} from '../types/signup';
import {jwtDecode} from 'jwt-decode';



interface UserLogin {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/auth'; // API для логіну

  constructor(private http: HttpClient) {}

  login(user: UserLogin): Observable<any> {
    return this.http.post<UserLogin>(`${this.apiUrl}/login`, user);
  }

  signup(user: SignUp): Observable<any> {
    console.log(user)
    return this.http.post<UserLogin>(`${this.apiUrl}/register`, user);

  }

  getCurrentUser() {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const decoded: any = jwtDecode(token);
    return decoded;
  }

}
