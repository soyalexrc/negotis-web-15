import { NgModule } from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {SuperadminsucursalRoutingModule} from './superadminsucursal-routing.module';
import {PaginationModule} from '../../../components/pagination/pagination.module';
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
    SuperadminsucursalRoutingModule,
  ],
  declarations: [
  ],
  entryComponents: [
  ]
})
export class SuperadminsucursalModule { }
