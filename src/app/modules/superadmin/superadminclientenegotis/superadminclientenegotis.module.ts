import { NgModule } from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {SuperadminclientenegotisRoutingModule} from './superadminclientenegotis-routing.module';
import {PaginationModule} from '../../../components/pagination/pagination.module';
import {ClientenegotisPanelComponent} from '../../../pages/superadmin/clientenegotis-panel/clientenegotis-panel.component';
import {ClientenegotisCrearEditarComponent} from '../../../pages/superadmin/clientenegotis-crear-editar/clientenegotis-crear-editar.component';
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
    SuperadminclientenegotisRoutingModule,
  ],
  declarations: [
    ClientenegotisPanelComponent,
    ClientenegotisCrearEditarComponent,
  ],
  entryComponents: [
  ]
})
export class SuperadminclientenegotisModule { }
