import { Component, OnInit } from '@angular/core';
import { ArticuloService } from '../../../Service/articulo.service';
import { MarcaService } from '../../../Service/marca.service';
import { RubroService } from '../../../Service/rubro.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ListaPreciosService } from '../../../Service/lista-precios.service';
import { GeneralService } from '../../../Service/general.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarOperacionExitosaComponent } from '../../../components/snack-bar-operacion-exitosa/snack-bar-operacion-exitosa.component';
import { MatDialog} from '@angular/material/dialog';
import { FotoCrearEditarModalComponent } from '../../../components/foto-crear-editar-modal/foto-crear-editar-modal.component';
import { ProveedorService } from 'src/app/Service/proveedor.service';
import { PedidofaltandatosrequeridosModalComponent } from '../../../components/pedidofaltandatosrequeridos-modal/pedidofaltandatosrequeridos-modal.component';
// import { ValueTransformer } from '@angular/compiler/src/util';
import { DatepickerModalComponent } from 'src/app/components/datepicker-modal/datepicker-modal.component';
import { MensajeModalComponent } from 'src/app/components/mensaje-modal/mensaje-modal.component';
import { MateriaPrimaService } from 'src/app/Service/materiaprima.service';
import { ArticuloMateriaPrimaModalComponent } from 'src/app/components/articulo-materiaprima-modal/articulo-materiaprima-modal.component';
import { Title } from '@angular/platform-browser';
import { ComboArticuloModalComponent } from 'src/app/components/articulo-combo-modal/articulo-combo-modal.component';

@Component({
  selector: 'app-articulo-crear-editar',
  templateUrl: './articulo-crear-editar.component.html',
  styleUrls: ['./articulo-crear-editar.component.css']
})
export class ArticuloCrearEditarComponent implements OnInit {

  myForm: FormGroup;
  submitted!: boolean;
  post: any;
  articulo: any;
  idArticulo: any;
  activo: boolean=true;
  eliminar :boolean=false;
  destacar: boolean=false;
  iva:any=21;
  iva27:boolean = false;
  IVA:any;
  codigoDeBarras: any;
  codigoQR: any;
  codigoArticulo:any;
  idMarca!: number;
  idRubro!: number;
  idProveedor!: number;
  idProveedor2!: number;
  idProveedor3!: number;

  ubicacionDeposito: any;
  ubicacionArticulo: any;
  codigoCliente: any;
  codigoProveedor: any;

  listadoMarcas: any;
  listadoPrecios: any;
  listadoRubro: any;
  listadoProveedores: any;
  listadoMP: any;
  listadoMP2: any;
  MP:any;
  Combo:any;
  articuloComboCant:any;
  listadoCombo:any;
  mpCosto:any = false;
  listaMateriaPrimas: any = [];
  listaCombo: any = [];
  idMateriaPrima:any;
  idSucursal: any=JSON.parse(localStorage.getItem('sucursalSeleccionada') ?? '');
  artById: any;
  precioBase: any;
  color: any;
  porcentaje!: number;
  porcentajeO: number = 0;
  porcentajeE!:number;
  idLista: any = 0;
  articuloE!: boolean;
  precioCosto: any;
  precioCosto2: any = 0;
  precioCosto3: any = 0;
  precioCosto4: any = 0;
  compraMinima: any;
  precioBulto: any=0 ;
  flagCostosAdicionales: any;
  especificacion: any;
  talle:any
  precioDolar:any
  unidad: boolean = true;
  kilogramo: boolean = false;
  litro: boolean = false;
  metro: boolean = false;
  kilometro: boolean = false;
  pesable: boolean = false;
  hora: boolean = false;
  codigobarras2 : any;
  tieneRolVencimiento : boolean = false;
  tieneRolCargaDuplicado : boolean = false;
  tieneRolCostosAdicionales : boolean = false;
  mostrarDatosEcommerce : boolean = false;
  Ubicaciones : boolean = false;
  VerCodigoCliente : boolean = false;
  visualizarAcciones : boolean = false;
  tieneRolVisualizarOfertas : boolean = false;
  tieneRolModificarPrecio : boolean = false;
  tieneRolCodigoBarra : boolean = false;
  tieneRolQR: boolean = false;
  tieneRolAutoCodigo: boolean = false;
  tieneRolCompraMinima : boolean = false;
  tieneRolPrecioDolar: boolean = false;
  tieneRolComboArticulos: boolean = false;
  medinor: boolean= false;
  tieneRolMP: boolean= false
  cantidadPorPack!: number;
  stockMinimo!: number;
  rangoCompra!: number;
  limiteStock!: number;
  fechaHoy = this.calendar.getToday();
  vencimiento: any= this.fechaHoy.year.toString().padStart(4, '0') + '/' + this.fechaHoy.month.toString().padStart(2, '0') + '/' + this.fechaHoy.day.toString().padStart(2, '0');
  vencimientoOferta: any=this.vencimiento;
  fechaIngreso: any = this.vencimiento;
  fechaEgreso: any = this.vencimiento;
  lote:any;
  panelQuery: any = '';
  pageQuery: any = 1;
  filterStock: any = '';
  filterPrecioOferta: any = '';
  filtroPrecioCosto: any = '';
  filtroPrecioBase: any = '';
  filtroTienda: any = '';
  filtroActivos: any='';
  filtroImagen: any= '';



