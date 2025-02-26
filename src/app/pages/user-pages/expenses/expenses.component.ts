import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ExpenseService} from '../../../services/expense.service'; // твій сервіс для витрат
import {jwtDecode} from 'jwt-decode';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {AuthService} from '../../../services/auth.service'; // Бібліотека для декодування JWT

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  imports: [
    DatePipe,
    NgForOf,
    NgIf
  ],
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {
  expenses: any[] = [];

  constructor(
    private expenseService: ExpenseService,
    private router: Router,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    const decodedUser = this.authService.getCurrentUser()
    const userId = decodedUser.id;

    this.expenseService.getExpensesByUser(userId).subscribe(
      (data) => {
        this.expenses = Array.isArray(data) ? data : [data];
        console.log(this.expenses);
      },
      (error) => {
        console.error('Помилка при завантаженні витрат:', error);
        this.router.navigate(['/login']); // Якщо сталася помилка, перенаправляємо на логін
      }
    );
  }
}

