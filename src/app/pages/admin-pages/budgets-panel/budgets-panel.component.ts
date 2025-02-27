import {Component, OnInit} from '@angular/core';
import {BudgetService} from '../../../services/budget.service';
import {CurrencyPipe, NgForOf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MonthNumToStringPipe} from '../../../pipes/month-num-to-string.pipe';
import {DepartmentService} from '../../../services/department.service';
import {Department} from '../../../types/department'

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
  departments: any[] = []; // Example departments
  budgets: any[] = [];
  filteredBudgets: any[] = [];
  filters: {department: Department | null, period: string | null} = {
    department: null,
    period: null
  };

  constructor(
    private budgetService: BudgetService,
    private departmentService: DepartmentService
  ) {
  }

  ngOnInit() {
    this.loadBudgets();
    this.loadDepartments();
  }

  loadBudgets() {
    this.budgetService.getBudgets().subscribe(
      (data) => {
        this.budgets = data;
        this.filteredBudgets = this.budgets;
      },
      (error) => {
        console.log('Error while fetching budgets', error);
      });
  }

  loadDepartments() {
    this.departmentService.getDepartments().subscribe(
      (data) => {
        this.departments = data;
      },
      (error) => {
        console.log('Error while fetching departments', error);
      })
  }

  getMonth(period: string) {
    return period.substring(6,  period.length);
  }

  getYear(period: string) {
    return period.substring(0, 4);
  }

  applyFilters() {

    this.filteredBudgets = this.budgets.filter(budget => {
      if(this.filters.period) console.log(this.getMonth(this.filters.period))
      if(this.filters.period) console.log(this.getYear(this.filters.period))

      return (
        (!this.filters.department || budget.department._id === this.filters.department) &&
        (!this.filters.period || (budget.month == this.getMonth(this.filters.period) && budget.year == this.getYear(this.filters.period)))
      )
    });
  }



  resetFilters() {
    this.filters.department = null;
    this.filters.period = null;
    this.filteredBudgets = this.budgets
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
