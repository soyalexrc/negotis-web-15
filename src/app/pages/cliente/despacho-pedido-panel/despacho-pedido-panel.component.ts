import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { PedidoService } from '../../../Service/pedido.service';
import { SucursalService } from '../../../Service/sucursal.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DatepickerModalComponent } from '../../../components/datepicker-modal/datepicker-modal.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgbDateStruct, NgbCalendar, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { EliminarModalComponent } from '../../../components/eliminar-modal/eliminar-modal.component';
import { Router } from '@angular/router';
import { GeneralService } from '../../../Service/general.service';
import PropertyUtil, {TiposPropiedad} from "../../../util/property.util";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-despacho-pedido-panel',
  templateUrl: './despacho-pedido-panel.component.html',
  styleUrls: ['./despacho-pedido-panel.component.css']
})
export class DespachoPedidoPanelComponent implements OnInit {

  clienteCtrl = new FormControl();
  filteredCliente!: Observable<any[]>;
  vendedorCtrl = new FormControl();
  filteredVendedor!: Observable<any[]>;
  zonaCtrl = new FormControl();
  filteredZona!: Observable<any[]>;
  regionCtrl = new FormControl();
  filteredRegion!: Observable<any[]>;

  pedidoLista: any;
  infoGeneral: any;

  vendedor: any;
  idVendedor: any;
  cliente: any;
  idCliente: any;
  clienteSucursales: any;
  idSucursalCliente: any = '';
  estadoEntrega: any = null;
  estadosEntrega = PropertyUtil.getPropertiesByType(TiposPropiedad.ESTADO_ENTREGA);
  estadoPago: any = null;
  estadosPago = PropertyUtil.getPropertiesByType(TiposPropiedad.ESTADO_PAGO);
  estadoComision: any = null;
  estadoConfirmacion: any = null;
  estadosConfirmacion = PropertyUtil.getPropertiesByType(TiposPropiedad.ESTADO_CONFIRMACION);
  fechaDesde: any = this.calendar.getToday().day + '/' + this.calendar.getToday().month + '/' + this.calendar.getToday().year;
  fechaHasta: any = this.calendar.getToday().day + '/' + this.calendar.getToday().month + '/' + this.calendar.getToday().year;
  estadoPreparacion: any = null;
  estadosPreparacion = PropertyUtil.getPropertiesByType(TiposPropiedad.ESTADO_PREPARACION);
  prioridad: any = null;
  prioridades = PropertyUtil.getPropertiesByType(TiposPropiedad.PRIORIDAD);
  estadoPedido: any = null;
  estadosPedido = PropertyUtil.getPropertiesByType(TiposPropiedad.ESTADO_PEDIDO);
  zona: any;
  idZona: any;
  region: any;
  idRegion: any;
  montoVtas: any = 0;
  montoComision: any = 0;
  montototalVtas: any = 0;
  fechaTipoVta: boolean = true;
  fechaTipoEntrega: boolean = false;
  submittedTipoVta: any;
  submittedTipoEntrega: any;
  numFactEdit: any;
  fechaDesdeFormat: any;
  fechaHastaFormat: any;
  sucursalVendedor: any;
  idSucursalVendedor: any;
  @ViewChild('numFactura') codigoInput!: ElementRef;

  constructor(private titleService: Title,private pedidoServ: PedidoService, private sucursalServ: SucursalService,
    private dialog: MatDialog, private calendar: NgbCalendar, private router: Router,
    private generalServ: GeneralService) {
      titleService.setTitle("Caja");

  }

  getSucursalVendedor(value: any) {
    this.sucursalVendedor = value.Sucursal;
    this.idSucursalVendedor = value.Sucursal.Id;
  }

  vtasTodasSuc(value: any) {
    if (value.target.checked == true) {
      this.idSucursalVendedor = '';
    } else {
      this.idSucursalVendedor = this.sucursalVendedor.Id;
    }
  }

  fechaVtaFunc(value: any) {
    if (value.target.checked == true) {
      this.fechaTipoVta = true;
      this.fechaTipoEntrega = false;
    } else {
      this.fechaTipoVta = false;
      this.fechaTipoEntrega = true;
    }
  }

  fechaEntregaFunc(value: any) {
    if (value.target.checked == true) {
      this.fechaTipoEntrega = true;
      this.fechaTipoVta = false;
    } else {
      this.fechaTipoEntrega = false;
      this.fechaTipoVta = true;
    }
  }

  grtPedidosHoy() {
    const loadRef = this.generalServ.loadingModal();
    this.fechaDesdeFormat = this.fechaDesde.split("/").reverse().join("/");
    this.fechaHastaFormat = this.fechaHasta.split("/").reverse().join("/");
    let dataFiltro = {
      'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
      'fechaDesde': this.fechaDesdeFormat, 'fechaHasta': this.fechaHastaFormat,
      'fechaTipoEntrega': this.fechaTipoEntrega, 'fechaTipoVta': this.fechaTipoVta,
    };
    this.pedidoServ.getPedidosPorFiltros(dataFiltro).subscribe((data: any) => {
      this.pedidoLista = data;
      this.submitFunc();
      this.formatoFecha();
      loadRef.close();
    }, (error: any) => { console.log(error); loadRef.close(); });
  }

