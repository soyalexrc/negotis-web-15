import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductoGuard} from '../../guard/producto.guard';
import {CategotriaRubroService} from '../../Service/categotria-rubro.service';
import {CategoriaclientePanelComponent} from '../../pages/cliente/categoriacliente-panel/categoriacliente-panel.component';
import {CategoriaclienteCrearEditarComponent} from '../../pages/cliente/categoriacliente-crear-editar/categoriacliente-crear-editar.component';
import { CategotriaClienteService } from 'src/app/Service/categoria-cliente.service';

const routes: Routes = [
  // ******************General***************************************************
  { path: '', component: CategoriaclientePanelComponent },
  // cliente
  { path: 'panel', canActivate: [ProductoGuard], component: CategoriaclientePanelComponent },
  { path: 'crear', canActivate: [ProductoGuard], component: CategoriaclienteCrearEditarComponent },
  { path: 'editar/:idcatcliente', canActivate: [ProductoGuard], component: CategoriaclienteCrearEditarComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [
    ProductoGuard,
    CategotriaClienteService,
  ]
})
export class CategoriaclienteRoutingModule { }
