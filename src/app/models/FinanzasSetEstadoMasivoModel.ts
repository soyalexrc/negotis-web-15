import { IModel } from "./Interfaces/IModel";
import { EstadoCheque } from "./EstadoCheque";

export class FinanzasSetEstadoMasivoModel implements IModel {

    titulo = '';
    contenido = '';
    statusFilter!: (item: EstadoCheque) => Boolean;
    idSucursal = 0;
    idClienteNegotis = '';

    constructor() {
    }

    FromObject(value: any) {
        if (this.Check(value)) {
            this.titulo = value.titulo;
            this.contenido = value.contenido;
            this.statusFilter = value.statusFilter;
            this.idSucursal = value.idSucursal;
            this.idClienteNegotis = value.idClienteNegotis;
        }
    }

    Check(value: any): boolean {
        if (!('key' in value)) { return false; }
        if (!('value' in value)) { return false; }
        if (!('statusFilter' in value)) { return false; }
        if (!('idSucursal' in value)) { return false; }
        if (!('idClienteNegotis' in value)) { return false; }
        return true;
    }
}
