import {IModel} from '../../../models/Interfaces/IModel';

export class PedidoFiltroModel implements IModel {
    idClienteNegotis: any = '';
    idUser: any;
    idVendedor: any = '';
    vendedor: any = '';
    idCliente: any = '';
    cliente: any = '';
  idSucursalEmpresa: any = '';
    idSucursalCliente: any = '';
    estadoEntrega: any = '';
    estadoPago: any = '';
    estadoComision: any = '';
    estadoConfirmacion: any = '';
    fechaDesde: any = '';
    fechaHasta: any = '';
    fechaTipoEntrega: any = '';
    fechaTipoVta: any = '';
    estadoPreparacion: any = '';
    prioridad: any = '';
    estadoPedido: any = '';
    idZona: any = '';
    zona: any = '';
    idRegion: any = '';
    region: any = '';
    formaPago: any = '';
    multiple: any = '';
    tipoComprobante: any = '';
    page: any = '';
    pageSize: any = '';
    flagbusqueda: number ;
    filtroPedidosHabilitado: any ;
    origenPedido: any;
    tarjeta: any;
    estadoEntregas: any;
    turno:any;
    cancelarPedidos:any;
    filtroFactura: any;
    fechaVencimiento: any;
    verPagos:any;

  constructor(idClienteNegotis: any, idUser: any, idVendedor: any, vendedor: any, idCliente: any, cliente: any, idSucursalEmpresa: any, idSucursalCliente: any,
     estadoEntrega: any, estadoPago: any, estadoComision: any, estadoConfirmacion: any, fechaDesde: any, fechaHasta: any, fechaTipoEntrega: any,
      fechaTipoVta: any, estadoPreparacion: any, prioridad: any, estadoPedido: any, idZona: any, zona: any, idRegion: any, region: any, formaPago: any, 
      multiple: any, tipoComprobante: any, page: any, pageSize: any, flagbusqueda: number, filtroPedidosHabilitado: any, origenPedido: any, tarjeta: any
      ,estadoEntregas: any, turno:any, cancelarPedidos:any, filtroFactura: any, fechaVencimiento: any,verPagos:any) {
    this.idClienteNegotis = idClienteNegotis;
    this.idUser = idUser,
    this.idVendedor = idVendedor;
    this.vendedor = vendedor;
    this.idCliente = idCliente;
    this.cliente = cliente;
    this.idSucursalEmpresa = idSucursalEmpresa;
    this.idSucursalCliente = idSucursalCliente;
    this.estadoEntrega = estadoEntrega;
    this.estadoPago = estadoPago;
    this.estadoComision = estadoComision;
    this.estadoConfirmacion = estadoConfirmacion;
    this.fechaDesde = fechaDesde;
    this.fechaHasta = fechaHasta;
    this.fechaTipoEntrega = fechaTipoEntrega;
    this.fechaTipoVta = fechaTipoVta;
    this.estadoPreparacion = estadoPreparacion;
    this.prioridad = prioridad;
    this.estadoPedido = estadoPedido;
    this.idZona = idZona;
    this.zona = zona;
    this.idRegion = idRegion;
    this.region = region;
    this.formaPago = formaPago;
    this.multiple = multiple;
    this.tipoComprobante = tipoComprobante;
    this.page = page;
    this.pageSize = pageSize;
    this.flagbusqueda = flagbusqueda;
    this.filtroPedidosHabilitado = filtroPedidosHabilitado;
    this.origenPedido = origenPedido;
    this.tarjeta = tarjeta;
    this.estadoEntregas = estadoEntregas;
    this.turno = turno;
    this.cancelarPedidos = cancelarPedidos;
    this.filtroFactura = filtroFactura;
    this.fechaVencimiento = fechaVencimiento;
    this.verPagos = verPagos;
  }

