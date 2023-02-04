import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { DatepickerModalComponent } from '../../../components/datepicker-modal/datepicker-modal.component';
import { GeneralService } from '../../../Service/general.service';
import { ArticuloService } from 'src/app/Service/articulo.service';
import { CategotriaRubroService } from 'src/app/Service/categotria-rubro.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl,FormGroup, Validators,FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/Service/global.service';
import { map, startWith } from 'rxjs/operators';
import { ConsolidadoModel } from 'src/app/models/ConsolidadoModel';
import PropertyUtil, {TiposPropiedad} from '../../../util/property.util';
import { MensajeseleccionarsucursalModalComponent } from 'src/app/components/mensajeseleccionarsucursal-modal/mensajeseleccionarsucursal-modal.component';
import { PedidoService } from 'src/app/Service/pedido.service';
import * as moment from 'moment';
import { ListaPreciosService } from 'src/app/Service/lista-precios.service';
import { UserService } from '../../../Service/user.service';
import { MateriaPrimaService } from 'src/app/Service/materiaprima.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-reporte-consolidadoMP-panel',
  templateUrl: './reporte-consolidadoMP-panel.component.html',
  styleUrls: ['./reporte-consolidadoMP-panel.component.css']
})
export class ReporteConsolidadoMPPanelComponent implements OnInit {
  roles: any;
  public urlImprimir!: string;
  tieneRolCliente: any;
  modificarProductosHabilitado: boolean = false;
  reporteModel: ConsolidadoModel;
  idLista: any = "";
  token: any;
  listadoPrecios: any;
  articulosMasVendidos = [];
  idClienteNegotis: any;
  fechaDesde: any = this.calendar.getToday().day.toString().padStart(2, '0') + '/' + this.calendar.getToday().month.toString().padStart(2, '0') + '/' + this.calendar.getToday().year.toString().padStart(4, '0');
  fechaHasta: any = this.calendar.getToday().day.toString().padStart(2, '0') + '/' + this.calendar.getToday().month.toString().padStart(2, '0') + '/' + this.calendar.getToday().year.toString().padStart(4, '0');
  fechaDesdeCantidad:any;
  fechaHastaCantidad:any;
  estadosEntrega = PropertyUtil.getPropertiesByType(TiposPropiedad.ESTADO_ENTREGA);
  filtroDescripcionArticulo: string = "";
  filtroCategoriaArticulo: string = "";
  filtroEstadoEntrega: number = 0;
  limit: number = 20;
  page: number = 1;
  total: number = 0;

  categoriaNombre: any;
  IdCategoria: any;
  infoGeneral: any;
  infoVendedores: any;
  sucSelecPost: any;
  myForm: FormGroup;

  montoTotalVentas: any=0;
  montoTotalCostos: any=0;
  vendedorNombres: any;
  IdVendedor: string = "";
  vendedorCtrl = new FormControl();
  filteredVendedor!: Observable<any[]>;
  categoriaCtrl = new FormControl();
  filteredCategoria!: Observable<any[]>;
  sucursalServ: any;
  @Output() GetSucursalEmit: EventEmitter<any>;
  mostrarModalSeleccion!: boolean;
  constructor(
    private titleService: Title,
    private calendar: NgbCalendar,
    private dialog: MatDialog,
    private userServ: UserService,
    private fb: FormBuilder,
    private generalServ: GeneralService,
    private route: ActivatedRoute,
    private articuloServ: ArticuloService,
    private mpServ: MateriaPrimaService,
    private globalService: GlobalService,
    private listaPrecServ : ListaPreciosService,
    private categoriaServ: CategotriaRubroService,
    private pedidoServ: PedidoService
    ) {
      titleService.setTitle("Reportes");
      this.GetSucursalEmit = new EventEmitter();
    this.myForm = fb.group({
        'filtroDescripcionArticulo': ['', Validators.compose([])],
        'categoriaNombre': ['', Validators.compose([])],
        'fechaDesde': ['', Validators.compose([])],
        'fechaHasta': ['', Validators.compose([])],
        'filtroEstadoEntrega': ['', Validators.compose([])]
      })
    this.reporteModel=new ConsolidadoModel;
   }

  ngOnInit() {
    if (this.route.snapshot.queryParams['filter'] != null) {
      this.filtroDescripcionArticulo = this.route.snapshot.queryParams['filter'];
      }
      this.getListaPrecios();
      var sucursalSeleccionada = JSON.parse(localStorage.getItem('sucursalSeleccionada') ?? '');
      this.roles = JSON.parse(localStorage.getItem('roles') ?? '');
      this.tieneRolCliente = eval(localStorage.getItem('RolClienteNegotis') ?? '') || false;
      this.modificarProductosHabilitado = (this.roles != null && this.roles.ModificarProductos) || this.tieneRolCliente;
      this.token = localStorage.getItem('token');
      this.idClienteNegotis = localStorage.getItem('idClienteNegotis');
      let datos = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis'),'Page': 1};
      this.categoriaServ.listadoCategoriaRubroByIdClienteNegotis(datos).subscribe((result: any) => {
      this.infoGeneral = result.categoriasTotales;

      this.filteredCategoria = this.categoriaCtrl.valueChanges
      .pipe(
        startWith(''),
        map(item => item ? this._filterCategoria(item) : this.infoGeneral.slice())
        );
      }, (error: any) => {
         console.log(error);
        });
        const loadingVendedor = this.generalServ.loadingModal();
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
    }

  private _filterCategoria(value: string): any[] {
    const filterValue = value.toLowerCase();
     return this.infoGeneral.filter((item: any) => item.Nombre.toLowerCase().includes(filterValue.toLowerCase()));
   }

