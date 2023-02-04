export class RubroModel {
  idRubro: any;
  IdUser: any;
  idClienteNegotis: any;
  nombre: any;
  idCategoriaRubro: any;
  codigo: any;  
  activo: any;
  eliminar: any;

  constructor(idRubro: any, IdUser: any, idClienteNegotis: any, nombre: any, idCategoriaRubro: any, codigo: any,  activo: any,eliminar: any) {
    this.idRubro = idRubro;
    this.IdUser = IdUser;
    this.idClienteNegotis = idClienteNegotis;
    this.nombre = nombre;
    this.idCategoriaRubro = idCategoriaRubro;
    this.codigo = codigo;    
    this.activo = activo;
    this.eliminar = eliminar; 
  }
}
