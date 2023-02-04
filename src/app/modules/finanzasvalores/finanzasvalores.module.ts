import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {FinanzasvaloresRoutingModule} from './finanzasvalores-routing.module';
import {PaginationModule} from '../../components/pagination/pagination.module';
import {MatCardModule} from "@angular/material/card";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {ValoresPanelComponent} from '../../pages/cliente/valores-panel/valores-panel.component';
import {ValoresCrearEditarComponent} from '../../pages/cliente/valores-crear-editar/valores-crear-editar.component';

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
    FinanzasvaloresRoutingModule,
  ],
  declarations: [
    ValoresPanelComponent,
    ValoresCrearEditarComponent
  ],
  entryComponents: [
  ]
})
export class FinanzasvaloresModule { }
