import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {DespachopedidoRoutingModule} from './despachopedido-routing.module';
import {PaginationModule} from '../../components/pagination/pagination.module';
import {DespachoPedidoPanelComponent} from '../../pages/cliente/despacho-pedido-panel/despacho-pedido-panel.component';
import {DespachoPedidoEditarComponent} from '../../pages/cliente/despacho-pedido-editar/despacho-pedido-editar.component';
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
    DespachopedidoRoutingModule,
  ],
  declarations: [
    DespachoPedidoPanelComponent,
    DespachoPedidoEditarComponent
  ],
  entryComponents: [
  ]
})
export class DespachopedidoModule { }
