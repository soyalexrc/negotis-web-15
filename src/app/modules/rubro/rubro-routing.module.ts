import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductoGuard} from '../../guard/producto.guard';
import {RubroService} from '../../Service/rubro.service';
import {RubroPanelComponent} from '../../pages/cliente/rubro-panel/rubro-panel.component';
import {RubroCrearEditarComponent} from '../../pages/cliente/rubro-crear-editar/rubro-crear-editar.component';

const routes: Routes = [
  // ******************General***************************************************
  { path: '', component: RubroPanelComponent },
  // cliente
  { path: 'panel', canActivate: [ProductoGuard], component: RubroPanelComponent },
  { path: 'crear', canActivate: [ProductoGuard], component: RubroCrearEditarComponent },
  { path: 'editar/:idrubro', canActivate: [ProductoGuard], component: RubroCrearEditarComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [
    ProductoGuard,
    RubroService,
  ]
})
export class RubroRoutingModule { }
