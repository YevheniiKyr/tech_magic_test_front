import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
// import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {DepartmentService} from '../../../services/department.service';
import {FormsModule} from '@angular/forms';
// import
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  imports: [
    // FormsModule,
    NgForOf,
    FormsModule,
    NgIf,
    // ReactiveFormsModule
  ],
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user = {
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    department: '',
  };
  signupFailed = false;
  departments: any[] =[];
  signUpError = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private departmentService: DepartmentService,
  )
  {}

  ngOnInit() {
    this.departmentService.getDepartments().subscribe(
      (response) => {
        this.departments = response;
        console.log(this.departments);
      }
    )
  }

  onSubmit() {
    this.authService.signup(this.user).subscribe(
      (response) => {
        localStorage.setItem('token', response.token); // зберігаємо токен
        return this.router.navigate(['/expenses']);
      },
      (error) => {
        console.error('Signup failed', error);
        this.signupFailed = true;
        this.signUpError = error.error.message;
      }
    );
  }

}

