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
import { ClienteclienteService } from 'src/app/Service/clientecliente.service';
import { Title } from '@angular/platform-browser';
import { RubroService } from 'src/app/Service/rubro.service';
import { ZonaService } from 'src/app/Service/zona.service';
import { TransferenciaDineroService } from 'src/app/Service/transferencia-dinero.service';
import { LineChartComponent } from 'src/app/components/line-chart-modal/line-chart.component';
import { CompraProveedorModel } from 'src/app/models/CompraProveedorModel';
import { ProveedorService } from 'src/app/Service/proveedor.service';

@Component({
  selector: 'app-reporte-consolidado-panel',
  templateUrl: './reporte-consolidado-panel.component.html',
  styleUrls: ['./reporte-consolidado-panel.component.css']
})
export class ReporteConsolidadoPanelComponent implements OnInit {
  roles: any;
  public urlImprimir!: string;
  public urlImprimir2!: string;
  tieneRolCliente: any;
  modificarProductosHabilitado: boolean = false;
  reporteModel: ConsolidadoModel;
  idLista: any = "";
  graph:any="bar";
  token: any;
  idSucursal: any;
  listadoPrecios: any;
  articulosMasVendidos: any = [];
  idClienteNegotis: any;
  fechaDesde: any = this.calendar.getToday().day.toString().padStart(2, '0') + '/' + this.calendar.getToday().month.toString().padStart(2, '0') + '/' + this.calendar.getToday().year.toString().padStart(4, '0');
  fechaHasta: any = this.calendar.getToday().day.toString().padStart(2, '0') + '/' + this.calendar.getToday().month.toString().padStart(2, '0') + '/' + this.calendar.getToday().year.toString().padStart(4, '0');
  fechaDesdeCantidad:any;
  fechaHastaCantidad:any;
  tiposComprobante = PropertyUtil.getPropertiesByType(TiposPropiedad.TIPO_COMPROBANTE);
  estadosEntrega = PropertyUtil.getPropertiesByType(TiposPropiedad.ESTADO_ENTREGA);
  filtroDescripcionArticulo: string = "";
  filtroCategoriaArticulo: string = "";
  filtroEstadoEntrega: number = 0;
  limit: number = 20;
  page: number = 1;
  total: number = 0;
  FiltroRubro: any;
  FiltroZona: any;
  idZona: any;
  tipoComprobante :any = "";
  listadoSucursales:any;

  infoInicio: any;
  horas=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
  horaFiltro:any;

  categoriaNombre: any;
  IdCategoria: any;
  infoGeneral: any;
  infoRubro: any;
  infoZona: any;
  infoVendedores: any;
  sucSelecPost: any;
  myForm: FormGroup;

  cliente = '';
  busquedaCliente = '';
  clienteCtrl = new FormControl();
  filteredCliente!: Observable<any[]>;
  clienteSucursales: any;
  idCliente: any;


  ctrlProveedor = new FormControl();
  filteredProveedor!: Observable<any>;
  proveedores!: any[];
  proveedor: any;
  selectedProveedor:any;

