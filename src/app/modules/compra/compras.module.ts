import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'src/app/components/pagination/pagination.module';
import { ComprasRoutingModule } from './compras-routing.module';
import { CompraproviderPanelComponent } from 'src/app/pages/cliente/compraprovider-panel/compraprovider-panel.component';
import { CompraproviderCrearEditarComponent } from 'src/app/pages/cliente/compraprovider-crear-editar/compraprovider-crear-editar.component';
import { AgregararticuloModalComponent } from 'src/app/components/agregararticulo-modal/agregararticulo-modal.component';
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
    ComprasRoutingModule,
  ],
  declarations: [
    CompraproviderPanelComponent,
    CompraproviderCrearEditarComponent
  ],
  entryComponents: [
  ]
})
export class ComprasModule { }
