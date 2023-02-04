import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CajaService} from '../../Service/caja.service';
import {GastosGuard} from '../../guard/gastos.guard';
import {GastosPanelComponent} from '../../pages/cliente/gastos-panel/gastos-panel.component';
import {GastosCrearEditarComponent} from '../../pages/cliente/gastos-crear-editar/gastos-crear-editar.component';
import {CategoriaGastoService} from '../../Service/categoriagasto.service';

const routes: Routes = [
  { path: '', component: GastosPanelComponent },
  // ******************General***************************************************
  { path: 'panel', canActivate: [GastosGuard], component: GastosPanelComponent },
  { path: 'crear', canActivate: [GastosGuard], component: GastosCrearEditarComponent },
  { path: 'editar/:idgasto', canActivate: [GastosGuard], component: GastosCrearEditarComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [
    GastosGuard,
    CajaService,
    CategoriaGastoService,
  ]
})
export class GastoRoutingModule { }
