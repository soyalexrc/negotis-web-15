import {PropiedadModel} from "../models/PropiedadModel";

export enum EstadosPago {TOTAL = 'TOTAL', PARCIAL = 'PARCIAL', CTA_CTE = 'CTA CTE', PENDIENTE = 'PENDIENTE'}
export enum EstadosEntrega {PENDIENTE = 'PENDIENTE', ENTREGADO = 'ENTREGADO', REVISADO_PARCIAL = 'REVISADO PARCIAL', REVISADO = 'REVISADO', RETIRA_PERSONALMENTE = 'RETIRA PERSONALMENTE'}
export enum Prioridades {BAJA = 'BAJA', MEDIA = 'MEDIA', ALTA = 'ALTA'}
export enum FormasPago {EFECTIVO = 'EFECTIVO', TARJETA = 'TARJETA', CTA_CTE = 'CTA CTE', TRANSFERENCIA_BANCARIA = 'TRANSFERENCIA BANCARIA',MERCADO_PAGO = 'MERCADO PAGO', CHEQUE = 'CHEQUE',ECHECK = 'E-CHECK'}
export enum EstadosPedido {ACTIVO = 'ACTIVO', ANULADO = 'ANULADO', CERRADO = 'CERRADO', PENDIENTE = 'PENDIENTE'}

export enum TiposPropiedad { FORMA_PAGO = 'FORMA PAGO', ESTADO_PAGO = 'ESTADO PAGO', ESTADO_ENTREGA = 'ESTADO ENTREGA',
  ESTADO_COMISION = 'ESTADO COMISION', ESTADO_PEDIDO = 'ESTADO PEDIDO', TIPO_COMPROBANTE = 'TIPO COMPROBANTE',
  PRIORIDAD = 'PRIORIDAD', ESTADO_CONFIRMACION = 'ESTADO CONFIRMACION', ESTADO_PREPARACION = 'ESTADO PREPARACION'}

export default class PropertyUtil {

  static getPropertiesByType (tipo: string) {
    const properties: PropiedadModel[] = JSON.parse(localStorage.getItem('properties') ?? '');
    return properties.filter(x => x.Tipo === tipo);
  }

  static getPropertyIdByTypeAndValue (tipo: string, value: string) {
    const properties: any[] = JSON.parse(localStorage.getItem('properties') ?? '');
    return properties.filter(x => x.Tipo === tipo && x.Valor === value).map(y => y.Id)[0];
  }

  static getEstadosPago () {
    const properties: any[] = JSON.parse(localStorage.getItem('properties') ?? '');
    return properties.filter(x => x.Tipo === 'ESTADO PAGO').map(y => y.Valor);
  }

  static getEstadosEntrega () {
    const properties: any[] = JSON.parse(localStorage.getItem('properties') ?? '');
    return properties.filter(x => x.Tipo === 'ESTADO ENTREGA');
  }

  static getFormasPago () {
    const properties: any[] = JSON.parse(localStorage.getItem('properties') ?? '');
    return properties.filter(x => x.Tipo === 'FORMA PAGO').map(y => y.Valor);
  }

  static getEstadosComision () {
    const properties: any[] = JSON.parse(localStorage.getItem('properties') ?? '');
    return properties.filter(x => x.Tipo === 'ESTADO COMISION').map(y => y.Valor);
  }

  static getEstadosPagoPendiente () {
    const properties: any[] = JSON.parse(localStorage.getItem('properties') ?? '');
    return properties.filter(x => x.Tipo === 'ESTADO PAGO PENDIENTE').map(y => y.Valor);
  }

  static getFormasPagoPendiente () {
    const properties: any[] = JSON.parse(localStorage.getItem('properties') ?? '');
    return properties.filter(x => x.Tipo === 'FORMA PAGO PENDIENTE').map(y => y.Valor);
  }

  static getEstadosPedido () {
    const properties: any[] = JSON.parse(localStorage.getItem('properties') ?? '');
    return properties.filter(x => x.Tipo === 'ESTADO PEDIDO').map(y => y.Valor);
  }

  static getTipoComprobante () {
    const properties: any[] = JSON.parse(localStorage.getItem('properties') ?? '');
    return properties.filter(x => x.Tipo === 'TIPO COMPROBANTE').map(y => y.Valor);
  }

  static getEstadoConfirmacion () {
    const properties: any[] = JSON.parse(localStorage.getItem('properties') ?? '');
    return properties.filter(x => x.Tipo === 'ESTADO CONFIRMACION').map(y => y.Valor);
  }

  static getEstadoPreparacion () {
    const properties: any[] = JSON.parse(localStorage.getItem('properties') ?? '');
    return properties.filter(x => x.Tipo === 'ESTADO PREPARACION').map(y => y.Valor);
  }

  static getPrioridades () {
    const properties: any[] = JSON.parse(localStorage.getItem('properties') ?? '');
    return properties.filter(x => x.Tipo === 'PRIORIDAD').map(y => y.Valor);
  }
}
