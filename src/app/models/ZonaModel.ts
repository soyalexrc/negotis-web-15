import { IModel } from "./Interfaces/IModel";

export class ZonaModel implements IModel {
        post: any;
        zona!: String;
        detalle!: String;
        idZona: number = 0;
        zonaById!: any;
        idRegion: String = '';
        listadoRegion: any;

    constructor() {
    }

    FromObject(value: any) {
        if (this.Check(value)) {
            this.post= value.post;
            this.zona= value.zona;
            this.detalle= value.detalle;
            this.idZona= value.idZona;
            this.zonaById= value.zonaById;
            this.idRegion= value.idRegion;
            this.listadoRegion= value.listadoRegion;
        }
    }

    Check(value: any): boolean {
        if (!('post' in value)) { return false; }
        if (!('zona' in value)) { return false; }
        if (!('detalle' in value)) { return false; }
        if (!('idZona' in value)) { return false; }
        if (!('zonaById' in value)) { return false; }
        if (!('idRegion' in value)) { return false; }
        if (!('listadoRegion' in value)) { return false; }
        return true;
    }
}
