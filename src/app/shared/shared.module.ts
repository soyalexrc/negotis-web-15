import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ToolbarTwoComponent} from '../components/toolbar-two/toolbar-two.component';
import {DatepickerModalComponent} from '../components/datepicker-modal/datepicker-modal.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {ClienteclienteService} from '../Service/clientecliente.service';
import {SearchModalComponent} from '../components/search-modal/search-modal.component';
import {LoadingModalComponent} from '../components/loading-modal/loading-modal.component';
import {ToolbarOneComponent} from '../components/toolbar-one/toolbar-one.component';
import {SucursalPanelComponent} from '../pages/general/sucursal-panel/sucursal-panel.component';
import {SucursalCrearEditarComponent} from '../pages/general/sucursal-crear-editar/sucursal-crear-editar.component';
import {SucursalSeleccionarComponent} from '../pages/cliente/sucursal-seleccionar/sucursal-seleccionar.component';
import {EliminarModalComponent} from '../components/eliminar-modal/eliminar-modal.component';
import {ErrorforaneaModalComponent} from '../components/errorforanea-modal/errorforanea-modal.component';
import {MensajeseleccionarsucursalModalComponent} from '../components/mensajeseleccionarsucursal-modal/mensajeseleccionarsucursal-modal.component';
import {SnackBarOperacionExitosaComponent} from '../components/snack-bar-operacion-exitosa/snack-bar-operacion-exitosa.component';
import {FotoCrearEditarModalComponent} from '../components/foto-crear-editar-modal/foto-crear-editar-modal.component';
import {EspecificacionModalComponent} from '../components/especificacion-modal/especificacion-modal.component';
import {ResetPasswordModalComponent} from '../components/reset-password-modal/reset-password-modal.component';
import { AgregararticuloModalComponent } from '../components/agregararticulo-modal/agregararticulo-modal.component';
import { AgregarMPModalPrecioComponent } from '../components/agregarMP-precio-modal/agregarMP-precio-modal.component';
import { AgregarMPModalComponent } from '../components/agregarMP-modal/agregarMP-modal.component';
import { PadnumericoModalComponent } from '../components/padnumerico-modal/padnumerico-modal.component';
import { PaginationModule } from '../components/pagination/pagination.module';
import { CambiarEstadoModalComponent } from '../components/cambiar-estado-modal/cambiar-estado-modal.component';
import { MensajeModalComponent } from '../components/mensaje-modal/mensaje-modal.component';
import { DescripcionModalComponent } from '../components/descripcion-modal/descripcion-modal.component';
import { FichaMedicaPanelComponent } from '../pages/general/fichamedica-panel/fichamedica-panel.component';
import { FichaMedicaCrearEditarComponent } from '../pages/general/fichamedica-crear-editar/fichamedica-crear-editar.component';
import { ModificarValorModal2Component } from '../components/modificar-valor-modal2/modificar-valor-modal2.component';
import { ObservacionModalComponent } from '../components/observacion-modal/observacion-modal.component';
import { FacturaWSModalComponent } from '../components/factura-ws-modal/factura-ws.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatNativeDateModule} from "@angular/material/core";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatSnackBarModule} from "@angular/material/snack-bar";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatToolbarModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatButtonModule,
    MatTableModule,
    MatSidenavModule,
    MatDialogModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSnackBarModule,
    PaginationModule,
    NgbModule,
    MatDialogModule,
  ],
  declarations: [
    ToolbarOneComponent,
    ToolbarTwoComponent,
    DatepickerModalComponent,
    SearchModalComponent,
    LoadingModalComponent,

    SucursalPanelComponent,
    FichaMedicaPanelComponent,
    FichaMedicaCrearEditarComponent,
    SucursalCrearEditarComponent,
    SucursalSeleccionarComponent,
    ModificarValorModal2Component,
    EliminarModalComponent,
    ErrorforaneaModalComponent,
    MensajeseleccionarsucursalModalComponent,
    SnackBarOperacionExitosaComponent,
    FotoCrearEditarModalComponent,
    EspecificacionModalComponent,
    DescripcionModalComponent,
    ObservacionModalComponent,
    ResetPasswordModalComponent,
    AgregararticuloModalComponent,
    AgregarMPModalPrecioComponent,
    AgregarMPModalComponent,
    PadnumericoModalComponent,
    CambiarEstadoModalComponent,
    MensajeModalComponent,
    FacturaWSModalComponent


  ],
  exports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatToolbarModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatButtonModule,
    MatTableModule,
    MatSidenavModule,
    MatDialogModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSnackBarModule,
    ModificarValorModal2Component,
    ToolbarOneComponent,
    ToolbarTwoComponent,
    DatepickerModalComponent,

    SucursalPanelComponent,
    FichaMedicaPanelComponent,
    FichaMedicaCrearEditarComponent,
    SucursalCrearEditarComponent,
    SucursalSeleccionarComponent,

    EliminarModalComponent,
    ErrorforaneaModalComponent,
    MensajeseleccionarsucursalModalComponent,
    SnackBarOperacionExitosaComponent,
    FotoCrearEditarModalComponent,
    EspecificacionModalComponent,
    DescripcionModalComponent,
    ObservacionModalComponent,
    ResetPasswordModalComponent,
    AgregararticuloModalComponent,
    AgregarMPModalPrecioComponent,
    AgregarMPModalComponent,
    PadnumericoModalComponent,
    CambiarEstadoModalComponent,
    MensajeModalComponent,
    FacturaWSModalComponent

  ],
  entryComponents: [
    DatepickerModalComponent,
    SearchModalComponent,
    LoadingModalComponent,
    EliminarModalComponent,
    ErrorforaneaModalComponent,
    MensajeseleccionarsucursalModalComponent,
    SnackBarOperacionExitosaComponent,
    FotoCrearEditarModalComponent,
    EspecificacionModalComponent,
    DescripcionModalComponent,
    ObservacionModalComponent,
    ResetPasswordModalComponent,
    AgregararticuloModalComponent,
    AgregarMPModalPrecioComponent,
    AgregarMPModalComponent,
    PadnumericoModalComponent,
    CambiarEstadoModalComponent,
    MensajeModalComponent,
    ModificarValorModal2Component,
    FacturaWSModalComponent
  ],
  providers: [
    ClienteclienteService
  ]
})
export class SharedModule {}
