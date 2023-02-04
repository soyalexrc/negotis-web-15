import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TransferenciasGuard} from '../../guard/transferencias.guard';
import {TransferenciaDineroPanelComponent} from '../../pages/cliente/transferencia-dinero-panel/transferencia-dinero-panel.component';
import {TransferenciaDineroCrearEditarComponent} from '../../pages/cliente/transferencia-dinero-crear-editar/transferencia-dinero-crear-editar.component';
import {TransferenciaDineroService} from '../../Service/transferencia-dinero.service';

const routes: Routes = [
  { path: '', component: TransferenciaDineroPanelComponent },
  // ******************General***************************************************
  { path: 'panel', canActivate: [TransferenciasGuard], component: TransferenciaDineroPanelComponent },
  { path: 'crear', canActivate: [TransferenciasGuard], component: TransferenciaDineroCrearEditarComponent },
  { path: 'editar/:idtransdep', canActivate: [TransferenciasGuard], component: TransferenciaDineroCrearEditarComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [
    TransferenciasGuard,
    TransferenciaDineroService,
  ]
})
export class TransferenciadineroRoutingModule { }
