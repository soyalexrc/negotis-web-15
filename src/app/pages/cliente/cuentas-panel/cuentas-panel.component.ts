import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { DatepickerModalComponent } from '../../../components/datepicker-modal/datepicker-modal.component';
import { GeneralService } from '../../../Service/general.service';
import { PedidoService } from '../../../Service/pedido.service';
import { CategotriaRubroService } from 'src/app/Service/categotria-rubro.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/Service/global.service';
import { map, startWith } from 'rxjs/operators';
import { MensajeseleccionarsucursalModalComponent } from 'src/app/components/mensajeseleccionarsucursal-modal/mensajeseleccionarsucursal-modal.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-cuentas-panel',
  templateUrl: './cuentas-panel.component.html',
  styleUrls: ['./cuentas-panel.component.css']
})
export class CuentasPanelComponent implements OnInit {


  fechaDesde: any = this.calendar.getToday().day.toString().padStart(2, '0') + '/' + this.calendar.getToday().month.toString().padStart(2, '0') + '/' + this.calendar.getToday().year.toString().padStart(4, '0');
  fechaHasta: any = this.calendar.getToday().day.toString().padStart(2, '0') + '/' + this.calendar.getToday().month.toString().padStart(2, '0') + '/' + this.calendar.getToday().year.toString().padStart(4, '0');
  limit: number = 20;
  page: number = 1;
  total: number = 0;
  ClientesLista: any;
  sucursalServ: any;
  sucSelecPost: any;
  mostrarModalSeleccion!: boolean;
  filtroMes: any;
  public urlImprimir!: string;
  @Output() GetSucursalEmit: EventEmitter<any>;
  constructor(
    private titleService: Title,
    private calendar: NgbCalendar,
    private dialog: MatDialog,
    private generalServ: GeneralService,
    private route: ActivatedRoute,
    private pedidoServ: PedidoService,
    private globalService: GlobalService,
    private categoriaServ: CategotriaRubroService
  ) {
    titleService.setTitle("Reportes");
    this.GetSucursalEmit = new EventEmitter();
  }

  ngOnInit() {
    var roles = JSON.parse(localStorage.getItem('roles') ?? '');
    var sucursalSeleccionada = JSON.parse(localStorage.getItem('sucursalSeleccionada') ?? '');
    let tieneRolCliente = eval(localStorage.getItem('RolClienteNegotis') ?? '') || false;
    if (sucursalSeleccionada == null) {
      let dataUser = { 'idUser': localStorage.getItem('idUser') };
      this.sucursalServ.sucursalSeleccionadaByUsuario(dataUser)
        .subscribe((data: any) => {
          this.sucSelecPost = data;
          this.GetSucursalEmit.emit(this.sucSelecPost);
          if (sucursalSeleccionada == null && this.mostrarModalSeleccion == true) {
            const dialogRef = this.dialog.open(MensajeseleccionarsucursalModalComponent, {
              width: '450px', hasBackdrop: false
            });
          }
        })
    } else {
      this.GetSucursalEmit.emit(sucursalSeleccionada);
      this.sucSelecPost = sucursalSeleccionada;
    }

    this.urlImprimir = this.globalService.urlApi + '/ApiPedido/Get/Pdf/Listado/Cuentas?' +
    'idClienteNegotis=' + localStorage.getItem('idClienteNegotis') +
    '&page=' + this.page +
    '&pageSize=' + this.limit +
    '&idSucursal=' + this.sucSelecPost.IdSucursal +
    '&fechaDesde=' + this.fechaDesde +
    '&fechaHasta=' + this.fechaHasta +
    '&token=' + localStorage.getItem('token')


  }


  armarUrlBusqueda() {
    this.urlImprimir = this.globalService.urlApi + '/ApiPedido/Get/Pdf/Listado/Cuentas?' +
    'idClienteNegotis=' + localStorage.getItem('idClienteNegotis') +
    '&page=' + this.page +
    '&pageSize=' + this.limit +
    '&idSucursal=' + this.sucSelecPost.IdSucursal +
    '&fechaDesde=' + this.fechaDesde +
    '&fechaHasta=' + this.fechaHasta +
    '&token=' + localStorage.getItem('token')
  }

  fechaHastaFunc() {
    this.runDatePicker().subscribe(result => {
      this.fechaHasta = this.getDateAsString(result);
      this.armarUrlBusqueda();
    });
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




  buscar(){

    if(this.filtroMes != null)
    {
      if(this.filtroMes == "1" || this.filtroMes == "3" || this.filtroMes == "5" || this.filtroMes == "7" || this.filtroMes == "8" || this.filtroMes == "10" || this.filtroMes == "12")
      {
        if(this.filtroMes != 10 && this.filtroMes != 12)
        {
          this.filtroMes = "0" + this.filtroMes;
        }
        this.fechaDesde =  "01" +"/" + this.filtroMes + "/"+ this.calendar.getToday().year.toString().padStart(4, '0');
        this.fechaHasta = "31" +"/" + this.filtroMes + "/"+ this.calendar.getToday().year.toString().padStart(4, '0');
      }
      if(this.filtroMes == "4" || this.filtroMes == "6" || this.filtroMes == "9" || this.filtroMes == "11")
      {
        if(this.filtroMes != 11)
        {
          this.filtroMes = "0" + this.filtroMes;
        }
        this.fechaDesde = "01"  +"/" + this.filtroMes + "/"+ this.calendar.getToday().year.toString().padStart(4, '0');
        this.fechaHasta = "30" +"/" + this.filtroMes + "/"+this.calendar.getToday().year.toString().padStart(4, '0');
      }
      if(this.filtroMes == "2")
      {
        this.filtroMes = "0" + this.filtroMes;
        this.fechaDesde = "01" +"/" + this.filtroMes + "/"+ this.calendar.getToday().year.toString().padStart(4, '0');
        this.fechaHasta = "28" +"/" + this.filtroMes +"/"+this.calendar.getToday().year.toString().padStart(4, '0');
      }
    }
    const loadRef = this.generalServ.loadingModal();
    const dataFiltro = {
      'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
      'page':this.page,
      'pageSize':this.limit,
      'idSucursal':this.sucSelecPost.IdSucursal,
      'fechaDesde': this.fechaDesde,
      'fechaHasta': this.fechaHasta
    };
    this.pedidoServ.getListCuentas(dataFiltro).subscribe((data: any) => {
      this.ClientesLista = data.ListadoCuentas;
      this.total = data.totalItems;
      loadRef.close();
  }, (error: any) => { console.log(error); loadRef.close(); });
}

fechaDesdeFunc() {
  this.runDatePicker().subscribe(result => {
    this.fechaDesde = this.getDateAsString(result);
    this.armarUrlBusqueda();
  });
}

goToPage(n: number): void {
  this.page = n;
  this.buscar();
}

onNext(): void {
  this.page++;
  this.buscar();
}

onPrev(): void {
  this.page--;
  this.buscar();
}
}
