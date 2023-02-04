import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ZonaRoutingModule} from './zona-routing.module';
import {PaginationModule} from '../../components/pagination/pagination.module';
import {ZonaPanelComponent} from '../../pages/cliente/zona-panel/zona-panel.component';
import {ZonaCrearEditarComponent} from '../../pages/cliente/zona-crear-editar/zona-crear-editar.component';
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
    ZonaRoutingModule,
  ],
  declarations: [
    ZonaPanelComponent,
    ZonaCrearEditarComponent,
  ],
  entryComponents: [
  ]
})
export class ZonaModule { }
