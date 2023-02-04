import { Component, OnInit,Inject, ViewChild, ElementRef, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { PedidoService } from 'src/app/Service/pedido.service';
import { GlobalService } from '../../Service/global.service';
import { Router } from '@angular/router';
import { SnackBarOperacionExitosaComponent } from '../snack-bar-operacion-exitosa/snack-bar-operacion-exitosa.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-mensaje-modal',
  templateUrl: './mensaje-modal.component.html',
  styleUrls: ['./mensaje-modal.component.css']
})
export class MensajeModalComponent implements OnInit {
  token: any;
  idClienteNegotis: any = localStorage.getItem('idClienteNegotis');
  tieneRolCliente = false;
  tieneRolVisualizarImpresionComandera = false;
  tieneRolVisualizarImpresionComandera80mm = false;
  tieneRolEsconderFactura = false;
  tieneRolEsconderFacturaComandera = false;
  public titulo: string;
  public mensaje: string;
  public esAfip!: boolean;

  constructor(private dialogRef: MatDialogRef<MensajeModalComponent>, private pedidoServ: PedidoService, private router: Router,private snackBar: MatSnackBar,public globalServ: GlobalService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
        this.titulo = data.titulo;
        this.mensaje = data.mensaje;
        this.token = localStorage.getItem('token');
     }

  ngOnInit() {
    this.tieneRolCliente = JSON.parse(localStorage.getItem('RolCliente') ?? '');
    const roles = JSON.parse(localStorage.getItem('roles') ?? '');
    const tieneRolClienteNegotis = eval(localStorage.getItem('RolClienteNegotis') ?? '') || false;

    this.tieneRolVisualizarImpresionComandera = (roles != null && roles.ImpresionComandera );
    this.tieneRolVisualizarImpresionComandera80mm = (roles != null && roles.Imprimir80mm);
    this.tieneRolEsconderFacturaComandera = (roles != null && roles.OcultarFacturaComandera );
    this.tieneRolEsconderFactura = (roles != null && roles.OcultarFactura );
  }


  aceptar(){
    this.dialogRef.close(true);
  }


  aceptarAfip(){
const dataUser={
'idClienteNegotis': this.idClienteNegotis,
'idPedido':this.data.idPedido,
'generarFactAfip': true,
'token': this.token
  }
  this.pedidoServ.getFactura(dataUser);
  this.dialogRef.close(true);

}

cancelar(){
    this.dialogRef.close();
  }

}
