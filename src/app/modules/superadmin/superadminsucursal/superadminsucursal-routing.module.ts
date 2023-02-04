import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SucursalPanelComponent} from '../../../pages/general/sucursal-panel/sucursal-panel.component';
import {SucursalCrearEditarComponent} from '../../../pages/general/sucursal-crear-editar/sucursal-crear-editar.component';
import {SuperAdminGuard} from '../../../guard/super-admin.guard';

const routes: Routes = [
  // ******************General***************************************************
  { path: '', component: SucursalPanelComponent },
  // cliente
  { path: 'listado/:iduser', canActivate: [SuperAdminGuard], component: SucursalPanelComponent },
  { path: 'crear/:iduser', canActivate: [SuperAdminGuard], component: SucursalCrearEditarComponent },
  { path: 'editar/:idsucursal/:iduser', canActivate: [SuperAdminGuard], component: SucursalCrearEditarComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [
    SuperAdminGuard,
  ]
})
export class SuperadminsucursalRoutingModule { }
