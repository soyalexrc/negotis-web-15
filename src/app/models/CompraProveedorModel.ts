export class CompraProveedorModel {
  idCompra: any;
  idUser: any;
  idClienteNegotis: any;
  idSucursal: any;
  idProveedor: any;
  fechaCompra: any;
  estadoEntrega: any;
  fechaEntrega: any;
  observacion: any;
  articulos!: CompraProveedorArticuloExtendido[];
  datosPago!: CompraProveedorPagoModel;
  tipoComprobante: any;
  numeroComprobante: any;
  tasa: any;
  percepcion: any;
  retencion: any;
  esNotaCredito: any;
  compraAsociadaId: any;
  compraMP :any;
  turno :any;

  totalCompra: any;
  totalPagado: any;
  listaPreciosId: any;
  saldoAFavor: any;
  totalCompra2: any;
  saldoAFavorCompra: any;
}

export class CompraProveedorModelPagedResponse {
  totalItems: any;
  page: any;
  pageSize: any;
  totalCompras: any;
  totalPagado: any;
  lista!: CompraProveedorModel[];
}

export class CompraProveedorArticuloExtendido {
  Id: any;
  Nombre: any;
  CodigoDeBarras: any;
  Cantidad: any;
  Marca: any;
  CantidadPorPack: any;
  PrecioCosto: any;
  Stock: any;
  Kilogramo: any;
  Unidad: any;
  Pesable: any;
  Porcentaje: any;
  PrecioBase: any;
  PrecioCostoCheck: any;
  PrecioFinal: any;
  Precio1:any;
  Precio2:any;
  Precio3:any;
  Precio4:any;
  Precio5:any;
  Precio6:any;
  PrecioXBulto:any;
  Precio7:any;
  Precio8:any;
  Precio9:any;
}

export class CompraProveedorPagoModel {
  //string Forma Pago
  formaPago: any;
  //codigo Forma Pago
  codigoFormaPago: any;
  //string Estado Pago
  estadoPago: any;
  //codigo Estado Pago
  codigoEstadoPago: any;
  //Monto pagado
  monto: any;
}

