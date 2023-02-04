import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClienteGuard} from '../../guard/cliente.guard';
import {RutaPanelComponent} from '../../pages/cliente/ruta-panel/ruta-panel.component';
import {RutaCrearEditarComponent} from '../../pages/cliente/ruta-crear-editar/ruta-crear-editar.component';
import {RutaService} from '../../Service/ruta.service';
import {ZonaPanelComponent} from '../../pages/cliente/zona-panel/zona-panel.component';
import {ZonaCrearEditarComponent} from '../../pages/cliente/zona-crear-editar/zona-crear-editar.component';
import {ZonaService} from '../../Service/zona.service';

const routes: Routes = [
  // ******************General***************************************************
  { path: '', component: ZonaPanelComponent },
  { path: 'panel', canActivate: [ClienteGuard], component: ZonaPanelComponent },
  { path: 'crear', canActivate: [ClienteGuard], component: ZonaCrearEditarComponent },
  { path: 'editar/:idzona', canActivate: [ClienteGuard], component: ZonaCrearEditarComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [
    ClienteGuard,
    ZonaService,
  ]
})
export class ZonaRoutingModule { }
