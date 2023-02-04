import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClienteGuard} from '../../guard/cliente.guard';
import {ClienteNegotisEmpleadoGuard} from '../../guard/cliente-negotis-empleado.guard';
import { FichaMedicaCrearEditarComponent } from 'src/app/pages/general/fichamedica-crear-editar/fichamedica-crear-editar.component';
import { FichaMedicaService } from 'src/app/Service/fichamedica.service';
import { FichaMedicaPanelComponent } from 'src/app/pages/general/fichamedica-panel/fichamedica-panel.component';

const routes: Routes = [
  // ******************General***************************************************
  { path: '', component: FichaMedicaPanelComponent },
  // cliente
  { path: 'listado/:idcliente', canActivate: [ClienteGuard], component: FichaMedicaPanelComponent },
  { path: 'crear/:idcliente', canActivate: [ClienteGuard], component: FichaMedicaCrearEditarComponent },
  { path: 'editar/:fichamedica', canActivate: [ClienteGuard], component: FichaMedicaCrearEditarComponent },
 // { path: 'seleccionar', canActivate: [ClienteNegotisEmpleadoGuard], component: FichaMedicaSeleccionarComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [
    ClienteGuard,
    ClienteNegotisEmpleadoGuard,
    FichaMedicaService,
  ]
})
export class FichaMedicaRoutingModule { }
