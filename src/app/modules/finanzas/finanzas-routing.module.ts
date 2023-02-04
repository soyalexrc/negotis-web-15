import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClienteGuard} from '../../guard/cliente.guard';
import {FinanzasPanelComponent} from '../../pages/cliente/finanzas-panel/finanzas-panel.component';
import {FinanzasConfiguracionPanelComponent} from '../../pages/cliente/finanzas-configuracion-panel/finanzas-configuracion-panel.component';

const routes: Routes = [
  { path: '', component: FinanzasPanelComponent },
  // ******************General***************************************************
  { path: 'panel', canActivate: [ClienteGuard], component: FinanzasPanelComponent },
  { path: 'configuracion/panel', canActivate: [ClienteGuard], component: FinanzasConfiguracionPanelComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [
    ClienteGuard,
  ]
})
export class FinanzasRoutingModule { }
