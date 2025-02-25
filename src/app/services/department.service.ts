import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DepartmentService {
  private apiUrl = 'http://localhost:5000/departments';

  constructor(private http: HttpClient) {}

  getDepartments(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createDepartment(department: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, department);
  }

  updateDepartment(department: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${department._id}`, department);
  }

  deleteDepartment(id: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  getBudgetsByDepartmentId(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}/budgets`);
  }

  getDepartmentById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateBudgetByDepartmentId(departmentId: any, editingBudget: any) {
    return this.http.put<any>(`${this.apiUrl}/${departmentId}/budgets/${editingBudget._id}`, editingBudget);

  }

  deleteBudgetByDepartmentId(departmentId: any, budgetId: any) {
    return this.http.delete<any>(`${this.apiUrl}/${departmentId}/budgets/${budgetId}`);

  }

  createBudget(newBudget: any) {
    return this.http.post<any>(`${this.apiUrl}/${newBudget.department}/budgets`, newBudget);

  }
}
