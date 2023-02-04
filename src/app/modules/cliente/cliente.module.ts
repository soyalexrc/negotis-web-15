import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ClienteRoutingModule} from './cliente-routing.module';
import {ClientePanelComponent} from '../../pages/cliente/cliente-panel/cliente-panel.component';
import {ClienteCrearEditarComponent} from '../../pages/cliente/cliente-crear-editar/cliente-crear-editar.component';
import {PaginationModule} from '../../components/pagination/pagination.module';
import {CrearUsuarioClienteModalComponent} from '../../pages/cliente/usuario-cliente-crear/crear-usuario-cliente-modal.component';
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
    ClienteRoutingModule,
  ],
  declarations: [
    ClientePanelComponent,
    ClienteCrearEditarComponent,
    CrearUsuarioClienteModalComponent,
  ],
  entryComponents: [
    CrearUsuarioClienteModalComponent,
  ]
})
export class ClienteModule { }
