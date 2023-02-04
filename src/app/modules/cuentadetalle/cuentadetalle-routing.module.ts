import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClienteGuard} from '../../guard/cliente.guard';
import {CuentadetallePanelComponent} from '../../pages/cliente/cuentadetalle-panel/cuentadetalle-panel.component';
import {CuentadetalleCrearEditarComponent} from '../../pages/cliente/cuentadetalle-crear-editar/cuentadetalle-crear-editar.component';

const routes: Routes = [
  { path: '', component: CuentadetallePanelComponent },
  // ******************General***************************************************
  { path: 'panel', canActivate: [ClienteGuard], component: CuentadetallePanelComponent },
  { path: 'crear', canActivate: [ClienteGuard], component: CuentadetalleCrearEditarComponent },
  { path: 'editar/:id', canActivate: [ClienteGuard], component: CuentadetalleCrearEditarComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [
    ClienteGuard,
  ]
})
export class CuentadetalleRoutingModule { }
