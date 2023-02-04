import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ProveedorRoutingModule} from './proveedor-routing.module';
import {PaginationModule} from '../../components/pagination/pagination.module';
import {ProveedorPanelComponent} from '../../pages/cliente/proveedor-panel/proveedor-panel.component';
import {ProveedorCrearEditarComponent} from '../../pages/cliente/proveedor-crear-editar/proveedor-crear-editar.component';
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
    ProveedorRoutingModule,
  ],
  declarations: [
    ProveedorPanelComponent,
    ProveedorCrearEditarComponent
  ],
  entryComponents: [
  ]
})
export class ProveedorModule { }
