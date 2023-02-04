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
import { ZonaService } from 'src/app/Service/zona.service';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-rank-clientes-panel',
  templateUrl: './rank-clientes-panel.component.html',
  styleUrls: ['./rank-clientes-panel.component.css']
})
export class RankClientesComponent implements OnInit {


  fechaDesde: any = this.calendar.getToday().day.toString().padStart(2, '0') + '/' + this.calendar.getToday().month.toString().padStart(2, '0') + '/' + this.calendar.getToday().year.toString().padStart(4, '0');
  fechaHasta: any = this.calendar.getToday().day.toString().padStart(2, '0') + '/' + this.calendar.getToday().month.toString().padStart(2, '0') + '/' + this.calendar.getToday().year.toString().padStart(4, '0');
  limit: number = 20;
  page: number = 1;
  total: number = 0;
  ClientesLista: any;
  sucursalServ: any;
  sucSelecPost: any;
  mostrarModalSeleccion!: boolean;
  FiltroZona: any;
  idZona: any;
  vendedorNombres: any;
  IdVendedor: string = "";
  vendedorCtrl = new FormControl();
  filteredVendedor!: Observable<any[]>;
  zonaCtrl = new FormControl();
  filteredZona!: Observable<any[]>;
  infoVendedores: any;
  infoZona: any;
  @Output() GetSucursalEmit: EventEmitter<any>;
  constructor(
    private titleService: Title,
    private calendar: NgbCalendar,
    private dialog: MatDialog,
    private generalServ: GeneralService,
    private route: ActivatedRoute,
    private pedidoServ: PedidoService,
    private globalService: GlobalService,
    private categoriaServ: CategotriaRubroService,
    private userServ: UserService,
    private zonaServ : ZonaService
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
    let datos2 = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis')};
    this.zonaServ.listadoZonasByIdClienteNegotis(datos2).subscribe(result => {
      this.infoZona = result;
      this.filteredZona= this.zonaCtrl.valueChanges
      .pipe(
        startWith(''),
        map(item => item ? this._filterZona(item) : this.infoZona.slice())
        );

    }, error => {
      console.log(error);
     });
     const loadingVendedor = this.generalServ.loadingModal();
     let datos = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis'),'Page': 1};
     this.pedidoServ.getInfoGeneral(datos).subscribe(result => {
       this.infoVendedores = result;
       loadingVendedor.close();
       this.filteredVendedor = this.vendedorCtrl.valueChanges
       .pipe(
         startWith(''),
         map(item => item ? this._filterVendedor(item) : this.infoVendedores.Empleados.slice())
       );
     }, error => {
       console.log(error);
       loadingVendedor.close();
   });


  }

  private _filterVendedor(value: string): any[] {
    const filterValue = value.toLowerCase();

     return this.infoVendedores.Empleados.filter((item: any) => item.Nombres.toLowerCase().includes(filterValue.toLowerCase()) || item.Apellidos.toLowerCase().includes(filterValue.toLowerCase()));
   }
  private _filterZona(value: string): any[] {
    const filterValue = value.toLowerCase();
     return this.infoZona.filter((item: any) => item.Nombre.toLowerCase().includes(filterValue.toLowerCase()));
   }



   public filtrarVendedor() {
    if (this.vendedorNombres.toString().length > 4) {


        const loadRef = this.generalServ.loadingModalBuscar();
        let data = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
        'UserName': "",
        'Nombre': "",
        'textoBusqueda' :this.vendedorNombres,
        'Apellido': "",
        'CUIL': "",
        'page':this.page,
        'pageSize':this.limit };
        this.userServ.getListEmpleadoByIdClienteNegotis(data).subscribe((resp: any) => {
          loadRef.close();
          this.infoVendedores = resp;
          this.filteredVendedor = this.vendedorCtrl.valueChanges
            .pipe(
              startWith(''),
              map(item => item ? this._filterVendedor(item) : this.infoVendedores.listado.slice())
            );

          loadRef.close();
        });

    }
  }
  getVendedor(item: any) {
    this.IdVendedor = item.Id;
    this.vendedorNombres = item.Nombres;
  }
  getZona(item: any) {
    this.FiltroZona=item.Nombre;
    this.idZona = item.Id;
  }
  fechaHastaFunc() {
    this.runDatePicker().subscribe(result => {
      this.fechaHasta = this.getDateAsString(result);

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


  limpiar() {
    const fechaHoy = this.calendar.getToday();
    this.fechaDesde = fechaHoy.day.toString().padStart(2, '0') + '/' + fechaHoy.month.toString().padStart(2, '0') + '/' + fechaHoy.year.toString().padStart(4, '0');
    this.fechaHasta = fechaHoy.day.toString().padStart(2, '0') + '/' + fechaHoy.month.toString().padStart(2, '0') + '/' + fechaHoy.year.toString().padStart(4, '0');
    this.page = 1;
    this.total=0;
    this.IdVendedor = "";
    this.vendedorNombres='';
    this.FiltroZona = "";
    this.idZona = null;
    this.buscar();
  }

  buscar(){

    const loadRef = this.generalServ.loadingModal();
    const dataFiltro = {
      'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
      'page':this.page,
      'pageSize':this.limit,
      'fechaDesde': this.fechaDesde,
      'fechaHasta': this.fechaHasta,
       'idZona': this.idZona,
       'idVendedor':this.IdVendedor

    };
    this.pedidoServ.getListClientesRanking(dataFiltro).subscribe((data: any) => {
      this.ClientesLista = data.lista;
      this.total = data.totalItems;
      loadRef.close();
  }, (error: any) => { console.log(error); loadRef.close(); });
}

fechaDesdeFunc() {
  this.runDatePicker().subscribe(result => {
    this.fechaDesde = this.getDateAsString(result);

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
