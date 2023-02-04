import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SuperAdminGuard} from '../../../guard/super-admin.guard';
import {AfipPanelComponent} from '../../../pages/superadmin/afip-panel/afip-panel.component';
import {AfipCrearEditarComponent} from '../../../pages/superadmin/afip-crear-editar/afip-crear-editar.component';

const routes: Routes = [
  // ******************General***************************************************
  { path: '', component: AfipPanelComponent },
  { path: 'panel/:iduser', canActivate: [SuperAdminGuard], component: AfipPanelComponent },
  { path: 'crear/:iduser', canActivate: [SuperAdminGuard], component: AfipCrearEditarComponent },
  { path: 'editar/:iduser', canActivate: [SuperAdminGuard], component: AfipCrearEditarComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [
    SuperAdminGuard,
  ]
})
export class SuperadminafipRoutingModule { }
