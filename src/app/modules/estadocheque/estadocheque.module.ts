import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {EstadochequeRoutingModule} from './estadocheque-routing.module';
import {PaginationModule} from '../../components/pagination/pagination.module';
import {EstadochequePanelComponent} from '../../pages/cliente/estadocheque-panel/estadocheque-panel.component';
import {EstadochequeCrearEditarComponent} from '../../pages/cliente/estadocheque-crear-editar/estadocheque-crear-editar.component';
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
    EstadochequeRoutingModule,
  ],
  declarations: [
    EstadochequePanelComponent,
    EstadochequeCrearEditarComponent
  ],
  entryComponents: [
  ]
})
export class EstadochequeModule { }
