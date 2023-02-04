import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ReporteRoutingModule} from './reporte-routing.module';
import {PaginationModule} from '../../components/pagination/pagination.module';
import {ReportesPanelComponent} from '../../pages/cliente/reportes-panel/reportes-panel.component';
import {ReporteConsolidadoPanelComponent} from '../../pages/cliente/reporte-consolidado-panel/reporte-consolidado-panel.component';
import {RankClientesComponent} from '../../pages/cliente/rank-clientes-panel/rank-clientes-panel.component';
import {AlarmaStockPanelComponent} from '../../pages/cliente/alarma-stock-panel/alarma-stock-panel.component';
import {VencimientoStockPanelComponent} from '../../pages/cliente/vencimiento-stock-panel/vencimiento-stock-panel.component';
import {ComisionPanelComponent} from '../../pages/cliente/comision-panel/comision-panel.component';
import {EstadocomisionModalComponent} from '../../components/estadocomision-modal/estadocomision-modal.component';
import { ReporteConsolidadoMPPanelComponent } from 'src/app/pages/cliente/reporte-consolidadoMP-panel/reporte-consolidadoMP-panel.component';
import { LibroVentasPanelComponent } from 'src/app/pages/cliente/libro-ventas-panel/libro-ventas-panel.component';
import { LibroComprasPanelComponent } from 'src/app/pages/cliente/libro-compras-panel/libro-compras-panel.component';
import { CuentasPanelComponent } from 'src/app/pages/cliente/cuentas-panel/cuentas-panel.component';
import { VencimientoOfertaPanelComponent } from 'src/app/pages/cliente/vencimiento-oferta-panel/vencimiento-oferta-panel.component';
import { LineChartComponent } from 'src/app/components/line-chart-modal/line-chart.component';
import { NgChartsModule } from 'ng2-charts';
import {MatCardModule} from "@angular/material/card";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatAutocompleteModule} from "@angular/material/autocomplete";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatCardModule,
    MatExpansionModule,
    MatAutocompleteModule,
    FormsModule,
    PaginationModule,
    ReactiveFormsModule,
    ReporteRoutingModule,
    NgChartsModule
  ],
  declarations: [
    ReportesPanelComponent,
    ReporteConsolidadoPanelComponent,
    ReporteConsolidadoMPPanelComponent,
    AlarmaStockPanelComponent,
    VencimientoStockPanelComponent,
    VencimientoOfertaPanelComponent,
    ComisionPanelComponent,
    EstadocomisionModalComponent,
    RankClientesComponent,
    LibroVentasPanelComponent,
    LibroComprasPanelComponent,
    CuentasPanelComponent,
    LineChartComponent,
  ],
  entryComponents: [
    EstadocomisionModalComponent,
    LineChartComponent,
  ]
})
export class ReporteModule { }
