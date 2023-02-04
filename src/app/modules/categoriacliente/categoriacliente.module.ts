import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {PaginationModule} from '../../components/pagination/pagination.module';
import {CategoriaclientePanelComponent} from '../../pages/cliente/categoriacliente-panel/categoriacliente-panel.component';
import {CategoriaclienteCrearEditarComponent} from '../../pages/cliente/categoriacliente-crear-editar/categoriacliente-crear-editar.component';
import { CategoriaclienteRoutingModule } from './categoriacliente-routing.module';
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
    CategoriaclienteRoutingModule,
  ],
  declarations: [
    CategoriaclientePanelComponent,
    CategoriaclienteCrearEditarComponent,
  ],
  entryComponents: [
  ]
})
export class CategoriaclienteModule { }
