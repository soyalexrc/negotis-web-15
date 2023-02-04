import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MarcaRoutingModule} from './marca-routing.module';
import {PaginationModule} from '../../components/pagination/pagination.module';
import {MatCardModule} from "@angular/material/card";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MarcaPanelComponent} from '../../pages/cliente/marca-panel/marca-panel.component';
import {MarcaCrearEditarComponent} from '../../pages/cliente/marca-crear-editar/marca-crear-editar.component';

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
    MarcaRoutingModule,
  ],
  declarations: [
    MarcaPanelComponent,
    MarcaCrearEditarComponent,
  ],
  entryComponents: [
  ]
})
export class MarcaModule { }
