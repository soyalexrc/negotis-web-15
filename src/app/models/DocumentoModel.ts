import { IModel } from "./Interfaces/IModel";

export class DocumentoModel implements IModel {
    id: any;
    filename!: string;

    constructor() {

    }

    FromObject(value: any) {
        if (this.Check(value)) {
            this.id = value.id;
            this.filename = value.filename;
        }
    }

    Check(value: any): boolean {
        if (!('id' in value)) { return false; }
        if (!('filename' in value)) { return false; }
        return true;
    }
}