import { AnonymousSubject } from "rxjs/internal/Subject";

export class PedidoCrearEditarModel {
  idPedido: any;
  idUser: any;
  idClienteNegotis: any;
  idCliente: any;
  idVendedor: any;
  estadoEntrega: any;
  estadoPago: any;
  comision: any;
  estadoConfirmacion: any;
  fechaEntrega: any;
  estadoPreparacion: any;
  prioridad: any;
  estadoPedido: any;
  aumentoLista: any;
  aumentoListaMonto: any;
  aumentoPorcentaje: any;
  aumentoResto: any;
  idSucursalCliente: any;
  articulos: any;
  idSucursalEmpleado: any;
  estadoComision: any;
  observacion: any;
  iva: any;
  cantidadArticulo: any;
  precioTotal: any;
  comisionTotal: any;
  formaPago: any;
  pagoParcial: any;
  fechaPedido: any;
  esNotaCredito: any;
  pedidoAsociadoId: any;
  idTarjeta: any;
  sesionesRealizadas: any;
  sesionesTratamiento: any;
  sesionesTotal:any;
 precioOriginal:any;
  esNotaDebito:any;
  nroCheque:any;
  saldoAFavor:any;
  turno:any;
  tipoSesion: any;
  tipoSesion2: any;
  esPago: any;
  pagoParcial2:any;
  formaPago2:any;
  fechaVencimiento: any;
  nroOperacion:any
  fechaOperacion:any;
  retencion: any;
  

  constructor(idPedido: any, idUser: any, idClienteNegotis: any, idCliente: any, idVendedor: any, estadoEntrega: any, estadoPago: any, comision: any, 
    estadoConfirmacion: any, fechaEntrega: any, estadoPreparacion: any, prioridad: any, estadoPedido: any, aumentoLista: any, aumentoListaMonto: any, aumentoResto: any,
     idSucursalCliente: any, articulos: any, idSucursalEmpleado: any, estadoComision: any, observacion: any, iva: any, cantidadArticulo: any, precioTotal: any, 
     comisionTotal: any, formaPago: any, pagoParcial: any, fechaPedido: any, esNotaCredito: any, pedidoAsociadoId: any, idTarjeta: any,  sesionesRealizadas: any,
     sesionesTratamiento: any,sesionesTotal:any, aumentoPorcentaje: any, precioOriginal: any, esNotaDebito: any,nroCheque:any,saldoAFavor:any,turno:any, 
     tipoSesion:any, tipoSesion2:any, esPago:any, pagoParcial2:any,formaPago2:any, fechaVencimiento:any, nroOperacion:any,fechaOperacion:any,retencion:any) {
    this.idPedido = idPedido;
    this.idUser = idUser;
    this.idClienteNegotis = idClienteNegotis;
    this.idCliente = idCliente;
    this.idVendedor = idVendedor;
    this.estadoEntrega = estadoEntrega;
    this.estadoPago = estadoPago;
    this.comision = comision;
    this.estadoConfirmacion = estadoConfirmacion;
    this.fechaEntrega = fechaEntrega;
    this.estadoPreparacion = estadoPreparacion;
    this.prioridad = prioridad;
    this.estadoPedido = estadoPedido;
    this.aumentoLista = aumentoLista;
    this.aumentoListaMonto = aumentoListaMonto;
    this.aumentoResto = aumentoResto;
    this.idSucursalCliente = idSucursalCliente;
    this.articulos = articulos;
    this.idSucursalEmpleado = idSucursalEmpleado;
    this.estadoComision = estadoComision;
    this.observacion = observacion;
    this.iva = iva;
    this.cantidadArticulo = cantidadArticulo;
    this.precioTotal = precioTotal;
    this.comisionTotal = comisionTotal;
    this.formaPago = formaPago;
    this.pagoParcial = pagoParcial;
    this.fechaPedido = fechaPedido;
    this.esNotaCredito = esNotaCredito;
    this.pedidoAsociadoId = pedidoAsociadoId;
    this.idTarjeta = idTarjeta;
    this.sesionesRealizadas = sesionesRealizadas;
    this.sesionesTratamiento = sesionesTratamiento;
    this.sesionesTotal = sesionesTotal;
    this.aumentoPorcentaje = aumentoPorcentaje;
    this.precioOriginal = precioOriginal;
    this.esNotaDebito = esNotaDebito;
    this.nroCheque = nroCheque;
    this.saldoAFavor = saldoAFavor;
    this.turno = turno;
    this.tipoSesion = tipoSesion;
    this.tipoSesion2 = tipoSesion2;
    this.esPago = esPago;
    this.pagoParcial2 = pagoParcial2;
    this.formaPago2 = formaPago2;
    this.fechaVencimiento = fechaVencimiento;
    this.fechaOperacion = fechaOperacion;
    this.nroOperacion = nroOperacion;
    this.retencion = retencion;
  }
}