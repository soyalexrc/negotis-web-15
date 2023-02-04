import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SuperAdminGuard} from '../../../guard/super-admin.guard';
import {ClientenegotisPanelComponent} from '../../../pages/superadmin/clientenegotis-panel/clientenegotis-panel.component';
import {ClientenegotisCrearEditarComponent} from '../../../pages/superadmin/clientenegotis-crear-editar/clientenegotis-crear-editar.component';

const routes: Routes = [
  // ******************General***************************************************
  { path: '', component: ClientenegotisPanelComponent },
  // cliente
  { path: 'panel', canActivate: [SuperAdminGuard], component: ClientenegotisPanelComponent },
  { path: 'crear', canActivate: [SuperAdminGuard], component: ClientenegotisCrearEditarComponent },
  { path: 'editar/:iduser', canActivate: [SuperAdminGuard], component: ClientenegotisCrearEditarComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [
    SuperAdminGuard,
  ]
})
export class SuperadminclientenegotisRoutingModule { }
