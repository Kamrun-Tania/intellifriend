import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(public authService: AuthService,

    public router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      // Guard for user is login or not
      console.log(this.authService.isAuthenticated());
      if (!this.authService.isAuthenticated()) {
        this.router.navigate(['/authentication/login']);
        return true
      }
      return true
    }
}
