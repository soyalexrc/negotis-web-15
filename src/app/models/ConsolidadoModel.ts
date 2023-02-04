import { IModel } from "./Interfaces/IModel";

export class ConsolidadoModel implements IModel {
        filtro!: String;
        filtroCategoriaRubro!: String;
        filtroEstadoEntrega!: number;
        fechaDesde : any;
        fechaHasta: any;
        listaArticulos:any;
        idSucursal : any;
        filtroVendedor : any;
        filtroListaPrecios : any;
        filtroRubro : any;
        filtroZona:any;
        tipoComprobante: any;
        filtroProveedor: any;
    constructor() {
    }

    FromObject(value: any) {
        if (this.Check(value)) {
            this.filtro= value.filtro;
            this.filtroCategoriaRubro= value.filtroCategoriaRubro;
            this.filtroEstadoEntrega = value.filtroEstadoEntrega;
            this.fechaDesde=value.fechaDesde;
            this.fechaHasta= value.fechaHasta;
            this.listaArticulos= value.listaArticulos;
            this.idSucursal= value.idSucursal;
            this.filtroVendedor = value.filtroVendedor;
            this.filtroListaPrecios = value.filtroListaPrecios;
            this.filtroRubro = value.filtroRubro;
            this.filtroZona = value.filtroZona;
            this.tipoComprobante = value.tipoComprobante;
            this.filtroProveedor = value.filtroProveedor;
        }
    }

    Check(value: any): boolean {
        if (!('filtro' in value)) { return false; }
        if (!('filtroCategoriaRubro' in value)) { return false; }
        if (!('filtroEstadoEntrega' in value)) { return false; }
        if (!('fechaHasta' in value)) { return false; }
        if (!('fechaDesde' in value)) { return false; }
        if (!('listaArticulos' in value)) { return false; }
        if (!('idSucursal' in value)) { return false; }
        if (!('filtroVendedor' in value)) { return false; }
        if (!('filtroListaPrecios' in value)) { return false; }
        if (!('filtroRubro' in value)) { return false; }
        if (!('filtroZona' in value)) { return false; }
        if (!('tipoComprobante' in value)) { return false; }
        if (!('filtroProveedor' in value)) { return false; }
        return true;
    }
}