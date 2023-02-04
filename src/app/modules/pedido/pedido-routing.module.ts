import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PedidoGuard} from '../../guard/pedido.guard';
import {PedidoPanelComponent} from '../../pages/cliente/pedido-panel/pedido-panel.component';
import {PedidoCrearEditarComponent} from '../../pages/cliente/pedido-crear-editar/pedido-crear-editar.component';

const routes: Routes = [
  // ******************General***************************************************
  { path: '', component: PedidoPanelComponent },
  // pedido
  { path: 'panel', canActivate: [PedidoGuard], component: PedidoPanelComponent },
  { path: 'crear', canActivate: [PedidoGuard], component: PedidoCrearEditarComponent },
  { path: 'editar/:idpedido', canActivate: [PedidoGuard], component: PedidoCrearEditarComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [
    PedidoGuard,
  ]
})
export class PedidoRoutingModule { }
