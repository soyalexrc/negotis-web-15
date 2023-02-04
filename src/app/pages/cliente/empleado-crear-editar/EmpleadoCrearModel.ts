export class EmpleadoCrearModel {
  idUser: any;
  porcentajeComision: any;
  userName: any;
  nombres: any;
  apellidos: any;
  password: any;
  idClienteNegotis: any;
  empleado: any;
  idSucursal: any;
  idRol: any;
  cuil: any;
  telefono: any;
  idCliente: any;
  objetivo: any;

  constructor(idUser: any, porcentajeComision: any, userName: any, nombres: any, apellidos: any, password: any, idClienteNegotis: any, empleado: any, idSucursal: any, idRol: any, cuil: any, telefono: any, idCliente: any, objetivo: any) {
    this.idUser = idUser;
    this.porcentajeComision = porcentajeComision;
    this.userName = userName;
    this.nombres = nombres;
    this.apellidos = apellidos;
    this.password = password;
    this.idClienteNegotis = idClienteNegotis;
    this.empleado = empleado;
    this.idSucursal = idSucursal;
    this.idRol = idRol;
    this.cuil = cuil;
    this.telefono = telefono;
    this.idCliente = idCliente;
    this.objetivo = objetivo;
  }
}
