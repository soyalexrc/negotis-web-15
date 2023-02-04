import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductoGuard implements CanActivate {
  constructor(private router: Router) {

  }

  canActivate() {
    var roles = JSON.parse(localStorage.getItem('roles') ?? '');
    var rolClienteNegotis = localStorage.getItem('RolClienteNegotis') ?? '';
    var sucursal = JSON.parse(localStorage.getItem('sucursalSeleccionada') ?? '');
    if (sucursal == null) {
      return false;
    }
    let productos;
    let atajo;
    if (roles != null) { productos = roles.PRODUCTOS; atajo = roles.VisualizarListaArticulos; }
    if (productos == true || rolClienteNegotis == 'true' || atajo == true) {
      return true;
    } else {
      return false;
    }

  }
}
