import { CommonModule } from "@angular/common";
import { PaginationComponent } from "./pagination.component";
import { NgModule } from "@angular/core";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        PaginationComponent
    ],
    exports: [
        PaginationComponent
    ]
})
export class PaginationModule{}