export class GastoModel {
  idGasto: any;
  idUser: any;
  idClienteNegotis: any;
  nombre: any;
  descripcion: any;
  monto: any;
  idSucursal: any;
  idCategoriaGasto: any;
  fechaGasto:any;
  turno: any;
  cliente: any;


  constructor(idGasto: any, idUser: any, idClienteNegotis: any, nombre: any, descripcion: any, monto: any, idSucursal: any,
     idCategoriaGasto: any,fechaGasto:any, turno: any,cliente: any) {
    this.idGasto = idGasto;
    this.idUser = idUser;
    this.idClienteNegotis = idClienteNegotis;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.monto = monto;
    this.idSucursal = idSucursal;
    this.idCategoriaGasto = idCategoriaGasto;
    this.fechaGasto = fechaGasto;
    this.turno = turno;
    this.cliente = cliente;
  }
}
