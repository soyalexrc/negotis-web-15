import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClienteclienteService} from '../../Service/clientecliente.service';
import {ClienteGuard} from '../../guard/cliente.guard';
import {ClientePanelComponent} from '../../pages/cliente/cliente-panel/cliente-panel.component';
import {ClienteCrearEditarComponent} from '../../pages/cliente/cliente-crear-editar/cliente-crear-editar.component';

const routes: Routes = [
  // ******************General***************************************************
  { path: '', component: ClientePanelComponent },
  // cliente
  { path: 'panel', canActivate: [ClienteGuard], component: ClientePanelComponent },
  { path: 'crear', canActivate: [ClienteGuard], component: ClienteCrearEditarComponent },
  { path: 'editar/:idcliente', canActivate: [ClienteGuard], component: ClienteCrearEditarComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [
    ClienteGuard,
    ClienteclienteService,
  ]
})
export class ClienteRoutingModule { }
