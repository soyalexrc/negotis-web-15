import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClienteGuard} from '../../guard/cliente.guard';
import {SucursalPanelComponent} from '../../pages/general/sucursal-panel/sucursal-panel.component';
import {SucursalCrearEditarComponent} from '../../pages/general/sucursal-crear-editar/sucursal-crear-editar.component';
import {ClienteNegotisEmpleadoGuard} from '../../guard/cliente-negotis-empleado.guard';
import {SucursalSeleccionarComponent} from '../../pages/cliente/sucursal-seleccionar/sucursal-seleccionar.component';
import {SucursalService} from '../../Service/sucursal.service';

const routes: Routes = [
  // ******************General***************************************************
  { path: '', component: SucursalPanelComponent },
  // cliente
  { path: 'listado/:idcliente', canActivate: [ClienteGuard], component: SucursalPanelComponent },
  { path: 'crear/:idcliente', canActivate: [ClienteGuard], component: SucursalCrearEditarComponent },
  { path: 'editar/:idsucursal', canActivate: [ClienteGuard], component: SucursalCrearEditarComponent },
  { path: 'seleccionar', canActivate: [ClienteNegotisEmpleadoGuard], component: SucursalSeleccionarComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [
    ClienteGuard,
    ClienteNegotisEmpleadoGuard,
    SucursalService,
  ]
})
export class SucursalRoutingModule { }
