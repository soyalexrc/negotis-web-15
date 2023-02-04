import { IModel } from "./Interfaces/IModel";

export class KeyValuePair implements IModel {
    key: any = '';
    value: any = '';

    constructor() {

    }

    FromObject(value: any) {
        if (this.Check(value)) {
            this.key = value.key;
            this.value = value.value;
        }
    }

    Check(value: any): boolean {
        if (!('key' in value)) { return false; }
        if (!('value' in value)) { return false; }
        return true;
    }
}
