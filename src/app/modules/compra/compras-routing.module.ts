import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AgregararticuloModalComponent } from "src/app/components/agregararticulo-modal/agregararticulo-modal.component";
import { PedidoGuard } from "../../guard/pedido.guard";
import { CompraproviderCrearEditarComponent } from "../../pages/cliente/compraprovider-crear-editar/compraprovider-crear-editar.component";
import { CompraproviderPanelComponent } from "../../pages/cliente/compraprovider-panel/compraprovider-panel.component";
import { CompraproveedorService } from "../../Service/compraproveedor.service";

const routes: Routes = [
  // ******************General***************************************************
  { path: '', component: CompraproviderPanelComponent },
  { path: 'panel', canActivate: [PedidoGuard], component: CompraproviderPanelComponent },
  { path: 'crear', canActivate: [PedidoGuard], component: CompraproviderCrearEditarComponent },
  { path: 'editar/:idcompra', canActivate: [PedidoGuard], component: CompraproviderCrearEditarComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [
    PedidoGuard,
    CompraproveedorService,
  ]
})
export class ComprasRoutingModule { }