  public getEntity() {
    return new PedidoFiltroModel(
      this.idClienteNegotis,
      this.idUser,
      this.idVendedor,
      this.vendedor,
      this.idCliente,
      this.cliente,
      this.idSucursalEmpresa,
      this.idSucursalCliente,
      this.estadoEntrega,
      this.estadoPago,
      this.estadoComision,
      this.estadoConfirmacion,
      this.fechaDesde,
      this.fechaHasta,
      this.fechaTipoEntrega,
      this.fechaTipoVta,
      this.estadoPreparacion,
      this.prioridad,
      this.estadoPedido,
      this.idZona,
      this.zona,
      this.idRegion,
      this.region,
      this.formaPago,
      this.multiple,
      this.tipoComprobante,
      this.page,
      this.pageSize,
      this.flagbusqueda,
      this.filtroPedidosHabilitado,
      this.origenPedido,
      this.tarjeta,
      this.estadoEntregas,
      this.turno,
      this.cancelarPedidos,
      this.filtroFactura,
      this.fechaVencimiento,
      this.verPagos
    );
  }

  FromObject(value: any) {
        if ('idVendedor' in value) { this.idVendedor = value.idVendedor; }
        if ('idUser' in value) { this.idUser = value.idUser; }
        if ('vendedor' in value) { this.vendedor = value.vendedor; }
        if ('idCliente' in value) { this.idCliente = value.idCliente; }
        if ('cliente' in value) { this.cliente = value.cliente; }
        if ('idSucursalCliente' in value) { this.idSucursalCliente = value.idSucursalCliente; }
        if ('estadoEntrega' in value) { this.estadoEntrega = value.estadoEntrega; }
        if ('estadoPago' in value) { this.estadoPago = value.estadoPago; }
        if ('estadoComision' in value) { this.estadoComision = value.estadoComision; }
        if ('estadoConfirmacion' in value) { this.estadoConfirmacion = value.estadoConfirmacion; }
        if ('fechaDesde' in value) { this.fechaDesde = value.fechaDesde; }
        if ('fechaHasta' in value) { this.fechaHasta = value.fechaHasta; }
        if ('fechaTipoEntrega' in value) { this.fechaTipoEntrega = value.fechaTipoEntrega; }
        if ('fechaTipoVta' in value) { this.fechaTipoVta = value.fechaTipoVta; }
        if ('estadoPreparacion' in value) { this.estadoPreparacion = value.estadoPreparacion; }
        if ('prioridad' in value) { this.prioridad = value.prioridad; }
        if ('estadoPedido' in value) { this.estadoPedido = value.estadoPedido; }
        if ('idZona' in value) { this.idZona = value.idZona; }
        if ('zona' in value) { this.zona = value.zona; }
        if ('idRegion' in value) { this.idRegion = value.idRegion; }
        if ('region' in value) { this.region = value.region; }
        if ('formaPago' in value) { this.formaPago = value.formaPago; }
        if ('multiple' in value) { this.multiple = value.multiple; }
        if ('tipoComprobante' in value) { this.tipoComprobante = value.tipoComprobante; }
        if ('flagbusqueda' in value) { this.flagbusqueda = value.flagbusqueda; }
    }

    Check(value: any): boolean {
        if (!('idVendedor' in value)) { return false; }
        if (!('idUser' in value)) { return false; }
        if (!('idCliente' in value)) { return false; }
        if (!('idSucursalCliente' in value)) { return false; }
        if (!('estadoEntrega' in value)) { return false; }
        if (!('estadoPago' in value)) { return false; }
        if (!('estadoComision' in value)) { return false; }
        if (!('estadoConfirmacion' in value)) { return false; }
        if (!('fechaDesde' in value)) { return false; }
        if (!('fechaHasta' in value)) { return false; }
        if (!('fechaTipoEntrega' in value)) { return false; }
        if (!('fechaTipoVta' in value)) { return false; }
        if (!('estadoPreparacion' in value)) { return false; }
        if (!('prioridad' in value)) { return false; }
        if (!('estadoPedido' in value)) { return false; }
        if (!('idZona' in value)) { return false; }
        if (!('idRegion' in value)) { return false; }
        if (!('formaPago' in value)) { return false; }
        if (!('multiple' in value)) { return false; }
        if (!('tipoComprobante' in value)) { return false; }
        if (!('flagbusqueda' in value)) { return false; }

        return true;
    }
}
