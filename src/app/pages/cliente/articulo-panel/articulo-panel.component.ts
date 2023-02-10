import { Component, OnInit, Output, EventEmitter, Input,HostListener, ElementRef, ViewChild, } from '@angular/core';
import { ArticuloService } from '../../../Service/articulo.service';
import { ListaPreciosService } from '../../../Service/lista-precios.service';
import { MatDialog } from '@angular/material/dialog';
import { ArticuloCantidadModalComponent } from '../../../components/articulo-cantidad-modal/articulo-cantidad-modal.component';
import { ActualizarPrecioModalComponent } from '../../../components/actualizar-precio-modal/actualizar-precio-modal.component';
import { EliminarModalComponent } from '../../../components/eliminar-modal/eliminar-modal.component';
import { ErrorforaneaModalComponent } from '../../../components/errorforanea-modal/errorforanea-modal.component';
import { GlobalService } from '../../../Service/global.service';
import { FotoCrearEditarModalComponent } from '../../../components/foto-crear-editar-modal/foto-crear-editar-modal.component';
import { GeneralService } from '../../../Service/general.service';
import { SucursalService } from '../../../Service/sucursal.service';
import { MensajeseleccionarsucursalModalComponent } from '../../../components/mensajeseleccionarsucursal-modal/mensajeseleccionarsucursal-modal.component';
import { UseriosucursalModalComponent } from '../../../components/useriosucursal-modal/useriosucursal-modal.component';
import { ModificarValorModalComponent } from 'src/app/components/modificar-valor-modal/modificar-valor-modal.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ArchivoService } from 'src/app/Service/archivo.service';
import { DialogModel } from 'src/app/models/DialogModel';
import { MensajeModalComponent } from 'src/app/components/mensaje-modal/mensaje-modal.component';
import { Title } from '@angular/platform-browser';
import { VisualizarMPModalComponent } from 'src/app/components/visualizarMP-modal/visualizarMP-modal.component';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { CategotriaRubroService } from 'src/app/Service/categotria-rubro.service';
import { map, startWith } from 'rxjs/operators';
import { RubroService } from 'src/app/Service/rubro.service';
import { MarcaService } from 'src/app/Service/marca.service';
import { UserService } from 'src/app/Service/user.service';


@Component({
  selector: 'app-articulo-panel',
  templateUrl: './articulo-panel.component.html',
  styleUrls: ['./articulo-panel.component.css'],

})
export class ArticuloPanelComponent implements OnInit {
  listadoArticulo: any;
  listadoArticuloCompleto: any;
  listadoArticuloOriginal: any;
  listadoPrecios: any;
  sucursalActual: any;
  idSucursal: any=JSON.parse(localStorage.getItem('sucursalSeleccionada') ?? '');
  cantidad: any[] = [];
  index: any = 0;
  articulosResaltar: any = [];
  articulosImprimir: any = [];
  porcentajeLista: number = 0;
  articuloFiltro: any;
  estadoFiltro: any = 'true';
  filtroPrecioOferta: any;
  filtroPrecioCosto: any;
  filtroPrecioBase: any;
  filtroActivos: any;
  filtroTienda: any;
  filtroUnidades!: any;
  filtroImagen: any;
  filtroLote:any;
  codigoFiltro: any;
  marcaFiltro: any;
  rubroFiltro: any;
  categoriaRubroFiltro: any;
  iva: boolean = false;
  token: any;
  porcentaje: any = 0;
  porcentajeO: any = 0;
  idLista: any = 0;
  listaOferta: any = 0;
  idUser:any;
  resetSelectList: boolean = false;
  idClienteNegotis: any;
  modificarProductosHabilitado: boolean = false;
  Ubicaciones : boolean = false;
  VerCodigoCliente : boolean = false;
  visualizarListaActivos: boolean = false;
  sincronizarApi: boolean = false;
  filtroEnterHabilitado: boolean = false;
  mostrarDatosEcommerce : boolean = false;
  modificarUnidadesHabilitado: boolean = false;
  visualizarStockValorHabilitado: boolean = false;
  visualizarListaPreciosHabilitado: boolean = true;
  visualizarPorcentajeHabilitado: boolean = true;
  visualizarPrecioOferta : boolean = false;
  agregarLista : boolean = false;
  visualizarActualizarPreciosHabilitado!: boolean;
  visualizarPrecioDolarHabilitado!: boolean;
  puedeSincronizarExcel : boolean= false;
  visualizarTalle: boolean = true;
  visualizarColor: boolean = false;
  sincronizarExcel: boolean = false;
  verProveedorHabilitado: boolean = false;
  visualizarIDEstadoHabilitado: boolean = false;
  visualizarCantidadXPackHabilitado: boolean = false;
  tieneRolCliente: boolean = false;
  ocultarPrecios: boolean = false;
  ocultarCodigoUnidades: boolean = false
  ocultarFiltros: boolean = false
  tieneRolEtiquetas: boolean = false;
  tieneRolEtiquetas80mm: boolean = false;
  tieneRolActivoSucursal: boolean = false;
  BloquearPrecios: boolean = false;
  es80mm = true;
  tieneRolMP: boolean= false
  visualizarCodigoArticulo : boolean = false;
  medinor: boolean = false;
  fatman : boolean = false;
  filtroDescripcionArticulo: string = "";
  totalCapitalExistente: any = 0;
  totalCapitalVenta: any = 0;
  limit: number = 20;
  page: number = 1;
  pageEtiqueta : number =1 ;
  total: number = 0;
  sucSelecPost: any;
  cotizacionDolar:any;



  crCtrl = new FormControl();
  filteredCR!: Observable<any[]>;
  rubroCtrl = new FormControl();
  filteredRubro!: Observable<any[]>;
  marcaCtrl = new FormControl();
  filteredMarca!: Observable<any[]>;
  infoGeneral:any;
  infoRubro: any;
  infoMarca: any;
  @Output() GetSucursalEmit: EventEmitter<any>;
  @Input() mostrarModalSeleccion!: boolean;
  @Input() selecInput: any;
  constructor(
    private titleService: Title,
    private articuloServ: ArticuloService,
    private archivoService: ArchivoService,
    public dialog: MatDialog,
    public globalServ: GlobalService,
    private router: Router,
    private generalServ: GeneralService,
    private listaPrecServ: ListaPreciosService,
    private route: ActivatedRoute,
    private sucursalServ: SucursalService,
    private categoriaServ: CategotriaRubroService,
    private rubroServ: RubroService,
    private marcaServ: MarcaService,
    private userServ: UserService,
  ) {
    titleService.setTitle("Stock");
    this.GetSucursalEmit = new EventEmitter();
  }

