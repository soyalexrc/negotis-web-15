import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClienteNegotisEmpleadoGuard implements CanActivate {

  constructor(private router: Router) {

  }

  canActivate() {
    let clienteNegotisValue = localStorage.getItem('RolClienteNegotis');
    let empleadoValue = localStorage.getItem('RolEmpleado');
    if (clienteNegotisValue == 'true' || empleadoValue == 'true') {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }

}