  fechaDesdeFunc() {
    this.runDatePicker().subscribe(result => {
      this.fechaDesde = this.getDateAsString(result);

    });
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

  getListaPrecios() {
    const loading = this.generalServ.loadingModal();
    let dataList = {
      'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
      'activo': true
    };
    this.listaPrecServ.ListaPreciosByIdClienteNegotis(dataList).subscribe(data => {
      this.listadoPrecios = data;
      loading.close();
    }, error => { console.log(error); loading.close();})
  }
  getVendedor(item: any) {
    this.IdVendedor = item.Id;
    this.vendedorNombres = item.Nombres;
  }
  private _filterVendedor(value: string): any[] {
    const filterValue = value.toLowerCase();

     return this.infoVendedores.Empleados.filter((item: any) => item.Nombres.toLowerCase().includes(filterValue.toLowerCase()) || item.Apellidos.toLowerCase().includes(filterValue.toLowerCase()));
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

  armarUrlBusqueda() {
      this.urlImprimir = this.globalService.urlApi + '/ApiArticulo/Get/Pdf/Listado/Reporte?' +
      'idClienteNegotis=' + localStorage.getItem('idClienteNegotis') +
      '&filter=' + this.filtroDescripcionArticulo +
      '&filterCategoria=' + this.filtroCategoriaArticulo +
      '&filtroEstadoEntrega=' + this.filtroEstadoEntrega +
      '&fechaDesde=' + this.fechaDesde +
      '&fechaHasta=' + this.fechaHasta +
      '&idSucursal=' + this.sucSelecPost.IdSucursal+
      '&idVendedor=' + this.IdVendedor+
      '&totalVentas=' + this.montoTotalVentas+
      '&token=' + localStorage.getItem('token');
  }
  getLista(value: any) {
    this.idLista = value.Id;
  }
  limpiar() {
    const fechaHoy = this.calendar.getToday();
    this.fechaDesde = fechaHoy.day.toString().padStart(2, '0') + '/' + fechaHoy.month.toString().padStart(2, '0') + '/' + fechaHoy.year.toString().padStart(4, '0');
    this.fechaHasta = fechaHoy.day.toString().padStart(2, '0') + '/' + fechaHoy.month.toString().padStart(2, '0') + '/' + fechaHoy.year.toString().padStart(4, '0');
    this.reporteModel.fechaDesde = fechaHoy.day.toString().padStart(2, '0') + '/' + fechaHoy.month.toString().padStart(2, '0') + '/' + fechaHoy.year.toString().padStart(4, '0');
    this.reporteModel.fechaHasta = fechaHoy.day.toString().padStart(2, '0') + '/' + fechaHoy.month.toString().padStart(2, '0') + '/' + fechaHoy.year.toString().padStart(4, '0');
    this.page = 1;
    this.filtroDescripcionArticulo="";
    this.filtroCategoriaArticulo="";
    this.filtroEstadoEntrega =0;
    this.total=0;
    this.categoriaNombre="";
    this.IdVendedor = "";
    this.vendedorNombres='';
    this.idLista="";
    this.buscar();
  }

  getCategoria(item: any) {
    this.filtroCategoriaArticulo=item.Nombre;
  }

  cargarModel(){
    this.reporteModel.filtro = this.filtroDescripcionArticulo;
    this.reporteModel.filtroCategoriaRubro= this.filtroCategoriaArticulo;
    this.reporteModel.filtroEstadoEntrega = this.filtroEstadoEntrega;
    this.reporteModel.fechaDesde= this.fechaDesde;
    this.reporteModel.fechaHasta= this.fechaHasta;
    this.reporteModel.idSucursal=this.sucSelecPost.IdSucursal;
    this.reporteModel.filtroVendedor=this.IdVendedor;
    this.reporteModel.filtroListaPrecios = this.idLista;
    this.buscar();
  }

  buscar(){
    const loadRef = this.generalServ.loadingModal();
    this.fechaDesdeCantidad=moment(this.fechaDesde, 'DD/MM/YYYY').format('YYYY/MM/DD');
    this.fechaHastaCantidad=moment(this.fechaHasta, 'DD/MM/YYYY').format('YYYY/MM/DD');
    const dataFiltro = {
      'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
      'filter': this.reporteModel.filtro,
      'filtroCategoria' : this.reporteModel.filtroCategoriaRubro,
      'codigoEstadoEntrega' : this.reporteModel.filtroEstadoEntrega,
      'fechaDesde': this.reporteModel.fechaDesde,
      'fechaHasta': this.reporteModel.fechaHasta,
      'page': this.page,
      'pageSize': this.limit,
      'idSucursal':this.sucSelecPost.IdSucursal,
      'idVendedor' : this.reporteModel.filtroVendedor,
      'fechaDesdeCantidad' : this.fechaDesdeCantidad,
      'fechaHastaCantidad' : this.fechaHastaCantidad,
      'idListaPrecios' : this.reporteModel.filtroListaPrecios
    };
    this.mpServ.generarReporte(dataFiltro).subscribe((data: any) => {
      this.reporteModel.listaArticulos= data.mps;
      this.total = data.totalItems;
      this.montoTotalVentas = data.totalVentas;
      this.montoTotalCostos = data.totalCostos;

      this.armarUrlBusqueda();
      loadRef.close();
      console.log(this.IdVendedor);
  }, (error: any) => { console.log(error); loadRef.close(); });
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

marcarArticuloMasVendidos(value: any) {}
}
