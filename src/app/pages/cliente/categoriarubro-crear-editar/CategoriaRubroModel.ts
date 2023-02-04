export class CategoriaRubroModel {
  idCategoriaRubro: any;
  idUser: any;
  idClienteNegotis: any;
  nombre: any;
  activo: any;
  eliminar: any;
  imagenVisible: any;


  constructor(idCategoriaRubro: any, idUser: any, idClienteNegotis: any, nombre: any, activo: any, eliminar : any, imagenVisible: any) {
    this.idCategoriaRubro = idCategoriaRubro;
    this.idUser = idUser;
    this.idClienteNegotis = idClienteNegotis;
    this.nombre = nombre;
    this.activo = activo;
    this.eliminar = eliminar;
    this.imagenVisible = imagenVisible;
  }
}
