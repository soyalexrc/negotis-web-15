import { Component, Inject, HostListener, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalService } from '../../Service/global.service';
import { Router } from '@angular/router';
import { MensajeModalComponent } from '../mensaje-modal/mensaje-modal.component';
import { SnackBarOperacionExitosaComponent } from '../snack-bar-operacion-exitosa/snack-bar-operacion-exitosa.component';
import { PedidoService } from 'src/app/Service/pedido.service';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-factura-ws-modal',
  templateUrl: './factura-ws.component.html',
  styleUrls: ['./factura-ws.component.css']
})
export class FacturaWSModalComponent {

  tipoComprobante: string = 'Factura';
  tieneRolCliente = false;
  tieneRolVisualizarImpresionBT = false;
  tieneRolImprimirUnificado = false;
  rolPC = false;
  token: any;
  idClienteNegotis: any = localStorage.getItem('idClienteNegotis');
  tieneRolImprimirDuplicado=false;
  tieneRolVisualizarImpresionComandera = false;
  tieneRolOcultarComprobante = false;
  tieneRolVisualizarImpresion80mm = false;
  tieneRolEsconderFactura = false;
  tieneRolEsconderFacturaComandera  = false;
  pedidosImprimir: any []= [];
  ivaCheck:boolean = false;
  entregasCheck: boolean = false;
  imprimirDoble = false;
  idPedido:any;
  phone:any=54;

  @ViewChild('codigoBarras') codigoInput!: ElementRef;


  constructor(public dialogRef: MatDialogRef<FacturaWSModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public globalServ: GlobalService,private snackBar: MatSnackBar,private pedidoServ: PedidoService, private router: Router,private dialog: MatDialog,) {
    this.token = localStorage.getItem('token');
    this.idPedido = this.data.idPedido;
    if (data.esNotaCredito == 'true'){
      this.tipoComprobante = 'NC';
    }
    if (data.esNotaDebito == 'true'){
      this.tipoComprobante = 'ND';
    }
    if(data.ivaCheck == true)
    {
      this.ivaCheck = true;
    }
    if(data.entregasCheck == true)
    {
      this.entregasCheck = true;
    }
  }
  ngOnInit() {
    this.tieneRolCliente = JSON.parse(localStorage.getItem('RolCliente') ?? '');

    const roles = JSON.parse(localStorage.getItem('roles') ?? '');
    const tieneRolClienteNegotis = eval(localStorage.getItem('RolClienteNegotis') ?? '') || false;
    this.tieneRolVisualizarImpresionBT= (roles != null && roles.VisualizarImpresionBT ) || tieneRolClienteNegotis;
    this.tieneRolImprimirDuplicado= (roles != null && roles.ImprimirDuplicado ) || tieneRolClienteNegotis;
    this.tieneRolVisualizarImpresionComandera = (roles != null && roles.ImpresionComandera );
    this.tieneRolOcultarComprobante = (roles != null && roles.OcultarComprobante );
    this.rolPC = (roles != null && roles.OcultarPreciosComprobante );
    this.tieneRolImprimirUnificado = (roles != null && roles.ComprobanteUnificado );
    this.tieneRolVisualizarImpresion80mm = (roles != null && roles.Imprimir80mm );
    this.tieneRolEsconderFactura = (roles != null && roles.OcultarFactura );
    this.tieneRolEsconderFacturaComandera = (roles != null && roles.OcultarFacturaComandera );
    this.imprimirDoble = (roles != null && roles.ImpresionDoble);
    if(this.tieneRolImprimirDuplicado || this.tieneRolImprimirUnificado || this.imprimirDoble)
    {
      this.pedidosImprimir.push(this.data.idPedido);
      this.pedidosImprimir.push(this.data.idPedido);
    }
    console.log(this.tipoComprobante);
  }
  cerrar() {
    this.dialogRef.close(true);
  }

  generar() {
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

  generarAfip() {

    const dialogRef = this.dialog.open(MensajeModalComponent, {
      width: '750px',
      data: {
        titulo: 'Confirmacion Factura Afip',
        esAfip: true,
        mensaje: 'Desea continuar a facturar via AFIP?',
        idPedido: this.data.idPedido,
        pedidoCerrado: this.data.pedidoCerrado,
        esNotaCredito: this.data.esNotaCredito
      }

  });
  dialogRef.afterClosed().subscribe((result: any) => {
    this.snackBarOperacionExitosa();
  });
  this.dialogRef.close(false);
}
snackBarOperacionExitosa() {
  this.router.navigate(['/cliente/pedido/panel'], { replaceUrl: true });
  //this.snackBar.openFromComponent(SnackBarOperacionExitosaComponent, {
  //  duration: 1000,
 // });
}


  @HostListener('window:keyup', ['$event'])
  Listener(event: any) {
    if (event.keyCode === 27) {
      this.cerrar();
    }
    if (event.keyCode === 113) {
      this.codigoInput.nativeElement.focus();
    }
  }

}
