import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {EmpleadoRoutingModule} from './empleado-routing.module';
import {PaginationModule} from '../../components/pagination/pagination.module';
import {EmpleadoPanelComponent} from '../../pages/cliente/empleado-panel/empleado-panel.component';
import {EmpleadoCrearEditarComponent} from '../../pages/cliente/empleado-crear-editar/empleado-crear-editar.component';
import {BloqueardesbloquearModalComponent} from '../../components/bloqueardesbloquear-modal/bloqueardesbloquear-modal.component';
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
    EmpleadoRoutingModule,
  ],
  declarations: [
    EmpleadoPanelComponent,
    EmpleadoCrearEditarComponent,
    BloqueardesbloquearModalComponent,
  ],
  entryComponents: [
    BloqueardesbloquearModalComponent,
  ]
})
export class EmpleadoModule { }
