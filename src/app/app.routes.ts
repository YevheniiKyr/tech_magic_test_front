import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './pages/user-pages/login/login.component';
import {ExpensesComponent} from './pages/user-pages/expenses/expenses.component';
import {CreateExpenseComponent} from './pages/user-pages/create-expense/create-expense.component';
import {ExpensesPanelComponent} from './pages/admin-pages/expenses-panel/expenses-panel.component';
import {BudgetComponent} from './pages/admin-pages/budgets-panel/budgets-panel.component';
import {DepartmentsPanelComponent} from './pages/admin-pages/departments-panel/departments-panel.component';
import {SignupComponent} from './pages/user-pages/signup/signup.component';
import {DepartmentBudgetsComponent} from './pages/admin-pages/department-budgets/department-budgets.component';
import {UsersPanelComponent} from './pages/admin-pages/users-panel/users-panel.component';
import {AuthGuard} from './guards/auth.guard';
import {Roles} from './types/user'

export const routes: Routes = [
  {
    path: 'departments-panel',
    component: DepartmentsPanelComponent,
    canActivate: [AuthGuard],
    data: {roles: [Roles.ADMIN]}
  },
  {
    path: 'departments-panel/department/:departmentId/budgets',
    component: DepartmentBudgetsComponent,
    canActivate: [AuthGuard],
    data: {roles: [Roles.ADMIN]}
  },
  {path: 'users-panel', component: UsersPanelComponent, canActivate: [AuthGuard], data: {roles: [Roles.ADMIN]}},
  {path: 'budgets-panel', component: BudgetComponent, canActivate: [AuthGuard], data: {roles: [Roles.ADMIN]}},
  {path: 'expenses-panel', component: ExpensesPanelComponent, canActivate: [AuthGuard], data: {roles: [Roles.ADMIN]}},

  {
    path: 'expenses',
    component: ExpensesComponent,
    canActivate: [AuthGuard],
    data: {roles: [Roles.ADMIN, Roles.EMPLOYEE]}
  },
  {
    path: 'create-expense',
    component: CreateExpenseComponent,
    canActivate: [AuthGuard],
    data: {roles: [Roles.ADMIN, Roles.EMPLOYEE]}
  },

  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
