import { Component, OnInit } from '@angular/core';
import { FotoCrearEditarModalComponent } from '../../../components/foto-crear-editar-modal/foto-crear-editar-modal.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StatusClienteMostradorModalComponent } from '../../../components/status-cliente-mostrador-modal/status-cliente-mostrador-modal.component';
import {OcultarLogoimpresionesModalComponent} from '../../../components/ocultar-logo-modal/ocultar-logo-modal.component';
import { FacturaDatosStatusModalComponent } from '../../../components/factura-datos-status-modal/factura-datos-status-modal.component';
import { HabilitarAfipModalComponent } from '../../../components/habilitar-afip-modal/habilitar-afip-modal.component';
import { Title } from '@angular/platform-browser';
import { OcultarTelefonoimpresionesModalComponent } from 'src/app/components/ocultar-telefono-modal/ocultar-telefono-modal.component';

@Component({
  selector: 'app-usuario-panel',
  templateUrl: './usuario-panel.component.html',
  styleUrls: ['./usuario-panel.component.css']
})
export class UsuarioPanelComponent implements OnInit {
  tieneRolCliente = false;
  clienteNegotis: any;
  tieneRolLimitar= false;
  soporte = false;
  tieneRolMensajeAplicacion = false;
  tieneRolVisualizarSuc = false;
  constructor(private titleService: Title,public dialog: MatDialog)
  {
    titleService.setTitle("Usuario");
   }

  ngOnInit() {
    let roles = JSON.parse(localStorage.getItem('roles') ?? '');
    this.clienteNegotis = localStorage.getItem('RolClienteNegotis');
    this.soporte = eval(localStorage.getItem('soporte') ?? '') || false;
    this.tieneRolCliente = JSON.parse(localStorage.getItem('RolCliente') ?? '');
    this.tieneRolLimitar = (roles != null && roles.LimitarConfiguracion );
    this.tieneRolMensajeAplicacion = (roles != null && roles.MensajeAplicacion );
    this.tieneRolVisualizarSuc = (roles != null && roles.VisualizarSucursalConfig );
  }

  fotoModal() {
    const dialogRef = this.dialog.open(FotoCrearEditarModalComponent, {
      width: '750px', data: { idArticulo: 0, editar: true },
    });
  }

  clienteMostradorStatusModal() {
    const dialogRef = this.dialog.open(StatusClienteMostradorModalComponent, {
      width: '450px'
    });
  }

  mostrarDatosFacturaStatusModal(){
    const dialogRef = this.dialog.open(FacturaDatosStatusModalComponent, {
      width: '450px'
    });
  }

  ocultarLogoModal()
  {
    const dialogRef = this.dialog.open(OcultarLogoimpresionesModalComponent, {
      width: '450px'
    });
  }
  ocultarTelefonoModal()
  {
    const dialogRef = this.dialog.open(OcultarTelefonoimpresionesModalComponent, {
      width: '450px'
    });
  }
  habilitarAfip(){
    const dialogRef = this.dialog.open(HabilitarAfipModalComponent, {
      width: '450px'
    });
  }

}
