import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DespachoGuard} from '../../guard/despacho.guard';
import {DespachoPedidoPanelComponent} from '../../pages/cliente/despacho-pedido-panel/despacho-pedido-panel.component';
import {DespachoPedidoEditarComponent} from '../../pages/cliente/despacho-pedido-editar/despacho-pedido-editar.component';

const routes: Routes = [
  { path: '', component: DespachoPedidoPanelComponent },
  // ******************General***************************************************
  { path: 'panel', canActivate: [DespachoGuard], component: DespachoPedidoPanelComponent },
  { path: 'editar/:idpedido', canActivate: [DespachoGuard], component: DespachoPedidoEditarComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [
    DespachoGuard,
  ]
})
export class DespachopedidoRoutingModule { }
