import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '../../pages/general/login/login.component';
import {ItemNoEncontradoComponent} from '../../pages/general/item-no-encontrado/item-no-encontrado.component';
import {ClienteNegotisEmpleadoGuard} from '../../guard/cliente-negotis-empleado.guard';
import {UsuarioDashboardComponent} from '../../pages/cliente/usuario-dashboard/usuario-dashboard.component';
import {ComisionGuard} from '../../guard/comision.guard';
import {ClienteGuard} from '../../guard/cliente.guard';
import {ZonaregionPanelComponent} from '../../pages/cliente/zonaregion-panel/zonaregion-panel.component';
import {ProductoGuard} from '../../guard/producto.guard';
import {ProductoPanelComponent} from '../../pages/cliente/producto-panel/producto-panel.component';
import { ProduccionGuard } from 'src/app/guard/produccion.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'item/noencontrado', component: ItemNoEncontradoComponent },
  { path: 'inicio', canActivate: [ClienteNegotisEmpleadoGuard], component: UsuarioDashboardComponent },
  { path: 'cliente/zona/region/panel', canActivate: [ClienteGuard], component: ZonaregionPanelComponent },
  { path: 'cliente/producto/panel', canActivate: [ProductoGuard], component: ProductoPanelComponent }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [
    ClienteNegotisEmpleadoGuard,
    ComisionGuard,
    ClienteGuard,
    ProductoGuard,    
  ]
})
export class GeneralRoutingModule { }
