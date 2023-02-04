import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReportesGuard} from '../../guard/reportes.guard';
import {ReportesPanelComponent} from '../../pages/cliente/reportes-panel/reportes-panel.component';
import {ReporteConsolidadoGuard} from '../../guard/reporte-consolidado.guard';
import {ReporteConsolidadoPanelComponent} from '../../pages/cliente/reporte-consolidado-panel/reporte-consolidado-panel.component';
import {AlarmaStockGuard} from '../../guard/alarma-stock.guard';
import {AlarmaStockPanelComponent} from '../../pages/cliente/alarma-stock-panel/alarma-stock-panel.component';
import {VencimientoStockGuard} from '../../guard/vencimiento-stock.guard';
import {VencimientoStockPanelComponent} from '../../pages/cliente/vencimiento-stock-panel/vencimiento-stock-panel.component';
import {RankClientesGuard} from '../../guard/rank-clientes.guard';
import {RankClientesComponent} from '../../pages/cliente/rank-clientes-panel/rank-clientes-panel.component';
import {ComisionGuard} from '../../guard/comision.guard';
import {ComisionPanelComponent} from '../../pages/cliente/comision-panel/comision-panel.component';
import { ReporteConsolidadoMPPanelComponent } from 'src/app/pages/cliente/reporte-consolidadoMP-panel/reporte-consolidadoMP-panel.component';
import { ReporteConsolidadoMPGuard } from 'src/app/guard/reporte-consolidadoMP.guard';
import { LibroVentasGuard } from 'src/app/guard/libro-ventas.guard';
import { LibroVentasPanelComponent } from 'src/app/pages/cliente/libro-ventas-panel/libro-ventas-panel.component';
import { LibroComprasGuard } from 'src/app/guard/libro-compras.guard';
import { LibroComprasPanelComponent } from 'src/app/pages/cliente/libro-compras-panel/libro-compras-panel.component';
import { CuentasGuard } from 'src/app/guard/cuentas.guard';
import { CuentasPanelComponent } from 'src/app/pages/cliente/cuentas-panel/cuentas-panel.component';
import { VencimientoOfertaPanelComponent } from 'src/app/pages/cliente/vencimiento-oferta-panel/vencimiento-oferta-panel.component';

const routes: Routes = [
  // ******************General***************************************************
  { path: 'panel', canActivate: [ReportesGuard], component: ReportesPanelComponent },
  { path: 'consolidado/panel', canActivate: [ReporteConsolidadoGuard], component: ReporteConsolidadoPanelComponent },
  { path: 'consolidadoMP/panel', canActivate: [ReporteConsolidadoGuard], component: ReporteConsolidadoMPPanelComponent },
  { path: 'alarma-stock/panel', canActivate: [AlarmaStockGuard], component: AlarmaStockPanelComponent },
  { path: 'vencimiento-stock/panel', canActivate: [VencimientoStockGuard], component: VencimientoStockPanelComponent },
  { path: 'vencimiento-oferta/panel', canActivate: [VencimientoStockGuard], component: VencimientoOfertaPanelComponent },
  { path: 'comision/panel', canActivate: [ComisionGuard], component: ComisionPanelComponent },
  { path: 'rank-clientes/panel', canActivate: [RankClientesGuard], component: RankClientesComponent },
  { path: 'libro-ventas/panel', canActivate: [LibroVentasGuard], component: LibroVentasPanelComponent },
  { path: 'libro-compras/panel', canActivate: [LibroComprasGuard], component: LibroComprasPanelComponent },
  { path: 'cuentas/panel', canActivate: [CuentasGuard], component: CuentasPanelComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [
    ReportesGuard,
    ReporteConsolidadoGuard,
    ReporteConsolidadoMPGuard,
    AlarmaStockGuard,
    VencimientoStockGuard,
    ComisionGuard,
    RankClientesGuard,
    LibroVentasGuard,
    CuentasGuard
  ]
})
export class ReporteRoutingModule { }
