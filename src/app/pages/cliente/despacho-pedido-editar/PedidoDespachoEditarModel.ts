export class PedidoDespachoEditarModel {
  idPedido: any;
  idClienteNegotis: any;
  estadoEntrega: any;
  estadoPago: any;
  estadoConfirmacion: any;
  fechaEntrega: any;
  estadoPreparacion: any;
  prioridad: any;
  estadoPedido: any;
  idSucursalCliente: any;
  observacion: any;


  constructor(idPedido: any, idClienteNegotis: any, estadoEntrega: any, estadoPago: any, estadoConfirmacion: any, fechaEntrega: any, estadoPreparacion: any, prioridad: any, estadoPedido: any, idSucursalCliente: any, observacion: any) {
    this.idPedido = idPedido;
    this.idClienteNegotis = idClienteNegotis;
    this.estadoEntrega = estadoEntrega;
    this.estadoPago = estadoPago;
    this.estadoConfirmacion = estadoConfirmacion;
    this.fechaEntrega = fechaEntrega;
    this.estadoPreparacion = estadoPreparacion;
    this.prioridad = prioridad;
    this.estadoPedido = estadoPedido;
    this.idSucursalCliente = idSucursalCliente;
    this.observacion = observacion;
  }
}
