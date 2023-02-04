import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoGuard implements CanActivate {
  constructor(private router: Router) {

  }

  canActivate() {
    var roles = JSON.parse(localStorage.getItem('roles') ?? '');
    var rolClienteNegotis = localStorage.getItem('RolClienteNegotis');
    var sucursal = JSON.parse(localStorage.getItem('sucursalSeleccionada') ?? '');
    if (sucursal == null) {
      return false;
    }
    let empleados;
    if (roles != null) { empleados = roles.EMPLEADOS; }
    if (empleados == true || rolClienteNegotis == 'true') {
      return true;
    } else {
      return false;
    }
  }
}
