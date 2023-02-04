import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../Service/global.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: HttpClient, private global: GlobalService) { }

  login(value: any) {
    return this.http.post(this.global.urlApi + '/ApiCuenta/Login', value);
  }

  validarToken(value: any) {
    return this.http.get(this.global.urlApi + '/ApiCuenta/Validar/Token?token=' + value);
  }

  crearEditar(value: any) {
    return this.http.post(this.global.urlApi + '/ApiUsuario/Crear/Editar?token=' + localStorage.getItem('token'), value);
  }
  crearEditarEcommerce(value: any) {
    return this.http.post(this.global.urlApi + '/ApiCliente/Crear/EditarEcommerce?token=' + localStorage.getItem('token'), value);
  }

  getListSuperAdmin() {
    return this.http.get(this.global.urlApi + '/ApiUsuario/Get/List/SuperAdmin?token=' + localStorage.getItem('token'));
  }

  getListClientesNegotis() {
    return this.http.get(this.global.urlApi + '/ApiUsuario/Get/List/ClienteNegotis?token=' + localStorage.getItem('token'));
  }

  obtenerTarjetas(value: any) {
    return this.http.get(this.global.urlApi + '/ApiUsuario/Get/Tarjetas?token=' + localStorage.getItem('token'), { params: value });
  }
  obtenerTarjeta(value: any): any {
    return this.http.get(this.global.urlApi + '/ApiUsuario/Get/Tarjeta?token=' + localStorage.getItem('token'), { params: value });
  }

  obtenerTurnos(value: any): any {
    return this.http.get(this.global.urlApi + '/ApiUsuario/Get/Turnos?token=' + localStorage.getItem('token'), { params: value });
  }
  obtenerTurno(value: any): any {
    return this.http.get(this.global.urlApi + '/ApiUsuario/Get/Turno?token=' + localStorage.getItem('token'), { params: value });
  }
  obtenerTodasTarjetas(value: any): any {
    return this.http.get(this.global.urlApi + '/ApiUsuario/Get/todasTarjetas?token=' + localStorage.getItem('token'), { params: value });
  }
  eliminarTarjeta(value: any) {
    return this.http.post(this.global.urlApi + '/ApiUsuario/EliminarTarjeta?token=' + localStorage.getItem('token'), value );
  }
  eliminarTurno(value: any) {
    return this.http.post(this.global.urlApi + '/ApiUsuario/EliminarTurno?token=' + localStorage.getItem('token'), value );
  }
  
  getListEmpleadoByIdClienteNegotis(value: any):any {
    return this.http.get(this.global.urlApi + '/ApiUsuario/Get/ClienteNegotis/Empleados?token=' + localStorage.getItem('token'), { params: value });
  }

  getUserById(value: any):any {
    return this.http.get(this.global.urlApi + '/ApiUsuario/GetById?token=' + localStorage.getItem('token'), { params: value });
  }

  cambiarContraseña(value: any) {
    return this.http.post(this.global.urlApi + '/ApiUsuario/Cambiar/Contraseña?token=' + localStorage.getItem('token'), value);
  }

  bloquearDesbloquar(value: any) {
    return this.http.post(this.global.urlApi + '/ApiUsuario/Bloquear/Desbloquar?token=' + localStorage.getItem('token'), value);
  }

  getInfoUserOtros(value: any) {
    return this.http.get(this.global.urlApi + '/ApiUsuario/GetInfoUserOtros?token=' + localStorage.getItem('token'), { params: value });
  }

  getComision(value: any) {
    return this.http.get(this.global.urlApi + '/ApiUsuario/GetComision?token=' + localStorage.getItem('token'), { params: value });
  }

  saveComision(value: any) {
    return this.http.post(this.global.urlApi + '/ApiUsuario/SaveComision?token=' + localStorage.getItem('token'), value);
  }

  getCotizacionDolar(value: any) {
    return this.http.get(this.global.urlApi + '/ApiUsuario/GetCotizacionDolar?token=' + localStorage.getItem('token'), { params: value });
  }
  saveCotizacionDolar(value: any) {
    return this.http.post(this.global.urlApi + '/ApiUsuario/SaveCotizacionDolar?token=' + localStorage.getItem('token'), value);
  }

  crearEditarTarjeta(value: any) {
    return this.http.post(this.global.urlApi + '/ApiUsuario/Crear/EditarTarjeta?token=' + localStorage.getItem('token'), value);
  }
  crearEditarTurno(value: any) {
    return this.http.post(this.global.urlApi + '/ApiUsuario/Crear/EditarTurno?token=' + localStorage.getItem('token'), value);
  }

  activarDesactivar(value: any) {
    return this.http.post(this.global.urlApi + '/ApiUsuario/activar/desactivar?token=' + localStorage.getItem('token'), value);
  }

  getClienteMostradorStatus(value: any) {
    return this.http.get(this.global.urlApi + '/ApiUsuario/Get/ClienteMostrador/Status?token=' + localStorage.getItem('token'), { params: value });
  }

  cambiarClienteMostradorStatus(value: any) {
    return this.http.post(this.global.urlApi + '/ApiUsuario/Cambiar/ClienteMostrador/Status?token=' + localStorage.getItem('token'), value);
  }

  resetPassword(value: any) {
    return this.http.post(this.global.urlApi + '/ApiUsuario/Reset/Password?token=' + localStorage.getItem('token'), value);
  }

  getMostrarDatosFacturaStatus(value: any) {
    return this.http.get(this.global.urlApi + '/ApiUsuario/Get/MostrarDatosFactura/Status?token=' + localStorage.getItem('token'), { params: value });
  }

  cambiarMostrarDatosFacturaStatus(value: any) {
    return this.http.post(this.global.urlApi + '/ApiUsuario/Cambiar/MostrarDatosFactura/Status?token=' + localStorage.getItem('token'), value);
  }

  getHabilitarAfipStatus(value: any) {
    return this.http.get(this.global.urlApi + '/ApiUsuario/Get/HabilitarAfip/Status?token=' + localStorage.getItem('token'), { params: value });
  }

  cambiarHabilitarAfipStatus(value: any) {
    return this.http.post(this.global.urlApi + '/ApiUsuario/Cambiar/HabilitarAfip/Status?token=' + localStorage.getItem('token'), value);
  }

  delete(value: any) : any{
    return this.http.delete(this.global.urlApi + '/ApiUsuario/Delete?id=' + value + '&token=' + localStorage.getItem('token'));
  }

  deleteClienteNegotis(value: any) : any{
    return this.http.delete(this.global.urlApi + '/ApiUsuario/Delete/ClienteNegotis?id=' + value + '&token=' + localStorage.getItem('token'));
  }

  getListClientesNegotisById(value : any) : any {
    return this.http.get(this.global.urlApi + '/ApiUsuario/Get/Listado/ClienteNegotis?token=' + localStorage.getItem('token'), { params: value });
  }

  guardarMensaje(value : any) {
    return this.http.post(this.global.urlApi + '/ApiUsuario/Guardar/Mensaje?token=' + localStorage.getItem('token'), value);
  }

  getMensaje(value : any) : any {
    return this.http.get(this.global.urlApi + '/ApiUsuario/Get/Mensaje?token=' + localStorage.getItem('token'), { params: value });
  }

  guardarTurno(value : any) {
    return this.http.post(this.global.urlApi + '/ApiUsuario/Guardar/Turno?token=' + localStorage.getItem('token'), value);
  }
  getOcultarLogoStatus(value: any) {
    return this.http.get(this.global.urlApi + '/ApiUsuario/Get/OcultarLogo/Status?token=' + localStorage.getItem('token'), { params: value });
  }
  cambiarOcultarLogoStatus(value: any) {
    return this.http.post(this.global.urlApi + '/ApiUsuario/Cambiar/OcultarLogo/Status?token=' + localStorage.getItem('token'), value);
  }
  getOcultarTelefonoStatus(value: any) {
    return this.http.get(this.global.urlApi + '/ApiUsuario/Get/OcultarTelefono/Status?token=' + localStorage.getItem('token'), { params: value });
  }
  cambiarOcultarTelefonoStatus(value: any) {
    return this.http.post(this.global.urlApi + '/ApiUsuario/Cambiar/OcultarTelefono/Status?token=' + localStorage.getItem('token'), value);
  }
}
