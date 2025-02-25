import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/user-pages/login/login.component';
import {ExpensesComponent} from './pages/user-pages/expenses/expenses.component';
import {CreateExpenseComponent} from './pages/user-pages/create-expense/create-expense.component';
import {ExpensesPanelComponent} from './pages/admin-pages/expenses-panel/expenses-panel.component';
import {BudgetComponent} from './pages/admin-pages/budgets-panel/budgets-panel.component';
import {DepartmentsPanelComponent} from './pages/admin-pages/departments-panel/departments-panel.component';
import {SignupComponent} from './pages/user-pages/signup/signup.component';
import {DepartmentBudgetsComponent} from './pages/admin-pages/department-budgets/department-budgets.component';
import {UsersPanelComponent} from './pages/admin-pages/users-panel/users-panel.component';

export const routes: Routes = [
  { path: 'departments-panel', component: DepartmentsPanelComponent},
  { path: 'expenses', component: ExpensesComponent },
  { path: 'budgets-panel', component: BudgetComponent },
  { path: 'departments-panel/department/:departmentId/budgets', component: DepartmentBudgetsComponent },
  { path: 'create-expense', component: CreateExpenseComponent },
  { path: 'expenses-panel', component: ExpensesPanelComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'users-panel', component: UsersPanelComponent},
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
