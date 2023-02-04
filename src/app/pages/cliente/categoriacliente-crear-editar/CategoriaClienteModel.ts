export class CategoriaClienteModel {
    idCategoriaCliente: any;
    idUser: any;
    idClienteNegotis: any;
    nombre: any;
    activo: any;
    eliminar: any;   
  
  
    constructor(idCategoriaCliente: any, idUser: any, idClienteNegotis: any, nombre: any, activo: any, eliminar : any) {
      this.idCategoriaCliente = idCategoriaCliente;
      this.idUser = idUser;
      this.idClienteNegotis = idClienteNegotis;
      this.nombre = nombre;
      this.activo = activo;
      this.eliminar = eliminar;
    }
  }
  