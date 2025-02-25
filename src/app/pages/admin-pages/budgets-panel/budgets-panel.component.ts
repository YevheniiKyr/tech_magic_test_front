import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../../../services/budget.service';
import {CurrencyPipe, NgForOf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MonthNumToStringPipe} from '../../../pipes/month-num-to-string.pipe';

@Component({
  selector: 'app-budgets-panel',
  templateUrl: './budgets-panel.component.html',
  imports: [
    NgForOf,
    FormsModule,
    MonthNumToStringPipe
  ],
  styleUrls: ['./budgets-panel.component.css']
})
export class BudgetComponent implements OnInit {
  departments = ['HR', 'IT', 'Marketing', 'Sales']; // Example departments
  budgets: any[] = [];
  filteredBudgets: any[] = [];
  filters = {
    department: '',
    month: ''
  };

  constructor(private budgetService: BudgetService) {}

  ngOnInit() {
    this.loadBudgets();
  }

  loadBudgets() {
    this.budgetService.getBudgets().subscribe((data) => {
      this.budgets = data;
      this.applyFilters();
    });
  }

  applyFilters() {
    this.filteredBudgets = this.budgets.filter(budget => {
      return (
        (!this.filters.department || budget.department === this.filters.department) &&
        (!this.filters.month || budget.month === this.filters.month)
      );
    });
  }

  editBudget(budget: any) {
    // Logic to edit budget
  }

  deleteBudget(id: any) {
    // this.budgetService.deleteBudget(id).subscribe(() => {
    //   this.loadBudgets();
    // });
  }

  openCreateForm() {
    // Logic to open form for creating new budget
  }
}
