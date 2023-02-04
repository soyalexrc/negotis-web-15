import { Injectable } from '@angular/core';
import { GlobalService } from '../Service/global.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private http: HttpClient, private global: GlobalService) { }

  crearEditar(value: any) {    
    return this.http.post(this.global.urlApi + '/ApiPedido/Crear/Editar?token=' + localStorage.getItem('token'), value);
  }
  crearDuplicado(value: any) {    
    return this.http.post(this.global.urlApi + '/ApiPedido/Crear/Duplicado?token=' + localStorage.getItem('token'), value);
  }

  despachoEditar(value: any) {
    return this.http.post(this.global.urlApi + '/ApiPedido/Despacho/Editar?token=' + localStorage.getItem('token'), value);
  }

  getInfoGeneral(value: any) {
    return this.http.get(this.global.urlApi + '/ApiPedido/DatosGenerales?token=' + localStorage.getItem('token'), { params: value });
  }

  getFactura(value: any) {
    return this.http.get(this.global.urlApi + '/ApiPedido/Get/Factura?token=' + localStorage.getItem('token'), { params: value });
  }

  getPedidoById(value: any) {
    return this.http.get(this.global.urlApi + '/ApiPedido/GetPedidoById?token=' + localStorage.getItem('token'), { params: value });
  }

  getPedidosPorFiltros(value: any):any {
    return this.http.get(this.global.urlApi + '/ApiPedido/Listado/Pedidos?token=' + localStorage.getItem('token'), { params: value });
  }

  getPedidosPagos(value: any) {
    return this.http.get(this.global.urlApi + '/ApiPedido/Listado/PedidosPagos?token=' + localStorage.getItem('token'), { params: value });
  }

  eliminarPedido(value: any) {
    return this.http.post(this.global.urlApi + '/ApiPedido/Delete?token=' + localStorage.getItem('token'), value);
  }

  editarPedidos(value :any){
    return this.http.post(this.global.urlApi + '/ApiPedido/Editar/Pedidos?token=' + localStorage.getItem('token'), value);
  }
  getListClientesRanking(value :any): any{
    return this.http.get(this.global.urlApi + '/ApiPedido/RankClientes?token=' + localStorage.getItem('token'), { params: value });
  }
  
  getListCuentas(value :any): any{
    return this.http.get(this.global.urlApi + '/ApiPedido/Listado/Cuentas?token=' + localStorage.getItem('token'), { params: value });
  }
  sincronizarExcel(value: any) {
    return this.http.post(this.global.urlApi + '/ApiPedido/Sincronizar/Pedidos?token=' + localStorage.getItem('token'), value);
  }

  libroVentas(value: any): any {
    return this.http.get(this.global.urlApi + '/ApiPedido/LibroVentas?token=' + localStorage.getItem('token'), { params: value });
  }

  exportarExcel(value: any) {
    return this.http.post(this.global.urlApi + '/ApiPedido/Exportar/Excel?token=' + localStorage.getItem('token'), value);
  }
  exportarAlicuotas(value: any) {
    return this.http.post(this.global.urlApi + '/ApiPedido/Exportar/Alicuotas?token=' + localStorage.getItem('token'), value);
  }
  exportarTxtVentas(value: any) {
    return this.http.post(this.global.urlApi + '/ApiPedido/Exportar/ExcelTXTVentas?token=' + localStorage.getItem('token'), value);
  }
  CancelarPedidos(value: any) {
    return this.http.post(this.global.urlApi + '/ApiPedido/Cancelar/Pedidos?token=' + localStorage.getItem('token'), value);
  }
}
