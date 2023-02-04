import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {CategoriagastoRoutingModule} from './categoriagasto-routing.module';
import {PaginationModule} from '../../components/pagination/pagination.module';
import {CategoriagastoPanelComponent} from '../../pages/cliente/categoriagasto-panel/categoriagasto-panel.component';
import {CategoriagastoCrearEditarComponent} from '../../pages/cliente/categoriagasto-crear-editar/categoriagasto-crear-editar.component';
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
    CategoriagastoRoutingModule,
  ],
  declarations: [
    CategoriagastoPanelComponent,
    CategoriagastoCrearEditarComponent
  ],
  entryComponents: [
  ]
})
export class CategoriagastoModule { }
