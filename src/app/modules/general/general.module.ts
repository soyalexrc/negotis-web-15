import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {GeneralRoutingModule} from './general-routing.module';
import {PaginationModule} from '../../components/pagination/pagination.module';
import {LoginComponent} from '../../pages/general/login/login.component';
import {ItemNoEncontradoComponent} from '../../pages/general/item-no-encontrado/item-no-encontrado.component';
import {UsuarioDashboardComponent} from '../../pages/cliente/usuario-dashboard/usuario-dashboard.component';
import {ZonaregionPanelComponent} from '../../pages/cliente/zonaregion-panel/zonaregion-panel.component';
import {ProductoPanelComponent} from '../../pages/cliente/producto-panel/producto-panel.component';
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
    GeneralRoutingModule,
  ],
  declarations: [
    LoginComponent,
    ItemNoEncontradoComponent,
    UsuarioDashboardComponent,
    ZonaregionPanelComponent,
    ProductoPanelComponent,
  ],
  entryComponents: [
  ]
})
export class GeneralModule { }
