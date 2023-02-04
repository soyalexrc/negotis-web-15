import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import PropertyUtil, {EstadosPago, TiposPropiedad,FormasPago, EstadosEntrega} from '../../util/property.util';
import { Router, ActivatedRoute } from '@angular/router';
import { PedidoService } from '../../Service/pedido.service';
import { MensajeModalComponent } from 'src/app/components/mensaje-modal/mensaje-modal.component';
import { CompraproveedorService } from 'src/app/Service/compraproveedor.service';


@Component({
  selector: 'app-cambiar-estado-modal',
  templateUrl: './cambiar-estado-modal.component.html',
  styleUrls: ['./cambiar-estado-modal.component.css']
})
export class CambiarEstadoModalComponent implements OnInit {
  myForm: FormGroup;
  idPedido: any;
  idCompra: any;
  compra: any;
  pedido: any;
  formasPago = PropertyUtil.getPropertiesByType(TiposPropiedad.FORMA_PAGO);
  fp:any;
  estadosPago = PropertyUtil.getPropertiesByType(TiposPropiedad.ESTADO_PAGO);
  estadosEntrega = PropertyUtil.getPropertiesByType(TiposPropiedad.ESTADO_ENTREGA);
  retencion: any;
  constructor(private dialogRef: MatDialogRef<CambiarEstadoModalComponent>,private fb: FormBuilder,private compraServ: CompraproveedorService,private pedidoServ: PedidoService,private dialog: MatDialog,private router: Router,private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.myForm = fb.group({
        'formaPago': [PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.FORMA_PAGO, FormasPago.CTA_CTE)],
        'estadoPago': [PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PAGO, EstadosPago.PENDIENTE)],
        'estadoEntrega': [PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_ENTREGA, EstadosEntrega.PENDIENTE)],
        'retencion': ['', Validators.compose([])],

      });
      this.compra = data.compra;
     if(data.compra == true)
     {
      this.idCompra = data.idCompra;
      this.idCompra.forEach((item: any) => {
        const dataUser = {'idCompra': item.idCompra,
        'idClienteNegotis': localStorage.getItem('idClienteNegotis'),'idComprobante':""}
        this.compraServ.getCompraById(dataUser).subscribe(data => {
         this.pedido=data;
         if(this.pedido.datosPago.codigoEstadoPago != PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PAGO, EstadosPago.PENDIENTE) && this.pedido.datosPago.codigoFormaPago != PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.FORMA_PAGO, FormasPago.CTA_CTE))
         {
          this.myForm.controls['estadoPago'].setValue(PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PAGO, EstadosPago.TOTAL));
          this.myForm.controls['formaPago'].setValue(this.pedido.datosPago.codigoFormaPago);
          this.fp=this.formasPago;
          this.formasPago = [];
          this.fp.forEach((item: any) => {
            if(item.Valor != "CTA CTE")
            {
              this.formasPago.push(item);
            }

          });

         }
        }, error => {
       });


       });
     }
     else
     {
      this.idPedido = data.idPedido;
      this.idPedido.forEach((item: any) => {
        const dataUser = {'idPedido': item,
        'idClienteNegotis': localStorage.getItem('idClienteNegotis')}
        this.pedidoServ.getPedidoById(dataUser).subscribe(data => {
         this.pedido=data;
         if(this.pedido.LastPedidoPago.CodigoEstadoPago != PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PAGO, EstadosPago.PENDIENTE) && this.pedido.LastPedidoPago.CodigoFormaPago != PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.FORMA_PAGO, FormasPago.CTA_CTE))
         {
          this.myForm.controls['estadoPago'].setValue(PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PAGO, EstadosPago.TOTAL));
          this.myForm.controls['formaPago'].setValue(this.pedido.LastPedidoPago.CodigoFormaPago);
          this.fp=this.formasPago;
          this.formasPago = [];
          this.fp.forEach((item: any) => {
            if(item.Valor != "CTA CTE")
            {
              this.formasPago.push(item);
            }

          });

         }
        }, error => {
       });


       });
     }


    }

  ngOnInit() {
  }

  selectFormaPago()
  {
    if (this.myForm.controls['formaPago'].value === PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.FORMA_PAGO, FormasPago.CTA_CTE)) {
      this.myForm.controls['estadoPago'].setValue(PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PAGO, EstadosPago.PENDIENTE));
    }
    if (this.myForm.controls['formaPago'].value === PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.FORMA_PAGO, FormasPago.EFECTIVO) ||
      this.myForm.controls['formaPago'].value === PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.FORMA_PAGO, FormasPago.TARJETA) &&
      this.myForm.controls['estadoPago'].value  !== PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PAGO, EstadosPago.PARCIAL))
      {
        this.myForm.controls['estadoPago'].setValue(PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PAGO, EstadosPago.TOTAL));
    }

  }
  cancelar() {
    this.dialogRef.close({
      result: false
    });
  }



  aceptar() {
    if(this.compra == true)
    {
      if((this.pedido.datosPago.codigoEstadoPago == PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PAGO, EstadosPago.PENDIENTE) && this.pedido.datosPago.codigoFormaPago == PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.FORMA_PAGO, FormasPago.CTA_CTE)) || (this.pedido.datosPago.codigoEstadoPago == PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PAGO, EstadosPago.TOTAL) && this.pedido.datosPago.codigoFormaPago != PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.FORMA_PAGO, FormasPago.CTA_CTE)))
      {
        this.dialogRef.close({
          result: true,
          estadoEntrega:this.myForm.controls['estadoEntrega'].value,
          estadoPago: this.myForm.controls['estadoPago'].value,
          formaPago:this.myForm.controls['formaPago'].value,
          retencion: this.retencion
        });
      }
      else
      {
        this.dialog.open(MensajeModalComponent, {
          width: '450px',
          data: {
            titulo: 'Error al cambiar estado',
            mensaje: 'Revise el Estado/Forma Pago para evitar inconsistencias'
          }
        });
      }
    }
    else
    {
      if((this.pedido.LastPedidoPago.CodigoEstadoPago == PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PAGO, EstadosPago.PENDIENTE) && this.pedido.LastPedidoPago.CodigoFormaPago == PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.FORMA_PAGO, FormasPago.CTA_CTE)) || (this.pedido.LastPedidoPago.CodigoEstadoPago == PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PAGO, EstadosPago.TOTAL) && this.pedido.LastPedidoPago.CodigoFormaPago != PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.FORMA_PAGO, FormasPago.CTA_CTE)))
      {


        this.dialogRef.close({
          result: true,
          estadoEntrega:this.myForm.controls['estadoEntrega'].value,
          estadoPago: this.myForm.controls['estadoPago'].value,
          formaPago:this.myForm.controls['formaPago'].value
        });
      }

    else
    {
      this.dialog.open(MensajeModalComponent, {
        width: '450px',
        data: {
          titulo: 'Error al cambiar estado',
          mensaje: 'Revise el Estado/Forma Pago para evitar inconsistencias'
        }
      });
    }
    }

  }

}

