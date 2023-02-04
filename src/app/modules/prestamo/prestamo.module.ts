import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {PaginationModule} from '../../components/pagination/pagination.module';
import { PrestamosRoutingModule } from './prestamo-routing.module';
import { PrestamosPanelComponent } from 'src/app/pages/cliente/prestamos-panel/prestamos-panel.component';
import { PrestamosCrearEditarComponent } from 'src/app/pages/cliente/prestamos-crear-editar/prestamos-crear-editar.component';
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
    PrestamosRoutingModule,
  ],
  declarations: [
    PrestamosPanelComponent,
    PrestamosCrearEditarComponent,

  ],
  entryComponents: [

  ]
})
export class PrestamosModule { }
