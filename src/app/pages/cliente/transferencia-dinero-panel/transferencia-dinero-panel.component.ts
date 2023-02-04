import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbCalendar, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { GeneralService } from '../../../Service/general.service';
import { TransferenciaDineroService } from '../../../Service/transferencia-dinero.service';
import { EliminarModalComponent } from '../../../components/eliminar-modal/eliminar-modal.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatepickerModalComponent } from '../../../components/datepicker-modal/datepicker-modal.component';
import { GlobalService } from 'src/app/Service/global.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-transferencia-dinero-panel',
  templateUrl: './transferencia-dinero-panel.component.html',
  styleUrls: ['./transferencia-dinero-panel.component.css']
})
export class TransferenciaDineroPanelComponent implements OnInit {

  listadoTransDep: any;
  fechaDesde: any = this.calendar.getToday().day + '/' + this.calendar.getToday().month + '/' + this.calendar.getToday().year;
  fechaHasta: any = this.calendar.getToday().day + '/' + this.calendar.getToday().month + '/' + this.calendar.getToday().year;
  sucursal: any;
  fechaDesdeFormat: any;
  fechaHastaFormat: any;
  submittedFechaDesde: any;
  submittedFechaHasta: any;

  totalExterno: number = 0;
  totalTransferido: number = 0;
  totalRecibidoDeTrans: number = 0;
  totalEgreso: number = 0;
  totalRecibido: number = 0;
  editarDepositos: boolean = false;
  ocultarIndicadorEgreso: boolean = false;
  ocultarDeleteIngresos: boolean= false;

  public urlImprimir!: string;
  constructor(private titleService: Title,private calendar: NgbCalendar, private generalServ: GeneralService,
    private transServ: TransferenciaDineroService, public dialog: MatDialog, private globalService: GlobalService,)
    {
      titleService.setTitle("Caja");
     }

  ngOnInit() {
    const roles = JSON.parse(localStorage.getItem('roles') ?? '');
    const soporte = eval(localStorage.getItem('soporte') ?? '') || false;
    this.editarDepositos = (roles != null && roles.OcultarEditarDepositos);
    this.ocultarIndicadorEgreso = (roles != null && roles.OcultarIndicadorEgreso);
    this.ocultarDeleteIngresos = (roles != null && roles.OcultarDeleteIngresos);
  }

  getSucursalVendedor(value: any) {
    this.sucursal = value.Sucursal;
    this.buscar();
  }

  buscar() {
    const loadRef = this.generalServ.loadingModal();
    this.fechaDesdeFormat = this.fechaDesde.split("/").reverse().join("/");
    this.fechaHastaFormat = this.fechaHasta.split("/").reverse().join("/");
    let data = {
      'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
      'fechaDesde': this.fechaDesdeFormat, 'fechaHasta': this.fechaHastaFormat,
      'idSucursal': this.sucursal.Id
    };
    this.transServ.GetListadoByIdSucursal(data)
      .subscribe(data => {
        this.listadoTransDep = data;
        this.submittedFechaDesde = this.fechaDesde;
        this.submittedFechaHasta = this.fechaHasta;
        this.calcularTotales(this.listadoTransDep);
        this.armarUrlBusqueda();
        loadRef.close();
      }, error => { console.log(error); loadRef.close(); });
  }

  armarUrlBusqueda() {
    this.urlImprimir = this.globalService.urlApi + '/ApiTransferencia/Deposito/Dinero/Imprimir?' +
    '&idClienteNegotis=' + localStorage.getItem('idClienteNegotis') +
    '&fechaDesde=' + this.fechaDesdeFormat +
    '&fechaHasta=' + this.fechaHastaFormat +
    '&idSucursal=' + this.sucursal.Id +
    '&token=' + localStorage.getItem('token');
  }

  delete(value: any) {

    const dialogRef = this.dialog.open(EliminarModalComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        const loadRef = this.generalServ.loadingModal();
        let dataRegion = { 'idTransferenciaDeposito': value.Id, 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
        this.transServ.eliminarTransDep(dataRegion).subscribe(data => {
          if (data == true) {
            let index = 0;
            for (let item of this.listadoTransDep) {
              if (item.Id == value.Id) {
                this.listadoTransDep.splice(index, 1)
                break;
              }
              index++;
            }
            this.calcularTotales(this.listadoTransDep);
          }
          loadRef.close();
        }, error => { console.log(error); loadRef.close(); })
      }
    });
  }

  fechaDesdeFunc() {
    const dialogRef = this.dialog.open(DatepickerModalComponent, {
      width: '350px', data: { permitirFechaPasada: true },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.fechaDesde = result.day + '/' + result.month + '/' + result.year;
      }
    });
  }

  fechaHastaFunc() {
    const dialogRef = this.dialog.open(DatepickerModalComponent, {
      width: '350px', data: { permitirFechaPasada: true },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.fechaHasta = result.day + '/' + result.month + '/' + result.year;
      }
    });
  }

  limpiar(){
    this.fechaDesde = this.calendar.getToday().day + '/' + this.calendar.getToday().month + '/' + this.calendar.getToday().year;
    this.fechaHasta = this.calendar.getToday().day + '/' + this.calendar.getToday().month + '/' + this.calendar.getToday().year;
    this.buscar();
  }

  calcularTotales(value: any) {
    this.totalExterno = 0;
    this.totalTransferido = 0;
    this.totalRecibidoDeTrans = 0;
    this.totalRecibido = 0;
    this.totalEgreso = 0;
    for (let item of value) {
      if (item.IdDeSucursal == null && item.IdParaSucursal == this.sucursal.Id) {
        this.totalExterno = this.totalExterno + item.Monto;
      }
      if (item.IdDeSucursal == this.sucursal.Id && item.IdDeSucursal != null) {
        this.totalTransferido = this.totalTransferido + item.Monto;
      }
      if (item.IdParaSucursal == this.sucursal.Id && item.IdDeSucursal != null) {
        this.totalRecibidoDeTrans = this.totalRecibidoDeTrans + item.Monto;
      }
      if (item.EgresoDeSucursal == true && item.IdDeSucursal == this.sucursal.Id) {
        this.totalEgreso = this.totalEgreso + item.Monto;
      }
    }
  }

}
