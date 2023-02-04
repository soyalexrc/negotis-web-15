import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GastosGuard} from '../../guard/gastos.guard';
import {CategoriaGastoService} from '../../Service/categoriagasto.service';
import {CategoriagastoCrearEditarComponent} from '../../pages/cliente/categoriagasto-crear-editar/categoriagasto-crear-editar.component';
import {CategoriagastoPanelComponent} from '../../pages/cliente/categoriagasto-panel/categoriagasto-panel.component';

const routes: Routes = [
  { path: '', component: CategoriagastoPanelComponent },
  // ******************General***************************************************
  { path: 'editar/:id', canActivate: [GastosGuard], component: CategoriagastoCrearEditarComponent },
  { path: 'crear', canActivate: [GastosGuard], component: CategoriagastoCrearEditarComponent },
  { path: 'panel', canActivate: [GastosGuard], component: CategoriagastoPanelComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [
    GastosGuard,
    CategoriaGastoService,
  ]
})
export class CategoriagastoRoutingModule { }
