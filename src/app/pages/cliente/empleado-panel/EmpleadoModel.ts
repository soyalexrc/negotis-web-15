export class EmpleadoModel {
  idClienteNegotis: any;
  UserName: any;
  Nombre: any;
  Apellido: any;
  CUIL: any;
  pageSize: any;
  page: any;
  idSucursal: any;


  constructor(idClienteNegotis: any, UserName: any, Nombre: any, Apellido: any, CUIL: any, pageSize: any, page: any, idSucursal: any) {
    this.idClienteNegotis = idClienteNegotis;
    this.UserName = UserName;
    this.Nombre = Nombre;
    this.Apellido = Apellido;
    this.CUIL = CUIL;
    this.pageSize = pageSize;
    this.page = page;
    this.idSucursal = idSucursal;
  }
}
