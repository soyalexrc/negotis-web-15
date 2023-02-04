import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RolRoutingModule} from './rol-routing.module';
import {PaginationModule} from '../../components/pagination/pagination.module';
import {RolPanelComponent} from '../../pages/cliente/rol-panel/rol-panel.component';
import {RolCrearEditarComponent} from '../../pages/cliente/rol-crear-editar/rol-crear-editar.component';
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
    RolRoutingModule,
  ],
  declarations: [
    RolPanelComponent,
    RolCrearEditarComponent
  ],
  entryComponents: [
  ]
})
export class RolModule { }
