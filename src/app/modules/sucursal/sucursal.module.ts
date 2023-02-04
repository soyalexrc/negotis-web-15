import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {SucursalRoutingModule} from './sucursal-routing.module';
import {PaginationModule} from '../../components/pagination/pagination.module';
import {DeshabilitarSucursalModalComponent} from '../../components/deshabilitar-sucursal-modal/deshabilitar-sucursal-modal.component';
import {MatCardModule} from "@angular/material/card";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatCardModule,
    MatExpansionModule,
    MatAutocompleteModule,
    FormsModule,
    PaginationModule,
    ReactiveFormsModule,
    SucursalRoutingModule,
  ],
  declarations: [
    DeshabilitarSucursalModalComponent
  ],
  entryComponents: [
    DeshabilitarSucursalModalComponent
  ]
})
export class SucursalModule { }
