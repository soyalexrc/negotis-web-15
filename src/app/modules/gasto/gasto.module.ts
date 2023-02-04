import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {GastoRoutingModule} from './gasto-routing.module';
import {PaginationModule} from '../../components/pagination/pagination.module';
import {GastosPanelComponent} from '../../pages/cliente/gastos-panel/gastos-panel.component';
import {GastosCrearEditarComponent} from '../../pages/cliente/gastos-crear-editar/gastos-crear-editar.component';
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
    GastoRoutingModule,
  ],
  declarations: [
    GastosPanelComponent,
    GastosCrearEditarComponent
  ],
  entryComponents: [
  ]
})
export class GastoModule { }
