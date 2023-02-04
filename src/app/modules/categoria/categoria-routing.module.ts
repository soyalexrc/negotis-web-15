import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductoGuard} from '../../guard/producto.guard';
import {CategotriaRubroService} from '../../Service/categotria-rubro.service';
import {CategoriarubroPanelComponent} from '../../pages/cliente/categoriarubro-panel/categoriarubro-panel.component';
import {CategoriarubroCrearEditarComponent} from '../../pages/cliente/categoriarubro-crear-editar/categoriarubro-crear-editar.component';

const routes: Routes = [
  // ******************General***************************************************
  { path: '', component: CategoriarubroPanelComponent },
  // cliente
  { path: 'panel', canActivate: [ProductoGuard], component: CategoriarubroPanelComponent },
  { path: 'crear', canActivate: [ProductoGuard], component: CategoriarubroCrearEditarComponent },
  { path: 'editar/:idcatrubro', canActivate: [ProductoGuard], component: CategoriarubroCrearEditarComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [
    ProductoGuard,
    CategotriaRubroService,
  ]
})
export class CategoriaRoutingModule { }
