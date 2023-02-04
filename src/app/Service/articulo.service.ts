import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../Service/global.service';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  constructor(private http: HttpClient, private global: GlobalService) { }

  crearEditarArticulo(value: any) {
    return this.http.post(this.global.urlApi + '/ApiArticulo/Crear/Editar?token=' + localStorage.getItem('token'), value);
  }

  obtenerArticulo(value: any) {
    return this.http.post(this.global.urlApi + '/ApiArticulo/ObtenerArticulos?token=' + localStorage.getItem('token'), value);
  }

  obtenerArticuloFiltrado(value: any) {
    return this.http.post(this.global.urlApi + '/ApiArticulo/ObtenerArticulosFiltrado?token=' + localStorage.getItem('token'), value);
  }

  ListaArticuloByIdClienteNegotis(value: any) : any {
    return this.http.get(this.global.urlApi + '/ApiArticulo/Listado/Articulo?token=' + localStorage.getItem('token'), { params: value });
  }

  ListaArticuloSP(value: any) : any {
    return this.http.get(this.global.urlApi + '/ApiArticulo/Listado/ArticuloSP?token=' + localStorage.getItem('token'), { params: value });
  }

  guardarCantidadArticulo(value: any) {
    return this.http.post(this.global.urlApi + '/ApiArticulo/Guardar/Cantidad?token=' + localStorage.getItem('token'), value);
  }

  guardarPrecioCosto(value: any) {
    return this.http.post(this.global.urlApi + '/ApiArticulo/Guardar/PrecioCosto?token=' + localStorage.getItem('token'), value);
  }
  guardarPorcentaje(value: any) {
    return this.http.post(this.global.urlApi + '/ApiArticulo/Guardar/Porcentaje?token=' + localStorage.getItem('token'), value);
  }

  guardarPorcentajeOferta(value: any) {
    return this.http.post(this.global.urlApi + '/ApiArticulo/Guardar/PorcentajeOferta?token=' + localStorage.getItem('token'), value);
  }

  guardarPrecioBase(value: any) {
    return this.http.post(this.global.urlApi + '/ApiArticulo/Guardar/PrecioBase?token=' + localStorage.getItem('token'), value);
  }
  guardarPrecioOferta(value: any) {
    return this.http.post(this.global.urlApi + '/ApiArticulo/Guardar/PrecioOferta?token=' + localStorage.getItem('token'), value);
  }

  guardarDescripcion(value: any) {
    return this.http.post(this.global.urlApi + '/ApiArticulo/Guardar/Descripcion?token=' + localStorage.getItem('token'), value);
  }

  getArticuloById(value: any) {
    return this.http.get(this.global.urlApi + '/ApiArticulo/GetById?token=' + localStorage.getItem('token'), { params: value });
  }

  getArticuloByCodigo(value: any) {
    return this.http.get(this.global.urlApi + '/ApiArticulo/GetByCodigo?token=' + localStorage.getItem('token'), { params: value });
  }

  eliminarArticulo(value: any) {
    return this.http.post(this.global.urlApi + '/ApiArticulo/Delete?token=' + localStorage.getItem('token'), value);
  }

  getListCantPorArtSuc(value: any) {
    return this.http.get(this.global.urlApi + '/ApiArticulo/ListGetCantidadArticulo?token=' + localStorage.getItem('token'), { params: value });
  }

  getCantPorArtSuc(value: any): any {
    return this.http.get(this.global.urlApi + '/ApiArticulo/GetCantidadArticulo?token=' + localStorage.getItem('token'), { params: value });
  }

  generarReporte(value: any): any{
    return this.http.get(this.global.urlApi + '/ApiArticulo/Reporte?token=' + localStorage.getItem('token'), { params: value });
  }

  getListAlarma(value: any): any{
    return this.http.get(this.global.urlApi + '/ApiArticulo/AlarmaStock?token=' + localStorage.getItem('token'), { params: value });
  }
  getListVencimiento(value: any): any{
    return this.http.get(this.global.urlApi + '/ApiArticulo/VencimientoStock?token=' + localStorage.getItem('token'), { params: value });
  }
  getListVencimientoOferta(value: any): any{
    return this.http.get(this.global.urlApi + '/ApiArticulo/VencimientoOferta?token=' + localStorage.getItem('token'), { params: value });
  }
  updateMasivo(value:any){
    return this.http.get(this.global.urlApi + '/ApiArticulo/updateMasivo?token=' + localStorage.getItem('token'), { params: value });
  }

  marcarOferta(value: any) {
    return this.http.get(this.global.urlApi + '/ApiArticulo/MarcarOferta?token=' + localStorage.getItem('token'), { params: value });
  }

  cambiarEstadoListado(value: any) {
    return this.http.get(this.global.urlApi + '/ApiArticulo/ActivarListadoArticulos?token=' + localStorage.getItem('token'), { params: value });
  }
  
  darDeAltaArticuloE(value: any) {
    return this.http.get(this.global.urlApi + '/ApiArticulo/AltaArticuloE?token=' + localStorage.getItem('token'), { params: value });
  }
  marcarMasVendido(value: any) {
    return this.http.get(this.global.urlApi + '/ApiArticulo/ListadoMasVendidos?token=' + localStorage.getItem('token'), { params: value });
  }
  sincronizarEcommerce(value: any) {
    return this.http.post(this.global.urlApi + '/ApiArticulo/Sincronizar/Ecommerce?token=' + localStorage.getItem('token'), value);
  }
  sincronizarExcel(value: any) {
    return this.http.post(this.global.urlApi + '/ApiArticulo/Sincronizar/Excel?token=' + localStorage.getItem('token'), value);
  }
  exportarExcel(value: any) {
    return this.http.post(this.global.urlApi + '/ApiArticulo/Exportar/Excel?token=' + localStorage.getItem('token'), value);
  }
  darDeAltaListaArticuloE(value: any) {
    return this.http.get(this.global.urlApi + '/ApiArticulo/AltaListaArticuloE?token=' + localStorage.getItem('token'), { params: value });
  }
  darDeAltaListaArticuloOfertaE(value: any) {
    return this.http.get(this.global.urlApi + '/ApiArticulo/AltaListaArticuloOfertaE?token=' + localStorage.getItem('token'), { params: value });
  }

  getCantidadArticuloMPById(value: any) {
    return this.http.get(this.global.urlApi + '/ApiArticulo/GetMPByIdArticulo?token=' + localStorage.getItem('token'), { params: value });
  }

  getCantidadMPByIdArticulo(value: any) {
    return this.http.get(this.global.urlApi + '/ApiArticulo/GetCantMPByIdArticulo?token=' + localStorage.getItem('token'), { params: value });
  }

  deleteMPByIdArticulo(value: any) {
    return this.http.post(this.global.urlApi + '/ApiArticulo/DeleteMPByIdArticulo?token=' + localStorage.getItem('token'),  value );
  }

  deleteComboByIdArticulo(value: any) {
    return this.http.post(this.global.urlApi + '/ApiArticulo/DeleteComboByIdArticulo?token=' + localStorage.getItem('token'),  value );
  }
  guardarPrecio(value: any) {
    return this.http.post(this.global.urlApi + '/ApiArticulo/Guardar/Precio?token=' + localStorage.getItem('token'), value);
  }
  guardarPorcentaje123(value: any) {
    return this.http.post(this.global.urlApi + '/ApiArticulo/Guardar/Porcentaje123?token=' + localStorage.getItem('token'), value);
  }

  getCantidadArticuloComboById(value: any) {
    return this.http.get(this.global.urlApi + '/ApiArticulo/GetComboByIdArticulo?token=' + localStorage.getItem('token'), { params: value });
  }

  guardarComboArticulo(value: any) {
    return this.http.post(this.global.urlApi + '/ApiArticulo/Guardar/ComboArticulo?token=' + localStorage.getItem('token'), value);
  }
  deleteArticuloFromPedido(value: any) {
    return this.http.post(this.global.urlApi + '/ApiArticulo/Delete/FromPedido?token=' + localStorage.getItem('token'), value);
  }

  listadoArticuloEcommerce(value: any): any {
    return this.http.get(this.global.urlApi + '/ApiArticulo/GroupByCodigoBarras?token=' + localStorage.getItem('token'), { params: value } );
  }

}

