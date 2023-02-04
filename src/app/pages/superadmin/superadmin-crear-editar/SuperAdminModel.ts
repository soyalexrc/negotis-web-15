export class SuperAdminModel {
  userName: any;
  nombres: any;
  apellidos: any;
  superAdmin: any;
  password: any;
  idUser: any;
  verSocios: any;


  constructor(userName: any, nombres: any, apellidos: any, superAdmin: any, password: any, idUser: any, verSocios: any) {
    this.userName = userName;
    this.nombres = nombres;
    this.apellidos = apellidos;
    this.superAdmin = superAdmin;
    this.password = password;
    this.idUser = idUser;
    this.verSocios = verSocios;
  }
}
