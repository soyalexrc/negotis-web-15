import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClienteGuard} from '../../guard/cliente.guard';
import {RutaPanelComponent} from '../../pages/cliente/ruta-panel/ruta-panel.component';
import {RutaCrearEditarComponent} from '../../pages/cliente/ruta-crear-editar/ruta-crear-editar.component';
import {RutaService} from '../../Service/ruta.service';

const routes: Routes = [
  // ******************General***************************************************
  { path: '', component: RutaPanelComponent },
  { path: 'panel', canActivate: [ClienteGuard], component: RutaPanelComponent },
  { path: 'crear', canActivate: [ClienteGuard], component: RutaCrearEditarComponent },
  { path: 'editar/:id', canActivate: [ClienteGuard], component: RutaCrearEditarComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [
    ClienteGuard,
    RutaService,
  ]
})
export class RutaRoutingModule { }
