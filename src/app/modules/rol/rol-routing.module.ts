import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RolGuard} from '../../guard/rol.guard';
import {RolPanelComponent} from '../../pages/cliente/rol-panel/rol-panel.component';
import {RolCrearEditarComponent} from '../../pages/cliente/rol-crear-editar/rol-crear-editar.component';
import {RolService} from '../../Service/rol.service';

const routes: Routes = [
  // ******************General***************************************************
  { path: '', component: RolPanelComponent },
  // cliente
  { path: 'panel', canActivate: [RolGuard], component: RolPanelComponent },
  { path: 'crear', canActivate: [RolGuard], component: RolCrearEditarComponent },
  { path: 'editar/:idrol', canActivate: [RolGuard], component: RolCrearEditarComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [
    RolGuard,
    RolService,
  ]
})
export class RolRoutingModule { }
