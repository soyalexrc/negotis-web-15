import { NgModule } from '@angular/core';
import { PedidoRoutingModule } from './pedido-routing.module';
import { PedidoPanelComponent } from '../../pages/cliente/pedido-panel/pedido-panel.component';
import { PedidoCrearEditarComponent } from '../../pages/cliente/pedido-crear-editar/pedido-crear-editar.component';
import { PedidofaltandatosrequeridosModalComponent } from '../../components/pedidofaltandatosrequeridos-modal/pedidofaltandatosrequeridos-modal.component';
import { PagosPedidosPendientesModalComponent } from '../../components/pago-pedidos-pendientes-modal/pagos-pedidos-pendientes-modal.component';
import { FacturaPedidosPendientesModalComponent } from '../../components/factura-pedidos-pendientes-modal/factura-pedidos-pendientes-modal.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PaginationModule } from '../../components/pagination/pagination.module';
import { ArticulosincantidadModalComponent } from '../../components/articulosincantidad-modal/articulosincantidad-modal.component';
import { VerFacturaModalComponent } from '../../components/ver-factura-modal/ver-factura-modal.component';
import { PagoHistorialModalComponent } from '../../components/pago-historial-modal/pago-historial-modal.component';
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
    PedidoRoutingModule,
  ],
  declarations: [
    PedidoPanelComponent,
    PedidoCrearEditarComponent,
    PedidofaltandatosrequeridosModalComponent,
    PagosPedidosPendientesModalComponent,
    FacturaPedidosPendientesModalComponent,
    ArticulosincantidadModalComponent,
    VerFacturaModalComponent,
    PagoHistorialModalComponent,
  ],
  entryComponents: [
    PedidofaltandatosrequeridosModalComponent,
    PagosPedidosPendientesModalComponent,
    FacturaPedidosPendientesModalComponent,
    ArticulosincantidadModalComponent,
    VerFacturaModalComponent,
    PagoHistorialModalComponent,
  ],
  exports: [
  ]
})
export class PedidoModule { }
