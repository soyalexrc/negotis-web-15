import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminGuard implements CanActivate {

  constructor(private router: Router) {

  }

  canActivate() {
    let superAdminValue = localStorage.getItem('RolSuperAdmin');
    if (superAdminValue == 'true') {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }

}
