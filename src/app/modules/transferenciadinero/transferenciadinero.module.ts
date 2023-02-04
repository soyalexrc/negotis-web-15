import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {TransferenciadineroRoutingModule} from './transferenciadinero-routing.module';
import {PaginationModule} from '../../components/pagination/pagination.module';
import {MatCardModule} from "@angular/material/card";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {TransferenciaDineroPanelComponent} from '../../pages/cliente/transferencia-dinero-panel/transferencia-dinero-panel.component';
import {TransferenciaDineroCrearEditarComponent} from '../../pages/cliente/transferencia-dinero-crear-editar/transferencia-dinero-crear-editar.component';
import {ImprimirEgresoModal} from '../../components/imprimir-egreso-modal/imprimir-egreso-modal.component';

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
    TransferenciadineroRoutingModule,
  ],
  declarations: [
    TransferenciaDineroPanelComponent,
    TransferenciaDineroCrearEditarComponent,
    ImprimirEgresoModal,
  ],
  entryComponents: [
    ImprimirEgresoModal,
  ]
})
export class TransferenciadineroModule { }
