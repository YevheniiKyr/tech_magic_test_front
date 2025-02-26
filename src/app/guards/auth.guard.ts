import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRoles = route.data['roles']; // Отримуємо роль, яка потрібна для доступу
    const user = this.authService.getCurrentUser(); // Отримуємо дані про юзера (наприклад, з localStorage або API)

    if (!user || !expectedRoles.includes(user.role)) {
      this.router.navigate(['/expenses']); // Перенаправлення, якщо роль не підходить
      return false;
    }
    return true;
  }
}
