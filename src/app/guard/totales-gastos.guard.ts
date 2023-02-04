import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TotalesGastosGuard implements CanActivate {
  canActivate() {
    var roles = JSON.parse(localStorage.getItem('roles') ?? '');
    var rolClienteNegotis = localStorage.getItem('RolClienteNegotis');
    var sucursal = JSON.parse(localStorage.getItem('sucursalSeleccionada') ?? '');
    if (sucursal == null) {
      return false;
    }
    let roleUno;
    let roleDos;
    if (roles != null) { roleUno = roles.TOTALES; roleDos = roles.GASTOS }
    if (roleUno == true || roleDos == true || rolClienteNegotis == 'true') {
      return true;
    } else {
      return false;
    }
  }
}
