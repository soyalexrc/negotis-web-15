import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {UsuarioRoutingModule} from './usuario-routing.module';
import {PaginationModule} from '../../components/pagination/pagination.module';
import {ArticuloPanelComponent} from '../../pages/cliente/articulo-panel/articulo-panel.component';
import {ArticuloCrearEditarComponent} from '../../pages/cliente/articulo-crear-editar/articulo-crear-editar.component';
import {UsuarioPanelComponent} from '../../pages/cliente/usuario-panel/usuario-panel.component';
import {PasswordEditarComponent} from '../../pages/cliente/password-editar/password-editar.component';
import {UsuarioMiinformacionComponent} from '../../pages/cliente/usuario-miinformacion/usuario-miinformacion.component';
import {UsercomisionclientenegotisComponent} from '../../pages/cliente/usercomisionclientenegotis/usercomisionclientenegotis.component';
import {StatusClienteMostradorModalComponent} from '../../components/status-cliente-mostrador-modal/status-cliente-mostrador-modal.component';
import {OcultarLogoimpresionesModalComponent} from '../../components/ocultar-logo-modal/ocultar-logo-modal.component';
import {FacturaDatosStatusModalComponent} from '../../components/factura-datos-status-modal/factura-datos-status-modal.component';
import {HabilitarAfipModalComponent} from '../../components/habilitar-afip-modal/habilitar-afip-modal.component';
import {TarjetaCrearEditarComponent} from '../../pages/cliente/tarjeta-crear-editar/tarjeta-crear-editar.component';
import {TarjetaPanelComponent} from '../../pages/cliente/tarjeta-panel/tarjeta-panel.component';
import { MensajeUsuarioComponent } from 'src/app/pages/cliente/mensaje-usuario/mensaje-usuario.component';
import {TurnoPanelComponent} from '../../pages/cliente/turno-panel/turno-panel.component';
import {TurnoCrearEditarComponent} from '../../pages/cliente/turno-crear-editar/turno-crear-editar.component';
import { OcultarTelefonoimpresionesModalComponent } from 'src/app/components/ocultar-telefono-modal/ocultar-telefono-modal.component';
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
    UsuarioRoutingModule,

  ],
  declarations: [
    UsuarioPanelComponent,
    PasswordEditarComponent,
    UsuarioMiinformacionComponent,
    UsercomisionclientenegotisComponent,
    StatusClienteMostradorModalComponent,
    OcultarLogoimpresionesModalComponent,
    FacturaDatosStatusModalComponent,
    HabilitarAfipModalComponent,
    TarjetaCrearEditarComponent,
    TarjetaPanelComponent,
    MensajeUsuarioComponent,
    TurnoPanelComponent,
    TurnoCrearEditarComponent,
    OcultarTelefonoimpresionesModalComponent
  ],
  entryComponents: [
    StatusClienteMostradorModalComponent,
    OcultarLogoimpresionesModalComponent,
    FacturaDatosStatusModalComponent,
    HabilitarAfipModalComponent,
    OcultarTelefonoimpresionesModalComponent
  ]
})
export class UsuarioModule { }
