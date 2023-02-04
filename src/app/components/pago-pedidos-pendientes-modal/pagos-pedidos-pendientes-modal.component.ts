import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import PropertyUtil, {EstadosPago, TiposPropiedad,FormasPago} from '../../util/property.util';
import { DatepickerModalComponent } from '../datepicker-modal/datepicker-modal.component';


@Component({
  selector: 'app-pagos-pedidos-pendientes-modal',
  templateUrl: './pagos-pedidos-pendientes-modal.component.html',
  styleUrls: ['./pagos-pedidos-pendientes-modal.component.css']
})
export class PagosPedidosPendientesModalComponent implements OnInit {
  formaPagoModal : any = PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.FORMA_PAGO, FormasPago.EFECTIVO);
  numeroCheque: any;
  totalCheque: any;
  vencimientoCheque: any= this.calendar.getToday().day.toString().padStart(2, '0') + '/' + this.calendar.getToday().month.toString().padStart(2, '0') + '/' + this.calendar.getToday().year.toString().padStart(4, '0');
  estadosPago = PropertyUtil.getPropertiesByType(TiposPropiedad.ESTADO_PAGO);
  formaPago = PropertyUtil.getPropertiesByType(TiposPropiedad.FORMA_PAGO);
  fomasPago: any = [];
  constructor(private dialogRef: MatDialogRef<PagosPedidosPendientesModalComponent>,
    private calendar: NgbCalendar, private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log(this.data);


    this.formaPago.forEach( element => {
      if(element.Valor != 'CTA CTE' && element.Valor != 'MERCADO PAGO')
      {
        this.fomasPago.push(element);
      }

    });


  }

  fechaPedidoDatePickerCheque() {

    this.runDatePicker().subscribe(result => this.vencimientoCheque = this.getDateAsString(result));
  }

  runDatePicker() {
    const dialogRef = this.dialog.open(DatepickerModalComponent, {
      width: '350px', data: { permitirFechaPasada: true },
    });
    return dialogRef.afterClosed();
  }

  getDateAsString(result: any): string {
    if (result != null) {
      if (result instanceof NgbDate) {
        return result.day.toString().padStart(2, '0') + '/' + result.month.toString().padStart(2, '0') + '/' + result.year.toString().padStart(4, '0');
      } else if (result instanceof Date) {
        return result.getDate().toString().padStart(2, '0') + '/' + (result.getMonth() + 1).toString().padStart(2, '0') + '/' + result.getFullYear().toString().padStart(4, '0');
      } else if ('day' in result && 'month' in result && 'year' in result) {
        return result.day.toString().padStart(2, '0') + '/' + result.month.toString().padStart(2, '0') + '/' + result.year.toString().padStart(4, '0');
      }
    }
    return '';
  }

  cancelar() {
    this.dialogRef.close({
      result: false
    });
  }

  aceptar() {
    if (this.formaPagoModal !== '') {
      this.dialogRef.close({
        result: true,
        formaPago: this.formaPagoModal,
        numeroCheque : this.numeroCheque,
        vencimientoCheque : this.vencimientoCheque,
        totalCheque : this.totalCheque
      });
    }
  }

}
