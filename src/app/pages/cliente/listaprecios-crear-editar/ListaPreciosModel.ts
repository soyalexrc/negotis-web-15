export class ListaPreciosModel {
  idListaPrecios: any;
  idUser: any;
  idClienteNegotis: any;
  porcentajeAumento: any;
  nombre: any;
  activo: any;

  constructor(idListaPrecios: any, idUser: any, idClienteNegotis: any, porcentajeAumento: any, nombre: any, activo: any) {
    this.idListaPrecios = idListaPrecios;
    this.idUser = idUser;
    this.idClienteNegotis = idClienteNegotis;
    this.porcentajeAumento = porcentajeAumento;
    this.nombre = nombre;
    this.activo = activo;
  }
}
