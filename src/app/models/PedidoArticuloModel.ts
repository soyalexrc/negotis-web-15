import { IModel } from "./Interfaces/IModel";

export class PedidoArticuloModel implements IModel {
  idArticulo: any;
  cantidad: any;
  precioBase: any;
  precioUnidad: any;
  precioFinal: any;
  descuentoPorcentaje: any;
  descuentoMonto: any;
  unidad: any;
  pesable: any;
  kilogramo: any;
  litro: any;
  metro: any;
  precioCosto: any;
  pendiente: any;
  entrega: any;
  observacion: any;
  cantRecalculo:any;


  constructor(idArticulo: any, cantidad: any, precioBase: any,precioUnidad: any,
              precioFinal: any, descuentoPorcentaje: any, descuentoMonto: any,
              unidad: any, kilogramo: any,pesable: any, precioCosto: any, pendiente: any, litro: any, metro: any, entrega: any, observacion: any,cantRecalculo: any) {
    this.idArticulo = idArticulo;
    this.cantidad = cantidad;
    this.precioBase = precioBase;
    this.precioUnidad= precioUnidad;
    this.precioFinal = precioFinal;
    this.descuentoPorcentaje = descuentoPorcentaje;
    this.descuentoMonto = descuentoMonto;
    this.unidad = unidad;
    this.pesable= pesable;
    this.kilogramo = kilogramo;
    this.precioCosto = precioCosto;
    this.pendiente = pendiente;
    this.litro = litro;
    this.metro = metro;
    this.entrega = entrega;
    this.observacion = observacion;
    this.cantRecalculo = cantRecalculo;

  }

  Check(value: any): boolean {
    if (!('idArticulo' in value)) { return false; }
    if (!('cantidad' in value)) { return false; }
    if (!('precioBase' in value)) { return false; }
    if (!('precioUnidad' in value)) { return false; }
    if (!('precioFinal' in value)) { return false; }
    if (!('descuentoPorcentaje' in value)) { return false; }
    if (!('descuentoMonto' in value)) { return false; }
    if (!('unidad' in value)) { return false; }
    if (!('kilogramo' in value)) { return false; }
    if (!('pesable' in value)) { return false; }
    if (!('precioCosto' in value)) { return false; }
    if (!('pendiente' in value)) { return false; }
    if (!('cantRecalculo' in value)) { return false; }
    return true;
  }

  FromObject(value: any) {
    if (this.Check(value)) {
      this.idArticulo = value.idArticulo;
      this.cantidad = value.cantidad;
      this.precioBase = value.precioBase;
      this.precioUnidad = value.precioUnidad;
      this.precioFinal = value.precioFinal;
      this.descuentoPorcentaje = value.descuentoPorcentaje;
      this.descuentoMonto = value.descuentoMonto;
      this.unidad = value.unidad;
      this.pesable=value.pesable;
      this.kilogramo = value.kilogramo;
      this.precioCosto = value.precioCosto;
      this.pendiente = value.pendiente;
      this.cantRecalculo = value.cantRecalculo;
    }
  }

}
