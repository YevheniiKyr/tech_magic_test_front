import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ExpenseTypeService {
  private apiUrl = 'http://localhost:5000/expense-types'; // API для отримання типів витрат

  constructor(private http: HttpClient) {}

  getExpenseTypes(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
