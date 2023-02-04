import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProveedorPanelComponent} from '../../pages/cliente/proveedor-panel/proveedor-panel.component';
import {ProveedorCrearEditarComponent} from '../../pages/cliente/proveedor-crear-editar/proveedor-crear-editar.component';
import {ProveedorService} from '../../Service/proveedor.service';
import {ProveedorGuard} from '../../guard/proveedor.guard';

const routes: Routes = [
  // ******************General***************************************************
  { path: '', component: ProveedorPanelComponent },
  // cliente
  { path: 'panel', canActivate: [ProveedorGuard], component: ProveedorPanelComponent },
  { path: 'crear', canActivate: [ProveedorGuard], component: ProveedorCrearEditarComponent },
  { path: 'editar/:id', canActivate: [ProveedorGuard], component: ProveedorCrearEditarComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [
    ProveedorGuard,
    ProveedorService,
  ]
})
export class ProveedorRoutingModule { }
