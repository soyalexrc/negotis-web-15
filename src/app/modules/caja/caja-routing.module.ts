import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TotalesGastosGuard} from '../../guard/totales-gastos.guard';
import {CajaPanelComponent} from '../../pages/cliente/caja-panel/caja-panel.component';
import {TotalesGuard} from '../../guard/totales.guard';
import {CajaTotalesComponent} from '../../pages/cliente/caja-totales/caja-totales.component';
import {CajaConfiguracionComponent} from '../../pages/cliente/caja-configuracion/caja-configuracion.component';
import {CajaService} from '../../Service/caja.service';

const routes: Routes = [
  // ******************General***************************************************
  { path: 'panel', canActivate: [TotalesGastosGuard], component: CajaPanelComponent },
  { path: 'totales', canActivate: [TotalesGuard], component: CajaTotalesComponent },
  { path: 'configuracion/panel', canActivate: [TotalesGastosGuard], component: CajaConfiguracionComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [
    TotalesGastosGuard,
    TotalesGuard,
    CajaService,
  ]
})
export class CajaRoutingModule { }
