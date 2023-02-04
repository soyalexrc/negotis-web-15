import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ListapreciosRoutingModule} from './listaprecios-routing.module';
import {PaginationModule} from '../../components/pagination/pagination.module';
import {ListapreciosPanelComponent} from '../../pages/cliente/listaprecios-panel/listaprecios-panel.component';
import {ListapreciosCrearEditarComponent} from '../../pages/cliente/listaprecios-crear-editar/listaprecios-crear-editar.component';
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
    ListapreciosRoutingModule,
  ],
  declarations: [
    ListapreciosPanelComponent,
    ListapreciosCrearEditarComponent,
  ],
  entryComponents: [
  ]
})
export class ListapreciosModule { }
