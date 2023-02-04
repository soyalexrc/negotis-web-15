import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {CuentadetalleRoutingModule} from './cuentadetalle-routing.module';
import {PaginationModule} from '../../components/pagination/pagination.module';
import {CuentadetallePanelComponent} from '../../pages/cliente/cuentadetalle-panel/cuentadetalle-panel.component';
import {CuentadetalleCrearEditarComponent} from '../../pages/cliente/cuentadetalle-crear-editar/cuentadetalle-crear-editar.component';
import {FinanzasSetEstadoMasivoComponent} from '../../components/finanzas-set-estado-masivo/finanzas-set-estado-masivo.component';
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
    CuentadetalleRoutingModule,
  ],
  declarations: [
    CuentadetallePanelComponent,
    CuentadetalleCrearEditarComponent,
    FinanzasSetEstadoMasivoComponent
  ],
  entryComponents: [
  ]
})
export class CuentadetalleModule { }
