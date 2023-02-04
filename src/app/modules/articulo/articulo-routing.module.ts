import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductoGuard} from '../../guard/producto.guard';
import {ArticuloPanelComponent} from '../../pages/cliente/articulo-panel/articulo-panel.component';
import {ArticuloCrearEditarComponent} from '../../pages/cliente/articulo-crear-editar/articulo-crear-editar.component';
import {ArticuloService} from '../../Service/articulo.service';

const routes: Routes = [
  // ******************General***************************************************
  { path: '', component: ArticuloPanelComponent },
  // cliente
  { path: 'panel', canActivate: [ProductoGuard], component: ArticuloPanelComponent },
  { path: 'crear', canActivate: [ProductoGuard], component: ArticuloCrearEditarComponent },
  { path: 'editar/:idarticulo', canActivate: [ProductoGuard], component: ArticuloCrearEditarComponent },
  { path: 'editar/:idarticulo/#', canActivate: [ProductoGuard], component: ArticuloCrearEditarComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [
    ProductoGuard,
    ArticuloService,
  ]
})
export class ArticuloRoutingModule { }