  constructor(
    private titleService: Title,
    private fb: FormBuilder,
    private calendar: NgbCalendar,
    private articuloServ: ArticuloService,
    private router: Router,
    private route: ActivatedRoute,
    private generalServ: GeneralService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private marcaServ: MarcaService,
    private rubroService: RubroService,
    private listaPrecServ: ListaPreciosService,
    private mpService: MateriaPrimaService,
    private proveedorService: ProveedorService) {
      titleService.setTitle("Stock");
    this.myForm = fb.group({
      articulo: ['', Validators.compose([Validators.required])],
      activo: ['', Validators.compose([Validators.required])],
      codigoDeBarras: ['', Validators.compose([Validators.required])],
      idMarca: ['', Validators.compose([Validators.required])],
      idRubro: ['', Validators.compose([Validators.required])],
      idProveedor: ['', Validators.compose([Validators.required])],
      especificacion: ['', Validators.compose([])],
      talle: ['', Validators.compose([])],
      cantidadPorPack: ['', Validators.compose([Validators.pattern('^[0-9]+$')])],
      precioBase: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9.,]+$')])],
      precioCosto: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9.,]+$')])],
      porcentaje: ['', Validators.compose([])],
      precioCosto2: ['', Validators.compose([])],
      precioCosto3: ['', Validators.compose([])],
      precioCosto4: ['', Validators.compose([])],
      precioBulto: ['', Validators.compose([])],
      stockMinimo: ['', Validators.compose([])],
      eliminar: ['', Validators.compose([Validators.required])],
      vencimiento :['', Validators.compose([Validators.required])],
      color :['', Validators.compose([])],
      precioDolar :['', Validators.compose([])],
      codigoArticulo :['', Validators.compose([])],
      porcentajeO :['', Validators.compose([])],
      compraMinima:['', Validators.compose([])],
      rangoCompra:['', Validators.compose([])],
      limiteStock:['', Validators.compose([])],
      idMP: ['', Validators.compose([])],
      idProveedor2: ['', Validators.compose([])],
      idProveedor3: ['', Validators.compose([])],
      ubicacionDeposito: ['', Validators.compose([])],
      ubicacionArticulo: ['', Validators.compose([])],
      codigoCliente: ['', Validators.compose([])],
      codigoProveedor: ['', Validators.compose([])],
      destacar: ['', Validators.compose([])],
      iva : ['', Validators.compose([])],
      codigoQR : ['', Validators.compose([])],
      codigobarras2: ['', Validators.compose([])],
      vencimientoOferta: ['', Validators.compose([])],
      lote: ['', Validators.compose([])],
      fechaIngreso: ['', Validators.compose([])],
      fechaEgreso: ['', Validators.compose([])],
    });

    if (this.route.snapshot.queryParams['panelQuery'] != null) {
      this.panelQuery = this.route.snapshot.queryParams['panelQuery'];
    }
    if (this.route.snapshot.queryParams['pageQuery'] != null) {
      this.pageQuery = this.route.snapshot.queryParams['pageQuery'];
    }
    if (this.route.snapshot.queryParams['filterStock'] != null) {
      this.filterStock = this.route.snapshot.queryParams['filterStock'];
    }
    if (this.route.snapshot.queryParams['filterPrecioOferta'] != null) {
      this.filterPrecioOferta = this.route.snapshot.queryParams['filterPrecioOferta'];
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
    this.idArticulo = this.route.snapshot.params['idarticulo'];
    let roles2 = JSON.parse(localStorage.getItem('roles') ?? '');
    this.tieneRolCodigoBarra = (roles2 != null && roles2.CargarCodigoBarra);
    if (this.idArticulo != null) {
      const loading = this.generalServ.loadingModal();
      let dataArt = { 'idArticulo': this.idArticulo, 'idClienteNegotis': localStorage.getItem('idClienteNegotis'),'idSucursal':this.idSucursal.IdSucursal };
      this.articuloServ.getArticuloById(dataArt).subscribe(data => {
        this.artById = data;
        if (this.artById == null) {
          loading.close();
          this.generalServ.goToNoEncontrado();
        }
        if(this.tieneRolCodigoBarra)
        {
          this.codigoDeBarras = '00000';
        }
        this.articulo = this.artById.Nombre;
        this.activo = this.artById.Activo;
        if(this.artById.Activo == null)
        {
          this.activo = true;
        }
        this.codigoQR = this.artById.CodigoQR;
        if(this.artById.Eliminar == null){
          this.eliminar= false;
        }else
        {
        this.eliminar = this.artById.Eliminar;
        }
        if(this.artById.Resaltar == null){
          this.destacar= false;
        }else
        {
          this.destacar = this.artById.Resaltar;
        }
        if(this.artById.Iva != null &&this.artById.Iva != 0 ){

          this.iva = this.artById.Iva;
        }else
        {
          this.iva = 21;
        }
        this.codigoDeBarras = this.artById.CodigoDeBarras;
        this.codigoArticulo = this.artById.CodigoArticulo;

        this.idMarca = this.artById.IdMarca;
        this.idRubro = this.artById.IdRubro;
        this.idProveedor = this.artById.IdProveedor;
        this.idProveedor2 = this.artById.IdProveedor2;
        this.idProveedor3 = this.artById.IdProveedor3;
        this.codigoCliente = this.artById.CodigoCliente;
        this.codigoProveedor = this.artById.CodigoProveedor;
        this.ubicacionArticulo = this.artById.UbicacionArticulo;
        this.ubicacionDeposito = this.artById.UbicacionDeposito;
        this.precioCosto = this.artById.PrecioCosto;
        this.precioCosto2 = this.artById.PrecioCosto2;
        this.precioCosto3 = this.artById.PrecioCosto3;
        this.precioCosto4 = this.artById.PrecioCosto4;
        this.precioBulto = this.artById.PrecioXBulto;
        this.porcentaje = this.artById.Porcentaje;
        this.porcentajeO = this.artById.PorcentajeO;
        this.precioBase = this.artById.PrecioBase;
        this.especificacion = this.artById.EspecificacionArt;
        this.talle = this.artById.Talle;
        this.precioDolar = this.artById.PrecioDolar;
        this.cantidadPorPack = this.artById.CantidadPorPack;
        this.stockMinimo = this.artById.StockMinimo;
        this.color =this.artById.Color;
        this.vencimiento= this.artById.Vencimiento;
        this.vencimientoOferta = this.artById.FechaOferta;
        this.codigobarras2 = this.artById.Codigobarras2;
        this.lote = this.artById.Lote;
        this.fechaEgreso = this.artById.FechaEgreso;
        this.fechaIngreso = this.artById.FechaIngreso;
        this.formatoFecha();
        if (this.artById.Kilogramo == null && this.artById.Unidad == null) {
          this.unidad = true;
          this.kilogramo = false;
          this.litro = false;
          this.metro = false;
          this.kilometro = false;
          this.pesable = false;
          this.hora = false;
        } else {
          this.unidad = this.artById.Unidad;
          this.kilogramo = this.artById.Kilogramo;
          this.litro = this.artById.Litro;
          this.metro = this.artById.Metro;
          this.kilometro = this.artById.Kilometro;
          this.pesable = this.artById.Pesable
          this.hora = this.artById.Hora
        }
        this.compraMinima = this.artById.CompraMinima;
        this.limiteStock = this.artById.LimiteStock;
        this.rangoCompra = this.artById.RangoCompra;

        if(this.tieneRolMP)
        {
          let dataArt = { 'idArticulo': this.idArticulo,'idSucursal': this.idSucursal.IdSucursal , 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
          this.articuloServ.getCantidadArticuloMPById(dataArt).subscribe(data => {
            this.listadoMP2=data;

            this.listadoMP2.forEach( (element: any) => {
              //this.MP=this.listadoMP.find(x => x.MateriaPrima.Id == element.IdMateriaPrima);
              this.MP = element.MateriaPrima;
              this.MP.nombre = element.MateriaPrima.Nombre;
              this.MP.precio = element.Precio;
              this.MP.cantidad = element.CantidadArticulo;
              this.listaMateriaPrimas.push(this.MP);
            });
            this.listaMateriaPrimas.forEach(async (element: any) =>{
              let dataArt2 = { 'idMateriaPrima': element.Id,'idSucursal': this.idSucursal.IdSucursal};
              const result = await this.mpService.getMPCantById(dataArt2).subscribe((dat: any) =>
                element.stock = dat.CantidadArticulo
              );


                // @ts-ignore
                await forEach();

           });
          }, error => { console.log(error);})
        }

        if(this.tieneRolComboArticulos)
        {
          let dataArt = { 'idArticulo': this.idArticulo,'idSucursal': this.idSucursal.IdSucursal , 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
          this.articuloServ.getCantidadArticuloComboById(dataArt).subscribe(data => {
            this.listadoCombo = data;
            this.listadoCombo.forEach( (element: any) => {
              //this.MP=this.listadoMP.find(x => x.MateriaPrima.Id == element.IdMateriaPrima);
              this.Combo = element.ArticuloCombo;
              this.Combo.nombre = element.ArticuloCombo.Nombre;
              this.Combo.precio = element.Precio;
              this.Combo.cantidad = element.CantidadArticulo;
              this.listaCombo.push(this.Combo);
            });
            this.listaCombo.forEach(async (element: any) =>{
              let dataArt2 = { 'idArticulo': element.Id,'idSucursal': this.idSucursal.IdSucursal};
              let result2 = await this.articuloServ.getCantPorArtSuc(dataArt2).toPromise()
              this.articuloComboCant = result2;
                element.stock = this.articuloComboCant.CantidadArticulo;

                // @ts-ignore


              });

          }, error => { console.log(error);})
        }



        loading.close();
      }, error => { console.log(error); this.generalServ.goToNoEncontrado(); loading.close(); })
    } else {
      this.idArticulo = 0;
      if(this.tieneRolCodigoBarra)
      {
        this.codigoDeBarras = '00000';
      }
    }
  }

  formatoFecha() {
      const VencimientoTransformed = new Date(this.vencimiento.match(/\d+/)[0] * 1);
      const VencimientoOfertaTransformed = new Date(this.vencimientoOferta.match(/\d+/)[0] * 1);
      if(this.medinor)
      {
        const fechaIngresoTransformed = new Date(this.fechaIngreso.match(/\d+/)[0] * 1);
        const fechaEgresoTransformed = new Date(this.fechaEgreso.match(/\d+/)[0] * 1);
        this.fechaIngreso = fechaIngresoTransformed.getUTCFullYear() + '/' + (fechaIngresoTransformed.getUTCMonth() + 1) + '/' + fechaIngresoTransformed.getUTCDate() ;
        this.fechaEgreso = fechaEgresoTransformed.getUTCFullYear() + '/' + (fechaEgresoTransformed.getUTCMonth() + 1) + '/' + fechaEgresoTransformed.getUTCDate() ;
      }

     this.vencimiento = VencimientoTransformed.getUTCFullYear() + '/' + (VencimientoTransformed.getUTCMonth() + 1) + '/' + VencimientoTransformed.getUTCDate() ;
     this.vencimientoOferta = VencimientoOfertaTransformed.getUTCFullYear() + '/' + (VencimientoOfertaTransformed.getUTCMonth() + 1) + '/' + VencimientoOfertaTransformed.getUTCDate() ;
    }

  changeUnidad() {
    this.unidad = true;
    this.kilogramo = false;
    this.litro = false;
    this.metro = false;
    this.kilometro = false;
    this.pesable = false;
    this.hora = false;
  }

  changeKilogramo() {
    this.unidad = false;
    this.kilogramo = true;
    this.pesable = false;
    this.litro = false;
    this.metro = false;
    this.kilometro = false;
    this.hora = false;
  }
  changeLitro() {
    this.unidad = false;
    this.kilogramo = false;
    this.litro = true;
    this.metro = false;
    this.kilometro = false;
    this.pesable = false;
    this.hora = false;
  }
  changeMetro() {
    this.unidad = false;
    this.kilogramo = false;
    this.litro = false;
    this.metro = true;
    this.kilometro = false;
    this.pesable = false;
    this.hora = false;
  }

  changePesable() {
    this.unidad = false;
    this.kilogramo = false;
    this.litro = false;
    this.metro = false;
    this.kilometro = false;
    this.pesable = true;
    this.hora = false;
  }
  changeHoras() {
    this.unidad = false;
    this.kilogramo = false;
    this.litro = false;
    this.metro = false;
    this.kilometro = false;
    this.pesable = false;
    this.hora = true;
  }

  changeKilometro() {
    this.unidad = false;
    this.kilogramo = false;
    this.litro = false;
    this.metro = false;
    this.kilometro = false;
    this.pesable = false;
    this.hora = false;
    this.kilometro = true;
  }

   onChange(){

     if(this.porcentaje !== 0)
     {
      this.precioBase=this.precioCosto + this.precioCosto2 + this.precioCosto3 + this.precioCosto4 + (((this.precioCosto + this.precioCosto2 + this.precioCosto3 + this.precioCosto4)*this.porcentaje)/100);
      this.precioBase=Number(this.precioBase.toFixed(2));
    }
    if(this.precioCosto2 != 0 || this.precioCosto3 != 0 || this.precioCosto4 != 0)
    {
      this.flagCostosAdicionales =true;
    }
    if(this.porcentajeO !== 0)
    {
      this.precioBulto=this.precioCosto + this.precioCosto2 + this.precioCosto3 + this.precioCosto4 + (((this.precioCosto + this.precioCosto2 + this.precioCosto3 + this.precioCosto4)*this.porcentajeO)/100);
      this.precioBulto=Number(this.precioBulto.toFixed(2));
    }
  }


  ecommerceClick(value: any) {
    this.articuloE = value.target.checked;
  }
  getLista(value: any) {
    this.porcentajeE = value.PorcentajeAumento;
    this.idLista = value.Id;

  }

  deleteMP(item: any) {
    let dataArt = { 'idArticulo': this.idArticulo,'idMP' : item.Id,'idSucursal': this.idSucursal.IdSucursal , 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
    this.articuloServ.deleteMPByIdArticulo(dataArt)
    .subscribe(data => {
      let dat = data;
    }, error => { console.log(error);})
    this.listaMateriaPrimas = this.listaMateriaPrimas.filter((x: any) => x !== item)
    this.precioCosto -= item.precio * item.cantidad;
  }
  deleteCombo(item: any) {
    let dataArt = { 'idArticulo': this.idArticulo,'idCombo' : item.Id,'idSucursal': this.idSucursal.IdSucursal , 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
    this.articuloServ.deleteComboByIdArticulo(dataArt)
    .subscribe(data => {
      let dat = data;
    }, error => { console.log(error);})
    this.listaCombo = this.listaCombo.filter((x: any) => x !== item)
    this.precioCosto -= this.precioCosto * item.cantidad;
  }

  ngOnInit() {
    let roles = JSON.parse(localStorage.getItem('roles') ?? '');
    let tieneRolCliente = eval(localStorage.getItem('RolClienteNegotis') ?? '') || false;
    this.tieneRolVencimiento = (roles != null && roles.VisualizarReporteVencimiento) || tieneRolCliente;
    this.tieneRolCargaDuplicado = (roles != null && roles.CargarDuplicado);
    this.mostrarDatosEcommerce = (roles != null && roles.DatosEcommerce) || tieneRolCliente;
    this.VerCodigoCliente = (roles != null && roles.VerCodigoCliente);
    this.Ubicaciones = (roles != null && roles.Ubicaciones);
    this.tieneRolCostosAdicionales = (roles != null && roles.PreciosCostosAdicionales) || tieneRolCliente;
    this.tieneRolPrecioDolar = (roles != null && roles.VisualizarPrecioDolar) || tieneRolCliente;
    this.visualizarAcciones = (roles != null && roles.VisualizarAcciones) || tieneRolCliente;
    this.tieneRolVisualizarOfertas = (roles != null && roles.VisualizarOfertas ) || tieneRolCliente;
    this.tieneRolCompraMinima = (roles != null && roles.CompraMinima );
    this.tieneRolMP = (roles != null && roles.ArticulosMP );
    this.tieneRolModificarPrecio = (roles != null && roles.ModificarPrecioMP);
    this.tieneRolComboArticulos = (roles != null && roles.ComboArticulos);
    this.tieneRolQR = (roles != null && roles.CodigoQR) || tieneRolCliente;
    this.tieneRolAutoCodigo = (roles != null && roles.AutoAsignarCodigoBarra);
    this.medinor =  (roles != null && roles.Medinor);

    if(this.tieneRolAutoCodigo)
    {
      this.codigoDeBarras = "Ignorar";
    }
    this.getMarcas();
    this.getRubros();
    this.getProveedores();
    this.getListaPrecios();
   // this.getMateriasPrimas();

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
  getProveedores() {
    const loading = this.generalServ.loadingModal();
    this.proveedorService.getAll()
      .subscribe(data => {
        this.listadoProveedores = data;
        if(this.idArticulo == 0)
        {
          if(this.listadoProveedores[0].nombre != 'Items Afip')
          {
            this.idProveedor = this.listadoProveedores[0].id;
          }
          else if (this.listadoProveedores[1] != null)
          {
            this.idProveedor = this.listadoProveedores[1].id;
          }
        }
        loading.close();
      }, error => { console.log(error); loading.close(); })
  }

  getMarcas() {
    const loading = this.generalServ.loadingModal();
    let dataMarca = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
    this.marcaServ.listadoMarcaByIdClienteNegotis(dataMarca)
      .subscribe(data => {
        this.listadoMarcas = data;
        if(this.idArticulo == 0)
        {
          if(this.listadoMarcas[0].Nombre != 'Items Afip')
          {
            this.idMarca = this.listadoMarcas[0].Id;
          }
          else if (this.listadoMarcas[1] != null)
          {
            this.idMarca = this.listadoMarcas[1].Id;
          }
        }

        loading.close();
      }, error => { console.log(error); loading.close(); })
  }


  getRubros() {
    const loading = this.generalServ.loadingModal();
    let dataRubro = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis'),'Page':1 };
    this.rubroService.listadoRubroByIdClienteNegotis(dataRubro)
      .subscribe((data: any) => {
        this.listadoRubro = data.rubrosTotales;
        loading.close();
      }, (error: any) => { console.log(error); loading.close(); })
  }

  getMateriasPrimas() {
    const loading = this.generalServ.loadingModal();
    let dataUser = {
      'idClienteNegotis': localStorage.getItem('idClienteNegotis')
    };
    this.mpService.ListaMPUnpaginedByIdClienteNegotis(dataUser)
      .subscribe((data: any) => {
        this.listadoMP = data;
        loading.close();
      }, (error: any) => { console.log(error); loading.close(); })
  }

  MPModal() {
    const dialogRef = this.dialog.open(ArticuloMateriaPrimaModalComponent, {
      width: '750px', data: { idArt: this.idArticulo,
        idClienteNegotis : localStorage.getItem('idClienteNegotis'),
        idSuc: this.idSucursal,

      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.MP=result;
        if(this.mpCosto && result.precio != null && result.precio > 0)
        {
          this.mpCosto == true;

          this.precioCosto += result.precio;
        }
        else
        {
          this.precioCosto += this.MP.precioCosto * result.cantidad;
        }
        this.listaMateriaPrimas.push(this.MP);
      }
    });


  }

  ComboModal() {
    const dialogRef = this.dialog.open(ComboArticuloModalComponent, {
      width: '750px', data: { idArt: this.idArticulo,
        idClienteNegotis : localStorage.getItem('idClienteNegotis'),
        idSuc: this.idSucursal,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.Combo=result;
        this.precioCosto += this.Combo.precioCosto * result.cantidad;
        this.listaCombo.push(this.Combo);
      }
    });


  }



  onSubmit(value: any) {
    if (this.myForm.valid) {
      const loadRef = this.generalServ.loadingModal();
      if (value.cantidadPorPack == null || value.cantidadPorPack == '') { value.cantidadPorPack = 0; }
      if (value.porcentajeO == null || value.porcentajeO == '') { value.porcentajeO = 0; }
      if(this.flagCostosAdicionales){value.precioCosto = this.precioCosto + this.precioCosto2 + this.precioCosto3 + this.precioCosto4;}
      let data = {
        'idArticulo': this.idArticulo,
        'idUser': localStorage.getItem('idUser'),
        'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
        'nombre': value.articulo,
        'idMarca': Number(this.idMarca),
        'idRubro': Number(this.idRubro),
        'idProveedor': this.idProveedor,
        'idProveedor2': this.idProveedor2,
        'idProveedor3': this.idProveedor3,
        'activo': this.activo,
        'eliminar': this.eliminar,
        'codigoDeBarras': this.codigoDeBarras,
        'codigoArticulo':this.codigoArticulo,
        'precioBase': value.precioBase,
        'precioCosto': value.precioCosto,
        'precioCosto2': value.precioCosto2,
        'precioCosto3': value.precioCosto3,
        'precioCosto4': value.precioCosto4,
        'precioXBulto' : value.precioBulto,
        'especificacion': value.especificacion,
        'talle':value.talle,
        'unidad': this.unidad,
        'kilogramo': this.kilogramo,
        'litro':this.litro,
        'metro': this.metro,
        'kilometro': this.kilometro,
        'pesable' : this.pesable,
        'cantidadPorPack': value.cantidadPorPack,
        'stockMinimo': this.stockMinimo,
        'color' : this.color,
        'precioDolar' : this.precioDolar,
        'vencimiento': this.vencimiento,
        'porcentaje': this.porcentaje,
        'articuloE' : this.articuloE,
        'porcentajeE' : this.porcentajeE,
        'porcentajeO' : value.porcentajeO,
        'compraMinima' : this.compraMinima,
        'rangoCompra' : this.rangoCompra,
        'limiteStock' : this.limiteStock,
        'codigoCliente' : this.codigoCliente,
        'codigoProveedor' : this.codigoProveedor,
        'ubicacionArticulo' : this.ubicacionArticulo,
        'ubicacionDeposito' : this.ubicacionDeposito,
        'destacar' : this.destacar,
        'iva' : this.iva,
        'codigoQR' : this.codigoQR,
        'horas' : this.hora,
        'codigobarras2': this.codigobarras2,
        'idSucursal': this.idSucursal.IdSucursal,
        'fechaOferta' : this.vencimientoOferta,
        'lote': value.lote,
        'fechaIngreso':value.fechaIngreso,
        'fechaEgreso': value.fechaEgreso
      };
      this.articuloServ.crearEditarArticulo(data)
        .subscribe(data => {
          this.post = data;
          loadRef.close();

          if (this.post.RepetidoCodigo != true && this.post.RepetidoNombre != true) {
            this.router.navigate(["/cliente/articulo/panel"], { replaceUrl: true, queryParams: { filter: this.panelQuery, page: this.pageQuery, filterStock : this.filterStock, filterPrecioOferta: this.filterPrecioOferta,
              filtroPrecioCosto: this.filtroPrecioCosto,filtroPrecioBase:this.filtroPrecioBase, filtroTienda: this.filtroTienda, filtroActivos: this.filtroActivos, filtroImagen: this.filtroImagen} });
            this.snackBar.openFromComponent(SnackBarOperacionExitosaComponent, {
              duration: 1000,
            });
          }
          else if(this.tieneRolCargaDuplicado == false)
          {
            this.modalValDatosRequeridos();
          }
          if (this.tieneRolCargaDuplicado)
          {
            this.router.navigate(["/cliente/articulo/panel"]);
            this.snackBar.openFromComponent(SnackBarOperacionExitosaComponent, {
              duration: 1000,
            });
          }
        }, error => {
          error; loadRef.close();
        });
    }
    else
    {
      this.modalValDatosRequeridos();
    }
    this.submitted = true;
  }

  modalValDatosRequeridos() {
    this.dialog.open(MensajeModalComponent, {
      width: '450px',
      data: {
        titulo: 'Error al Crear/Actualizar Artículo',
        mensaje: 'Por favor complete los datos obligatorios y vuelva a guardar.'
      }
    });
  }
  fotoModal() {
    const dialogRef = this.dialog.open(FotoCrearEditarModalComponent, {
      width: '750px', data: { idArticulo: this.idArticulo, editar: true },
    });
  }

}
