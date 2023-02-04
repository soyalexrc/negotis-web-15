import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClientenegotisGuard implements CanActivate {
  canActivate() {
    var rolClienteNegotis = localStorage.getItem('RolClienteNegotis');
    if (rolClienteNegotis == 'true') {
      return true;
    } else {
      return false;
    }
  }
}
