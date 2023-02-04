import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbCalendar, NgbDatepickerI18n, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { CajaService } from '../../../Service/caja.service';
import { DatepickerModalComponent } from '../../../components/datepicker-modal/datepicker-modal.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GeneralService } from '../../../Service/general.service';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/Service/user.service';
import { map, startWith } from 'rxjs/operators';
import { GlobalService } from 'src/app/Service/global.service';

@Component({
  selector: 'app-caja-totales',
  templateUrl: './caja-totales.component.html',
  styleUrls: ['./caja-totales.component.css']
})
export class CajaTotalesComponent implements OnInit {


  private readonly lastTurno = 'caja-totales_LastTurno';
  fechaDesde: any = this.calendar.getToday().day.toString().padStart(2, '0') + '/' + this.calendar.getToday().month.toString().padStart(2, '0') + '/' + this.calendar.getToday().year.toString().padStart(4, '0');
  fechaHasta: any = this.calendar.getToday().day.toString().padStart(2, '0') + '/' + this.calendar.getToday().month.toString().padStart(2, '0') + '/' + this.calendar.getToday().year.toString().padStart(4, '0');
  getTotales: any;
  submittedFechaDesde: any;
  submittedFechaHasta: any;
  fechaDesdeFormat: any;
  fechaHastaFormat: any;
  sucursal: any;
  idClienteNegotis: any = localStorage.getItem('idClienteNegotis');
  idSucursal : any;
  public urlImprimir!: string;
  public urlImprimir2!: string;
  token: any;
  nombresCtrl = new FormControl();
  filteredNombres!: Observable<any[]>;
  idVendedor: any;
  empleadoListOriginal: any;
  turno: any=null;
  turnos: any;
  turnoSel :any = JSON.parse(localStorage.getItem(this.lastTurno) ?? '');

  sucursalSeleccionada=JSON.parse(localStorage.getItem('sucursalSeleccionada') ?? '');

  filtrosHabilitado: boolean = false;
  verTodasSucursalesHabilitado: boolean = false;
  turnoCaja: boolean= false;
  ocultarGanancia : boolean = false;
  ocultarCompras : boolean = false;
  nombreFiltro: any;

  constructor(private titleService: Title,private calendar: NgbCalendar, private globalService: GlobalService,private userServ: UserService, private cajaServ: CajaService, public dialog: MatDialog,
    private generalServ: GeneralService)
    {
      titleService.setTitle("Caja");
      const dataTurno = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
      this.userServ.obtenerTurnos(dataTurno).subscribe((data: any) => {
        this.turnos = data;
      }, (error: any) => { console.log(error);});
      this.userServ.obtenerTurno(dataTurno).subscribe((data: any) => {
        //this.turno = data;
        this.armarUrlBusqueda();
        this.armarUrlBusqueda2();
      }, (error: any) => { console.log(error);});
     }

  async ngOnInit() {
   /* const dataTurno = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
     const result = await this.userServ.obtenerTurno(dataTurno).subscribe(data => {
      this.turno = data;
    }, error => { console.log(error);}); */
    let roles = JSON.parse(localStorage.getItem('roles') ?? '');
    let tieneRolCliente = eval(localStorage.getItem('RolClienteNegotis') ?? '') || false;
    let soporte = eval(localStorage.getItem('soporte') ?? '') || false;
    this.filtrosHabilitado = (roles != null && roles.FiltroCaja) || tieneRolCliente;
    this.verTodasSucursalesHabilitado = (roles != null && roles.VisualizarCaja) || tieneRolCliente;
    this.turnoCaja = (roles != null && roles.TurnosCaja) || soporte;
    this.ocultarGanancia = (roles != null && roles.OcultarGanancias);
    this.ocultarCompras = (roles != null && roles.OcultarCompras);
    if(this.turnoCaja == false)
    {
      this.turno = null;
    }
    this.idSucursal = this.sucursalSeleccionada.IdSucursal;
    this.armarUrlBusqueda();
    this.armarUrlBusqueda2();
    const loading = this.generalServ.loadingModal();
    let dataUser = {
      'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
      'UserName': "",
      'Nombre': this.nombresCtrl.value,
      'textoBusqueda': "",
      'Apellido': "",
      'CUIL': "",
      'page':1,
      'pageSize':20,
      'idSucursal':this.sucursalSeleccionada.IdSucursal,
      'Turno' : this.turno
    };
    this.userServ.getListEmpleadoByIdClienteNegotis(dataUser).subscribe((data: any) => {
      this.empleadoListOriginal = data.listadoCompleto;
      this.filteredNombres = this.nombresCtrl.valueChanges
      .pipe(
        startWith(''),
        map((item: any) => item ? this._filterNombres(item) : this.empleadoListOriginal.filter((s: any) => s.ClienteNegotis != true).slice())
      );


      loading.close();
    }, (error: any) => { console.log(error); loading.close(); });

/*     if(this.turnoSel != null)
    {
      this.turno = this.turnoSel;
    } */
  }