  ngOnInit() {
    this.tieneRolCliente = JSON.parse(localStorage.getItem('RolCliente') ?? 'false');
    if (this.route.snapshot.queryParams['filter'] != null) {
      this.filtroDescripcionArticulo = this.route.snapshot.queryParams['filter'];
    }
    if (this.route.snapshot.queryParams['page'] != null) {
      this.page = this.route.snapshot.queryParams['page'];
    }
    if (this.route.snapshot.queryParams['filterStock'] != null) {
      this.filtroUnidades = this.route.snapshot.queryParams['filterStock'].toString();
    }
    if (this.route.snapshot.queryParams['filterPrecioOferta'] != null) {
      this.filtroPrecioOferta = this.route.snapshot.queryParams['filterPrecioOferta'];
    }
    if (this.route.snapshot.queryParams['filtroPrecioCosto'] != null) {
      this.filtroPrecioCosto = this.route.snapshot.queryParams['filtroPrecioCosto'];
    }
    if (this.route.snapshot.queryParams['filtroPrecioBase'] != null) {
      this.filtroPrecioBase = this.route.snapshot.queryParams['filtroPrecioBase'];
    }
    if (this.route.snapshot.queryParams['filtroTienda'] != null) {
      this.filtroTienda = this.route.snapshot.queryParams['filtroTienda'];
    }
    if (this.route.snapshot.queryParams['filtroActivos'] != null) {
      this.filtroActivos = this.route.snapshot.queryParams['filtroActivos'];
    }
    if (this.route.snapshot.queryParams['filtroImagen'] != null) {
      this.filtroImagen = this.route.snapshot.queryParams['filtroImagen'];
    }
    if (this.route.snapshot.queryParams['filtroLote'] != null) {
      this.filtroLote = this.route.snapshot.queryParams['filtroLote'];
    }

    const dataDolar = { 'idUser': localStorage.getItem('idUser') };
    this.userServ.getCotizacionDolar(dataDolar).subscribe(data => {
      this.cotizacionDolar = data;
    }, error => { console.log(error);});

    this.token = localStorage.getItem('token');
    this.idClienteNegotis = localStorage.getItem('idClienteNegotis');
    this.idUser = localStorage.getItem('idUser');
    var sucursalSeleccionada = JSON.parse(localStorage.getItem('sucursalSeleccionada') ?? '');
    let roles = JSON.parse(localStorage.getItem('roles') ?? '');
    let tieneRolCliente = eval(localStorage.getItem('RolClienteNegotis') ?? '') || false;
    this.modificarProductosHabilitado = (roles != null && roles.ModificarProductos) || tieneRolCliente;
    this.VerCodigoCliente = (roles != null && roles.VerCodigoCliente);
    this.visualizarListaActivos = (roles != null && roles.VisualizarActivarLista);
    this.Ubicaciones = (roles != null && roles.Ubicaciones);
    this.filtroEnterHabilitado = (roles != null && roles.FiltroEnter) || tieneRolCliente;
    this.mostrarDatosEcommerce = (roles != null && roles.DatosEcommerce) || tieneRolCliente;
    this.modificarUnidadesHabilitado = (roles != null && roles.ModificarUnidades) || tieneRolCliente;
    this.tieneRolEtiquetas = (roles != null && roles.ImprimirEtiquetas) || tieneRolCliente;
    this.sincronizarApi = (roles != null && roles.SincronizarApi);
    this.tieneRolMP = (roles != null && roles.ArticulosMP );
    this.tieneRolEtiquetas80mm = (roles != null && roles.Etiquetas80mm );
    this.tieneRolActivoSucursal = (roles != null && roles.ActivoSucursal );
    this.BloquearPrecios = (roles != null && roles.BloquearPrecios );
    this.fatman = (roles != null && roles.Fatman );
    this.medinor = (roles != null && roles.Medinor);

    if(roles != null && (roles.Name == 'Administrador' || roles.Name == 'administrador'))
    {
      this.modificarUnidadesHabilitado =true;
    }
    this.visualizarStockValorHabilitado = (roles != null && roles.StockValor) || tieneRolCliente;
    this.visualizarListaPreciosHabilitado = (roles != null && roles.VisualizarListaPrecios) || tieneRolCliente;
    this.visualizarPorcentajeHabilitado = (roles != null && roles.VisualizarPorcentaje) || tieneRolCliente;
    this.visualizarPrecioOferta = (roles != null && roles.VisualizarAcciones) || tieneRolCliente;
    this.visualizarActualizarPreciosHabilitado = (roles != null && roles.VisualizarActualizarPrecios) || tieneRolCliente;
    this.verProveedorHabilitado = (roles != null && roles.VisualizarStockProveedor) || tieneRolCliente;
    this.visualizarCantidadXPackHabilitado = (roles != null && roles.VisualizarCantXPack) || tieneRolCliente;
    this.visualizarIDEstadoHabilitado= (roles != null && roles.VisualizarIDEstado) || tieneRolCliente;
    this.visualizarTalle = (roles != null && roles.VisualizarTalle) || tieneRolCliente;
    this.visualizarColor = (roles != null && roles.VisualizarColor) || tieneRolCliente;
    this.sincronizarExcel = (roles != null && roles.RolExcel) || tieneRolCliente;
    this.visualizarPrecioDolarHabilitado  = (roles != null && roles.VisualizarPrecioDolar) || tieneRolCliente;
    this.puedeSincronizarExcel = (roles != null && roles.SinicronizarExcel) || tieneRolCliente;
    this.ocultarPrecios = (roles != null && roles.OcultarPrecios);
    this.ocultarCodigoUnidades = (roles != null && roles.OcultarCodigoUnidades);
    this.ocultarFiltros = (roles != null && roles.OcultarFiltrosArticulos);
    this.agregarLista = (roles != null && roles.AgregarLista);
    this.visualizarCodigoArticulo = (roles != null && roles.VisualizarCodigoArticuloComprobante);
    let data = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis')};
    this.listaPrecServ.GetListaDefault(data).subscribe(data => {
      this.idLista = data
    });

    if (sucursalSeleccionada == null) {
      let dataUser = { 'idUser': localStorage.getItem('idUser') };
      this.sucursalServ.sucursalSeleccionadaByUsuario(dataUser)
        .subscribe(data => {
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

    let datos = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis'),'Page': 1};
    this.categoriaServ.listadoCategoriaRubroByIdClienteNegotis(datos).subscribe((result: any) => {
    this.infoGeneral = result.categoriasTotales;




    this.filteredCR = this.crCtrl.valueChanges
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
        let datosMarca = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis'),'Page': 1};
        this.marcaServ.listadoMarcaByIdClienteNegotis(datosMarca).subscribe((result: any) => {
        this.infoMarca = result;

        this.filteredMarca = this.marcaCtrl.valueChanges
        .pipe(
          startWith(''),
          map((item: any) => item ? this._filterMarca(item) : this.infoMarca.slice())
          );
        }, (error: any) => {
           console.log(error);
          });
  }
  async seleccionarTodosArticulosResaltar(event: any) {
    this.articulosResaltar = [];
    this.articulosImprimir = [];
    for (let i = 0; i < this.listadoArticulo.length; i++) {
      if (event.target.checked) {
        this.articulosResaltar.push(i);
      }
      this.listadoArticulo[i].pedidosPendienteChecked = event.target.checked;
    }
    for (let index = 0; index < this.articulosResaltar.length; index++) {
      this.articulosImprimir.push(this.listadoArticulo[this.articulosResaltar[index]].id);

      }
  }

  private _filterCategoria(value: string): any[] {
    const filterValue = value.toLowerCase();
     return this.infoGeneral.filter((item: any) => item.Nombre.toLowerCase().includes(filterValue.toLowerCase()));
   }
   private _filterRubro(value: string): any[] {
    const filterValue = value.toLowerCase();
     return this.infoRubro.filter((item: any) => item.Nombre.toLowerCase().includes(filterValue.toLowerCase()));
   }
   private _filterMarca(value: string): any[] {
    const filterValue = value.toLowerCase();
     return this.infoMarca.filter((item: any) => item.Nombre.toLowerCase().includes(filterValue.toLowerCase()));
   }

  @ViewChild('buscar') filtroInput!: ElementRef;

  @HostListener('window:keyup', ['$event'])
  focusCodigo(event: any) {
    if(this.filtroEnterHabilitado)
    {
      if (event.keyCode === 13) {
        this.buscar();
       }
    }
    else
    {
      if (event.keyCode === 113) {
        this.buscar();
       }
    }

  }


  guardarCotizacion()
  {
    const loading = this.generalServ.loadingModal();
    const dataUser = { 'idUser': localStorage.getItem('idUser'), 'cotizacionDolar': this.cotizacionDolar };
    this.userServ.saveCotizacionDolar(dataUser).subscribe((data: any) => {
      loading.close();

    }, (error: any) => { console.log(error);  loading.close();});
  }


  async cambiarEstado(event: any, i: number) {
    if (event.target.checked) {
      this.articulosImprimir = [];
      this.articulosResaltar.push(i);
      //const index = this.articulosResaltar.indexOf(i);
      for (let index = 0; index < this.articulosResaltar.length; index++) {
      this.articulosImprimir.push(this.articulosResaltar[index]);
      }
    }
    else
    {
      let index2 = 0;
      //this.articulosResaltar = [];
      //this.articulosResaltar.push(i);
      const index = this.articulosResaltar.indexOf(i);

      for (let item of this.articulosResaltar) {
        if(item == i)
        {
          this.articulosImprimir.splice(index2,1);
          this.articulosResaltar.splice(index2,1);
        }
        index2++;
        }
        console.log(this.articulosImprimir);
    }
  }

  marcarArticuloOferta(value:any)
  {
    const loading = this.generalServ.loadingModal();
    let dataUser = {
      'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
      'listado' : this.articulosImprimir,
      'Marcar' : value,
      'Lista' : this.idLista
    };
    this.articuloServ.marcarOferta(dataUser)
    .subscribe(data => {
        var asd = data;
        loading.close();
    }, error => { console.log(error); loading.close(); })

   // this.limpiar();

  }
  ActivarListado(value:any)
  {
    const loading = this.generalServ.loadingModal();
    let dataUser = {
      'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
      'filtro': this.filtroDescripcionArticulo,
      'idSucursal': this.sucursalActual.Sucursal.Id,
      'pageSize': this.limit,
      'page': this.page,
      'filtroPrecioOferta': this.filtroPrecioOferta,
      'filtroPrecioCosto': this.filtroPrecioCosto,
      'filtroPrecioBase': this.filtroPrecioBase,
      'filtroTienda': this.filtroTienda,
      'filtroUnidades': this.filtroUnidades,
      'filtroActivo': this.filtroActivos,
      'filtroImagen':this.filtroImagen,
      'Marcar' : value,
      'Lista' : this.idLista,
      'filtroLote' : this.filtroLote,

    };
    this.articuloServ.cambiarEstadoListado(dataUser)
    .subscribe(data => {
        var asd = data;
        loading.close();
    }, error => { console.log(error); loading.close(); })

   // this.limpiar();

  }
  sincronizarEcommerce()
  {
      const loading = this.generalServ.loadingModal();
      let dataUser = {
        'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
        'idUser' : localStorage.getItem('idUser')
      };
      this.articuloServ.sincronizarEcommerce(dataUser)
      .subscribe(data => {
          var resultado = data;
          if(resultado == false)
          {
            this.dialog.open(MensajeModalComponent, {
              width: '450px',
              data: {
                titulo: 'Error al Sincronizar Excel',
                mensaje: 'No se ha podido encontrar el Excel o no corresponde al dia de hoy.'
              }
            });

            loading.close();
            return;

          }
          loading.close();
      }, error => { console.log(error); loading.close(); })

      this.limpiar();


  }

  sincronizarExcel2()
  {
      const loading = this.generalServ.loadingModal();
      let dataUser = {
        'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
        'idUser' : localStorage.getItem('idUser')
      };
      this.articuloServ.sincronizarExcel(dataUser)
      .subscribe(data => {
          var resultado = data;
          if(resultado == false)
          {
            this.dialog.open(MensajeModalComponent, {
              width: '450px',
              data: {
                titulo: 'Error al Sincronizar Excel',
                mensaje: 'No se ha podido encontrar el Excel o no corresponde al dia de hoy.'
              }
            });

            loading.close();
            return;

          }
          loading.close();
      }, error => { console.log(error); loading.close(); })

      this.limpiar();


  }

editArticulo(value:any)
{

  localStorage.setItem('page', JSON.stringify(this.page));
  this.router.navigate(["/cliente/articulo/editar/{{" + value.id + "}}/#"]);
}


enviarListaEcommerce(value:any)
{
  const loading = this.generalServ.loadingModal();

  let dataUser = {
    'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
    'filtro': this.filtroDescripcionArticulo,
    'idSucursal': this.sucursalActual.Sucursal.Id,
    'pageSize': this.limit,
    'page': this.page,
    'filtroPrecioOferta': this.filtroPrecioOferta,
    'filtroPrecioCosto': this.filtroPrecioCosto,
    'filtroPrecioBase': this.filtroPrecioBase,
    'filtroTienda': this.filtroTienda,
    'filtroUnidades': this.filtroUnidades,
    'filtroActivo': this.filtroActivos,
    'filtroImagen':this.filtroImagen,
    'marcar' : value,
    'Lista' : this.idLista,
    'filtroLote' : this.filtroLote
  };
  this.articuloServ.darDeAltaListaArticuloE(dataUser)
  .subscribe(data => {
      var asd = data;
      loading.close();
  }, error => { console.log(error); loading.close(); })
}

enviarListaOfertasEcommerce(value:any)
{
  const loading = this.generalServ.loadingModal();

  let dataUser = {
    'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
    'filtro': this.filtroDescripcionArticulo,
    'idSucursal': this.sucursalActual.Sucursal.Id,
    'pageSize': this.limit,
    'page': this.page,
    'filtroPrecioOferta': this.filtroPrecioOferta,
    'filtroPrecioCosto': this.filtroPrecioCosto,
    'filtroPrecioBase': this.filtroPrecioBase,
    'filtroTienda': this.filtroTienda,
    'filtroUnidades': this.filtroUnidades,
    'filtroActivo': this.filtroActivos,
    'filtroImagen':this.filtroImagen,
    'marcar' : value,
    'Lista' : this.idLista
  };
  this.articuloServ.darDeAltaListaArticuloOfertaE(dataUser)
  .subscribe(data => {
      var asd = data;
      loading.close();
  }, error => { console.log(error); loading.close(); })
}


  marcarArticuloEcommerce(value:any)
  {
    const loading = this.generalServ.loadingModal();
    let dataUser = {
      'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
      'listado' : this.articulosImprimir,
      'Marcar' : value,
      'Lista' : this.idLista
    };
    this.articuloServ.darDeAltaArticuloE(dataUser)
    .subscribe(data => {
        var asd = data;
        loading.close();
    }, error => { console.log(error); loading.close(); })

    //this.limpiar();

  }

  getMateriaPrima(value:any)
  {
    const dialogRef = this.dialog.open(VisualizarMPModalComponent, {
      width: '750px', data: { idArt: value,
        idClienteNegotis : localStorage.getItem('idClienteNegotis'),
        idSuc: this.idSucursal,
      },
    });
  }

  getArticuloCantidad(value: any) {

    const loading = this.generalServ.loadingModal();
    this.sucursalActual = value;
    let dataUser = {
      'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
      'filtro': this.filtroDescripcionArticulo,
      'idSucursal': this.sucursalActual.Sucursal.Id,
      'pageSize': this.limit,
      'page': this.page,
      'filtroPrecioOferta': this.filtroPrecioOferta,
      'filtroPrecioCosto': this.filtroPrecioCosto,
      'filtroPrecioBase': this.filtroPrecioBase,
      'filtroTienda': this.filtroTienda,
      'filtroUnidades': this.filtroUnidades,
      'filtroActivo': this.filtroActivos,
      'filtroImagen':this.filtroImagen,
      'filtroRubro':this.rubroFiltro,
      'filtroMarca':this.marcaFiltro,
      'filtroCategoriaRubro':this.categoriaRubroFiltro,
      'filtroLote' : this.filtroLote
    };
    this.articuloServ.ListaArticuloByIdClienteNegotis(dataUser)
      .subscribe((data: any) => {
        this.listadoArticulo = data.listado;
        this.listadoArticuloCompleto= data.listadoCompleto;
        this.listadoArticuloOriginal = data.listado;
        this.total = data.totalItems;
        this.totalCapitalExistente = data.totalCapitalExistente;
        this.totalCapitalVenta = data.totalCapitalVenta;
        this.cargarImagenes(this.listadoArticuloOriginal);
        if (this.listadoArticuloOriginal != null) {
          let dataList = {
            'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
            'activo': true
          };
          this.listaPrecServ.ListaPreciosByIdClienteNegotis(dataList).subscribe(data => {
            this.listadoPrecios = data;
            loading.close();
          }, error => { console.log(error); loading.close(); })
        }
      }, (error: any) => { console.log(error); loading.close(); })
  }

  getCategoria(item: any) {
    this.categoriaRubroFiltro=item.Nombre;
  }
  getRubro(item: any) {
    this.rubroFiltro=item.Nombre;
  }
  getMarca(item: any) {
    this.marcaFiltro=item.Nombre;
  }

  cargarImagenes(listadoArticuloOriginal: any[]) {
    listadoArticuloOriginal.forEach(each => {
      let requestExiste = {
        'idClienteNegotis': this.idClienteNegotis,
        'idArticulo': each.id,
        'idCategoria': 0,
        'idRubro': 0
      };

      if(this.medinor)
      {
        const fechaIngresoTransformed = new Date(each.fechaIngreso.match(/\d+/)[0] * 1);
        const fechaEgresoTransformed = new Date(each.fechaEgreso.match(/\d+/)[0] * 1);
        each.fechaIngreso = fechaIngresoTransformed.getUTCFullYear() + '/' + (fechaIngresoTransformed.getUTCMonth() + 1) + '/' + fechaIngresoTransformed.getUTCDate() ;
        each.fechaEgreso = fechaEgresoTransformed.getUTCFullYear() + '/' + (fechaEgresoTransformed.getUTCMonth() + 1) + '/' + fechaEgresoTransformed.getUTCDate() ;
      }

      if (each.existeImagen) {
        each.imagen = this.archivoService.getArchivoUrl(requestExiste.idClienteNegotis,requestExiste.idArticulo, requestExiste.idCategoria,requestExiste.idRubro);
      }

      // this.archivoService.existenciaArchivo(requestExiste).subscribe(responseExiste => {
      //   each.existe = responseExiste;
      //
      //   if (each.existe) {
      //     each.imagen = this.archivoService.getArchivoUrl(requestExiste.idClienteNegotis,requestExiste.idArticulo, requestExiste.idCategoria,requestExiste.idRubro);
      //   }
      // });
    });
  }

  openCantidadModal(value: any, index: any): void {
    let cantArt = 0;
    cantArt = value.cantidad;
    const dialogRef = this.dialog.open(ArticuloCantidadModalComponent, {
      width: '450px',
      data: {
        idArt: value.id,
        cantidad: cantArt,
        idSuc: this.sucursalActual.Sucursal.Id,
        unidad: value.unidad,
        kilogramo: value.kilogramo,
        idClienteNegotis : this.idClienteNegotis
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.listadoArticulo[index].cantidad = result;
      }
    });
}
obtenerApi()
{
  const loading = this.generalServ.loadingModal();
  let request={'idClienteNegotis': localStorage.getItem('idClienteNegotis'),'idSucursal':this.idSucursal.IdSucursal, 'idUser':this.idUser}
  this.articuloServ.obtenerArticulo(request) .subscribe(data => {
    var asd = data;

      console.log("query Terminada")
      console.log(asd);
    loading.close();
  }, error => { console.log("query No Terminada");console.log(error); loading.close(); });
}
obtenerApiFiltrado()
{
  const loading = this.generalServ.loadingModal();
  let dataUser = {
  'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
  'filtro': this.filtroDescripcionArticulo,
  'idSucursal': this.sucursalActual.Sucursal.Id,
  'pageSize': this.limit,
  'page': this.page,
  'filtroPrecioOferta': this.filtroPrecioOferta,
  'filtroPrecioCosto': this.filtroPrecioCosto,
  'filtroPrecioBase': this.filtroPrecioBase,
  'filtroTienda': this.filtroTienda,
  'filtroUnidades': this.filtroUnidades,
  'filtroActivo': this.filtroActivos,
  'filtroImagen':this.filtroImagen
 };
  this.articuloServ.obtenerArticuloFiltrado(dataUser) .subscribe(data => {
    var asd = data;

      console.log("query Terminada")
      console.log(asd);
    loading.close();
  }, error => { console.log("query No Terminada");console.log(error); loading.close(); });
}
  openPrecioCostoModal(value: any, index: any): void {

    let rq: DialogModel = new DialogModel();
    rq.title = 'Modificar Costo';
    rq.valueName = 'Costo';
    rq.value = value.precioCosto
    rq.valueType = 'float';

    const dialogRef = this.dialog.open(ModificarValorModalComponent, {
      width: '450px',
      data: rq
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        const loadRef = this.generalServ.loadingModal();
        let request = {
          'idArticulo': value.id,
          'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
          'value': result
        };
        this.articuloServ.guardarPrecioCosto(request)
          .subscribe(data => {
            value.precioCosto = result;
            let datos = {
              'idArticulo': value.id,
              'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
              'value': value.precioCosto+((result*value.porcentaje)/100)
            };
            this.articuloServ.guardarPrecioBase(datos)
            .subscribe(data => {
              value.precioBase = value.precioCosto+((result*value.porcentaje)/100);

            }, error => { console.log(error); loadRef.close(); });
            if(this.visualizarPrecioOferta)
            {
              let datos = {
                'idArticulo': value.id,
                'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
                'value': value.precioCosto+((result*value.porcentajeO)/100)
              };
              this.articuloServ.guardarPrecioOferta(datos)
              .subscribe(data => {
                value.precioXBulto = value.precioCosto+((result*value.porcentajeO)/100);

              }, error => { console.log(error); loadRef.close(); });
            }



            if(this.agregarLista == true)
            {
              if(value.porcentaje1 != 0)
              {
                let datos = {
                  'idArticulo': value.id,
                  'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
                  'value': value.precioCosto+((result*value.porcentaje1)/100),
                  'tipo' : 1
                };
                this.articuloServ.guardarPrecio(datos)
            .subscribe(data => {
              value.precio1 = value.precioCosto+((result*value.porcentaje1)/100);
              }, error => { console.log(error); loadRef.close(); });
            }
              if(value.porcentaje2 != 0)
              {
                let datos = {
                  'idArticulo': value.id,
                  'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
                  'value': value.precioCosto+((result*value.porcentaje2)/100),
                  'tipo' : 2
                };
                this.articuloServ.guardarPrecio(datos)
            .subscribe(data => {
              value.precio2 = value.precioCosto+((result*value.porcentaje2)/100);
              }, error => { console.log(error); loadRef.close(); });
              }
              if(value.porcentaje3 != 0)
              {
                let datos = {
                  'idArticulo': value.id,
                  'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
                  'value': value.precioCosto+((result*value.porcentaje3)/100),
                  'tipo' : 3
                };
                this.articuloServ.guardarPrecio(datos)
            .subscribe(data => {
              value.precio3 = value.precioCosto+((result*value.porcentaje3)/100);
              }, error => { console.log(error); loadRef.close(); });
              }
              if(value.porcentaje4 != 0)
              {
                let datos = {
                  'idArticulo': value.id,
                  'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
                  'value': value.precioCosto+((result*value.porcentaje4)/100),
                  'tipo' : 4
                };
                this.articuloServ.guardarPrecio(datos)
            .subscribe(data => {
              value.precio4 = value.precioCosto+((result*value.porcentaje4)/100);
              }, error => { console.log(error); loadRef.close(); });
              }
              if(value.porcentaje5 != 0)
              {
                let datos = {
                  'idArticulo': value.id,
                  'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
                  'value': value.precioCosto+((result*value.porcentaje5)/100),
                  'tipo' : 5
                };
                this.articuloServ.guardarPrecio(datos)
            .subscribe(data => {
              value.precio5 = value.precioCosto+((result*value.porcentaje5)/100);
              }, error => { console.log(error); loadRef.close(); });
              }
              if(value.porcentaje6 != 0)
              {
                let datos = {
                  'idArticulo': value.id,
                  'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
                  'value': value.precioCosto+((result*value.porcentaje6)/100),
                  'tipo' : 6
                };
                this.articuloServ.guardarPrecio(datos)
            .subscribe(data => {
              value.precio6 = value.precioCosto+((result*value.porcentaje6)/100);
              }, error => { console.log(error); loadRef.close(); });
              }
              if(value.porcentaje7 != 0)
              {
                let datos = {
                  'idArticulo': value.id,
                  'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
                  'value': value.precioCosto+((result*value.porcentaje7)/100),
                  'tipo' : 7
                };
                this.articuloServ.guardarPrecio(datos)
            .subscribe(data => {
              value.precio7 = value.precioCosto+((result*value.porcentaje7)/100);
              }, error => { console.log(error); loadRef.close(); });
              }
              if(value.porcentaje8 != 0)
              {
                let datos = {
                  'idArticulo': value.id,
                  'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
                  'value': value.precioCosto+((result*value.porcentaje8)/100),
                  'tipo' : 8
                };
                this.articuloServ.guardarPrecio(datos)
            .subscribe(data => {
              value.precio8 = value.precioCosto+((result*value.porcentaje8)/100);
              }, error => { console.log(error); loadRef.close(); });
              }
              if(value.porcentaje9 != 0)
              {
                let datos = {
                  'idArticulo': value.id,
                  'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
                  'value': value.precioCosto+((result*value.porcentaje9)/100),
                  'tipo' : 9
                };
                this.articuloServ.guardarPrecio(datos)
            .subscribe(data => {
              value.precio9 = value.precioCosto+((result*value.porcentaje9)/100);
              }, error => { console.log(error); loadRef.close(); });
              }
            }

            loadRef.close();
          }, error => { console.log(error); loadRef.close(); });
      }
    });
  }



  openPorcentajeModal(value: any, index: any): void
  {
    const dialogRef = this.dialog.open(ModificarValorModalComponent, {
      width: '450px',
      data: {
        title: 'Modificar Porcentaje',
        valueName: 'Porcentaje',
        value: value.porcentaje,
        valueType: 'porcentaje'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        const loadRef = this.generalServ.loadingModal();
        let request = {
          'idArticulo': value.id,
          'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
          'value': result
        };
        this.articuloServ.guardarPorcentaje(request)
        .subscribe(data => {
          value.porcentaje = result;
          let datos = {
            'idArticulo': value.id,
            'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
            'value': value.precioCosto+(( value.precioCosto*result)/100)
          };
          this.articuloServ.guardarPrecioBase(datos)
          .subscribe(data => {
            value.precioBase = value.precioCosto+(( value.precioCosto*result)/100)

          }, error => { console.log(error); loadRef.close(); });
          loadRef.close();
        }, error => { console.log(error); loadRef.close(); });
      }
    });
  }

  openPorcentajeOModal(value: any, index: any): void
  {
    const dialogRef = this.dialog.open(ModificarValorModalComponent, {
      width: '450px',
      data: {
        title: 'Modificar Porcentaje Oferta',
        valueName: 'Porcentaje',
        value: value.porcentajeO,
        valueType: 'porcentaje'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        const loadRef = this.generalServ.loadingModal();
        let request = {
          'idArticulo': value.id,
          'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
          'value': result
        };
        this.articuloServ.guardarPorcentajeOferta(request)
        .subscribe(data => {
          value.porcentajeO = result;
          let datos = {
            'idArticulo': value.id,
            'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
            'value': value.precioCosto+(( value.precioCosto*result)/100)
          };
          this.articuloServ.guardarPrecioOferta(datos)
          .subscribe(data => {
            value.precioXBulto = value.precioCosto+(( value.precioCosto*result)/100)

          }, error => { console.log(error); loadRef.close(); });
          loadRef.close();
        }, error => { console.log(error); loadRef.close(); });
      }
    });
  }
  openPrecioOfertaModal(value: any, index: any): void {
    const dialogRef = this.dialog.open(ModificarValorModalComponent, {
      width: '450px',
      data: {
        title: 'Modificar Precio Oferta',
        valueName: 'Precio',
        value: value.precioXBulto,
        valueType: 'float'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        const loadRef = this.generalServ.loadingModal();
        let request = {
          'idArticulo': value.id,
          'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
          'value': result
        };
        this.articuloServ.guardarPrecioOferta(request)
          .subscribe(data => {
            value.precioXBulto = result;
            let request = {
              'idArticulo': value.id,
              'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
              'value': ((result/value.precioCosto)-1)*100
            };
            this.articuloServ.guardarPorcentajeOferta(request)
            .subscribe(data => {
              value.porcentajeO = (((result/value.precioCosto)-1)*100).toFixed(0);
            }, error => { console.log(error); loadRef.close(); });
            loadRef.close();
          }, error => { console.log(error); loadRef.close(); });
      }
    });
  }

  openPrecioBaseModal(value: any, index: any): void {
    const dialogRef = this.dialog.open(ModificarValorModalComponent, {
      width: '450px',
      data: {
        title: 'Modificar Precio',
        valueName: 'Precio',
        value: value.precioBase,
        valueType: 'float'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        const loadRef = this.generalServ.loadingModal();
        let request = {
          'idArticulo': value.id,
          'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
          'value': result
        };
        this.articuloServ.guardarPrecioBase(request)
          .subscribe(data => {
            value.precioBase = result;
            let request = {
              'idArticulo': value.id,
              'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
              'value': ((result/value.precioCosto)-1)*100
            };
            this.articuloServ.guardarPorcentaje(request)
            .subscribe(data => {
              value.porcentaje = (((result/value.precioCosto)-1)*100).toFixed(0);
            }, error => { console.log(error); loadRef.close(); });
            loadRef.close();
          }, error => { console.log(error); loadRef.close(); });
      }
    });
  }

  openPorcentaje123Modal(value: any, tipo:any): void
  {
    const dialogRef = this.dialog.open(ModificarValorModalComponent, {
      width: '450px',
      data: {
        title: 'Modificar Porcentaje',
        valueName: 'Porcentaje',
        value: 0,
        valueType: 'porcentaje'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        const loadRef = this.generalServ.loadingModal();
        let request = {
          'idArticulo': value.id,
          'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
          'value': result,
          'precio':0,
          'tipo':tipo
        };
        this.articuloServ.guardarPorcentaje123(request)
        .subscribe(data => {
          if(tipo == 1)
          {
            value.porcentaje1 = result;
          }
          if(tipo == 2)
          {
            value.porcentaje2 = result;
          }
          if(tipo == 3)
          {
            value.porcentaje3 = result;
          }
          if(tipo == 4)
          {
            value.porcentaje4 = result;
          }
          if(tipo == 5)
          {
            value.porcentaje5 = result;
          }
          if(tipo == 6)
          {
            value.porcentaje6 = result;
          }
          if(tipo == 7)
          {
            value.porcentaje7 = result;
          }
          if(tipo == 8)
          {
            value.porcentaje8 = result;
          }
          if(tipo == 9)
          {
            value.porcentaje9 = result;
          }
          let datos = {
            'idArticulo': value.id,
            'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
            'value': value.precioCosto+(( value.precioCosto*result)/100),
            'tipo':tipo
          };
          this.articuloServ.guardarPrecio(datos)
          .subscribe(data => {
            if(tipo == 1)
            {
              value.precio1 = value.precioCosto+(( value.precioCosto*result)/100);
            }
            if(tipo == 2)
            {
              value.precio2 = value.precioCosto+(( value.precioCosto*result)/100);
            }
            if(tipo == 3)
            {
              value.precio3 = value.precioCosto+(( value.precioCosto*result)/100);
            }
            if(tipo == 4)
            {
              value.precio4 = value.precioCosto+(( value.precioCosto*result)/100);
            }
            if(tipo == 5)
            {
              value.precio5 = value.precioCosto+(( value.precioCosto*result)/100);
            }
            if(tipo == 6)
            {
              value.precio6 = value.precioCosto+(( value.precioCosto*result)/100);
            }
            if(tipo == 7)
            {
              value.precio7 = value.precioCosto+(( value.precioCosto*result)/100);
            }
            if(tipo == 8)
            {
              value.precio8 = value.precioCosto+(( value.precioCosto*result)/100);
            }
            if(tipo == 9)
            {
              value.precio9 = value.precioCosto+(( value.precioCosto*result)/100);
            }
          }, error => { console.log(error); loadRef.close(); });
          loadRef.close();
        }, error => { console.log(error); loadRef.close(); });
      }
    });
  }


  openPrecioModal1(value: any,tipo:any): void {
    const dialogRef = this.dialog.open(ModificarValorModalComponent, {
      width: '450px',
      data: {
        title: 'Modificar Precio',
        valueName: 'Precio',
        value: value.precio1,
        valueType: 'float'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        const loadRef = this.generalServ.loadingModal();
        let request = {
          'idArticulo': value.id,
          'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
          'value': result,
          'tipo' : tipo
        };
        this.articuloServ.guardarPrecio(request)
          .subscribe(data => {
            value.precio1 = result.toFixed(2);
            let request = {
              'idArticulo': value.id,
              'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
              'precio':Number(result.toFixed(2)),
              'value': Number((((result/value.precioCosto)-1)*100).toFixed(0)),
              'tipo':tipo
            };
            this.articuloServ.guardarPorcentaje123(request)
            .subscribe(data => {
              value.porcentaje1 = (((result/value.precioCosto)-1)*100).toFixed(0);
            }, error => { console.log(error); loadRef.close(); });
            loadRef.close();
          }, error => { console.log(error); loadRef.close(); });
      }
    });
  }
  openPrecioModal2(value: any,tipo:any): void {
    const dialogRef = this.dialog.open(ModificarValorModalComponent, {
      width: '450px',
      data: {
        title: 'Modificar Precio',
        valueName: 'Precio',
        value: value.precio2,
        valueType: 'float'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        const loadRef = this.generalServ.loadingModal();
        let request = {
          'idArticulo': value.id,
          'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
          'value': result,
          'tipo' : tipo
        };
        this.articuloServ.guardarPrecio(request)
          .subscribe(data => {
            value.precio2 = result.toFixed(2);
            let request = {
              'idArticulo': value.id,
              'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
              'precio':Number(result.toFixed(2)),
              'value': Number((((result/value.precioCosto)-1)*100).toFixed(0)),
              'tipo':tipo
            };
            this.articuloServ.guardarPorcentaje123(request)
            .subscribe(data => {
              value.porcentaje2 = (((result/value.precioCosto)-1)*100).toFixed(0);
            }, error => { console.log(error); loadRef.close(); });
            loadRef.close();
          }, error => { console.log(error); loadRef.close(); });
      }
    });
  }
  openPrecioModal3(value: any,tipo:any): void {
    const dialogRef = this.dialog.open(ModificarValorModalComponent, {
      width: '450px',
      data: {
        title: 'Modificar Precio',
        valueName: 'Precio',
        value: value.precio3,
        valueType: 'float'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        const loadRef = this.generalServ.loadingModal();
        let request = {
          'idArticulo': value.id,
          'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
          'value': result,
          'tipo' : tipo
        };
        this.articuloServ.guardarPrecio(request)
          .subscribe(data => {
            value.precio3 = result.toFixed(2);
            let request = {
              'idArticulo': value.id,
              'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
              'precio':Number(result.toFixed(2)),
              'value': Number((((result/value.precioCosto)-1)*100).toFixed(0)),
              'tipo':tipo
            };
            this.articuloServ.guardarPorcentaje123(request)
            .subscribe(data => {
              value.porcentaje3 = (((result/value.precioCosto)-1)*100).toFixed(0);
            }, error => { console.log(error); loadRef.close(); });
            loadRef.close();
          }, error => { console.log(error); loadRef.close(); });
      }
    });
  }

  openPrecioModal4(value: any,tipo:any): void {
    const dialogRef = this.dialog.open(ModificarValorModalComponent, {
      width: '450px',
      data: {
        title: 'Modificar Precio',
        valueName: 'Precio',
        value: value.precio4,
        valueType: 'float'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        const loadRef = this.generalServ.loadingModal();
        let request = {
          'idArticulo': value.id,
          'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
          'value': result,
          'tipo' : tipo
        };
        this.articuloServ.guardarPrecio(request)
          .subscribe(data => {
            value.precio4 = result.toFixed(2);
            let request = {
              'idArticulo': value.id,
              'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
              'precio':Number(result.toFixed(2)),
              'value': Number((((result/value.precioCosto)-1)*100).toFixed(0)),
              'tipo':tipo
            };
            this.articuloServ.guardarPorcentaje123(request)
            .subscribe(data => {
              value.porcentaje4 = (((result/value.precioCosto)-1)*100).toFixed(0);
            }, error => { console.log(error); loadRef.close(); });
            loadRef.close();
          }, error => { console.log(error); loadRef.close(); });
      }
    });
  }
  openPrecioModal5(value: any,tipo:any): void {
    const dialogRef = this.dialog.open(ModificarValorModalComponent, {
      width: '450px',
      data: {
        title: 'Modificar Precio',
        valueName: 'Precio',
        value: value.precio5,
        valueType: 'float'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        const loadRef = this.generalServ.loadingModal();
        let request = {
          'idArticulo': value.id,
          'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
          'value': result,
          'tipo' : tipo
        };
        this.articuloServ.guardarPrecio(request)
          .subscribe(data => {
            value.precio5 = result.toFixed(2);
            let request = {
              'idArticulo': value.id,
              'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
              'precio':Number(result.toFixed(2)),
              'value': Number((((result/value.precioCosto)-1)*100).toFixed(0)),
              'tipo':tipo
            };
            this.articuloServ.guardarPorcentaje123(request)
            .subscribe(data => {
              value.porcentaje5 = (((result/value.precioCosto)-1)*100).toFixed(0);
            }, error => { console.log(error); loadRef.close(); });
            loadRef.close();
          }, error => { console.log(error); loadRef.close(); });
      }
    });
  }
  openPrecioModal6(value: any,tipo:any): void {
    const dialogRef = this.dialog.open(ModificarValorModalComponent, {
      width: '450px',
      data: {
        title: 'Modificar Precio',
        valueName: 'Precio',
        value: value.precio6,
        valueType: 'float'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        const loadRef = this.generalServ.loadingModal();
        let request = {
          'idArticulo': value.id,
          'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
          'value': result,
          'tipo' : tipo
        };
        this.articuloServ.guardarPrecio(request)
          .subscribe(data => {
            value.precio6 = result.toFixed(2);
            let request = {
              'idArticulo': value.id,
              'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
              'precio':Number(result.toFixed(2)),
              'value': Number((((result/value.precioCosto)-1)*100).toFixed(0)),
              'tipo':tipo
            };
            this.articuloServ.guardarPorcentaje123(request)
            .subscribe(data => {
              value.porcentaje6 = (((result/value.precioCosto)-1)*100).toFixed(0);
            }, error => { console.log(error); loadRef.close(); });
            loadRef.close();
          }, error => { console.log(error); loadRef.close(); });
      }
    });
  }




  openPrecioModal7(value: any,tipo:any): void {
    const dialogRef = this.dialog.open(ModificarValorModalComponent, {
      width: '450px',
      data: {
        title: 'Modificar Precio',
        valueName: 'Precio',
        value: value.precio7,
        valueType: 'float'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        const loadRef = this.generalServ.loadingModal();
        let request = {
          'idArticulo': value.id,
          'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
          'value': result,
          'tipo' : tipo
        };
        this.articuloServ.guardarPrecio(request)
          .subscribe(data => {
            value.precio7 = result.toFixed(2);
            let request = {
              'idArticulo': value.id,
              'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
              'precio':Number(result.toFixed(2)),
              'value': Number((((result/value.precioCosto)-1)*100).toFixed(0)),
              'tipo':tipo
            };
            this.articuloServ.guardarPorcentaje123(request)
            .subscribe(data => {
              value.porcentaje7 = (((result/value.precioCosto)-1)*100).toFixed(0);
            }, error => { console.log(error); loadRef.close(); });
            loadRef.close();
          }, error => { console.log(error); loadRef.close(); });
      }
    });
  }


  openPrecioModal8(value: any,tipo:any): void {
    const dialogRef = this.dialog.open(ModificarValorModalComponent, {
      width: '450px',
      data: {
        title: 'Modificar Precio',
        valueName: 'Precio',
        value: value.precio8,
        valueType: 'float'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        const loadRef = this.generalServ.loadingModal();
        let request = {
          'idArticulo': value.id,
          'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
          'value': result,
          'tipo' : tipo
        };
        this.articuloServ.guardarPrecio(request)
          .subscribe(data => {
            value.precio8 = result.toFixed(2);
            let request = {
              'idArticulo': value.id,
              'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
              'precio':Number(result.toFixed(2)),
              'value': Number((((result/value.precioCosto)-1)*100).toFixed(0)),
              'tipo':tipo
            };
            this.articuloServ.guardarPorcentaje123(request)
            .subscribe(data => {
              value.porcentaje8 = (((result/value.precioCosto)-1)*100).toFixed(0);
            }, error => { console.log(error); loadRef.close(); });
            loadRef.close();
          }, error => { console.log(error); loadRef.close(); });
      }
    });
  }

  openPrecioModal9(value: any,tipo:any): void {
    const dialogRef = this.dialog.open(ModificarValorModalComponent, {
      width: '450px',
      data: {
        title: 'Modificar Precio',
        valueName: 'Precio',
        value: value.precio9,
        valueType: 'float'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        const loadRef = this.generalServ.loadingModal();
        let request = {
          'idArticulo': value.id,
          'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
          'value': result,
          'tipo' : tipo
        };
        this.articuloServ.guardarPrecio(request)
          .subscribe(data => {
            value.precio9 = result.toFixed(2);
            let request = {
              'idArticulo': value.id,
              'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
              'precio':Number(result.toFixed(2)),
              'value': Number((((result/value.precioCosto)-1)*100).toFixed(0)),
              'tipo':tipo
            };
            this.articuloServ.guardarPorcentaje123(request)
            .subscribe(data => {
              value.porcentaje9 = (((result/value.precioCosto)-1)*100).toFixed(0);
            }, error => { console.log(error); loadRef.close(); });
            loadRef.close();
          }, error => { console.log(error); loadRef.close(); });
      }
    });
  }


  agregarArticuloPorNombre() {
    const dialogRef = this.dialog.open(ActualizarPrecioModalComponent, {
      height: '700px',
      width: '900px',
      data:{
        filtro: this.filtroDescripcionArticulo,
      }
    });
    this.buscar(); }

  delete(value: any) {

    const dialogRef = this.dialog.open(EliminarModalComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        const loadRef = this.generalServ.loadingModal();
        let dataArt = {
          'idArticulo': value,
          'idClienteNegotis': localStorage.getItem('idClienteNegotis')
        };
        this.articuloServ.eliminarArticulo(dataArt).subscribe(data => {
          if (data == true) {
            let index = 0;
            for (let item of this.listadoArticulo) {
              if (item.id == value) {
                this.listadoArticulo.splice(index, 1)
                break;
              }
              index++;
            }
          } else {
            this.dialog.open(ErrorforaneaModalComponent, {
              width: '450px'
            });
          }
          loadRef.close();
        }, error => { console.log(error); loadRef.close(); })
      }
    });
  }
  getLista(value: any) {
    this.porcentaje = value.PorcentajeAumento;
    this.porcentajeO = value.PorcentajeO;
    this.idLista = value.Id;
    this.resetSelectList = false;
  }

  sinAumneto() {
    this.porcentaje = 0;
    this.idLista = 0;
    this.resetSelectList = false;
  }

  calculoLista() {
    for (let item of this.listadoArticulo) {
      let dataList = {
        'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
        'idListaPrecios': this.idLista
      };
      this.listaPrecServ.ListaPreciosById(dataList).subscribe(data => {
        this.listaOferta = data;
      if(this.listaOferta.Nombre == "Lista Ofertas")
      {
          item.precioConAumento = item.precioXBulto;
      }
      else if(this.listaOferta.Nombre == "Lista Costo")
      {
        item.precioConAumento = item.precioCosto;
      }
      else{
        var aumentoLista = (Number(this.porcentaje) * item.precioBase) / 100;
        item.precioConAumento = item.precioBase + aumentoLista;
      }
      }, error => { console.log(error);})



      // item.Articulo.AumentoLista = (Number(this.porcentaje) * item.Articulo.PrecioBase) / 100;
      // item.Articulo.PrecioConAumento = item.Articulo.PrecioBase + item.Articulo.AumentoLista;
      // if (item.Cantidad != null && item.Cantidad.CantidadArticulo > 0){
      //   item.Articulo.totalCapitalVenta += (item.Articulo.PrecioBase + item.Articulo.AumentoLista) * item.Cantidad.CantidadArticulo;
      // }
    }
  }

  ivaFunc(value: any) {
    this.iva = value.target.checked;
    this.resetSelectList = false;
  }

  calculoIva() {
    let precio;
    for (let item of this.listadoArticulo) {
      if (item.precioConAumento != null) {
        precio = item.precioConAumento;
      } else {
        precio = item.precioBase;
      }
      if (this.iva == true) {
        item.iva = (Number(precio) * 21) / 100;
        item.precioConAumento = precio + item.iva;
      } else {
        item.iva = 0;
        item.precioConAumento = precio + item.iva;
      }
    }
  }

  reset() {
    this.porcentaje = 0;
    this.idLista = 0;
    this.iva = false;
    this.calculoLista();
    this.calculoIva();
    this.resetSelectList = false;
  }

  calculoPrecio() {
    this.calculoLista();
    this.calculoIva();
    this.resetSelectList = true;
  }

  fotoModal(value: any) {
    const dialogRef = this.dialog.open(FotoCrearEditarModalComponent, {
      width: '750px', data: { idArticulo: value, editar: true },
    });
  }

  goToPage(n: number): void {
    this.page = n;
    this.getArticuloCantidad(this.sucursalActual);
  }

  onNext(): void {
    this.page++;
    this.getArticuloCantidad(this.sucursalActual);
  }
  onLast(): void {
    this.page = Math.ceil(this.total/20);
    this.getArticuloCantidad(this.sucursalActual);
  }

  onPrev(): void {
    this.page--;
    this.getArticuloCantidad(this.sucursalActual);
  }
  limpiar() {
    this.codigoFiltro = null;
    this.estadoFiltro = 'true';
    this.articuloFiltro = null;
    this.marcaFiltro = '';
    this.rubroFiltro = '';
    this.categoriaRubroFiltro = '';
    this.filtroDescripcionArticulo = "";
    this.filtroLote = null;
    this.listadoArticulo = this.listadoArticuloOriginal;
    this.articulosResaltar=[];
    this.articulosImprimir=[];
    this.filtroPrecioOferta = null;
    this.filtroPrecioCosto = null;
    this.filtroPrecioBase = null;
    this.filtroTienda = null;
    this.filtroUnidades = null;
    this.filtroImagen = null;
    this.filtroActivos = null;
    this.filteredCR = new Observable<any[]>();
    this.filteredRubro = new Observable<any[]>();
    this.filteredMarca = new Observable<any[]>();
    this.getArticuloCantidad(this.sucursalActual);
  }

  refresh() {
    this.codigoFiltro = null;
    this.estadoFiltro = 'true';
    this.articuloFiltro = null;
    this.marcaFiltro = null;
    this.rubroFiltro = null;
    this.filtroLote = null;
    this.categoriaRubroFiltro = null;
    this.listadoArticulo = this.listadoArticuloOriginal;
    this.articulosResaltar=[];
    this.articulosImprimir=[];
    this.filtroPrecioOferta = null;
    this.filtroPrecioCosto = null;
    this.filtroPrecioBase = null;
    this.filtroTienda = null;
    this.filtroUnidades = null;
    this.filtroImagen = "null";
    this.filtroActivos = null
    this.getArticuloCantidad(this.sucursalActual);
  }
  buscar() {
    this.listadoArticulo = this.listadoArticuloOriginal;

    if (this.sucursalActual)
    {

      this.getArticuloCantidad(this.sucursalActual);
    }
  }
  showUserSucursal() {
    let sucursalSelect;
    if (this.selecInput != null) {
      sucursalSelect = this.selecInput;
    } else {
      sucursalSelect = this.sucSelecPost;
    }
    const dialogRef = this.dialog.open(UseriosucursalModalComponent, {
      width: '450px', data: { sucursal: sucursalSelect }
    });
  }

}
