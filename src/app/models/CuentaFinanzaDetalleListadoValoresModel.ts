export class CuentaFinanzaDetalleListadoValoresModel {
  idClienteNegotis: any;
  fechaIngresoValorDesde: any;
  fechaIngresoValorHasta: any;
  idCliente: any;
  idEstadoVenta: any;
  fechaVencimientoDesde: any;
  fechaVencimientoHasta: any;
  vendidoA: any;

  // tslint:disable-next-line:max-line-length
  constructor(idClienteNegotis: any, fechaIngresoValorDesde: any, fechaIngresoValorHasta: any, idCliente: any, idEstadoVenta: any, fechaVencimientoDesde: any, fechaVencimientoHasta: any, vendidoA: any) {
    this.idClienteNegotis = idClienteNegotis;
    this.fechaIngresoValorDesde = fechaIngresoValorDesde;
    this.fechaIngresoValorHasta = fechaIngresoValorHasta;
    this.idCliente = idCliente;
    this.idEstadoVenta = idEstadoVenta;
    this.fechaVencimientoDesde = fechaVencimientoDesde;
    this.fechaVencimientoHasta = fechaVencimientoHasta;
    this.vendidoA = vendidoA;
  }
}
