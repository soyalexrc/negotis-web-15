import { IModel } from "./Interfaces/IModel";

export class EstadoCheque implements IModel {
    id: number = 0;
    idClienteNegotis: string | any = '' ;
    descripcion: string = '';
    modificadorValor: any = 0;
    modificadorCaja: any = 0;
    tipoOperacion: any = 1;

    constructor() {

    }

    FromObject(value: any) {
        if (this.Check(value)) {
            this.id = value.id;
            this.descripcion = value.descripcion;
            this.idClienteNegotis = value.idClienteNegotis;
            this.modificadorValor = value.modificadorValor;
            this.modificadorCaja = value.modificadorCaja;
            this.tipoOperacion = value.tipoOperacion;
        }
    }

    Check(value: any): boolean {
        if (!('id' in value)) { return false; }
        if (!('descripcion' in value)) { return false; }
        if (!('idClienteNegotis' in value)) { return false; }
        if (!('modificadorValor' in value)) { return false; }
        if (!('modificadorCaja' in value)) { return false; }
        if (!('tipoOperacion' in value)) { return false; }
        return true;
    }
}
