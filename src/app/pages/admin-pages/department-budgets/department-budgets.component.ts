import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DepartmentService} from '../../../services/department.service'
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {MonthNumToStringPipe} from '../../../pipes/month-num-to-string.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-department-budgets',
  imports: [
    NgForOf,
    MonthNumToStringPipe,
    FormsModule,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './department-budgets.component.html',
  styleUrl: './department-budgets.component.css'
})

export class DepartmentBudgetsComponent implements OnInit {
  departmentId!: string;
  budgets!: any;
  department: any;
  editingBudget: any;
  newBudget: any = {
    month: 0,
    year: 0,
    allocatedSum: 0
  };

  constructor(
    private route: ActivatedRoute,
    private departmentService: DepartmentService,
    private router: Router
  ) {
  }

  loadBudgets() {
    this.departmentService.getBudgetsByDepartmentId(this.departmentId).subscribe(
      (data) => {
        this.budgets = Array.isArray(data) ? data : [data];
      },
      (error) => {
        console.error('Помилка при завантаженні бюджетів:', error);
        this.router.navigate(['/departments-panel']); // Якщо сталася помилка, перенаправляємо на логін
      }
    );
  }

  loadDepartment() {
    this.departmentService.getDepartmentById(this.departmentId).subscribe(
      (data) => {
        this.department = data;
      },
      (error) => {
        console.error('Помилка при завантаженні відділу:', error);
      }
    )
  }

  ngOnInit() {
    this.departmentId = this.route.snapshot.paramMap.get('departmentId') || '';
    console.log('Department ID:', this.departmentId);
    this.loadBudgets()
    this.loadDepartment()

  }

  editBudget(budget: any) {
    this.editingBudget = budget;
  }

  deleteBudget(id: any) {
    this.departmentService.deleteBudgetByDepartmentId(this.departmentId, id).subscribe(
      (data) => {
        this.loadBudgets()
      },
      (error) => {
        console.error('Помилка при завантаженні відділу:', error);
      }
    )
  }

  saveEdit() {
    if (!this.editingBudget.allocatedSum) return;
    this.departmentService.updateBudgetByDepartmentId(this.departmentId, this.editingBudget).subscribe(
      (data) => {
        this.loadBudgets()
      },
      (error) => {
        console.error('Помилка при завантаженні відділу:', error);
      }
    )
    this.editingBudget = null;
  }

  cancelEditing() {
    this.editingBudget = null;
  }

  createBudget() {
    if (!this.newBudget.allocatedSum || !this.newBudget.month || !this.newBudget.year) return
    this.newBudget.department = this.departmentId;
    this.departmentService.createBudget(this.newBudget).subscribe(
      (data) => {
        this.loadBudgets()
      },
      (error) => {
        console.error('Помилка при завантаженні відділу:', error);
      }
    )
    this.newBudget = {};
  }
}
