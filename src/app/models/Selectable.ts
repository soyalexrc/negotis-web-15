import { IModel } from "./Interfaces/IModel";

export class Selectable<T extends IModel> implements IModel {
    canSelect = false;
    selected = false;
    item: T | any;

    constructor() {
    }

    FromObject(value: any) {
        if (this.Check(value)) {
            this.canSelect = value.canSelect;
            this.selected = value.selected;
            this.item = this.item.FromObject(value.item);
        }
    }

    Check(value: any): boolean {
        if (!('key' in value)) { return false; }
        if (!('value' in value)) { return false; }
        if (!('item' in value)) { return false; }
        return this.item.Check(value.item);
    }

}