import { IModel } from "./Interfaces/IModel";

export class DialogModel implements IModel {
    title: any;
    value: any;
    valueName: any;
    valueType: any;

    FromObject(value: any) {
        if (this.Check(value)) {
            this.title = value.title;
            this.value = value.value;
            this.valueName = value.valueName;
            this.valueType = value.valueType;
        }
    }

    Check(value: any): boolean {
        if (!('title' in value)) { return false; }
        if (!('value' in value)) { return false; }
        if (!('valueName' in value)) { return false; }
        if (!('valueType' in value)) { return false; }
        return true;
    }
}