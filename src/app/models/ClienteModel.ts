import { IModel } from "./Interfaces/IModel";

export class ClienteModel implements IModel {
    Id: any;
    CUIT: any;
    RazonSocial: any;

    constructor(value: ClienteModel) {
        this.Id = value.Id;
        this.CUIT = value.CUIT;
        this.RazonSocial = value.RazonSocial;
    }

    FromObject(value: any) {
        if (this.Check(value)) {
            this.Id = value.Id;
            this.CUIT = value.CUIT;
            this.RazonSocial = value.RazonSocial;
        }
    }

    Check(value: any): boolean {
        if (!('Id' in value)) { return false; }
        if (!('CUIT' in value)) { return false; }
        if (!('RazonSocial' in value)) { return false; }
        return true;
    }
}