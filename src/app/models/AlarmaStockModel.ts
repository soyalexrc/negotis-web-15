import { IModel } from "./Interfaces/IModel";

export class AlarmaStockModel implements IModel {
        activo!: boolean;
        filtroMultiple: any;
        listaArticulos: any;
        sucursal : any;
    constructor() {
    }

    FromObject(value: any) {
        if (this.Check(value)) {
            this.activo= value.activo;
            this.filtroMultiple = value.filtroMultiple;
            this.listaArticulos=value.listaArticulos;
            this.sucursal = value.sucursal;
        }
    }

    Check(value: any): boolean {
        if (!('activo' in value)) { return false; }
        if (!('filtroMultiple' in value)) { return false; }
        if (!('listaArticulos' in value)) { return false; }
        if (!('sucursal' in value)) { return false; }
        return true;
    }
}
