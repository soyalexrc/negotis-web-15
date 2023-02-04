import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RegionRoutingModule} from './region-routing.module';
import {PaginationModule} from '../../components/pagination/pagination.module';
import {RegionPanelComponent} from '../../pages/cliente/region-panel/region-panel.component';
import {RegionCrearEditarComponent} from '../../pages/cliente/region-crear-editar/region-crear-editar.component';
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
    RegionRoutingModule,
  ],
  declarations: [
    RegionPanelComponent,
    RegionCrearEditarComponent,
  ],
  entryComponents: [
  ]
})
export class RegionModule { }
