import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {CategoriaRoutingModule} from './categoria-routing.module';
import {PaginationModule} from '../../components/pagination/pagination.module';
import {CategoriarubroPanelComponent} from '../../pages/cliente/categoriarubro-panel/categoriarubro-panel.component';
import {CategoriarubroCrearEditarComponent} from '../../pages/cliente/categoriarubro-crear-editar/categoriarubro-crear-editar.component';
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
    CategoriaRoutingModule,
  ],
  declarations: [
    CategoriarubroPanelComponent,
    CategoriarubroCrearEditarComponent,
  ],
  entryComponents: [
  ]
})
export class CategoriaModule { }
