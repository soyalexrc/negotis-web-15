import { NgModule } from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {SuperadminafipRoutingModule} from './superadminafip-routing.module';
import {PaginationModule} from '../../../components/pagination/pagination.module';
import {AfipPanelComponent} from '../../../pages/superadmin/afip-panel/afip-panel.component';
import {AfipCrearEditarComponent} from '../../../pages/superadmin/afip-crear-editar/afip-crear-editar.component';
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
    SuperadminafipRoutingModule,
  ],
  declarations: [
    AfipPanelComponent,
    AfipCrearEditarComponent,
  ],
  entryComponents: [
  ]
})
export class SuperadminafipModule { }
