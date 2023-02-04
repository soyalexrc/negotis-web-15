import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductoGuard} from '../../guard/producto.guard';
import {ArticuloPanelComponent} from '../../pages/cliente/articulo-panel/articulo-panel.component';
import {ArticuloCrearEditarComponent} from '../../pages/cliente/articulo-crear-editar/articulo-crear-editar.component';
import {ArticuloService} from '../../Service/articulo.service';
import { MateriaPrimaCrearEditarComponent } from 'src/app/pages/cliente/materiaprima-crear-editar/materiaprima-crear-editar.component';
import { MateriaPrimaGuard } from 'src/app/guard/materiaprima.guard';
import { MateriaPrimaService } from 'src/app/Service/materiaprima.service';
import { MateriaPrimaPanelComponent } from 'src/app/pages/cliente/materiaprima-panel/materiaprima-panel.component';

const routes: Routes = [
  // ******************General***************************************************
  { path: '', component: MateriaPrimaPanelComponent },
  // cliente
  { path: 'panel', canActivate: [MateriaPrimaGuard], component: MateriaPrimaPanelComponent },
  { path: 'crear', canActivate: [MateriaPrimaGuard], component: MateriaPrimaCrearEditarComponent },
  { path: 'editar/:idmateriaprima', canActivate: [MateriaPrimaGuard], component: MateriaPrimaCrearEditarComponent },
  { path: 'editar/:idmateriaprima/#', canActivate: [MateriaPrimaGuard], component: MateriaPrimaCrearEditarComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [
    MateriaPrimaGuard,
    ArticuloService,
    MateriaPrimaService
  ]
})
export class MateriaPrimaRoutingModule { }
