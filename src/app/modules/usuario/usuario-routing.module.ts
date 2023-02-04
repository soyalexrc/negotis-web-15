import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductoGuard} from '../../guard/producto.guard';
import {MarcaPanelComponent} from '../../pages/cliente/marca-panel/marca-panel.component';
import {MarcaCrearEditarComponent} from '../../pages/cliente/marca-crear-editar/marca-crear-editar.component';
import {MarcaService} from '../../Service/marca.service';
import {ArticuloPanelComponent} from '../../pages/cliente/articulo-panel/articulo-panel.component';
import {ArticuloCrearEditarComponent} from '../../pages/cliente/articulo-crear-editar/articulo-crear-editar.component';
import {ArticuloService} from '../../Service/articulo.service';
import {ClienteNegotisEmpleadoGuard} from '../../guard/cliente-negotis-empleado.guard';
import {UsuarioPanelComponent} from '../../pages/cliente/usuario-panel/usuario-panel.component';
import {PasswordEditarComponent} from '../../pages/cliente/password-editar/password-editar.component';
import {UsuarioMiinformacionComponent} from '../../pages/cliente/usuario-miinformacion/usuario-miinformacion.component';
import {ClientenegotisGuard} from '../../guard/clientenegotis.guard';
import {UsercomisionclientenegotisComponent} from '../../pages/cliente/usercomisionclientenegotis/usercomisionclientenegotis.component';
import {UserService} from '../../Service/user.service';
import {TarjetaCrearEditarComponent} from '../../pages/cliente/tarjeta-crear-editar/tarjeta-crear-editar.component';
import {TarjetaPanelComponent} from '../../pages/cliente/tarjeta-panel/tarjeta-panel.component';
import { MensajeUsuarioComponent } from 'src/app/pages/cliente/mensaje-usuario/mensaje-usuario.component';
import {TurnoPanelComponent} from '../../pages/cliente/turno-panel/turno-panel.component';
import {TurnoCrearEditarComponent} from '../../pages/cliente/turno-crear-editar/turno-crear-editar.component';

const routes: Routes = [
  // ******************General***************************************************
  { path: '', component: UsuarioPanelComponent },
  { path: 'panel', canActivate: [ClienteNegotisEmpleadoGuard], component: UsuarioPanelComponent },
  { path: 'password/editar', canActivate: [ClienteNegotisEmpleadoGuard], component: PasswordEditarComponent },
  { path: 'mensaje/usuario', canActivate: [ClienteNegotisEmpleadoGuard], component: MensajeUsuarioComponent },
  { path: 'misdatos', canActivate: [ClienteNegotisEmpleadoGuard], component: UsuarioMiinformacionComponent },
  { path: 'comision', canActivate: [ClientenegotisGuard], component: UsercomisionclientenegotisComponent },
  { path: 'tarjeta/crear', canActivate: [ClienteNegotisEmpleadoGuard], component: TarjetaCrearEditarComponent },
  { path: 'tarjeta/panel', canActivate: [ClienteNegotisEmpleadoGuard], component: TarjetaPanelComponent },
  { path: 'turno/panel', canActivate: [ClienteNegotisEmpleadoGuard], component: TurnoPanelComponent },
  { path: 'turno/crear', canActivate: [ClienteNegotisEmpleadoGuard], component: TurnoCrearEditarComponent },
  { path: 'turno/editar/:idturno', canActivate: [ProductoGuard], component: TurnoCrearEditarComponent },
  { path: 'tarjeta/editar/:idtarjeta', canActivate: [ProductoGuard], component: TarjetaCrearEditarComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [
    ClienteNegotisEmpleadoGuard,
    ClientenegotisGuard,
    UserService,
  ]
})
export class UsuarioRoutingModule { }
