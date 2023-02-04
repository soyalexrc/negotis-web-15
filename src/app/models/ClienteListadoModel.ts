import { AnonymousSubject } from "rxjs/internal/Subject";

export class ClienteListadoModel {
  idClienteNegotis: any;
  page: any;
  pageSize: any;
  razonSocial: any;
  Fantasia: any;
  ZonaId: any;
  RutaId: any;
  CUIT: any;
  IdVendedor: any;
  IdSucursal: any;
  FiltroPatente: any;
  FiltroNroSiniestro: any;
  IdCategoria: any;

  // tslint:disable-next-line:max-line-length
  constructor(idClienteNegotis: any, page: any, pageSize: any, razonSocial: any, Fantasia: any, ZonaId: any, RutaId: any, CUIT: any, IdVendedor: any,  IdSucursal: any, FiltroPatente: any, FiltroNroSiniestro: any,IdCategoria: any) {
    this.idClienteNegotis = idClienteNegotis;
    this.page = page;
    this.pageSize = pageSize;
    this.razonSocial = razonSocial;
    this.Fantasia = Fantasia;
    this.ZonaId = ZonaId;
    this.RutaId = RutaId;
    this.CUIT = CUIT;
    this.IdVendedor = IdVendedor;
    this.IdSucursal = IdSucursal;
    this.FiltroPatente = FiltroPatente;
    this.FiltroNroSiniestro = FiltroNroSiniestro;
    this.IdCategoria = IdCategoria;
  }

  static getEntity(idClienteNegotis: any, page: any, pageSize: any) {
    return new ClienteListadoModel(idClienteNegotis, page, pageSize, '', '', '', '', '', '','','','',null);
  }
}