  ngOnInit() {
    const loadRef = this.generalServ.loadingModal();
    loadRef
    let dataUser = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
    this.pedidoServ.getInfoGeneral(dataUser).subscribe(data => {
      this.infoGeneral = data;
      loadRef.close();
      this.filteredCliente = this.clienteCtrl.valueChanges
        .pipe(
          startWith(''),
          map(item => item ? this._filterCliente(item) : this.infoGeneral.Clientes.slice())
        );
      this.filteredVendedor = this.vendedorCtrl.valueChanges
        .pipe(
          startWith(''),
          map(item => item ? this._filterVendedor(item) : this.infoGeneral.Empleados.slice())
        );
      this.filteredZona = this.zonaCtrl.valueChanges
        .pipe(
          startWith(''),
          map(item => item ? this._filterZona(item) : this.infoGeneral.Zonas.slice())
        );
      this.filteredRegion = this.regionCtrl.valueChanges
        .pipe(
          startWith(''),
          map(item => item ? this._filterRegion(item) : this.infoGeneral.Regiones.slice())
        );
    }, error => { console.log(error); loadRef.close(); });
    this.grtPedidosHoy();
  }

  private _filterCliente(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.infoGeneral.Clientes.filter((item: any) => item.RazonSocial.toLowerCase().includes(filterValue.toLowerCase()));
  }

  private _filterVendedor(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.infoGeneral.Empleados.filter((item: any) => item.Nombres.toLowerCase().includes(filterValue.toLowerCase()) || item.Apellidos.toLowerCase().includes(filterValue.toLowerCase()));
  }

  private _filterZona(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.infoGeneral.Zonas.filter((item: any) => item.Nombre.toLowerCase().includes(filterValue.toLowerCase()));
  }

  private _filterRegion(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.infoGeneral.Regiones.filter((item: any) => item.Nombre.toLowerCase().includes(filterValue.toLowerCase()));
  }

  getVendedor(value: any) {
    this.idVendedor = value.Id;
  }

  getZona(value: any) {
    this.idZona = value.Id;
  }

  getRegion(value: any) {
    this.idRegion = value.Id;
  }

  resetVendedor() {
    this.idVendedor = null;
  }

  resetCliente() {
    this.idCliente = null;
  }

  resetZona() {
    this.idZona = null;
  }

  resetRegion() {
    this.idRegion = null;
  }

  getCliente(value: any) {
    let dataUser = { 'idCliente': value.Id, 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
    this.sucursalServ.getSucursalesByUsuario(dataUser)
      .subscribe(data => {
        this.clienteSucursales = data;
      });
    this.idCliente = value.Id;
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

  limpiar() {
    this.vendedor = null;
    this.idVendedor = null;
    this.cliente = null;
    this.idCliente = null;
    this.clienteSucursales = null;
    this.idSucursalCliente = '';
    this.estadoEntrega = null;
    this.estadoPago = null;
    this.estadoComision = null;
    this.estadoConfirmacion = null;
    let fechaHoy = this.calendar.getToday();
    this.fechaDesde = fechaHoy.day + '/' + fechaHoy.month + '/' + fechaHoy.year;
    this.fechaHasta = fechaHoy.day + '/' + fechaHoy.month + '/' + fechaHoy.year;
    this.estadoPreparacion = null;
    this.prioridad = null;
    this.estadoPedido = null;
    this.fechaTipoVta = true;
    this.fechaTipoEntrega = false;
    this.zona = null;
    this.region = null;
    this.grtPedidosHoy();
  }

  buscar() {
    const loadRef = this.generalServ.loadingModal();
    this.fechaDesdeFormat = this.fechaDesde.split("/").reverse().join("/");
    this.fechaHastaFormat = this.fechaHasta.split("/").reverse().join("/");

    let dataFiltro = {
      'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
      'idVendedor': this.idVendedor, 'idCliente': this.idCliente, 'idSucursalEmpresa': this.idSucursalVendedor,
      'idSucursalCliente': this.idSucursalCliente, 'estadoEntrega': this.estadoEntrega, 'estadoPago': this.estadoPago,
      'estadoComision': this.estadoComision, 'estadoConfirmacion': this.estadoConfirmacion,
      'fechaDesde': this.fechaDesdeFormat, 'fechaHasta': this.fechaHastaFormat,
      'fechaTipoEntrega': this.fechaTipoEntrega, 'fechaTipoVta': this.fechaTipoVta,
      'estadoPreparacion': this.estadoPreparacion, 'prioridad': this.prioridad, 'estadoPedido': this.estadoPedido,
      'idZona': this.idZona, 'idRegion': this.idRegion
    };
    this.pedidoServ.getPedidosPorFiltros(dataFiltro).subscribe((data: any) => {
      this.pedidoLista = data;
      this.submitFunc();
      this.formatoFecha();
      loadRef.close();
    }, (error: any) => { console.log(error); loadRef.close(); });
  }

  submitFunc() {
    if (this.fechaTipoEntrega == true) { this.submittedTipoEntrega = true; this.submittedTipoVta = null; }
    if (this.fechaTipoVta == true) { this.submittedTipoVta = true; this.submittedTipoEntrega = null; }
  }

  formatoFecha() {
    for (let item of this.pedidoLista.Pedidos) {
      let getFecha = new Date(Number(item.FechaEntrega.replace('/Date(', '').replace(')/', '')));
      item.FechaEntrega = getFecha.getUTCDate() + '/' + (getFecha.getUTCMonth() + 1) + '/' + getFecha.getUTCFullYear();
    }
  }


  @HostListener('window:keyup', ['$event'])
  focusCodigo(event: any) {
    if (event.keyCode === 115) {
      this.codigoInput.nativeElement.focus();
    }
  }

}