  montoTotalVentas: any=0;
  montoTotalCostos: any=0;
  vendedorNombres: any;
  IdVendedor: string = "";
  vendedorCtrl = new FormControl();
  filteredVendedor!: Observable<any[]>;
  categoriaCtrl = new FormControl();
  filteredCategoria!: Observable<any[]>;
  rubroCtrl = new FormControl();
  filteredRubro!: Observable<any[]>;
  zonaCtrl = new FormControl();
  filteredZona!: Observable<any[]>;
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
    private globalService: GlobalService,
    private listaPrecServ : ListaPreciosService,
    private categoriaServ: CategotriaRubroService,
    private rubroServ: RubroService,
    private transDinServ: TransferenciaDineroService,
    private pedidoServ: PedidoService,
    private clienteServ: ClienteclienteService,
    private zonaServ : ZonaService,
    private provServ: ProveedorService,
    ) {
      titleService.setTitle("Reportes");
      this.GetSucursalEmit = new EventEmitter();
    this.myForm = fb.group({
        filtroDescripcionArticulo: ['', Validators.compose([])],
        categoriaNombre: ['', Validators.compose([])],
        fechaDesde: ['', Validators.compose([])],
        fechaHasta: ['', Validators.compose([])],
        filtroEstadoEntrega: ['', Validators.compose([])],
        filtroRubro: ['', Validators.compose([])],
        filtroZona: ['', Validators.compose([])],
        tipoComprobante: ['', Validators.compose([])],
      })
    this.reporteModel=new ConsolidadoModel;
   }

  ngOnInit() {
    this.initAutoProveedor();

    if (this.route.snapshot.queryParams['filter'] != null) {
      this.filtroDescripcionArticulo = this.route.snapshot.queryParams['filter'];
      }
      this.getListaPrecios();
      var sucursalSeleccionada = JSON.parse(localStorage.getItem('sucursalSeleccionada') ?? '');
      let dataInicio = { 'idSucursal':sucursalSeleccionada.IdSucursal,
      'idClienteNegotis': localStorage.getItem('idClienteNegotis')};
      this.transDinServ.GetDataInicioCrearEditar(dataInicio)
        .subscribe(data => {
         this.infoInicio= data;
         this.todasSuc();
        }, error => {
          console.log(error);
        })
      this.roles = JSON.parse(localStorage.getItem('roles') ?? '');
      this.tieneRolCliente = eval(localStorage.getItem('RolClienteNegotis') ?? '') || false;
      this.modificarProductosHabilitado = (this.roles != null && this.roles.ModificarProductos) || this.tieneRolCliente;
      this.token = localStorage.getItem('token');

      this.idClienteNegotis = localStorage.getItem('idClienteNegotis');
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
        let datosRubro = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis'),'Page': 1};
        this.rubroServ.listadoRubroByIdClienteNegotis(datos).subscribe((result: any) => {
        this.infoRubro = result.rubrosTotales;

        this.filteredRubro = this.rubroCtrl.valueChanges
        .pipe(
          startWith(''),
          map(item => item ? this._filterRubro(item) : this.infoRubro.slice())
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


    todasSuc(todas?:boolean){
      this.listadoSucursales=[];
      for(let item of this.infoInicio.ListSucursal){
        this.listadoSucursales.push(item);
      }
    }

  private _filterCategoria(value: string): any[] {
    const filterValue = value.toLowerCase();
     return this.infoGeneral.filter((item: any) => item.Nombre.toLowerCase().includes(filterValue.toLowerCase()));
   }
   private _filterCliente(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.infoGeneral.Clientes.filter((item: any) => item.RazonSocial.toLowerCase().includes(filterValue.toLowerCase()));
  }
  private _filterRubro(value: string): any[] {
    const filterValue = value.toLowerCase();
     return this.infoRubro.filter((item: any) => item.Nombre.toLowerCase().includes(filterValue.toLowerCase()));
   }
   private _filterZona(value: string): any[] {
    const filterValue = value.toLowerCase();
     return this.infoZona.filter((item: any) => item.Nombre.toLowerCase().includes(filterValue.toLowerCase()));
   }
  fechaDesdeFunc() {
    this.runDatePicker().subscribe(result => {
      this.fechaDesde = this.getDateAsString(result);

    });
  }
  selectProveedor = (key: any) => { this.selectedProveedor = key.option.value; }
  resetProveedor = () => { this.selectedProveedor = null; }
  displayProveedorSelected = (option?: any): string => option ? option.razonSocial ? option.razonSocial : option.nombre : '';
  displayProveedorOption = (option?: any): string => option ? option.razonSocial ? option.razonSocial : option.nombre : '';
  public filtrarCliente() {
    if (this.cliente.toString().length > 4) {
      if (this.cliente.toString().length >= this.busquedaCliente.toString().length) {
        const loadRef = this.generalServ.loadingModalBuscar();
        let data = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis'), 'textoBusqueda': this.cliente, 'page': this.page, 'pageSize': this.limit };
        this.clienteServ.busquedaClientesClienteNegotisPaginado(data).subscribe(resp => {
          loadRef.close();
          this.infoGeneral.Clientes = resp;
          this.filteredCliente = this.clienteCtrl.valueChanges
            .pipe(
              startWith(''),
              map(item => item ? this._filterCliente(item) : this.infoGeneral.Clientes.slice())
            );

          loadRef.close();
        });
      }
    }
    this.busquedaCliente = this.cliente;
  }

  getProveedorName(id: any) {
    let selected = this.proveedores.find(x => x.id == id);
    if (selected == null) {
      return '';
    }
    else {
      return selected.razonSocial;
    }
  }

  filterProveedor(value: string): CompraProveedorModel[] {
    if (value == null || value === '') {
      return this.proveedores;
    }
    let filterVal = value.toString().toLowerCase();
    return this.proveedores.filter(option => {
      if (option.razonSocial != null) {
        return option.razonSocial.toLowerCase().includes(filterVal);
      } else {
        return false;
      }
    });
  }

  initAutoProveedor() {
    const loadingProv = this.generalServ.loadingModal();

    this.provServ.getAll().subscribe(next => {
      loadingProv.close();
      this.proveedores = Object.values(next);
    }, error => {
      console.log(error);
      loadingProv.close();
    });

    this.filteredProveedor = this.ctrlProveedor.valueChanges
      .pipe(
        startWith(''),
        map(value => this.filterProveedor(value))
      );
  }



  getCliente(value: any) {
    this.idCliente = value.Id;
  }

  marcarArticuloMasVendidos(value:any)
  {
    for (let index = 0; index < this.reporteModel.listaArticulos.length; index++) {
      this.articulosMasVendidos.push(this.reporteModel.listaArticulos[index].IdArticulo);
      }
    const loading = this.generalServ.loadingModal();
    let dataUser = {
      'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
      'listado' : this.articulosMasVendidos,
    };
    this.articuloServ.marcarMasVendido(dataUser)
    .subscribe(data => {
        var asd = data;
        loading.close();
    }, error => { console.log(error); loading.close(); })

    this.limpiar();

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
      '&idCliente=' + this.montoTotalVentas+
      '&filtroRubro=' + this.FiltroRubro+
      '&filtroZona=' + this.idZona+
      '&tipoComprobante=' + this.tipoComprobante+
      '&token=' + localStorage.getItem('token');

      if(this.proveedor != null)
      {
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
        '&idCliente=' + this.montoTotalVentas+
        '&filtroRubro=' + this.FiltroRubro+
        '&filtroZona=' + this.idZona+
        '&tipoComprobante=' + this.tipoComprobante+
        '&filtroProveedor=' + this.proveedor.id+
        '&token=' + localStorage.getItem('token');
      }

      this.urlImprimir2 = this.globalService.urlApi + '/ApiArticulo/Get/Pdf/Listado/Reporte?' +
      'idClienteNegotis=' + localStorage.getItem('idClienteNegotis') +
      '&filter=' + this.filtroDescripcionArticulo +
      '&filterCategoria=' + this.filtroCategoriaArticulo +
      '&filtroEstadoEntrega=' + this.filtroEstadoEntrega +
      '&fechaDesde=' + this.fechaDesde +
      '&fechaHasta=' + this.fechaHasta +
      '&idSucursal=' + this.sucSelecPost.IdSucursal+
      '&idVendedor=' + this.IdVendedor+
      '&totalVentas=' + this.montoTotalVentas+
      '&idCliente=' + this.montoTotalVentas+
      '&filtroRubro=' + this.FiltroRubro+
      '&filtroZona=' + this.idZona+
      '&tipoComprobante=' + this.tipoComprobante+
      '&token=' + localStorage.getItem('token')+
      '&es80mm=' + true;
  }
  getLista(value: any) {
    this.idLista = value.Id;
  }
  getSucursal(value: any) {
    this.idSucursal = value.Id;
  }
  getComprobante(value: any) {
    this.tipoComprobante = value;
  }
  limpiar() {
    const fechaHoy = this.calendar.getToday();
    this.fechaDesde = fechaHoy.day.toString().padStart(2, '0') + '/' + fechaHoy.month.toString().padStart(2, '0') + '/' + fechaHoy.year.toString().padStart(4, '0');
    this.fechaHasta = fechaHoy.day.toString().padStart(2, '0') + '/' + fechaHoy.month.toString().padStart(2, '0') + '/' + fechaHoy.year.toString().padStart(4, '0');
    this.page = 1;
    this.filtroDescripcionArticulo="";
    this.filtroCategoriaArticulo="";
    this.filtroEstadoEntrega =0;
    this.total=0;
    this.categoriaNombre="";
    this.IdVendedor = "";
    this.vendedorNombres='';
    this.FiltroZona = "";
    this.idZona = null;
    this.idLista="";
    this.buscar();
  }

  getCategoria(item: any) {
    this.filtroCategoriaArticulo=item.Nombre;
  }
  getRubro(item: any) {
    this.FiltroRubro=item.Nombre;
  }
  getZona(item: any) {
    this.FiltroZona=item.Nombre;
    this.idZona = item.Id;
  }

  cargarModel(){
    this.reporteModel.filtro = this.filtroDescripcionArticulo;
    this.reporteModel.filtroCategoriaRubro= this.filtroCategoriaArticulo;
    this.reporteModel.filtroEstadoEntrega = this.filtroEstadoEntrega;
    this.reporteModel.fechaDesde= this.fechaDesde;
    this.reporteModel.fechaHasta= this.fechaHasta;
    this.reporteModel.idSucursal=Number(this.sucSelecPost.IdSucursal);
    this.reporteModel.filtroVendedor=this.IdVendedor;
    this.reporteModel.filtroListaPrecios = this.idLista;
    this.reporteModel.filtroRubro = this.FiltroRubro;
    this.reporteModel.filtroZona = this.idZona;
    this.reporteModel.tipoComprobante = this.tipoComprobante;
    if(this.proveedor != null)
    {
      this.reporteModel.filtroProveedor = this.proveedor.id;
      this.armarUrlBusqueda();
    }

    this.buscar();
  }

  resetCliente() {
    this.idCliente = null;
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
      'idSucursal':this.reporteModel.idSucursal,
      'idVendedor' : this.reporteModel.filtroVendedor,
      'fechaDesdeCantidad' : this.fechaDesdeCantidad,
      'fechaHastaCantidad' : this.fechaHastaCantidad,
      'idListaPrecios' : this.reporteModel.filtroListaPrecios,
      'idCliente' : this.idCliente,
      'filtroRubro' :this.reporteModel.filtroRubro,
      'filtroZona' : this.reporteModel.filtroZona,
      'tipoComprobante' : this.reporteModel.tipoComprobante,
      'filtroProveedor' : this.reporteModel.filtroProveedor
    };
    this.articuloServ.generarReporte(dataFiltro).subscribe((data: any) => {
      this.reporteModel.listaArticulos= data.articulos;
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



generarReporte()
{
  const dialogRef = this.dialog.open(LineChartComponent, {
    height: '700px',
    width: '900px',
    data:{
      titulo: 'Gráfico de Productos',
      listado: this.reporteModel,
      graph:this.graph,
      filtroRubro : ""
    }


  });
}

}
