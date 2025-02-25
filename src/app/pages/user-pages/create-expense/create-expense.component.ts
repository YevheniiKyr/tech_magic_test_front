import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ExpenseService} from '../../../services/expense.service'; // Сервіс для роботи з витратами
import {ExpenseTypeService} from '../../../services/expense-type.service'; // Сервіс для отримання типів витрат
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {jwtDecode} from 'jwt-decode';
import { Expense } from '../../../types/expense'

@Component({
  selector: 'app-create-expense',
  templateUrl: './create-expense.component.html',
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf
  ],
  styleUrls: ['./create-expense.component.css']
})
export class CreateExpenseComponent implements OnInit {
  expenseForm!: FormGroup; // Форма для витрати
  expenseTypes: any[] = []; // Список видів витрат
  loading = false;
  userId!: string;
  department!: string;

  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private expenseTypeService: ExpenseTypeService,
    private router: Router
  ) {
  }

  ngOnInit(): void {

    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token); // декодуємо токен
      this.userId = decoded.id; // Отримуємо id користувача з токену
      this.department = decoded.department;
      // Створення форми з валідацією
      this.expenseForm = this.fb.group({
        type: ['', Validators.required], // Вибір виду витрати
        sum: ['', [Validators.required, Validators.min(1)]], // Сума витрати
        date: ['', Validators.required], // Дата витрати
      });

      // Отримуємо типи витрат через сервіс
      this.expenseTypeService.getExpenseTypes().subscribe(
        (data) => {
          this.expenseTypes = data;
        },
        (error) => {
          console.error('Помилка при отриманні типів витрат:', error);
        }
      );
    } else {
      this.router.navigate(['/login']); // Якщо токен не знайдений, перенаправляємо на логін
    }
  }

  // Метод для відправки форми
  onSubmit(): void {
    if (this.expenseForm.invalid) {
      return; // Якщо форма некоректна, зупиняємо відправку
    }

    this.loading = true;
    const expenseData = this.expenseForm.value;

    const expense: Expense = {
      expenseType: expenseData.type,
      date: expenseData.date,
      sum: expenseData.sum,
      employee: this.userId,
      department: this.department,
    }

    this.expenseService.createExpense(expense).subscribe(
      (response) => {
        console.log('Витрату успішно створено!', response);
        this.router.navigate(['/expenses']); // Перенаправляємо на сторінку витрат
      },
      (error) => {
        console.error('Помилка при створенні витрати:', error);
        this.loading = false;
      }
    );
  }
}
