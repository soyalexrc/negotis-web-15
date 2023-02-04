import { IModel } from "./Interfaces/IModel";

export class ClienteRequestModel implements IModel {
    idClienteNegotis: any;
    razonSocial: any;
    Fantasia: any;
    Zona: any;
    CUIT: any;
    pageSize: any;
    page: any;

    FromObject(value: any) {
        if (this.Check(value)) {
            this.idClienteNegotis = value.idClienteNegotis;
            this.razonSocial = value.razonSocial;
            this.Fantasia = value.Fantasia;
            this.Zona = value.Zona;
            this.CUIT = value.CUIT;
            this.pageSize = value.pageSize;
            this.page = value.page;
        }
    }

    Check(value: any): boolean {
        if (!('idClienteNegotis' in value)) { return false; }
        if (!('razonSocial' in value)) { return false; }
        if (!('Fantasia' in value)) { return false; }
        if (!('Zona' in value)) { return false; }
        if (!('CUIT' in value)) { return false; }
        if (!('pageSize' in value)) { return false; }
        if (!('page' in value)) { return false; }
        return true;
    }
}