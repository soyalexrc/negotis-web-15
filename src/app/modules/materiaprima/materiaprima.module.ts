import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {PaginationModule} from '../../components/pagination/pagination.module';
import {ArticuloPanelComponent} from '../../pages/cliente/articulo-panel/articulo-panel.component';
import {ArticuloCrearEditarComponent} from '../../pages/cliente/articulo-crear-editar/articulo-crear-editar.component';
import {ArticuloCantidadModalComponent} from '../../components/articulo-cantidad-modal/articulo-cantidad-modal.component';
import {UseriosucursalModalComponent} from '../../components/useriosucursal-modal/useriosucursal-modal.component';
//import {ModificarValorModalComponent} from '../../components/modificar-valor-modal/modificar-valor-modal.component';
import {ActualizarPrecioModalComponent} from '../../components/actualizar-precio-modal/actualizar-precio-modal.component';
import { MateriaPrimaRoutingModule } from './materiaprima-routing.module';
import { MateriaPrimaCrearEditarComponent } from 'src/app/pages/cliente/materiaprima-crear-editar/materiaprima-crear-editar.component';
import { MateriaPrimaPanelComponent } from 'src/app/pages/cliente/materiaprima-panel/materiaprima-panel.component';
import { MateriaPrimaCantidadModalComponent } from 'src/app/components/materiaprima-cantidad-modal/materiaprima-cantidad-modal.component';
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
    MateriaPrimaRoutingModule,
  ],
  declarations: [
    MateriaPrimaCrearEditarComponent,
    MateriaPrimaCantidadModalComponent,
    MateriaPrimaPanelComponent,
    //ModificarValorModalComponent
  ],
  entryComponents: [
    MateriaPrimaCantidadModalComponent,
   // ModificarValorModalComponent
  ]
})
export class MateriaPrimaModule { }