  getVendedor(item: any) {
    this.idVendedor = item.Id;
  }

  private _filterNombres(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.empleadoListOriginal.filter((item: any) => item.Nombres.toLowerCase().includes(filterValue.toLowerCase()));
  }

  getSucursalVendedor(value: any) {
    this.sucursal = value.Sucursal;
    this.buscar();
  }


  armarUrlBusqueda() {
/*     if(this.turnoSel != null)
    {
      this.turno = this.turnoSel;
    } */
      this.urlImprimir = this.globalService.urlApi + '/ApiTotales/Get/Pdf/Listado/Imprimir?' +
      'idClienteNegotis=' + localStorage.getItem('idClienteNegotis') +
      '&fechaDesde=' + this.fechaDesde +
      '&fechaHasta=' + this.fechaHasta +
      '&idSucursal=' + this.sucursalSeleccionada.IdSucursal +
      '&idVendedor=' + this.idVendedor +
      '&Turno=' + this.turno +
      '&comandera=' + true +
      '&token=' + localStorage.getItem('token');
  }

  armarUrlBusqueda2() {
/*     if(this.turnoSel != null)
    {
      this.turno = this.turnoSel;
    } */
      this.urlImprimir2 = this.globalService.urlApi + '/ApiTotales/Get/Pdf/Listado/Imprimir?' +
      'idClienteNegotis=' + localStorage.getItem('idClienteNegotis') +
      '&fechaDesde=' + this.fechaDesde +
      '&fechaHasta=' + this.fechaHasta +
      '&idSucursal=' + this.sucursalSeleccionada.IdSucursal +
      '&idVendedor=' + this.idVendedor +
      '&Turno=' + this.turno +
      '&comandera=' + false +
      '&token=' + localStorage.getItem('token');
  }

  buscar() {
    const loadRef = this.generalServ.loadingModal();

    this.armarUrlBusqueda();
    this.armarUrlBusqueda2();
    let data = {
      'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
      'fechaDesde': this.fechaDesde,
      'fechaHasta': this.fechaHasta,
      'idSucursal': this.sucursal.Id,
      'idVendedor': this.idVendedor,
      'Turno': this.turno
    };
    this.cajaServ.getCajaTotales(data)
      .subscribe(data => {
        this.getTotales = data;
        this.submittedFechaDesde = this.fechaDesde;
        this.submittedFechaHasta = this.fechaHasta;
        localStorage.setItem(this.lastTurno, JSON.stringify(this.turno));
        loadRef.close();
      }, error => { console.log(error); loadRef.close(); });
  }

  limpiar() {
    this.fechaDesde = this.calendar.getToday().day.toString().padStart(2, '0') + '/' + this.calendar.getToday().month.toString().padStart(2, '0') + '/' + this.calendar.getToday().year.toString().padStart(4, '0');
    this.fechaHasta = this.calendar.getToday().day.toString().padStart(2, '0') + '/' + this.calendar.getToday().month.toString().padStart(2, '0') + '/' + this.calendar.getToday().year.toString().padStart(4, '0');
    this.idVendedor = undefined;
    this.turno = null;
    this.buscar();
  }

  fechaDesdeFunc() {
    this.runDatePicker().subscribe(result => this.fechaDesde = this.getDateAsString(result))
  }

  fechaHastaFunc() {
    this.runDatePicker().subscribe(result => this.fechaHasta = this.getDateAsString(result))
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

}
