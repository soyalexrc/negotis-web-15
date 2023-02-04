import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TransferenciasGuard implements CanActivate {
  canActivate() {
    var roles = JSON.parse(localStorage.getItem('roles') ?? '');
    var rolClienteNegotis = localStorage.getItem('RolClienteNegotis');
    var sucursal = JSON.parse(localStorage.getItem('sucursalSeleccionada') ?? '');
    if (sucursal == null) {
      return false;
    }
    let rolesRol;
    if (roles != null) { rolesRol = roles.TRANSFERENCIAS; }
    if (rolesRol == true || rolClienteNegotis == 'true') {
      return true;
    } else {
      return false;
    }
  }
}
