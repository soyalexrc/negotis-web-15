import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SuperAdminGuard} from '../../guard/super-admin.guard';
import {SuperadminPanelComponent} from '../../pages/superadmin/superadmin-panel/superadmin-panel.component';
import {SuperadminCrearEditarComponent} from '../../pages/superadmin/superadmin-crear-editar/superadmin-crear-editar.component';
import {SuperadminInicioComponent} from '../../pages/superadmin/superadmin-inicio/superadmin-inicio.component';
import {PasswordSuperadminEditarComponent} from '../../pages/superadmin/password-superadmin-editar/password-superadmin-editar.component';

const routes: Routes = [
  // ******************General***************************************************
  { path: '', component: SuperadminInicioComponent },
  { path: 'inicio', canActivate: [SuperAdminGuard], component: SuperadminInicioComponent },
  { path: 'panel', canActivate: [SuperAdminGuard], component: SuperadminPanelComponent },
  { path: 'crear', canActivate: [SuperAdminGuard], component: SuperadminCrearEditarComponent },
  { path: 'editar/:iduser', canActivate: [SuperAdminGuard], component: SuperadminCrearEditarComponent },
  { path: 'usuario/password/editar', canActivate: [SuperAdminGuard], component: PasswordSuperadminEditarComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [
    SuperAdminGuard,
  ]
})
export class SuperadminRoutingModule { }
