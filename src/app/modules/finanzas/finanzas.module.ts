import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {FinanzasRoutingModule} from './finanzas-routing.module';
import {PaginationModule} from '../../components/pagination/pagination.module';
import {MatCardModule} from "@angular/material/card";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {FinanzasPanelComponent} from '../../pages/cliente/finanzas-panel/finanzas-panel.component';
import {FinanzasConfiguracionPanelComponent} from '../../pages/cliente/finanzas-configuracion-panel/finanzas-configuracion-panel.component';

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
    FinanzasRoutingModule,
  ],
  declarations: [
    FinanzasPanelComponent,
    FinanzasConfiguracionPanelComponent
  ],
  entryComponents: [
  ]
})
export class FinanzasModule { }
