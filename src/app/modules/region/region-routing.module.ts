import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClienteGuard} from '../../guard/cliente.guard';
import {RegionPanelComponent} from '../../pages/cliente/region-panel/region-panel.component';
import {RegionCrearEditarComponent} from '../../pages/cliente/region-crear-editar/region-crear-editar.component';
import {RegionService} from '../../Service/region.service';

const routes: Routes = [
  // ******************General***************************************************
  { path: '', component: RegionPanelComponent },
  { path: 'panel', canActivate: [ClienteGuard], component: RegionPanelComponent },
  { path: 'crear', canActivate: [ClienteGuard], component: RegionCrearEditarComponent },
  { path: 'editar/:idregion', canActivate: [ClienteGuard], component: RegionCrearEditarComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [
    ClienteGuard,
    RegionService,
  ]
})
export class RegionRoutingModule { }
