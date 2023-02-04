export class TransferenciaDineroModel {
  idTransferenciaDeposito: any;
  idUser: any;
  idClienteNegotis: any;
  idDeSucursal: any;
  idParaSucursal: any;
  monto: any;
  descripcion: any;
  deSucursalParaSucursal: any;
  transExternaParaSucursal: any;
  egresoDeSucursal: any;
  turno:any;
  fechaCracion:any;

  // tslint:disable-next-line:max-line-length
  constructor(idTransferenciaDeposito: any, idUser: any, idClienteNegotis: any, idDeSucursal: any, idParaSucursal: any, monto: any,
     descripcion: any, deSucursalParaSucursal: any, transExternaParaSucursal: any, egresoDeSucursal: any,turno :any,fechaCracion:any) {
    this.idTransferenciaDeposito = idTransferenciaDeposito;
    this.idUser = idUser;
    this.idClienteNegotis = idClienteNegotis;
    this.idDeSucursal = idDeSucursal;
    this.idParaSucursal = idParaSucursal;
    this.monto = monto;
    this.descripcion = descripcion;
    this.deSucursalParaSucursal = deSucursalParaSucursal;
    this.transExternaParaSucursal = transExternaParaSucursal;
    this.egresoDeSucursal = egresoDeSucursal;
    this.turno = turno;
    this.fechaCracion = fechaCracion;
  }
}
