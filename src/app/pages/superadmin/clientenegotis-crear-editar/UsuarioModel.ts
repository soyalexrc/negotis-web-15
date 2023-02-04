export class UsuarioModel {
  userName: any;
  razonSocial: any;
  nombreFantasia: any;
  clienteNegotis: any;
  password: any;
  idUser: any;
  cuit: any;
  empleado: any;
  testingUser: any;
  ingresoBruto: any;
  inicioActividad: any;
  condicionImpositiva: any;
  userEcommerce: any;
  baseUrl: any;
  telefono :any;
  email: any;
  gastronomico: any;


  constructor(userName: any, razonSocial: any, nombreFantasia: any, clienteNegotis: any, password: any, idUser: any, cuit: any, empleado: any, testingUser: any,
     ingresoBruto: any, inicioActividad: any, condicionImpositiva: any, userEcommerce: any, baseUrl: any,telefono: any, email: any,gastronomico: any) {
    this.userName = userName;
    this.razonSocial = razonSocial;
    this.nombreFantasia = nombreFantasia;
    this.clienteNegotis = clienteNegotis;
    this.password = password;
    this.idUser = idUser;
    this.cuit = cuit;
    this.empleado = empleado;
    this.testingUser = testingUser;
    this.ingresoBruto = ingresoBruto;
    this.inicioActividad = inicioActividad;
    this.condicionImpositiva = condicionImpositiva;
    this.userEcommerce = userEcommerce;
    this.baseUrl = baseUrl;
    this.telefono = telefono;
    this.email = email;
    this.gastronomico = gastronomico;
  }
}
