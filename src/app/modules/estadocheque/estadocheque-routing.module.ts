import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClienteGuard} from '../../guard/cliente.guard';
import {EstadochequeCrearEditarComponent} from '../../pages/cliente/estadocheque-crear-editar/estadocheque-crear-editar.component';
import {EstadochequePanelComponent} from '../../pages/cliente/estadocheque-panel/estadocheque-panel.component';

const routes: Routes = [
  { path: '', component: EstadochequePanelComponent },
  // ******************General***************************************************
  { path: 'crear', canActivate: [ClienteGuard], component: EstadochequeCrearEditarComponent },
  { path: 'editar/:id', canActivate: [ClienteGuard], component: EstadochequeCrearEditarComponent },
  { path: 'panel', canActivate: [ClienteGuard], component: EstadochequePanelComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [
    ClienteGuard,
  ]
})
export class EstadochequeRoutingModule { }
