import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {CajaRoutingModule} from './caja-routing.module';
import {PaginationModule} from '../../components/pagination/pagination.module';
import {CajaPanelComponent} from '../../pages/cliente/caja-panel/caja-panel.component';
import {CajaTotalesComponent} from '../../pages/cliente/caja-totales/caja-totales.component';
import {CajaConfiguracionComponent} from '../../pages/cliente/caja-configuracion/caja-configuracion.component';
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
    CajaRoutingModule,
  ],
  declarations: [
    CajaPanelComponent,
    CajaTotalesComponent,
    CajaConfiguracionComponent,
  ],
  entryComponents: [
  ]
})
export class CajaModule { }
