import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductoGuard} from '../../guard/producto.guard';
import {MarcaPanelComponent} from '../../pages/cliente/marca-panel/marca-panel.component';
import {MarcaCrearEditarComponent} from '../../pages/cliente/marca-crear-editar/marca-crear-editar.component';
import {MarcaService} from '../../Service/marca.service';

const routes: Routes = [
  // ******************General***************************************************
  { path: '', component: MarcaPanelComponent },
  // cliente
  { path: 'panel', canActivate: [ProductoGuard], component: MarcaPanelComponent },
  { path: 'crear', canActivate: [ProductoGuard], component: MarcaCrearEditarComponent },
  { path: 'editar/:idmarca', canActivate: [ProductoGuard], component: MarcaCrearEditarComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [
    ProductoGuard,
    MarcaService,
  ]
})
export class MarcaRoutingModule { }
