export class ComisionModel {
  idClienteNegotis: any;
  idEmpleado: any;
  fechaDesde: any;
  fechaHasta: any;
  estadoComision: any;


  constructor(idClienteNegotis: any, idEmpleado: any, fechaDesde: any, fechaHasta: any, estadoComision: any) {
    this.idClienteNegotis = idClienteNegotis;
    this.idEmpleado = idEmpleado;
    this.fechaDesde = fechaDesde;
    this.fechaHasta = fechaHasta;
    this.estadoComision = estadoComision;
  }
}
