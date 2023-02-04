import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import {GlobalService} from '../../Service/global.service';

@Component({
  selector: 'app-factura-pedidos-pendientes-modal',
  templateUrl: './factura-pedidos-pendientes-modal.component.html',
  styleUrls: ['./factura-pedidos-pendientes-modal.component.css']
})
export class FacturaPedidosPendientesModalComponent implements OnInit {

  token: any;
  idClienteNegotis: any = localStorage.getItem('idClienteNegotis');
  listaImprimir:any;
  pedidosCambiarEstadoIndices: any = [];
  retencion:any;


  constructor(private dialogRef: MatDialogRef<FacturaPedidosPendientesModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public globalServ: GlobalService) {
    this.token = localStorage.getItem('token');
  }

  ngOnInit() {
    console.log(this.data);
    this.listaImprimir=this.data.pedidosPendientesPagados;
    this.listaImprimir.forEach((item: any) => {
      this.pedidosCambiarEstadoIndices.push(item.Id);
    });
  }

  cerrar() {
    this.dialogRef.close({
      result: false
    });
  }

}
