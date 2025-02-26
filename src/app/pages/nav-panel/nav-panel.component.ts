import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router, RouterLink} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';
import {jwtDecode} from 'jwt-decode';
import {filter} from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './nav-panel.component.html',
  imports: [
    RouterLink,
    NgForOf,
    NgIf
  ],
  styleUrls: ['./nav-panel.component.css']
})
export class NavigationComponent implements OnInit {
  menuItems: { path: string; label: string }[] = [];
  constructor(private router: Router) {}

  ngOnInit() {
    this.getMenu();
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.getMenu());
    console.log(this.menuItems);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if(token) return true;
    return false;
  }

  getUserRole(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const decoded: any = jwtDecode(token);
    return decoded.role;
  }

  getMenu() {
    if (!this.isAuthenticated()) {
      console.log('Not authenticated');
      this.menuItems = []; // Якщо користувач не авторизований, меню порожнє
      return;
    }

    const role = this.getUserRole();
    console.log('Role', role);
     if (role === 'employee' || role === 'admin') {
      this.menuItems = [
        { path: '/expenses', label: 'My expenses' },
        { path: '/create-expense', label: 'Create expense' },
      ];
    }
    if (role === 'admin') {
      this.menuItems = this.menuItems.concat([
        { path: '/expenses-panel', label: 'Expenses' },
        { path: '/budgets-panel', label: 'Budgets' },
        { path: '/departments-panel', label: 'Departments' },
        { path: '/users-panel', label: 'Users' }
      ]);
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.menuItems = []; // При виході очищаємо меню
    this.router.navigate(['/login']);
  }
}
