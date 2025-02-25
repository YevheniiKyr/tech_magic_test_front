import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expense } from '../types/expense'


@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  getExpensesByUser(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/${userId}/expenses`);
  }

  createExpense(expenseData: Expense): Observable<any> {
    console.log(expenseData);
    return this.http.post<any>(`${this.apiUrl}/expenses`, expenseData);
  }

  getAllExpenses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/expenses`);
  }

  updateExpense(expense: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/expenses/${expense._id}`, expense);
  }

    deleteExpense(id: any): Observable<any> {
      return this.http.delete(`${this.apiUrl}/expenses/${id}`);
    }
}
