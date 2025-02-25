import {Component, OnInit} from '@angular/core';
import {ExpenseService} from '../../../services/expense.service';
import {DepartmentService} from '../../../services/department.service';
import {UserService} from '../../../services/user.service';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {ExpenseTypeService} from '../../../services/expense-type.service';

@Component({
  selector: 'app-expenses-panel',
  templateUrl: './expenses-panel.component.html',
  imports: [
    NgForOf,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    DatePipe
  ],
  styleUrls: ['./expenses-panel.component.css']
})
export class ExpensesPanelComponent implements OnInit {
  expenses: any[] = [];
  filteredExpenses: any[] = [];
  departments: any[] = [];
  employees: any[] = [];
  filteredEmployees: any[] = [];
  selectedDepartment: string = '';
  selectedEmployee: string = '';
  editForm!: FormGroup;
  editingExpense: any = null;
  expenseTypes: any[] = [];

  constructor(
    private expenseService: ExpenseService,
    private departmentService: DepartmentService,
    private userService: UserService,
    private expenseTypeService: ExpenseTypeService,

    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.loadExpenses();
    this.loadDepartments();
    this.loadEmployees();
    this.loadExpenseTypes();

    this.editForm = this.fb.group({
      sum: [''],
      date: [''],
      expenseType: ['']
    });
  }

  loadExpenses() {
    this.expenseService.getAllExpenses().subscribe(data => {
      this.expenses = data;
      this.filteredExpenses = data;
    });
  }

  loadExpenseTypes() {
    this.expenseTypeService.getExpenseTypes().subscribe(data => {
      this.expenseTypes = data;
    });
  }

  loadDepartments() {
    this.departmentService.getDepartments().subscribe(data => {
      this.departments = data;
    });
  }

  loadEmployees() {
    this.userService.getUsers().subscribe(data => {
      this.employees = data;
      this.filteredEmployees = data
    });
  }

  filterEmployees() {
    if (this.selectedDepartment !== '') {
      console.log('emp', this.employees[0]);
      this.filteredEmployees = this.employees.filter(emp => emp.department._id === this.selectedDepartment);
      return console.log('Filtered employees', this.filteredEmployees)
    }
    this.filteredEmployees = this.employees

  }

  filterExpenses() {
    let filteredExpenses = this.expenses;
    if (this.selectedEmployee !== '' || this.selectedDepartment !== '') {
      if (this.selectedEmployee !== '') {
        filteredExpenses = this.expenses.filter(exp => exp.employee._id === this.selectedEmployee);
      }
      if (this.selectedDepartment !== '') {
        filteredExpenses = filteredExpenses.filter(exp => exp.department._id === this.selectedDepartment);
      }
      console.log('Filtered expenses', filteredExpenses);
      this.filteredExpenses = filteredExpenses;
      return;
    }
  }

  resetFilters() {
    this.selectedDepartment = '';
    this.selectedEmployee = '';
    this.filteredEmployees = this.employees;
    this.filteredExpenses = this.expenses;
  }

  editExpense(expense: any) {
    this.editingExpense = expense;
    this.editForm.patchValue({
      sum: expense.sum,
      date: new Date(expense.date).toISOString().split('T')[0],
      expenseType: expense.expenseType._id
    });
  }

  saveExpense() {
    if (this.editingExpense) {
      const updatedExpense = {...this.editingExpense, ...this.editForm.value};
      console.log('Date', updatedExpense.date)
      this.expenseService.updateExpense(updatedExpense).subscribe(() => {
        this.loadExpenses();
        this.editingExpense = null;
      });
    }
  }

  deleteExpense(id: any) {
      this.expenseService.deleteExpense(id).subscribe(() => {
        this.loadExpenses();
      });
  }
}
