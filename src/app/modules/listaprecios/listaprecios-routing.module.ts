import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PrecioGuard} from '../../guard/precio.guard';
import {ListapreciosPanelComponent} from '../../pages/cliente/listaprecios-panel/listaprecios-panel.component';
import {ListapreciosCrearEditarComponent} from '../../pages/cliente/listaprecios-crear-editar/listaprecios-crear-editar.component';
import {ListaPreciosService} from '../../Service/lista-precios.service';

const routes: Routes = [
  // ******************General***************************************************
  { path: '', component: ListapreciosPanelComponent },
  // cliente
  { path: 'panel', canActivate: [PrecioGuard], component: ListapreciosPanelComponent },
  { path: 'crear', canActivate: [PrecioGuard], component: ListapreciosCrearEditarComponent },
  { path: 'editar/:idlistaprecios', canActivate: [PrecioGuard], component: ListapreciosCrearEditarComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [
    PrecioGuard,
    ListaPreciosService,
  ]
})
export class ListapreciosRoutingModule { }
