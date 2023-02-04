import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClienteGuard} from '../../guard/cliente.guard';
import {ValoresPanelComponent} from '../../pages/cliente/valores-panel/valores-panel.component';
import {ValoresCrearEditarComponent} from '../../pages/cliente/valores-crear-editar/valores-crear-editar.component';

const routes: Routes = [
  { path: '', component: ValoresPanelComponent },
  // ******************General***************************************************
  { path: 'panel', canActivate: [ClienteGuard], component: ValoresPanelComponent },
  { path: 'crear', canActivate: [ClienteGuard], component: ValoresCrearEditarComponent },
  { path: 'editar/:idvalor', canActivate: [ClienteGuard], component: ValoresCrearEditarComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [
    ClienteGuard,
  ]
})
export class FinanzasvaloresRoutingModule { }
