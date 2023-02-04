import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  //nombre de variables almacenadas en local storage
  //token
  //idUser
  //userName
  //idClienteNegotis
  //RolSuperAdmin
  //RolClienteNegotis
  //RolEmpleado
  //mantenerSesion
  //sucursalSeleccionada
  //roles

  constructor() { }

  // FTP --> ftp://negotis.somee.com/www.negotis.somee.com
  //Login name: esteban_hindu
  //Login password: L1D3rI7_48
  // urlApi: any = 'http://uatnegotis.somee.com/api';
  urlApi: any = environment.apiUrl;
  urlWhatsApp :any =environment.wsUrl;
}
