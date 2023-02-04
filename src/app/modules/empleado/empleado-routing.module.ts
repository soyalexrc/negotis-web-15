import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmpleadoCrearEditarComponent} from '../../pages/cliente/empleado-crear-editar/empleado-crear-editar.component';
import {EmpleadoPanelComponent} from '../../pages/cliente/empleado-panel/empleado-panel.component';
import {EmpleadoGuard} from '../../guard/empleado.guard';
import {UserService} from '../../Service/user.service';

const routes: Routes = [
  // ******************General***************************************************
  { path: '', component: EmpleadoPanelComponent },
  // cliente
  { path: 'panel', canActivate: [EmpleadoGuard], component: EmpleadoPanelComponent },
  { path: 'crear', canActivate: [EmpleadoGuard], component: EmpleadoCrearEditarComponent },
  { path: 'editar/:idempleado', canActivate: [EmpleadoGuard], component: EmpleadoCrearEditarComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [
    EmpleadoGuard,
    UserService,
  ]
})
export class EmpleadoRoutingModule { }
