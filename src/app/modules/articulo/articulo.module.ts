import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ArticuloRoutingModule} from './articulo-routing.module';
import {PaginationModule} from '../../components/pagination/pagination.module';
import {ArticuloPanelComponent} from '../../pages/cliente/articulo-panel/articulo-panel.component';
import {ArticuloCrearEditarComponent} from '../../pages/cliente/articulo-crear-editar/articulo-crear-editar.component';
import {ArticuloCantidadModalComponent} from '../../components/articulo-cantidad-modal/articulo-cantidad-modal.component';
import {UseriosucursalModalComponent} from '../../components/useriosucursal-modal/useriosucursal-modal.component';
import {ModificarValorModalComponent} from '../../components/modificar-valor-modal/modificar-valor-modal.component';
import {ActualizarPrecioModalComponent} from '../../components/actualizar-precio-modal/actualizar-precio-modal.component';
import { ArticuloMateriaPrimaModalComponent } from 'src/app/components/articulo-materiaprima-modal/articulo-materiaprima-modal.component';
import { VisualizarMPModalComponent } from 'src/app/components/visualizarMP-modal/visualizarMP-modal.component';
import { ComboArticuloModalComponent } from 'src/app/components/articulo-combo-modal/articulo-combo-modal.component';
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
    ArticuloRoutingModule,
  ],
  declarations: [
    ArticuloPanelComponent,
    ArticuloCrearEditarComponent,
    ArticuloCantidadModalComponent,
    UseriosucursalModalComponent,
    ModificarValorModalComponent,
    ActualizarPrecioModalComponent,
    ArticuloMateriaPrimaModalComponent,
    VisualizarMPModalComponent,
    ComboArticuloModalComponent
  ],
  entryComponents: [
    ArticuloCantidadModalComponent,
    UseriosucursalModalComponent,
    ModificarValorModalComponent,
    ActualizarPrecioModalComponent,
    ArticuloMateriaPrimaModalComponent,
    VisualizarMPModalComponent,
    ComboArticuloModalComponent
  ]
})
export class ArticuloModule { }
