import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RubroRoutingModule} from './rubro-routing.module';
import {PaginationModule} from '../../components/pagination/pagination.module';
import {RubroPanelComponent} from '../../pages/cliente/rubro-panel/rubro-panel.component';
import {RubroCrearEditarComponent} from '../../pages/cliente/rubro-crear-editar/rubro-crear-editar.component';
import {UniquePipe} from '../../pipe/unique.pipe';
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
    RubroRoutingModule,
  ],
  declarations: [
    RubroPanelComponent,
    RubroCrearEditarComponent,
    UniquePipe,
  ],
  entryComponents: [
  ]
})
export class RubroModule { }
