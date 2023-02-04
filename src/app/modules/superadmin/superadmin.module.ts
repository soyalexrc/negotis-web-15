import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {SuperadminRoutingModule} from './superadmin-routing.module';
import {PaginationModule} from '../../components/pagination/pagination.module';
import {SuperadminPanelComponent} from '../../pages/superadmin/superadmin-panel/superadmin-panel.component';
import {SuperadminCrearEditarComponent} from '../../pages/superadmin/superadmin-crear-editar/superadmin-crear-editar.component';
import {SuperadminInicioComponent} from '../../pages/superadmin/superadmin-inicio/superadmin-inicio.component';
import {PasswordSuperadminEditarComponent} from '../../pages/superadmin/password-superadmin-editar/password-superadmin-editar.component';
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
    SuperadminRoutingModule,
  ],
  declarations: [
    SuperadminInicioComponent,
    SuperadminPanelComponent,
    SuperadminCrearEditarComponent,
    PasswordSuperadminEditarComponent,
  ],
  entryComponents: [
  ]
})
export class SuperadminModule { }
