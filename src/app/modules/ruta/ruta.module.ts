import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RutaRoutingModule} from './ruta-routing.module';
import {PaginationModule} from '../../components/pagination/pagination.module';
import {RutaPanelComponent} from '../../pages/cliente/ruta-panel/ruta-panel.component';
import {RutaCrearEditarComponent} from '../../pages/cliente/ruta-crear-editar/ruta-crear-editar.component';
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
    RutaRoutingModule,
  ],
  declarations: [
    RutaPanelComponent,
    RutaCrearEditarComponent,
  ],
  entryComponents: [
  ]
})
export class RutaModule { }
