import { Component, OnInit, HostListener, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, fromEvent } from 'rxjs';
import { map, startWith, debounceTime } from 'rxjs/operators';
import { ArticuloService } from '../../../Service/articulo.service';
import { PedidoService } from '../../../Service/pedido.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneralService } from '../../../Service/general.service';
import { SucursalService } from '../../../Service/sucursal.service';
import { MatDialog } from '@angular/material/dialog';
import { DatepickerModalComponent } from '../../../components/datepicker-modal/datepicker-modal.component';
import { EliminarModalComponent } from '../../../components/eliminar-modal/eliminar-modal.component';
import { PadnumericoModalComponent } from '../../../components/padnumerico-modal/padnumerico-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarOperacionExitosaComponent } from '../../../components/snack-bar-operacion-exitosa/snack-bar-operacion-exitosa.component';
import { PedidofaltandatosrequeridosModalComponent } from '../../../components/pedidofaltandatosrequeridos-modal/pedidofaltandatosrequeridos-modal.component';
import { AgregararticuloModalComponent } from '../../../components/agregararticulo-modal/agregararticulo-modal.component';
import { VerFacturaModalComponent } from '../../../components/ver-factura-modal/ver-factura-modal.component';
import { GlobalService } from '../../../Service/global.service';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { FotoCrearEditarModalComponent } from '../../../components/foto-crear-editar-modal/foto-crear-editar-modal.component';
import { EspecificacionModalComponent } from '../../../components/especificacion-modal/especificacion-modal.component';
import { PagoHistorialModalComponent } from '../../../components/pago-historial-modal/pago-historial-modal.component';
import {ClienteclienteService} from '../../../Service/clientecliente.service';
import {PedidoArticuloModel} from '../../../models/PedidoArticuloModel';
import { ArticulosincantidadModalComponent } from 'src/app/components/articulosincantidad-modal/articulosincantidad-modal.component';
import PropertyUtil, {TiposPropiedad} from '../../../util/property.util';
import {EstadosEntrega, EstadosPago, Prioridades, FormasPago, EstadosPedido} from '../../../util/property.util'
import {PedidoCrearEditarModel} from '../../../models/PedidoCrearEditarModel';
import { MensajeModalComponent } from 'src/app/components/mensaje-modal/mensaje-modal.component';
import { UserService } from 'src/app/Service/user.service';
import { CuentaFinanzaDetalleService } from 'src/app/Service/cuenta-finanza-detalle.service';
import { CuentaDetalleModel } from 'src/app/models/CuentaDetalleModel';
import { DescripcionModalComponent } from '../../../components/descripcion-modal/descripcion-modal.component';
import { ObservacionModalComponent } from '../../../components/observacion-modal/observacion-modal.component';
// import { forEach } from '@angular/router/src/utils/collection';
import { MateriaPrimaService } from 'src/app/Service/materiaprima.service';
import {Title} from "@angular/platform-browser";
import { ListaPreciosService } from 'src/app/Service/lista-precios.service';


@Component({
  selector: 'app-pedido-crear-editar',
  templateUrl: './pedido-crear-editar.component.html',
  styleUrls: ['./pedido-crear-editar.component.css']
})
export class PedidoCrearEditarComponent implements OnInit, AfterViewInit {

  razonSocialCtrl = new FormControl();
  filteredRazonSocial!: Observable<any[]>;
  pageCarga: number= 1;
  filtroCarga: string ="";
  cliSucursalCtrl = new FormControl();
  filteredCliSucursal!: Observable<any[]>;
  idUser:any;


  articuloCBDefault:any;
  ivaCheck:any;
  entregasCheck:any;

  isDesktopVersion = false;
  myForm: FormGroup;
  submitted!: boolean;
  postPedido: any;
  idPedido: any = 0;
  pedidoById: any;
  iva = false;
  precioUOriginal: any;
  IDprecioUOriginal: any;

  flagPagoParcial = true;
  flagDto = false;
  tieneRolRentabilidad=false;
  tieneRolImprimirDuplicado=false;
  tieneRolImprimirEspejo= false;
  tieneRolEditarPrecios = false;
  tieneRolEsconderDatosSucursal = false;
  tieneRolEsconderComprobante = false;
  tieneRolEsconderFactura = false;
  tieneRolEsconderFacturaComandera = false;
  tieneRolOcultarDatosGeneralesXDefecto : boolean= false;
  tieneRolDistancia = false;
  ocultarDatosGenerales = false;
  modificarLista= false;
  rolMensajeAplicacion: boolean= false;
  bloqueoPedidos : boolean = false;
  esconderDeleteArt : boolean= false;
  primerInput : boolean= false;
  fatman:boolean=false;
  tieneRolQR = false;
  bloquearFecha = false;

  tipoSesion:any;
  tipoSesion2:any;
  listadoPrecios: any;

  cotizacionDolar:any;
  comboOferta = false
  visualizarPrecioOferta = false;
  visualizarCategoriaRubro = false;
  fechaPedido: any = this.calendar.getToday().day.toString().padStart(2, '0') + '/' + this.calendar.getToday().month.toString().padStart(2, '0') + '/' + this.calendar.getToday().year.toString().padStart(4, '0');
  fechaVencimiento: any = this.calendar.getToday().day.toString().padStart(2, '0') + '/' + this.calendar.getToday().month.toString().padStart(2, '0') + '/' + this.calendar.getToday().year.toString().padStart(4, '0');
  idCliente: any;
  sesionesRealizadas: any;
  sesionesTratamiento: any;
  sesionesTotales: any;
  clienteSesiones: any;
  flagCompraMinima: any;
  telefonoCliente: any;
   cuitCliente: any;


  distancia: any;
  flagPrecioCambiado: any = false;
  public url: any;
  public url2: any;
  cliente = '';
  vendedor: any;
  observacion: any;
  estadoEntrega: any = PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_ENTREGA, EstadosEntrega.PENDIENTE);
  estadoPago: any = PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PAGO, EstadosPago.TOTAL);
  estadoPagoTotal: any = PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PAGO, EstadosPago.TOTAL);
  estadoPagoParcial: any = PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PAGO, EstadosPago.PARCIAL);
  estadoPagoPendiente: any = PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PAGO, EstadosPago.PENDIENTE);
  estadoPedidoPendiente: any = PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PEDIDO, EstadosPedido.PENDIENTE);
  estadoPedidoActivo: any = PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PEDIDO, EstadosPedido.ACTIVO);
  estadoPedidoCerrado: any = PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PEDIDO, EstadosPedido.CERRADO);
  estadoPedidoAnulado: any = PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PEDIDO, EstadosPedido.ANULADO);
  pedidosCerrado: any = false;
  pedidoAnulado: any =false;
  pedidoActivo: any =false;
  pedidoPendiente: any =false;
  comision: any = 0;
  estadoComision: any = null;
  estadoConfirmacion: any = null;
  fechaEntrega: any = this.calendar.getToday().day.toString().padStart(2, '0') + '/' + this.calendar.getToday().month.toString().padStart(2, '0') + '/' + this.calendar.getToday().year.toString().padStart(4, '0');
  estadoPreparacion: any = null;
  prioridad: any = PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.PRIORIDAD, Prioridades.MEDIA);
  estadoPedido: any = this.estadoPedidoActivo;
  aumentoLista: any = 0;
  stockReal:any;
  aumentoListaAnterior: any=0;
  baseSinAumento: any;
  aumentoListaNombre: any;
  aumentoListaMonto: any = 0;
  aumentoListaPorcentaje: any= 0;
  aumentoListaMontoAnterior: any = 0;
  aumentoListaPorcentajeAnterior: any = 0;
  totalPrecioAnterior: any=0;
  totalPrecioAnteriorRecalculado: any=false;
  totalPrecioOriginal: any=0;
  totalAjuste : any = 0;
  aumentoResto: any = null;
  idSucursalCliente: any = '';
  formaPagoCtaCte: any = PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.FORMA_PAGO, FormasPago.CTA_CTE);
  formaPago: any = PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.FORMA_PAGO, FormasPago.CTA_CTE);
  formaPago2: any = PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.FORMA_PAGO, FormasPago.CTA_CTE);
  idSucursalVendedor: any;
  comisionTotal: any = 0;
  pedidoCerrado!: boolean;
  infoGeneral: any;
  clienteSucursales: any;
  getArtByPost: any;
  getArtCant: any;
  getMPCant: any;
  getComboCant: any;
  MPCantidad: any;
  ComboCantidad:any;
  stock:any;
  MP:any;
  Combo:any;
  asignado:any=false;
  activaListaAumento = true;
  codigo: any;
  codigoQR: any;
  codigoAnterior: any;
  public listaArticulo: any = [];
  totalArticulos: any = 0;
  totalPrecio: any = 0;
  calcTotal: any = 0 ;

  idVendedor: any;
  vendedorPerfil: any;
  vendedorNombres: any;
  infoVendedores: any;
  vendedorCtrl = new FormControl();
  filteredVendedor!: Observable<any[]>;

  mensajeAplicacion:any;



  listaNombres: any;
  listaprecioID: any;
  listaCtrl = new FormControl();
  filteredLista!: Observable<any[]>;

  listaTarjetas : any;
  tarjeta : any = null;
  porcentajeTarjeta:any;
  tipoTarjeta : any = null;

  pedidosImprimir: any []= [];
  pedidosImprimirRecibo: any []= [];

  numeroCheque: any;
  plaza: any;
  banco: any;
  vencimientoCheque: any= this.calendar.getToday().day.toString().padStart(2, '0') + '/' + this.calendar.getToday().month.toString().padStart(2, '0') + '/' + this.calendar.getToday().year.toString().padStart(4, '0');
  clienteCheque: any;
  cuitCheque: any;
  libradorCheque: any;
  numeroCuentaCheque: any;
  request: CuentaDetalleModel;
  post: any;


  rentabilidad: any = 0;
  porcentajeRentabilidad: any = 0;
  rentabilidadPC: any = 0;
  artRent:any;
  arraylistaArticulo: any[] = [];
  arrayValCantidad: any[] = [];
  getArrayValCantidad: any;
  arrayListAticuloSinStock: any[] = [];
  getStockToEdit: any;
  guardarAumentoLista!: any;
  guardarAumentoListaMonto!: any;
  guardarAumentoListaPorcentaje!: any;
  guardarAumentoResto!: boolean;
  datosEsteticaHabilitado! : boolean;
  // aumentoListaViejo: number;
  listadoArticulo: any;
  saldoAFavor:any = 0;
  saldoAFavorOriginal:any;
  confirmaPedido:any;
  estadoPedidoAnterior:any;
  retencion:any;


  phone:any=54;
  flagPPMayor =false;
  token: any;
  pagoParcial = 0;
  pagoParcial2 = 0;
  idClienteNegotis: any ;
  pagoCantidad: any = 0;
  vuelto: any = 0;
  readOnlyCliente!: boolean;
  restoApagarPagoParcial = 0;
  restoApagarPagoParcial2 = 0;
  restoApagarPagoParcialEdit = 0;
  restoApagarPagoParcialEdit2 = 0;
  facturaAfip: any;
  notaCreditoAfip: any;
  contienePagoParcial!: boolean;
  contienePagoPendiente!: boolean;
  contienePagoTotal!: boolean;
  montoTotalEdit = 0;
  montoTotalDescuentoAumentoResto = 0;
  onlyPendiente!: any;
  parcialActivado!: any;
  noPendiente!: any;
  formaPagoGuardada: any;
  editMode = false;
  datosGeneralesOculto = false;
  tieneRolCliente = false;
  soporte = false;
  tieneRolVisualizarCodigo = false;
  tieneRolVisualizarImpresionBT = false;
  tieneRolEstadoPedidos = false;
  tieneRolPesables= false;
  tieneRolVisualizarDescuentos = false;
  tieneRolVisualizarImpresionComandera = false;
  imprimirDoble = false;
  turnoCaja = false;
  rolPC = false;
  limitarStockMP: boolean =false;
  tieneRolProduccion: boolean =false;
  tieneRolCombo: boolean = false;
  tieneRolControlEntregas: boolean = false;
  tieneRolVisualizarOfertas = false;
  tieneRolVisualizarImpresion80mm = false;
  tieneRolObservacionArticulos = false;
  tieneRolRepartoXDefecto = false;
  recalculoUnidad = false;
  porcentajeTarjetas = false;
  tieneRolWSPDF  = false;
  rolMostrador2 = false;
  medinor: boolean= false;
  observacionArt: any;
  dataArt :any;
  pesable :boolean =false;
  totalPesable!: number;
  codigoArticulo!:any;
  pesoArticulo!:number;
  pedidoAsociadoId!: number;
  esNotaCredito: any;
  ncDefault: any;
  esNotaDebito!: boolean;
  entrega: any;
  turno:any;
  turnos:any;
  nroOperacion:any;
  fechaOperacion:any= this.calendar.getToday().day.toString().padStart(2, '0') + '/' + this.calendar.getToday().month.toString().padStart(2, '0') + '/' + this.calendar.getToday().year.toString().padStart(4, '0');

  formasPago = PropertyUtil.getPropertiesByType(TiposPropiedad.FORMA_PAGO);
  formasPagoPP: any[]= [];
  estadosEntrega = PropertyUtil.getPropertiesByType(TiposPropiedad.ESTADO_ENTREGA);
  estadosPedido = PropertyUtil.getPropertiesByType(TiposPropiedad.ESTADO_PEDIDO);


  @ViewChild('codigoBarras') codigoInput!: ElementRef;
  @ViewChild('pagoCliente') pagoClienteInput!: ElementRef;
  @ViewChild('vueltoCliente') vueltoClienteInput!: ElementRef;
  @ViewChild('submit') submitForm!: ElementRef;
  source: any;

  limit = 20;
  page = 1;
  total = 0;
  busquedaCliente = '';
  busquedaVendedor = '';
  data: any
  permisoAumentoDescuentoMonto = false;
  permisoAumentoDescuentoPorcentaje = false;
  tieneRolVenderConStock = false;
  tieneRolVisualizarDescripcion = false;
  tieneRolCompraMinima = false;
  pedidoVendedor = false;
  puedeVisualizarColor = false;
  permisoAumentoDescuentoLista = false;
  tieneRolImprimirUnificado = false;
  tieneRolSaldoAFavor = false;
  tieneRolIva = false;
  ubicacionArticulo = false;
  ocultarPrecios = false;
  tieneRolMostradorEfectivo = false;
  tieneRolEntregado = false;

  constructor(
    private titleService: Title,
    private articuloServ: ArticuloService,
    private mpServ: MateriaPrimaService,
    private fb: FormBuilder,
    private pedidoServ: PedidoService,
    private listaPrecServ: ListaPreciosService,
    private router: Router,
    private userServ: UserService,
    private route: ActivatedRoute,
    private generalServ: GeneralService,
    private cuentaDetalleServ : CuentaFinanzaDetalleService,
    private sucursalServ: SucursalService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    public globalServ: GlobalService,
    private calendar: NgbCalendar,
    private clienteServ: ClienteclienteService

    ) {
      titleService.setTitle("Ventas");
      this.request = new CuentaDetalleModel();
    this.myForm = fb.group({
      idSucursalCliente: ['', Validators.compose([])],
      fechaVencimiento: ['', Validators.compose([])],
      estadoEntrega: ['', Validators.compose([/*Validators.required*/])],
      estadoPago: ['', Validators.compose([Validators.required])],
      comision: ['', Validators.compose([/*Validators.required*/])],
      estadoConfirmacion: ['', Validators.compose([/*Validators.required*/])],
      fechaEntrega: ['', Validators.compose([Validators.required])],
      estadoPreparacion: ['', Validators.compose([/*Validators.required*/])],
      prioridad: ['', Validators.compose([/*Validators.required*/])],
      estadoPedido: ['', Validators.compose([/*Validators.required*/])],
      estadoComision: ['', Validators.compose([])],
      aumentoLista: ['', Validators.compose([/*Validators.required*/])],
      aumentoListaMonto: ['', Validators.compose([])],
      aumentoListaPorcentaje: ['', Validators.compose([])],
      aumentoResto: ['', Validators.compose([])],
      formaPago: ['', Validators.compose([])],
      pagoParcial: ['', Validators.compose([])],
      pagoCantidad: ['', Validators.compose([])],
      observacion: ['', Validators.compose([])],
      codigo: ['', Validators.compose([])],
      fechaPedido: ['', Validators.compose([Validators.required])],
      tipoTarjeta: ['', Validators.compose([])],
      tarjeta: ['', Validators.compose([])],
      numeroCheque: ['', Validators.compose([])],
      banco: ['', Validators.compose([])],
      plaza: ['', Validators.compose([])],
      vencimientoCheque: ['', Validators.compose([])],
      libradorCheque: ['', Validators.compose([])],
      cuitCheque: ['', Validators.compose([])],
      numeroCuentaCheque: ['', Validators.compose([])],
      mensajeAplicacion :['', Validators.compose([])],
      codigoQR:['', Validators.compose([])],
      turno:['', Validators.compose([])],
      observacionArt:['', Validators.compose([])],
      tipoSesion:['', Validators.compose([])],
      tipoSesion2:['', Validators.compose([])],
      cuitCliente:['', Validators.compose([])],
      pagoParcial2: ['', Validators.compose([])],
      formaPago2: ['', Validators.compose([])],
      nroOperacion: ['', Validators.compose([])],
      fechaOperacion: ['', Validators.compose([])],
      retencion: ['', Validators.compose([])],
    });

  // if(this.tieneRolEsconderDatosSucursal)
   // {
   //  this.myForm.controls.idSucursalCliente.errors.required = false;

  //  }
    route.params.subscribe(params => {
      this.idPedido = params['idpedido'];
    });


    const dataDolar = { 'idUser': localStorage.getItem('idUser') };
    this.userServ.getCotizacionDolar(dataDolar).subscribe(data => {
      this.cotizacionDolar = data;
    }, error => { console.log(error);});

    route.queryParams.subscribe(params => {
      this.pedidoAsociadoId = params['pedidoAsociadoId'];
      this.esNotaCredito = params['notaCredito'];
      this.esNotaDebito = params['notaDebito'];
      this.ncDefault = params['ncDefault'];

      // if (this.esNotaCredito) {
      //   this.idPedido = this.pedidoAsociadoId;
      //   this.pedidoAsociadoId = null;
      // }
    });

/*     let dataUser = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis'), 'activo': true };
    this.listaPrecServ.ListaPreciosByIdClienteNegotis(dataUser)
      .subscribe(data => { this.listadoPrecios = data }) */

    this.cargarVistaNotaCredito();
    const dataTurno = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
      this.userServ.obtenerTurnos(dataTurno).subscribe((data: any) => {
        this.turnos = data;
      }, (error: any) => { console.log(error);});
      this.userServ.obtenerTurno(dataTurno).subscribe((data: any) => {
        this.turno = data;
      }, (error: any) => { console.log(error);});

    if (this.idPedido != null) {
      const loading = this.generalServ.loadingModal();
      //this.readOnlyCliente = true;
      const dataPedido = { 'idPedido': this.idPedido, 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
      this.pedidoServ.getPedidoById(dataPedido).subscribe(async data => {
        this.pedidoById = data;
        if (this.pedidoById == null) {
          loading.close();
          this.generalServ.goToNoEncontrado();
        }

        this.editMode = this.idPedido != 0;
        this.idCliente = this.pedidoById.Pedido.IdCliente;
        this.cliente = this.pedidoById.Pedido.Cliente.RazonSocial;
        this.telefonoCliente = this.pedidoById.Pedido.Cliente.Telefono;
        this.cuitCliente = this.pedidoById.Pedido.Cliente.CUIT;
        this.clienteSucursales = { 'ListSucursal': {} };
        this.clienteSucursales.ListSucursal = this.pedidoById.ListClienteSucursale;
        this.vendedor = this.pedidoById.Pedido.Vendedor.Apellidos;
        this.getTarjeta(this.pedidoById.Pedido.IdTarjeta);
        this.getSesiones();
        this.estadoEntrega = this.pedidoById.Pedido.CodigoEstadoEntrega;
        this.comisionTotal = this.pedidoById.Pedido.ComisionTotal;
        this.estadoPago = this.pedidoById.LastPedidoPago.CodigoEstadoPago;
        this.estadoConfirmacion = this.pedidoById.Pedido.CodigoEstadoConfirmacion;
        this.iva = this.pedidoById.Pedido.Iva;
        this.idSucursalVendedor = this.pedidoById.Pedido.IdSucursalEmpleado;
        this.retencion = this.pedidoById.Pedido.Retencion;


        if(this.pedidoById.Pedido.FechaVencimiento != null)
        {
          const getFechaVencimiento = new Date(Number(this.pedidoById.Pedido.FechaVencimiento.replace('/Date(', '').replace(')/', '')));
          this.fechaVencimiento = getFechaVencimiento.getUTCDate().toString().padStart(2, '0') + '/' + (getFechaVencimiento.getUTCMonth() + 1).toString().padStart(2, '0') + '/' + getFechaVencimiento.getUTCFullYear().toString().padStart(4, '0');
        }
        if(this.pedidoById.Pedido.FechaOperacion != null)
        {
          const getFechaVencimiento = new Date(Number(this.pedidoById.Pedido.FechaOperacion.replace('/Date(', '').replace(')/', '')));
          this.fechaOperacion = getFechaVencimiento.getUTCDate().toString().padStart(2, '0') + '/' + (getFechaVencimiento.getUTCMonth() + 1).toString().padStart(2, '0') + '/' + getFechaVencimiento.getUTCFullYear().toString().padStart(4, '0');
        }
        this.nroOperacion = this.pedidoById.Pedido.NroOperacion;





        if(this.estadoPago == 2)
        {
          this.formasPago.forEach(each => {
            if(each.Valor != "CTA CTE")
            {
              this.formasPagoPP.push(each);
            }
          });
          this.formasPago = this.formasPagoPP;
        }




        const getFecha = new Date(Number(this.pedidoById.Pedido.FechaEntrega.replace('/Date(', '').replace(')/', '')));
        this.fechaEntrega = getFecha.getUTCDate().toString().padStart(2, '0') + '/' + (getFecha.getUTCMonth() + 1).toString().padStart(2, '0') + '/' + getFecha.getUTCFullYear().toString().padStart(4, '0');

        this.estadoPreparacion = this.pedidoById.Pedido.CodigoEstadoPreparacion;
        this.prioridad = this.pedidoById.Pedido.CodigoPrioridad;
        this.estadoPedido = this.pedidoById.Pedido.CodigoEstadoPedido;
        this.estadoPedidoAnterior = this.estadoPedido;
        // if (this.pedidoById.Pedido.Cliente.ListaPrecios != null) {
        this.aumentoLista = this.pedidoById.Pedido.AumentoListaPorcentaje;
        this.aumentoListaNombre = this.pedidoById.Pedido.Cliente.ListaPrecios.Nombre;
        this.listaNombres = this.pedidoById.Pedido.Cliente.ListaPrecios.Nombre;
        this.listaprecioID = this.pedidoById.Pedido.Cliente.ListaPrecios.Id;
        this.aumentoListaMonto = this.pedidoById.Pedido.AumentoListaPorcentajeMonto;
        this.aumentoListaMontoAnterior = this.pedidoById.Pedido.AumentoListaPorcentajeMonto;
        this.aumentoListaPorcentaje =this.pedidoById.Pedido.AumentoPorcentaje;
        this.aumentoListaPorcentajeAnterior =this.pedidoById.Pedido.AumentoPorcentaje;
        this.totalPrecioOriginal = this.pedidoById.Pedido.PrecioOriginal;
        this.numeroCheque = this.pedidoById.Pedido.NumeroCheque;
        // }
        this.idSucursalCliente = this.pedidoById.Pedido.IdSucursalCliente;
        this.estadoComision = this.pedidoById.Pedido.CodigoEstadoComision;
        this.formaPago = this.pedidoById.LastPedidoPago.CodigoFormaPago;
        this.formaPagoGuardada = this.pedidoById.LastPedidoPago.CodigoFormaPago;
        this.observacion = this.pedidoById.Pedido.Observacion;
        this.totalArticulos = this.pedidoById.Pedido.CantidadArticulo;
        this.totalPrecio = this.pedidoById.Pedido.PrecioTotal;

        if(this.idPedido != 0 && this.formaPago != 10)
        {
          this.formasPago.forEach(each => {
            if(each.Valor != "CTA CTE")
            {
              this.formasPagoPP.push(each);
            }
          });
          this.formasPago = this.formasPagoPP;
        }

        if (!this.esNotaCredito) {
          this.esNotaCredito = this.pedidoById.Pedido.NotaCredito;
        }
        if (!this.esNotaDebito) {
          this.esNotaDebito = this.pedidoById.Pedido.NotaDebito;
        }

        for (const item of this.pedidoById.ListPedidoPagos) {
          if (item.CodigoEstadoPago === PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PAGO, EstadosPago.PARCIAL)) {
            // this.pagoParcial = this.pedidoById.Pedido.PagoParcial;
            // this.restoApagarPagoParcial = this.pedidoById.Pedido.PrecioTotal - item.Monto;
            // this.restoApagarPagoParcialEdit= this.restoApagarPagoParcial ;
            this.contienePagoParcial = true;
          }
          if (item.CodigoEstadoPago === PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PAGO, EstadosPago.PENDIENTE)) {
            this.contienePagoPendiente = true;
          }
          if (item.CodigoEstadoPago === PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PAGO, EstadosPago.TOTAL)) {
            this.contienePagoTotal = true;
          }

          if (item.MontoDescuento != null) {
            this.montoTotalDescuentoAumentoResto += item.MontoDescuento;
          }

          if (item.CodigoFormaPago !== this.formaPagoCtaCte) {
            this.montoTotalEdit += item.Monto;
          }
        }

        if ( this.pedidoById.LastPedidoPago.CodigoFormaPago === this.formaPagoCtaCte) {
          this.restoApagarPagoParcial = this.pedidoById.Pedido.PrecioTotal;
          this.restoApagarPagoParcial2 = this.pedidoById.Pedido.PrecioTotal;
          this.montoTotalEdit = 0;
        } else {
          this.restoApagarPagoParcial = this.pedidoById.Pedido.PrecioTotal - this.montoTotalEdit + this.montoTotalDescuentoAumentoResto;
          this.restoApagarPagoParcial2 = this.pedidoById.Pedido.PrecioTotal - this.montoTotalEdit + this.montoTotalDescuentoAumentoResto;
        }
        this.restoApagarPagoParcialEdit = this.restoApagarPagoParcial;
        this.restoApagarPagoParcialEdit2 = this.restoApagarPagoParcial2;

        if ((this.estadoPedido === PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PEDIDO, EstadosPedido.CERRADO) &&
          this.estadoPago === PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PAGO, EstadosPago.TOTAL) && this.formaPago !==  PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.FORMA_PAGO, EstadosPago.CTA_CTE)) ) { this.pedidoCerrado = true; }

        const idArtEditar = [];
        if(!this.esNotaDebito || this.pedidoById.Pedido.NotaDebito)
        {


        for (const item of this.pedidoById.ListPedidoArticulo) {

          this.listaArticulo.push(item.Articulo);

          item.Articulo.Cantidad = item.Cantidad;
          item.Articulo.CantidadAnterior = item.Cantidad;
          item.Articulo.PrecioFinal = item.PrecioFinal;
          item.Articulo.DescuentoPorcentaje = item.DescuentoPorcentaje;
          item.Articulo.DescuentoMonto = item.DescuentoMonto;
          item.Articulo.AnteriorCantidad = item.Cantidad;
          item.Articulo.AnteriorPrecioFinal = item.PrecioFinal;
          item.Articulo.PrecioCosto = item.PrecioCosto;
          item.Articulo.Observacion = item.Observacion;
          item.Articulo.CantidadRecalculo = item.CantidadRecalculo;
          if(this.tieneRolControlEntregas)
          {
            item.Articulo.Entrega = item.Entrega;
            item.Articulo.Pendiente = item.Pendiente;
          }
          if(item.Articulo.PrecioCosto == item.Articulo.PrecioBase)
          {
            let dataArt = { 'idArticulo': item.Articulo.Id, 'idClienteNegotis': localStorage.getItem('idClienteNegotis'),'idSucursal':this.idSucursalVendedor };
            let result = await this.articuloServ.getArticuloById(dataArt).toPromise();
            this.artRent = result;
            this.rentabilidadPC += this.artRent.PrecioCosto*item.Cantidad;

          }
          else
          {
            this.rentabilidadPC += item.Articulo.PrecioCosto*item.Cantidad;
          }


          if(item.PrecioUnitario != 0 && item.PrecioUnitario != undefined)
          {
            item.Articulo.PrecioUnidad = item.PrecioUnitario;
            if(this.pedidoById.Pedido.PedidoEcommerce == true)
            {
              item.Articulo.PrecioFinal =  item.Articulo.PrecioUnidad * item.Articulo.Cantidad;
            }
            if (item.Articulo.DescuentoPorcentaje != 0) {
              item.Articulo.DescuentoPrecio = (item.Articulo.DescuentoPorcentaje * item.Articulo.PrecioUnidad) / 100;
            } else {
              item.Articulo.DescuentoPrecio = 0;
            }
          }
          else
          {
            item.Articulo.PrecioUnidad = (((Number(this.aumentoLista) * Number(item.PrecioBase)) / 100) + Number(item.PrecioBase));
            if(this.pedidoById.Pedido.PedidoEcommerce == true)
            {
              item.Articulo.PrecioFinal =  item.Articulo.PrecioUnidad * item.Articulo.Cantidad;
            }
            if (item.Articulo.DescuentoPorcentaje != 0) {
              item.Articulo.DescuentoPrecio = (item.Articulo.DescuentoPorcentaje * item.Articulo.PrecioUnidad) / 100;
              item.Articulo.PrecioUnidad = item.Articulo.PrecioUnidad - item.Articulo.DescuentoPrecio;
            } else {
              item.Articulo.DescuentoPrecio = 0;
            }
          }
          if (this.iva == true) {
            item.Articulo.Iva = Math.round((21 * item.Articulo.PrecioUnidad) / 100).toFixed(2);
            item.Articulo.PrecioUnidad = item.Articulo.PrecioUnidad + item.Articulo.Iva;
          }
          item.Articulo.PrecioBase = item.PrecioBase;

          if(item.Articulo.CantidadPorPack > 0 && item.Articulo.PrecioXBulto > 0 && item.Articulo.Cantidad >= item.Articulo.CantidadPorPack && this.comboOferta && item.Pedido.AumentoPorcentaje == 0)
          {
            if(this.precioUOriginal == null || this.precioUOriginal == undefined)
            {
              this.precioUOriginal = item.PrecioUnidad;
              this.IDprecioUOriginal = item.Id
            }
            else if(this.IDprecioUOriginal != item.Id)
            {
              this.precioUOriginal = item.PrecioUnidad;
              this.IDprecioUOriginal = item.Id
            }
            this.totalPrecio = this.totalPrecio - (item.Articulo.PrecioUnidad * item.Articulo.Cantidad);
            item.Articulo.PrecioUnidad = item.Articulo.PrecioXBulto;

            item.Articulo.PrecioFinal = item.Articulo.PrecioUnidad * item.Articulo.Cantidad;
            this.totalPrecio = this.totalPrecio + item.Articulo.PrecioFinal;
          }

          console.log(item);
          idArtEditar.push(item.Articulo.Id);


        }
      }
        this.rentabilidad= this.pedidoById.Pedido.PrecioTotal - this.rentabilidadPC;
        this.porcentajeRentabilidad = ((this.totalPrecio - this.rentabilidadPC) / this.rentabilidadPC) * 100;
        this.selectFormaPago();
        if (idArtEditar.length > 0) {
          const buscarStock = { 'idArticulo': idArtEditar, 'idSucursal': this.pedidoById.Pedido.IdSucursalEmpleado };
          this.articuloServ.getListCantPorArtSuc(buscarStock).subscribe(data => {
            this.getStockToEdit = data;
            for (const item of this.pedidoById.ListPedidoArticulo) {
              for (const itemStock of this.getStockToEdit) {
                if (item.Articulo.Id == itemStock.IdArticulo) {
                  item.Articulo.Stock = itemStock.CantidadArticulo;
                }
              }
            }
          });
        }
        loading.close();
      }, error => { console.log(error); this.generalServ.goToNoEncontrado(); loading.close(); });
    } else {
      this.idPedido = 0;
      this.estadoPedido = PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PEDIDO, EstadosPedido.ACTIVO);
      this.readOnlyCliente = false;
      this.selectFormaPago();
    }

    let rolObject = localStorage.getItem('roles');
    if (rolObject !== 'null') {
      rolObject = JSON.parse(rolObject ?? '');
      // @ts-ignore
      this.permisoAumentoDescuentoMonto = rolObject.Aumentodescuentomonto;
    }
  }

  getTarjetas(){
    const loading = this.generalServ.loadingModal();
    let dataList = {
      'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
      'idUser': localStorage.getItem('idUser'),
      'tipoTarjeta': this.tipoTarjeta
    };
    this.userServ.obtenerTarjetas(dataList).subscribe(data => {
      this.listaTarjetas = data;
      loading.close();
    }, error => { console.log(error); loading.close();})
  }

  getSesiones(){
    if(this.idCliente != null)
    {
    const loading = this.generalServ.loadingModal();
    let dataList = {
      'idCliente': this.idCliente,
      'idClienteNegotis': localStorage.getItem('idClienteNegotis')
    };

    this.clienteServ.clientesById (dataList).subscribe(data => {
      this.clienteSesiones=data;
      this.sesionesRealizadas = this.clienteSesiones.CantidadSesionesRealizadas;
      this.sesionesTratamiento = this.clienteSesiones.CantidadSesionesTratamiento;
      this.sesionesTotales = this.clienteSesiones.CantidadSesionesTotales;
      this.distancia = this.clienteSesiones.Distancia;
      this.saldoAFavor= this.clienteSesiones.SaldoAFavor;
      this.saldoAFavorOriginal = this.saldoAFavor;
      loading.close();
    }, error => { console.log(error); loading.close();})
  }
  }
  getTarjeta(value:any){
    const loading = this.generalServ.loadingModal();
    let dataList = {
      'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
      'idUser': localStorage.getItem('idUser'),
      'idTarjeta': value
    };
    this.userServ.obtenerTarjeta(dataList).subscribe((data: any) => {
      this.tipoTarjeta = data.TipoTarjeta
      this.getTarjetas();
      this.tarjeta = data.Id;
      this.porcentajeTarjeta = data.Porcentaje;
      console.log(data);
      loading.close();
    }, (error: any) => { console.log(error); loading.close();})
  }

  async getPorcentajes(value?:any)
  {
    let dataList = {
      'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
      'idUser': localStorage.getItem('idUser'),
      'idTarjeta': this.tarjeta
    };
     this.rentabilidad = 0;
     this.rentabilidadPC = 0;
    const result = await this.userServ.obtenerTarjeta(dataList).subscribe((data: any) => {
      this.porcentajeTarjeta = data.Porcentaje
      if(this.porcentajeTarjeta != null && this.porcentajeTarjeta != 0)
      {
        if (this.listaArticulo.length > 0) {

          for (const item of this.listaArticulo)
          {
              this.totalPrecio = this.totalPrecio - item.PrecioFinal;
              item.PrecioUnidad = item.PrecioUnidad + (item.PrecioUnidad * this.porcentajeTarjeta)/100;
              item.PrecioFinal = item.PrecioUnidad * item.Cantidad;
              this.rentabilidadPC= this.rentabilidadPC + (item.PrecioCosto * item.Cantidad);
              this.totalPrecio = this.totalPrecio + item.PrecioFinal;
              this.rentabilidad = this.rentabilidad + (item.PrecioFinal - item.PrecioCosto);
          }
          this.porcentajeRentabilidad = ((this.totalPrecio - this.rentabilidadPC) / this.rentabilidadPC) * 100;
        }
      }
    });
    await result;

  }

  cargarVistaNotaCredito() {
    if (this.pedidoAsociadoId != null && this.ncDefault != "true") {
      const dataUser = {
        'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
        'desbloquados': true,
        'idUser': localStorage.getItem('idUser'),
        'crearEditar': true,
        'idPedido': Number(this.pedidoAsociadoId)
      };
      //const loading = this.generalServ.loadingModal();
      this.pedidoServ.getInfoGeneral(dataUser).subscribe(data => {
        this.infoGeneral = data;
/*         if (this.infoGeneral.fechaPedido) {
          this.fechaPedido = this.infoGeneral.fechaPedidoAsString;
        } */
        this.comision = this.infoGeneral.PorcentajeComision;
        //this.facturaAfip = this.infoGeneral.FacturaAfip;
        this.notaCreditoAfip = this.infoGeneral.NotaCreditoAfip;
        // this.filteredRazonSocial = this.razonSocialCtrl.valueChanges
        // .pipe(
        //   startWith(''),
        //   map(item => item ? this._filterRazonSocial(item) : this.infoGeneral.Clientes.slice())
        // );
        if (this.infoGeneral.ClienteMostradorDefault == true && Number(this.idPedido) == 0) {
          this.idCliente = this.infoGeneral.IdClienteMostrador;
          this.aumentoLista = Number(this.infoGeneral.AumentoLista);
          this.aumentoListaNombre = this.infoGeneral.nombreLista;
          this.listaNombres = this.infoGeneral.nombreLista;
          this.listaprecioID =  this.infoGeneral.listaID;
          this.activaListaAumento = this.infoGeneral.activaListaAumento;
          this.cliente = 'Mostrador';
          this.busquedaCliente = 'Mostrador';
          if(this.tieneRolMostradorEfectivo)
          {
            this.formaPago = PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.FORMA_PAGO, FormasPago.EFECTIVO)
          }
          else
          {
            this.formaPago = this.formaPagoCtaCte;
          }

           this.estadoEntrega = PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_ENTREGA, EstadosEntrega.ENTREGADO);

          this.selectFormaPago();
        }
        if (this.infoGeneral.ClienteMostrador2Default == true && Number(this.idPedido) == 0) {
          this.idCliente = this.infoGeneral.IdClienteMostrador2;
          this.aumentoLista = Number(this.infoGeneral.AumentoLista);
          this.aumentoListaNombre = this.infoGeneral.nombreLista;
          this.listaNombres = this.infoGeneral.nombreLista;
          this.activaListaAumento = this.infoGeneral.activaListaAumento;
          this.cliente = 'Mostrador 2';
          this.busquedaCliente = 'Mostrador 2';
          this.estadoEntrega =  this.estadoPago = PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_ENTREGA, EstadosEntrega.ENTREGADO);
          if(this.tieneRolMostradorEfectivo)
          {
            this.formaPago = PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.FORMA_PAGO, FormasPago.EFECTIVO)
          }
          else
          {
            this.formaPago = this.formaPagoCtaCte;
          }
          this.selectFormaPago();
        }

        //const loadingPedido = this.generalServ.loadingModal();

        //this.readOnlyCliente = true;
        const dataPedido = { 'idPedido': this.pedidoAsociadoId, 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
        this.pedidoServ.getPedidoById(dataPedido).subscribe(data => {
          this.pedidoById = data;
          if (this.pedidoById == null) {
            //loadingPedido.close();
            this.generalServ.goToNoEncontrado();
          }

          this.idCliente = this.pedidoById.Pedido.IdCliente;
          this.cliente = this.pedidoById.Pedido.Cliente.RazonSocial;
          this.clienteSucursales = { 'ListSucursal': {} };
          this.clienteSucursales.ListSucursal = this.pedidoById.ListClienteSucursale;
          this.vendedor = this.pedidoById.Pedido.Vendedor.Apellidos;
          this.estadoEntrega = this.pedidoById.Pedido.CodigoEstadoEntrega;
          this.comisionTotal = this.pedidoById.Pedido.ComisionTotal;
          this.estadoPago = this.pedidoById.LastPedidoPago.CodigoEstadoPago;
          this.estadoConfirmacion = this.pedidoById.Pedido.CodigoEstadoConfirmacion;
          this.iva = this.pedidoById.Pedido.Iva;
          this.idSucursalVendedor = this.pedidoById.Pedido.IdSucursalEmpleado;
          const getFecha = new Date(Number(this.pedidoById.Pedido.FechaEntrega.replace('/Date(', '').replace(')/', '')));
          //this.fechaEntrega = getFecha.getUTCDate().toString().padStart(2, '0') + '/' + (getFecha.getUTCMonth() + 1).toString().padStart(2, '0') + '/' + getFecha.getUTCFullYear().toString().padStart(4, '0');

          this.estadoPreparacion = this.pedidoById.Pedido.CodigoEstadoPreparacion;
          this.prioridad = this.pedidoById.Pedido.CodigoPrioridad;
          this.estadoPedido = this.pedidoById.Pedido.CodigoEstadoPedido;
          this.estadoPedidoAnterior = this.estadoPedido;
          // if (this.pedidoById.Pedido.Cliente.ListaPrecios != null) {
          this.aumentoLista = this.pedidoById.Pedido.AumentoListaPorcentaje;
          // }
          this.idSucursalCliente = this.pedidoById.Pedido.IdSucursalCliente;
          this.estadoComision = this.pedidoById.Pedido.CodigoEstadoComision;
          this.formaPago = this.pedidoById.LastPedidoPago.CodigoFormaPago;
          this.formaPagoGuardada = this.pedidoById.LastPedidoPago.CodigoFormaPago;
          this.observacion = this.pedidoById.Pedido.Observacion;
          this.aumentoListaMonto = this.pedidoById.Pedido.AumentoListaPorcentajeMonto;
          this.aumentoListaMontoAnterior = this.pedidoById.Pedido.AumentoListaPorcentajeMonto;
          this.aumentoListaPorcentaje =this.pedidoById.Pedido.AumentoPorcentaje;
          this.aumentoListaPorcentajeAnterior =this.pedidoById.Pedido.AumentoPorcentaje;
          this.totalPrecioOriginal = this.pedidoById.Pedido.PrecioOriginal;
          // this.idPedido = Number(this.pedidoAsociadoId);

          for (const item of this.pedidoById.ListPedidoPagos) {
            if (item.CodigoEstadoPago === PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PAGO, EstadosPago.PARCIAL)) {
              // this.pagoParcial = this.pedidoById.Pedido.PagoParcial;
              // this.restoApagarPagoParcial = this.pedidoById.Pedido.PrecioTotal - item.Monto;
              // this.restoApagarPagoParcialEdit= this.restoApagarPagoParcial ;
              this.contienePagoParcial = true;
            }
            if (item.CodigoEstadoPago === PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PAGO, EstadosPago.PENDIENTE)) {
              this.contienePagoPendiente = true;
            }
            if (item.CodigoEstadoPago === PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PAGO, EstadosPago.TOTAL)) {
              this.contienePagoTotal = true;
            }

            if (item.MontoDescuento != null) {
              this.montoTotalDescuentoAumentoResto += item.MontoDescuento;
            }

            if (item.CodigoFormaPago !== this.formaPagoCtaCte) {
              this.montoTotalEdit += item.Monto;
            }
          }

          if ( this.pedidoById.LastPedidoPago.CodigoFormaPago === this.formaPagoCtaCte) {
            this.restoApagarPagoParcial = this.pedidoById.Pedido.PrecioTotal;
            this.montoTotalEdit = 0;
          } else {
            this.restoApagarPagoParcial = this.pedidoById.Pedido.PrecioTotal - this.montoTotalEdit + this.montoTotalDescuentoAumentoResto;
          }
          this.restoApagarPagoParcialEdit = this.restoApagarPagoParcial;

          const idArtEditar = [];
          //if( this.esNotaDebito != null && (!this.esNotaDebito || this.pedidoById.Pedido.NotaDebito))
          //{

          for (const item of this.pedidoById.ListPedidoArticulo) {
            this.listaArticulo.push(item.Articulo);

            item.Articulo.Cantidad = item.Cantidad;
            item.Articulo.CantidadAnterior = item.Cantidad;
            item.Articulo.PrecioFinal = item.PrecioFinal;
            item.Articulo.DescuentoPorcentaje = item.DescuentoPorcentaje;
            item.Articulo.DescuentoMonto = item.DescuentoMonto;
            item.Articulo.AnteriorCantidad = item.Cantidad;
            item.Articulo.AnteriorPrecioFinal = item.PrecioFinal;
            item.Articulo.PrecioCosto = item.PrecioCosto;
            if(item.PrecioUnitario != undefined)
            {
              item.Articulo.PrecioUnidad = item.PrecioUnitario;
            }
            else{
              item.Articulo.PrecioUnidad = (((Number(this.aumentoLista) * Number(item.PrecioBase)) / 100) + Number(item.PrecioBase));
            }

           // if (item.Articulo.DescuentoPorcentaje != 0) {
           //   item.Articulo.DescuentoPrecio = (item.Articulo.DescuentoPorcentaje * item.Articulo.PrecioUnidad) / 100;
             // item.Articulo.PrecioUnidad = item.Articulo.PrecioUnidad - item.Articulo.DescuentoPrecio;
           //// } else {
           //   item.Articulo.DescuentoPrecio = 0;
            //}
            if (this.iva == true) {
              item.Articulo.Iva = Math.round((21 * item.Articulo.PrecioUnidad) / 100).toFixed(2);
              item.Articulo.PrecioUnidad = item.Articulo.PrecioUnidad + item.Articulo.Iva;
            }
            item.Articulo.PrecioBase = item.PrecioBase;

            idArtEditar.push(item.Articulo.Id);
            console.log(item);
            this.totalArticulos = this.pedidoById.Pedido.CantidadArticulo;
            this.totalPrecio = this.pedidoById.Pedido.PrecioTotal;
            this.rentabilidad= this.totalPrecio - this.pedidoById.Pedido.PrecioCosto;

          }
          this.porcentajeRentabilidad = ((this.totalPrecio - this.pedidoById.Pedido.PrecioCosto) / this.pedidoById.Pedido.PrecioCosto) * 100;
        //}
          this.getSesiones();
          this.selectFormaPago();
          if (idArtEditar.length > 0) {
            const buscarStock = { 'idArticulo': idArtEditar, 'idSucursal': this.pedidoById.Pedido.IdSucursalEmpleado };
            this.articuloServ.getListCantPorArtSuc(buscarStock).subscribe(data => {
              this.getStockToEdit = data;
              for (const item of this.pedidoById.ListPedidoArticulo) {
                for (const itemStock of this.getStockToEdit) {
                  if (item.Articulo.Id == itemStock.IdArticulo) {
                    item.Articulo.Stock = itemStock.CantidadArticulo;
                  }
                }
              }
            });
          }
          //loadingPedido.close();loadingPedido.close();
          //loading.close();
        }, error => { console.log(error); this.generalServ.goToNoEncontrado();  });

       // loading.close();//loading.close();
      }, error => { console.log(error);  });
    }

  }


  exportarWS()
  {
    this.url = this.globalServ.urlApi + '/ApiPedido/Get/Factura/WhatsApp?' +
    'token=' + localStorage.getItem('token') +
    '/idPedido=' + this.idPedido +
    '/idClienteNegotis=' + localStorage.getItem('idClienteNegotis') ;




    try{
      const link = document.createElement('a');
      link.href = this.url;
      link.click();
      link.click();
    }
    catch{

    }
  }


  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.tieneRolCliente = JSON.parse(localStorage.getItem('RolCliente') ?? 'false');
    this.soporte = JSON.parse(localStorage.getItem('soporte') ?? 'false');
    this.idClienteNegotis = localStorage.getItem('idClienteNegotis')
    this.idVendedor = localStorage.getItem('idUser')
    this.idUser = localStorage.getItem('idUser');
    const roles = JSON.parse(localStorage.getItem('roles') ?? '');

    const tieneRolClienteNegotis = eval(localStorage.getItem('RolClienteNegotis') ?? 'false') || false;
    this.tieneRolEsconderDatosSucursal = (roles != null && roles.VisualizarDatosSucursal ) || tieneRolClienteNegotis;

    const tieneRolSoporte = eval(localStorage.getItem('soporte') ?? 'false') || false;
    this.tieneRolVenderConStock = (roles != null && roles.VenderConStock );
    this.puedeVisualizarColor = (roles != null && roles.VisualizarColor ) || tieneRolClienteNegotis || tieneRolSoporte;
    this.permisoAumentoDescuentoLista = (roles != null && roles.VisualizarAumentoDescuentoLista ) || tieneRolClienteNegotis || tieneRolSoporte;
    this.tieneRolVisualizarCodigo= (roles != null && roles.VisualizarCodigoArticulo ) || tieneRolClienteNegotis || tieneRolSoporte;
    this.tieneRolVisualizarImpresionBT= (roles != null && roles.VisualizarImpresionBT ) || tieneRolClienteNegotis || tieneRolSoporte;
    this.tieneRolPesables= (roles != null && roles.VisualizarPesables ) || tieneRolClienteNegotis || tieneRolSoporte;
    this.tieneRolRentabilidad = (roles != null && roles.VisualizarRentabilidad) || tieneRolSoporte;
    this.tieneRolEstadoPedidos= (roles != null && roles.VisualizarEstadosPedidos ) || tieneRolClienteNegotis ;
    this.tieneRolVisualizarDescuentos= (roles != null && roles.VisualizarDescuentos ) || tieneRolClienteNegotis;
    this.tieneRolImprimirDuplicado= (roles != null && roles.ImprimirDuplicado ) || tieneRolClienteNegotis || tieneRolSoporte;
    this.datosEsteticaHabilitado = (roles != null && roles.VisualizarDatosEstetica) || tieneRolClienteNegotis;
    this.tieneRolEditarPrecios = (roles != null && roles.EditarPrecios) || tieneRolClienteNegotis;
    this.comboOferta = (roles != null && roles.ComboOferta) || tieneRolClienteNegotis;
    this.visualizarPrecioOferta = (roles != null && roles.VisualizarAcciones) || tieneRolClienteNegotis;
    this.permisoAumentoDescuentoPorcentaje = (roles != null && roles.VisualizarAumentoPorcentaje) || tieneRolClienteNegotis;
    this.tieneRolVisualizarOfertas = (roles != null && roles.VisualizarOfertas ) || tieneRolClienteNegotis;
    this.visualizarCategoriaRubro = (roles != null && roles.VisualizarCategoriaRubroPedidos ) || tieneRolClienteNegotis;
    this.tieneRolVisualizarDescripcion = (roles != null && roles.VisualizarDescripcion ) || tieneRolClienteNegotis;
    this.tieneRolCompraMinima = (roles != null && roles.CompraMinima );
    this.tieneRolImprimirUnificado = (roles != null && roles.ComprobanteUnificado ) || tieneRolSoporte;
    this.pedidoVendedor = (roles != null && roles.pedidoVendedor );
    this.tieneRolEsconderComprobante = (roles != null && roles.OcultarComprobante);
    this.tieneRolEsconderFactura = (roles != null && roles.OcultarFactura );
    this.tieneRolEsconderFacturaComandera = (roles != null && roles.OcultarFacturaComandera );
    this.tieneRolVisualizarImpresionComandera = (roles != null && roles.ImpresionComandera ) || tieneRolSoporte;
    this.rolPC = (roles != null && roles.OcultarPreciosComprobante);
    this.limitarStockMP = (roles != null && roles.MPStock);
    this.tieneRolProduccion =(roles != null && roles.Produccion);
    this.tieneRolControlEntregas =(roles != null && roles.ControlEntregas);
    this.tieneRolSaldoAFavor = (roles != null && roles.SaldoAFavor);
    this.tieneRolIva = (roles != null && roles.VisualizarIVA);
    this.ubicacionArticulo = (roles != null && roles.UbicacionArticuloPedido);
    this.ocultarPrecios = (roles != null && roles.OcultarPreciosPedido);
    this.tieneRolCombo = (roles != null && roles.ComboArticulos);
    this.tieneRolDistancia = (roles != null && roles.Distancia);
    this.tieneRolVisualizarImpresion80mm = (roles != null && roles.Imprimir80mm);
    this.tieneRolMostradorEfectivo = (roles != null && roles.MostradorEfectivo);
    this.modificarLista = (roles != null && roles.ModificarLista);
    this.rolMensajeAplicacion = (roles != null && roles.MensajeAplicacion);
    this.tieneRolQR = (roles != null && roles.CodigoQR);
    this.ocultarDatosGenerales = (roles != null && roles.OcultarDatosGenerales);
    this.turnoCaja = (roles != null && roles.TurnosCaja) || tieneRolSoporte;
    this.tieneRolObservacionArticulos = (roles != null && roles.ObservacionArticulos) || tieneRolSoporte;
    this.imprimirDoble = (roles != null && roles.ImpresionDoble);
    this.bloquearFecha = (roles != null && roles.OcultarFechaPedido);
    this.tieneRolEntregado = (roles != null && roles.PedidoEntregado);
    this.bloqueoPedidos = (roles != null && roles.BloqueoPedidos);
    this.esconderDeleteArt = (roles != null && roles.EsconderDeleteArt);
    this.recalculoUnidad = (roles != null && roles.RecalculoUnidad);
    this.porcentajeTarjetas = (roles != null && roles.PorcentajeTarjetas);
    this.tieneRolWSPDF = (roles != null && roles.PDFWS );
    this.fatman = (roles != null && roles.Fatman);
    this.rolMostrador2 = (roles != null && roles.Mostrador2);
    this.medinor =  (roles != null && roles.Medinor);
    this.tieneRolImprimirEspejo= (roles != null && roles.ComprobanteEspejo);
    this.tieneRolRepartoXDefecto = (roles != null && roles.RepartoXDefecto);
    this.tieneRolOcultarDatosGeneralesXDefecto = (roles != null && roles.OcultarAlgunosDatosGenerales);
    if(this.tieneRolOcultarDatosGeneralesXDefecto)
    {
      this.myForm.controls['fechaEntrega'].patchValue(this.fechaEntrega);
    }
    if(this.tieneRolEntregado)
    {
      this.estadoEntrega = PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_ENTREGA, EstadosEntrega.ENTREGADO);
    }
   if(this.tieneRolPesables)
    {
      this.pesable=true;
    }
    if(this.tieneRolImprimirDuplicado || this.tieneRolImprimirUnificado || this.imprimirDoble || this.tieneRolImprimirEspejo)
    {
      this.pedidosImprimir.push(this.idPedido);
      this.pedidosImprimir.push(this.idPedido);
    }
    this.pedidosImprimirRecibo.push(this.idPedido);
    this.pedidosImprimirRecibo.push(this.idPedido);
    const dataUser = {
      'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
      'desbloquados': true,
      'idUser': localStorage.getItem('idUser'),
      'crearEditar': true,
      'idPedido': Number(this.idPedido)
    };
    //const loading = this.generalServ.loadingModal();
    this.pedidoServ.getInfoGeneral(dataUser).subscribe(data => {
      this.infoGeneral = data;
      if (this.infoGeneral.fechaPedido) {
        this.fechaPedido = this.infoGeneral.fechaPedidoAsString;
      }
      if(this.rolMensajeAplicacion)
      {
        this.mensajeAplicacion = this.infoGeneral.MensajeAplicacion;
      }
      this.codigoInput.nativeElement.focus();
      this.comision = this.infoGeneral.PorcentajeComision;
      this.facturaAfip = this.infoGeneral.FacturaAfip;
      this.notaCreditoAfip = this.infoGeneral.NotaCreditoAfip;
      const loadingVendedor = this.generalServ.loadingModal();
      let datos = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis')};
      this.pedidoServ.getInfoGeneral(datos).subscribe(result => {
        this.infoVendedores = result;
        loadingVendedor.close();
        this.filteredVendedor = this.vendedorCtrl.valueChanges
        .pipe(
          startWith(''),
          map(item => item ? this._filterVendedor(item) : this.infoVendedores.Empleados.slice())
        );
        this.vendedorPerfil = this.infoVendedores.Empleados.filter((x: any) => x.Id === this.idVendedor);
        if(this.vendedorPerfil.length > 0)
        {
          this.vendedorNombres = this.vendedorPerfil[0].Nombres;
          this.idVendedor = this.vendedorPerfil[0].Id;
        }

      }, error => {
        console.log(error);
        loadingVendedor.close();
    });



    let dataUser = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis'), 'activo': true };
    this.listaPrecServ.ListaPreciosByIdClienteNegotis(dataUser)
      .subscribe(data => {
        this.listadoPrecios = data
        this.filteredLista = this.listaCtrl.valueChanges
        .pipe(
          startWith(''),
          map(item => item ? this._filterLista(item) : this.listadoPrecios.slice())        );
      // loading.close();

      })

      // this.filteredRazonSocial = this.razonSocialCtrl.valueChanges
      // .pipe(
      //   startWith(''),
      //   map(item => item ? this._filterRazonSocial(item) : this.infoGeneral.Clientes.slice())
      // );
      if (this.infoGeneral.ClienteMostradorDefault == true && Number(this.idPedido) == 0 && this.rolMostrador2 == false) {
        this.idCliente = this.infoGeneral.IdClienteMostrador;
        this.aumentoLista = Number(this.infoGeneral.AumentoLista);
        this.aumentoListaNombre = this.infoGeneral.nombreLista;
        this.listaNombres = this.infoGeneral.nombreLista;
        this.listaprecioID = this.infoGeneral.listaID;
        this.activaListaAumento = this.infoGeneral.activaListaAumento;
        this.cliente = 'Mostrador';
        this.estadoEntrega = PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_ENTREGA, EstadosEntrega.ENTREGADO);
        if(this.tieneRolMostradorEfectivo)
        {
          this.formaPago = PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.FORMA_PAGO, FormasPago.EFECTIVO)
        }
        else
        {
          this.formaPago = this.formaPagoCtaCte;
        }
        this.selectFormaPago();
      }

      if ((this.infoGeneral.ClienteMostrador2Default == true && Number(this.idPedido) == 0) || this.rolMostrador2) {
        this.idCliente = this.infoGeneral.IdClienteMostrador2;
        this.aumentoLista = Number(this.infoGeneral.AumentoLista);
        this.aumentoListaNombre = this.infoGeneral.nombreLista;
        this.activaListaAumento = this.infoGeneral.activaListaAumento;
        this.cliente = 'Mostrador 2';
        this.estadoEntrega = PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_ENTREGA, EstadosEntrega.ENTREGADO);
        this.busquedaCliente = 'Mostrador 2';
        if(this.tieneRolMostradorEfectivo)
        {
          this.formaPago = PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.FORMA_PAGO, FormasPago.EFECTIVO)
        }
        else
        {
          this.formaPago = this.formaPagoCtaCte;
        }
        this.selectFormaPago();
      }

      if ((this.tieneRolRepartoXDefecto && Number(this.idPedido) == 0)) {
        this.idCliente = this.infoGeneral.idClientePorDefecto;
        this.aumentoLista = Number(this.infoGeneral.AumentoLista);
        this.aumentoListaNombre = this.infoGeneral.nombreLista;
        this.activaListaAumento = this.infoGeneral.activaListaAumento;
        this.cliente = 'Reparto';
        this.estadoEntrega = PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_ENTREGA, EstadosEntrega.ENTREGADO);
        this.busquedaCliente = 'Reparto';
        this.formaPago = this.formaPagoCtaCte;
        this.selectFormaPago();
      }

      this.cargarVistaPorRol();

      //loading.close(); loading.close();
    }, error => { console.log(error); });
  }

  getVendedor(item: any) {
    this.idVendedor = item.Id;
    this.vendedorNombres = item.Nombres;
  }


  private _filterVendedor(value: string): any[] {
    const filterValue = value.toLowerCase();

     return this.infoVendedores.Empleados.filter((item: any) => item.Nombres.toLowerCase().includes(filterValue.toLowerCase()) || item.Apellidos.toLowerCase().includes(filterValue.toLowerCase()));
   }


   private _filterLista(value: string): any[] {
    const filterValue = value.toLowerCase();

     return this.listadoPrecios.filter((item: any) => item.Nombre.toLowerCase().includes(filterValue.toLowerCase()));
   }

  async cargarVistaPorRol() {
    const sucursalSeleccionada = JSON.parse(localStorage.getItem('sucursalSeleccionada') ?? '');

    if (this.tieneRolCliente != null && this.tieneRolCliente && sucursalSeleccionada != null) {
      this.datosGeneralesOculto = true;

      this.formaPago = this.formaPagoCtaCte;
      this.selectFormaPago();

      this.idCliente = this.infoGeneral.idClientePorDefecto;

      let dataCliente = {'idCliente': this.idCliente, 'idClienteNegotis': localStorage.getItem('idClienteNegotis')};
      let result = await this.clienteServ.clientesById(dataCliente).toPromise();

      // const clientePorDefecto = this.infoGeneral.Clientes.filter(x => x.Id == this.idCliente)[0];
      const clientePorDefecto = result;
      this.razonSocialCtrl.setValue(clientePorDefecto);
      this.getCliente(this.razonSocialCtrl.value);

      this.idSucursalCliente = sucursalSeleccionada.Sucursal.Id;
    }
  }

  ngAfterViewInit(): void {

      this.source = fromEvent(this.codigoInput.nativeElement, 'keypress');
      this.source.pipe(debounceTime(1000)).subscribe((c: any) => {
        this.getArticulo(this.codigo);
      }
      );
  }

  displayFechaOption(option?: any)
  {
    if(option != undefined)
    {
      const fecha = new Date(option.match(/\d+/)[0] * 1);
      return fecha.getUTCFullYear() + '/' + (fecha.getUTCMonth() + 1) + '/' + fecha.getUTCDate() ;
    }
    else{
      return '';
    }

  }


  formatNombreFantasia(value: any) {
    if (value != null && value != '') {
      return '(' + value + ')';
    }
    return '';
  }

  validarEstados()
  {
    if(this.estadoPedido == PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PEDIDO, EstadosPedido.PENDIENTE) )
    {
      this.pedidosCerrado = true;
      if(this.tieneRolSaldoAFavor && this.saldoAFavor != 0 && this.saldoAFavor != null && this.estadoPedidoAnterior != PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PEDIDO, EstadosPedido.PENDIENTE) )
      {
        this.totalPrecio += this.saldoAFavorOriginal;
        this.estadoPedidoAnterior == PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PEDIDO, EstadosPedido.PENDIENTE)
      }

    }
    if(this.estadoPedido == PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PEDIDO, EstadosPedido.ANULADO))
    {
      this.pedidoActivo = true;
      this.pedidoPendiente = true;
      this.pedidosCerrado = true;
      if(this.tieneRolSaldoAFavor && this.saldoAFavor != 0 && this.saldoAFavor != null)
      {
        this.totalPrecio += this.saldoAFavor;
      }
    }
    if(this.estadoPedido == PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PEDIDO, EstadosPedido.CERRADO))
    {
      this.pedidoActivo = true;
      this.pedidoPendiente = true;
      this.pedidoAnulado = true;
    }
    if(this.estadoPedido == PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PEDIDO, EstadosPedido.CERRADO))
    {
      this.pedidoActivo = false;
      this.pedidoPendiente = false;
      this.pedidoAnulado = false;
      this.pedidosCerrado = false;
    }
    if(this.estadoPedido == PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PEDIDO, EstadosPedido.ACTIVO))
    {
       if(this.tieneRolSaldoAFavor && this.saldoAFavor != 0 && this.saldoAFavor != null && this.estadoPedidoAnterior == PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PEDIDO, EstadosPedido.PENDIENTE))
       {
          this.estadoPedidoAnterior = this.estadoPedido;
          this.totalPrecio -= this.saldoAFavorOriginal;
          //for (const item of this.listaArticulo) {
           // this.totalPrecio += (item.PrecioUnidad.toFixed(2) * item.Cantidad);
          //}
       }
    }
    if(this.fatman)
    {
      /* if(this.estadoPedido != this.estadoPedidoPendiente)
      {
        for (const item of this.listaArticulo)
        {
          this.totalPrecio -= item.PrecioFinal;
          item.PrecioUnidad = item.PrecioUnidad * this.cotizacionDolar;
          item.PrecioFinal = item.PrecioUnidad * item.Cantidad;

           this.totalPrecio += item.PrecioFinal;

          this.rentabilidadPC += item.PrecioCosto * item.Cantidad;
        }
      }
      else
      { */
        for (const item of this.listaArticulo)
        {
          if(this.aumentoListaNombre == "Lista Costo" || this.aumentoListaNombre == "Lista 1" || this.aumentoListaNombre == "Lista 2" ||
           this.aumentoListaNombre == "Lista 3" || this.aumentoListaNombre == "Lista 4" || this.aumentoListaNombre == "Lista 5" ||
            this.aumentoListaNombre == "Lista 6" || this.aumentoListaNombre == "Lista Ofertas"
            || this.aumentoListaNombre == "Lista 7" || this.aumentoListaNombre == "Lista 8" || this.aumentoListaNombre == "Lista 9")
          {
            if(this.aumentoListaNombre == "Lista Costo")
            {
              item.PrecioUnidad = item.PrecioCosto;
            }
            if(this.aumentoListaNombre == "Lista 1")
            {
              item.PrecioUnidad = item.Precio1;
            }
            if(this.aumentoListaNombre == "Lista 2")
            {
              item.PrecioUnidad = item.Precio2;
            }
            if(this.aumentoListaNombre == "Lista 3")
            {
              item.PrecioUnidad = item.Precio3;
            }
            if(this.aumentoListaNombre == "Lista 4")
            {
              item.PrecioUnidad = item.Precio4;
            }
            if(this.aumentoListaNombre == "Lista 5")
            {
              item.PrecioUnidad = item.Precio5;
            }
            if(this.aumentoListaNombre == "Lista 6")
            {
              item.PrecioUnidad = item.Precio6;
            }
            if(this.aumentoListaNombre == "Lista Ofertas")
            {
              item.PrecioUnidad = item.PrecioXBulto;
            }
            if(this.aumentoListaNombre == "Lista 7")
            {
              item.PrecioUnidad = item.Precio7;
            }
            if(this.aumentoListaNombre == "Lista 8")
            {
              item.PrecioUnidad = item.Precio8;
            }
            if(this.aumentoListaNombre == "Lista 9")
            {
              item.PrecioUnidad = item.Precio9;
            }
          }
          else{
            item.PrecioUnidad = item.PrecioBase;
          }
          this.totalPrecio -= item.PrecioFinal;
          item.PrecioFinal = item.PrecioUnidad * item.Cantidad;
          this.calcTotal += item.PrecioUnidad * item.Cantidad;
          this.totalPrecio += item.PrecioFinal;
          this.rentabilidadPC += item.PrecioCosto * item.Cantidad;
        }
      //}
    }


  }
  calcularVuelto() {
    if (this.pagoCantidad > this.totalPrecio && this.totalPrecio > 0) {
      this.vuelto = this.pagoCantidad - this.totalPrecio;
    } else {
      this.vuelto = 0;
    }
  }

  calcularResto() {
    this.restoApagarPagoParcial = this.saldoPagoParcial();
    if(this.restoApagarPagoParcial < 0 && this.tieneRolSaldoAFavor)
    {
      this.saldoAFavor = this.restoApagarPagoParcial * -1;

      if(((this.pagoParcial + this.pagoParcial2) > this.totalPrecio  && this.estadoPago == this.estadoPagoParcial) || this.restoApagarPagoParcial < 0)
      {
        this.estadoPago = PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PAGO, EstadosPago.TOTAL);
      }
      this.flagPPMayor = true;
    }
    if(this.restoApagarPagoParcial > 0 && this.tieneRolSaldoAFavor && this.saldoAFavor != 0 &&  0 < this.totalPrecio)
    {
      this.estadoPago = PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PAGO, EstadosPago.PENDIENTE);
    }
    if(this.restoApagarPagoParcial == 0 && this.formaPago != PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.FORMA_PAGO, EstadosPago.CTA_CTE))
    {
      this.estadoPago = PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PAGO, EstadosPago.TOTAL);
    }


  }

  saldoPagoParcial() {
    let saldo = this.calcularDescuentoResto() + this.totalPrecio - (this.montoTotalEdit + this.pagoParcial + this.pagoParcial2);
    return saldo;
  }
  pagoParcialValido(): boolean {
    if(this.tieneRolSaldoAFavor)
    {
      return this.pagoParcial > 0 && this.saldoPagoParcial() >= 0;
    }
    else
    {
      return this.pagoParcial > 0 && this.saldoPagoParcial() >= 0 && this.pagoParcial <= this.totalPrecio ;
    }
  }

  pagoParcialValido2(): boolean {
    if(this.tieneRolSaldoAFavor)
    {
      return this.pagoParcial2 > 0 && this.saldoPagoParcial() >= 0;
    }
    else
    {
      return this.pagoParcial2 > 0 && this.saldoPagoParcial() >= 0 && this.pagoParcial2 <= this.totalPrecio ;
    }
  }

  especModal(value: any) {
    const dialogRef = this.dialog.open(EspecificacionModalComponent, {
      width: '450px', data: { especificacion: value },
    });
  }

  descModal(value: any) {
    const dialogRef2 = this.dialog.open(DescripcionModalComponent, {
      width: '450px', data: {item: value,
      idArticulo:value.Id,
      idClienteNegotis: this.idClienteNegotis,
      descripcion: value.Descripcion
      },
    });

    dialogRef2.afterClosed();
  }


  obsModal(value: any) {
    const dialogRef2 = this.dialog.open(ObservacionModalComponent, {
      width: '450px', data: {item: value,
        idPedido: this.idPedido
      },
    });

    dialogRef2.afterClosed().subscribe(result => {

      for (const item of this.listaArticulo) {

        if(item.Id == value.Id)
        {
          item.Observacion = result;

        }

      }



     });


  }



  getSucursalVendedor(value: any) {
    if (this.idPedido == 0) {
      this.idSucursalVendedor = value.Sucursal.Id;
    }
  }

  private _filterRazonSocial(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.infoGeneral.Clientes.filter((item: any) => item.RazonSocial.toLowerCase().includes(filterValue.toLowerCase()) || (item.NombreFantasia != null && item.NombreFantasia.toLowerCase().includes(filterValue.toLowerCase())));
  }

  @HostListener('window:keyup', ['$event'])
  focusCodigo(event: any) {
    if (event.keyCode === 113) {
      this.codigoInput.nativeElement.focus();
    }
    if (event.keyCode === 115) {
      this.pagoClienteInput.nativeElement.focus();
    }
    if (event.keyCode === 117) {
      this.vueltoClienteInput.nativeElement.focus();
    }
    if (event.keyCode === 45 && this.primerInput == false) {
      this.primerInput = true;
      const el: HTMLElement = this.submitForm.nativeElement as HTMLElement;
      el.click();
    }
    if (event.keyCode === 119){
      if(this.pesable == true){
        this.pesable = false;
      }else
      {
        this.pesable = true;
      }

    }
    if (event.keyCode === 120 && this.primerInput == false)
    {
      this.primerInput = true;
      this.onSubmit(this.myForm.value);
    }
  }

  selectFormaPago() {
    if (this.formaPago === this.formaPagoCtaCte) {
      this.estadoPago = PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PAGO, EstadosPago.PENDIENTE);
      this.onlyPendiente = true;
      this.noPendiente = null;
      this.parcialActivado = true;
    }/*else{
      this.onlyPendiente=null;
    } */
    if ((this.formaPago === PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.FORMA_PAGO, FormasPago.EFECTIVO) ||
      this.formaPago === PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.FORMA_PAGO, FormasPago.TARJETA)
      || this.formaPago === PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.FORMA_PAGO, FormasPago.MERCADO_PAGO) ||
      this.formaPago === PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.FORMA_PAGO, FormasPago.TRANSFERENCIA_BANCARIA) ||
      this.formaPago === PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.FORMA_PAGO, FormasPago.ECHECK)  ||
      this.formaPago === PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.FORMA_PAGO, FormasPago.CHEQUE) ) &&
      this.estadoPago !== PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PAGO, EstadosPago.PARCIAL)) {
      this.onlyPendiente = null;
      this.parcialActivado = null;
      this.noPendiente = true;
      this.estadoPago = PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PAGO, EstadosPago.TOTAL);
    }
/*     if(this.pedidoById !== undefined){
      if(this.pedidoById.LastPedidoPago.CodigoEstadoPago === PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PAGO, EstadosPago.TOTAL))
        {
      this.parcialActivado = true;

        }
      } */

    }
  async getCliente(value: any) {
    this.rentabilidad = 0;
    const loading = this.generalServ.loadingModal();
    const dataUser = { 'idCliente': value.Id, 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
    this.sucursalServ.getSucursalesByUsuario(dataUser)
      .subscribe(data => {
        this.clienteSucursales = data;

        this.seleccionarPrimeraSucursalCliente();

        loading.close();
      }, error => { console.log(error); loading.close(); });
    this.idCliente = value.Id;
    this.sesionesTratamiento = value.CantidadSesionesTratamiento;
    this.sesionesRealizadas = value.CantidadSesionesRealizadas;
    this.sesionesTotales = value.CantidadSesionesTotales;
    this.distancia = value.Distancia;
    this.telefonoCliente = value.Telefono;
    this.cuitCliente = value.CUIT;
    const dataUser2 = { 'idUser': value.Vendedor, 'idClienteNegotis': localStorage.getItem('idClienteNegotis'), 'id': "undefined", 'empleado':true };
    this.userServ.getUserById(dataUser2)
    .subscribe((data: any) => {

    this.vendedorNombres = data.User.Nombres;
    this.idVendedor = data.User.Id;
    });
    if(this.tieneRolSaldoAFavor)
    {
      if( this.saldoAFavor != null && this.saldoAFavor != 0)
      {
        this.totalPrecio += this.saldoAFavor;
        this.saldoAFavor = value.SaldoAFavor;
      }
      this.saldoAFavor = value.SaldoAFavor;
      this.saldoAFavorOriginal = this.saldoAFavor;

      if(this.saldoAFavor != 0)
      {
        this.totalPrecio -= this.saldoAFavor;
      }
    }


    this.calcularFormaPago(value);

    if (value.RazonSocial == 'Mostrador' && value.ListaPrecios == null) {
      this.aumentoLista = 0;
      this.activaListaAumento = false;
    } else {
      this.aumentoListaAnterior =  Number(this.aumentoLista);
      this.aumentoLista = Number(value.ListaPrecios.PorcentajeAumento);
      this.aumentoListaNombre = value.ListaPrecios.Nombre;
      this.listaNombres  = value.ListaPrecios.Nombre;
      this.listaprecioID = value.ListaPrecios.Id;
      this.activaListaAumento = value.ListaPrecios.Activo;
      if(this.tieneRolEntregado)
      {
        this.estadoEntrega = PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_ENTREGA, EstadosEntrega.ENTREGADO);
      }
      else
      {
        this.estadoEntrega = PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_ENTREGA, EstadosEntrega.PENDIENTE);
      }

    }
    if (this.listaArticulo.length > 0) {
      for (const item of this.listaArticulo) {

          this.totalPrecio = this.totalPrecio - item.PrecioFinal;
          if(item.PrecioUnidad == item.PrecioBase)
        {
          item.PrecioUnidad = (((Number(this.aumentoLista) * Number(item.PrecioBase)) / 100) + Number(item.PrecioBase));
          if (this.iva == true) {
            item.Iva = Math.round((21 * item.PrecioUnidad) / 100).toFixed(2);
            item.PrecioUnidad = item.PrecioUnidad + item.Iva;
          }
        }
        else if(!this.tieneRolEditarPrecios)
        {
          item.PrecioUnidad = (((Number(this.aumentoLista) * Number(item.PrecioBase)) / 100) + Number(item.PrecioBase));
          if (this.iva == true) {
            item.Iva = Math.round((21 * item.PrecioUnidad) / 100).toFixed(2);
            item.PrecioUnidad = item.PrecioUnidad + item.Iva;
          }
        }
        if(item.PrecioUnidad != item.PrecioBase)
        {
          this. dataArt = {
            'codigo': item.CodigoDeBarras,
            'idArticulo': item.Id,
            'idSucursal': this.idSucursalVendedor,
            'idClienteNegotis': localStorage.getItem('idClienteNegotis')
        };

        let result = await this.articuloServ.getArticuloByCodigo(this.dataArt).toPromise();
        this.baseSinAumento = result;

        if(this.idPedido == null)
        {
          item.PrecioUnidad =  (((Number(this.aumentoLista) * Number(this.baseSinAumento.Articulo.PrecioBase)) / 100) + Number(this.baseSinAumento.Articulo.PrecioBase));
        }


/*         if(this.comboOferta &&  item.CantidadPorPack > 0 && item.PrecioXBulto > 0 && item.Cantidad >= item.CantidadPorPack )
        {
          item.PrecioUnidad = item.PrecioXBulto;
        } */
        }
        if(this.aumentoListaNombre == "Lista Costo" || this.aumentoListaNombre == "Lista 1" || this.aumentoListaNombre == "Lista 2" ||
           this.aumentoListaNombre == "Lista 3" || this.aumentoListaNombre == "Lista 4" || this.aumentoListaNombre == "Lista 5" ||
            this.aumentoListaNombre == "Lista 6" || this.aumentoListaNombre == "Lista Ofertas"
            || this.aumentoListaNombre == "Lista 7" || this.aumentoListaNombre == "Lista 8" || this.aumentoListaNombre == "Lista 9")
          {
            if(this.aumentoListaNombre == "Lista Costo")
            {
              item.PrecioUnidad = item.PrecioCosto;
            }
            if(this.aumentoListaNombre == "Lista 1")
            {
              item.PrecioUnidad = item.Precio1;
            }
            if(this.aumentoListaNombre == "Lista 2")
            {
              item.PrecioUnidad = item.Precio2;
            }
            if(this.aumentoListaNombre == "Lista 3")
            {
              item.PrecioUnidad = item.Precio3;
            }
            if(this.aumentoListaNombre == "Lista 4")
            {
              item.PrecioUnidad = item.Precio4;
            }
            if(this.aumentoListaNombre == "Lista 5")
            {
              item.PrecioUnidad = item.Precio5;
            }
            if(this.aumentoListaNombre == "Lista 6")
            {
              item.PrecioUnidad = item.Precio6;
            }
            if(this.aumentoListaNombre == "Lista Ofertas")
            {
              item.PrecioUnidad = item.PrecioXBulto;
            }
            if(this.aumentoListaNombre == "Lista 7")
            {
              item.PrecioUnidad = item.Precio7;
            }
            if(this.aumentoListaNombre == "Lista 8")
            {
              item.PrecioUnidad = item.Precio8;
            }
            if(this.aumentoListaNombre == "Lista 9")
            {
              item.PrecioUnidad = item.Precio9;
            }
          }

        /* else if(this.fatman && this.estadoPedido != this.estadoPedidoPendiente)
        {
          item.PrecioUnidad = item.PrecioUnidad * this.cotizacionDolar;
        } */


        if(this.porcentajeTarjetas)
        {
          if(this.porcentajeTarjeta != null && this.porcentajeTarjeta != 0)
          {
            item.PrecioUnidad =  item.PrecioUnidad + ( item.PrecioUnidad * this.porcentajeTarjeta)/100;
          }
        }

        if(this.idPedido == null || this.idPedido == 0)
        {
          item.PrecioFinal = item.PrecioUnidad * item.Cantidad;
        }
        this.rentabilidadPC= this.rentabilidadPC + (item.PrecioCosto * item.Cantidad);
        this.totalPrecio = this.totalPrecio + item.PrecioFinal;
        this.rentabilidad = this.rentabilidad + (item.PrecioFinal - item.PrecioCosto);

      }
      this.porcentajeRentabilidad = ((this.totalPrecio - this.rentabilidadPC) / this.rentabilidadPC) * 100;
      this.calcularVuelto();
      this.calcularResto();

    }
    loading.close();
  }
  calcularFormaPago(value: any) {
/*     if (value.RazonSocial === 'Mostrador') {
      this.formaPago = PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.FORMA_PAGO, FormasPago.EFECTIVO);
    } else { */
      this.formaPago = this.formaPagoCtaCte;
/*     } */

    this.selectFormaPago();
  }


  seleccionarPrimeraSucursalCliente() {

    if (this.clienteSucursales != null &&
      this.clienteSucursales.ListSucursal != null &&
      this.clienteSucursales.ListSucursal.length > 0) {
      this.idSucursalCliente = this.clienteSucursales.ListSucursal[0].Id;
    }

  }

  ivaFunc(value: any) {
    this.iva = value.target.checked;
    if (this.listaArticulo.length > 0) {
      for (const item of this.listaArticulo) {
        this.totalPrecio = this.totalPrecio - item.PrecioFinal;

        if (this.iva == true) {
          if (item.Iva == null) {
            item.Iva = Math.round((21 * item.PrecioUnidad) / 100).toFixed(2);
          }
          item.PrecioUnidad = item.PrecioUnidad + item.Iva;
          item.PrecioFinal = item.PrecioUnidad * item.Cantidad;
        } else {
          if (item.Iva == null) {
            item.Iva = 0;
          }
          item.PrecioUnidad = item.PrecioUnidad - item.Iva;
          item.PrecioFinal = item.PrecioUnidad * item.Cantidad;
        }
        this.totalPrecio = this.totalPrecio + item.PrecioFinal;
      }
      this.calcularResto();
    }
  }



  resetCliente() {
    this.idCliente = null;
    this.idSucursalCliente = '';
  }

  datePicker() {
    this.runDatePicker().subscribe(result => this.fechaEntrega = this.getDateAsString(result));
  }

  datePickerVencimiento() {
    this.runDatePicker().subscribe(result => this.fechaVencimiento = this.getDateAsString(result));
  }

  cambiarAumentoResto(value?: any) {
    this.guardarAumentoResto = true;

    this.calcularVuelto();
    this.calcularResto();
  }

  calcularDescuentoResto(): any {
    if (this.restoApagarPagoParcialEdit > 0) {
      return ((Number(this.aumentoResto) * Number(this.restoApagarPagoParcialEdit)) / 100) + this.montoTotalDescuentoAumentoResto;
    }

    return 0 + this.montoTotalDescuentoAumentoResto;
  }
  calcularDescuentoResto2(): any {
    if (this.restoApagarPagoParcialEdit2 > 0) {
      return ((Number(this.aumentoResto) * Number(this.restoApagarPagoParcialEdit2)) / 100) + this.montoTotalDescuentoAumentoResto;
    }

    return 0 + this.montoTotalDescuentoAumentoResto;
  }

  cambiarAumnetoList(value: any) {
    this.guardarAumentoLista = null;
    if (this.aumentoLista == null) {
      this.aumentoLista = 0;
    } else {
      this.aumentoLista = value;
    }
    if (this.listaArticulo.length > 0) {
      for (const item of this.listaArticulo) {
        this.totalPrecio = this.totalPrecio - item.PrecioFinal;
        item.PrecioUnidad = (((Number(this.aumentoLista) * Number(item.PrecioBase)) / 100) + Number(item.PrecioBase));
        if (this.iva == true) {
          item.Iva = Math.round((21 * item.PrecioUnidad) / 100).toFixed(2);
          item.PrecioUnidad = item.PrecioUnidad + item.Iva;
        }
        item.PrecioFinal = item.PrecioUnidad * item.Cantidad;

        this.totalPrecio = this.totalPrecio + item.PrecioFinal;
      }
      this.calcularVuelto();
      this.calcularResto();
    }
  }

  async cambiarLista(value: any) {
/*     this. dataArt = {
      'idListaPrecios':Number(value.Id),
      'idClienteNegotis': localStorage.getItem('idClienteNegotis')
  }; */

   //this.aumentoListaCambio = await this.listaPrecServ.ListaPreciosById(this.dataArt).toPromise();

    this.listaprecioID = value.Id;
    this.aumentoListaNombre = value.Nombre;
    this.aumentoLista = value.PorcentajeAumento;
    this.myForm.value.aumentoLista = 0;
    this.myForm.value.aumentoListaMonto = 0;
    if (this.listaArticulo.length > 0) {
      for (const item of this.listaArticulo) {
        this.totalPrecio = this.totalPrecio - item.PrecioFinal;
        item.PrecioUnidad = (((Number(value.PorcentajeAumento) * Number(item.PrecioBase)) / 100) + Number(item.PrecioBase));
        if (this.iva == true) {
          item.Iva = Math.round((21 * item.PrecioUnidad) / 100).toFixed(2);
          item.PrecioUnidad = item.PrecioUnidad + item.Iva;
        }

        if(value.Nombre == "Lista Costo")
        {
          item.PrecioUnidad = item.PrecioCosto;
        }
        if(value.Nombre == "Lista 1")
        {
          item.PrecioUnidad = item.Precio1;
        }
        if(value.Nombre == "Lista 2")
        {
          item.PrecioUnidad = item.Precio2;
        }
        if(value.Nombre == "Lista 3")
        {
          item.PrecioUnidad = item.Precio3;
        }
        if(value.Nombre == "Lista 4")
        {
          item.PrecioUnidad = item.Precio4;
        }
        if(value.Nombre == "Lista 5")
        {
          item.PrecioUnidad = item.Precio5;
        }
        if(value.Nombre == "Lista 6")
        {
          item.PrecioUnidad = item.Precio6;
        }
        if(value.Nombre == "Lista Ofertas")
        {
          item.PrecioUnidad = item.PrecioXBulto;
        }
        if(this.aumentoListaNombre == "Lista 7")
            {
              item.PrecioUnidad = item.Precio7;
            }
        if(this.aumentoListaNombre == "Lista 8")
          {
            item.PrecioUnidad = item.Precio8;
          }
        if(this.aumentoListaNombre == "Lista 9")
           {
             item.PrecioUnidad = item.Precio9;
           }


        item.PrecioFinal = item.PrecioUnidad * item.Cantidad;

        this.totalPrecio = this.totalPrecio + item.PrecioFinal;
      }
      this.calcularVuelto();
      this.calcularResto();
    }
  }

  cambiarAumnetoListMonto(value: any) {
    this.guardarAumentoListaMonto = null;
    if (this.aumentoListaMonto == null) {
      this.aumentoListaMonto = 0;
    } else {
      if (this.aumentoListaMontoAnterior > 0) {
        this.totalPrecio += this.aumentoListaMontoAnterior;
      } else {
        this.totalPrecio += (this.aumentoListaMontoAnterior);
      }
      this.aumentoListaMontoAnterior = this.aumentoListaMonto;
    }
      this.totalPrecio -= this.aumentoListaMonto;

      this.calcularVuelto();
      this.calcularResto();
  }
  cambiarAumentoListPorcentaje(value: any) {
    this.guardarAumentoListaPorcentaje = null;
    if (this.aumentoListaPorcentaje == null) {
      this.aumentoListaPorcentaje = 0;
    } else {
      if (this.aumentoListaPorcentajeAnterior > 0) {
        if(this.totalPrecioOriginal == 0)
        {
          this.totalPrecio = this.totalPrecio + (this.totalPrecioAnterior*this.aumentoListaPorcentajeAnterior)/100;
        }
        else{
          if(value == 0)
          {
            this.totalPrecio = this.totalPrecioOriginal;
          }
          else{
            if(this.flagDto == false && this.idPedido != null && this.totalPrecioAnteriorRecalculado == false)
            {
              if(this.totalPrecioAnterior == 0 && this.totalPrecioAnteriorRecalculado == false)
              {
                for (const item of this.listaArticulo)
                {
                  this.totalPrecioAnterior += item.PrecioFinal;
                }

              }
              this.totalPrecio = this.totalPrecioAnterior;
              this.totalPrecioAnteriorRecalculado = true;
            }
            else if(this.flagDto == false)
            {
              if(this.totalPrecioAnterior == 0)
              {
                this.totalPrecio = this.totalPrecioOriginal;
              }
              else{
                this.totalPrecio = this.totalPrecio + (this.totalPrecioAnterior*this.aumentoListaPorcentajeAnterior)/100;
              }

            }
          }

        }

      } else {
        if(this.totalPrecioOriginal == 0)
        {
          this.totalPrecio = this.totalPrecio + (this.totalPrecioAnterior*this.aumentoListaPorcentajeAnterior)/100;
        }
        else{
          if(value == 0)
          {
            this.totalPrecio = this.totalPrecioOriginal;
          }
          else{
            if(this.flagDto == false && this.idPedido != null && this.totalPrecioAnteriorRecalculado == false)
            {
              if(this.totalPrecioAnterior == 0 && this.totalPrecioAnteriorRecalculado == false)
              {
                for (const item of this.listaArticulo)
                {
                  this.totalPrecioAnterior += item.PrecioFinal;
                }

              }
              this.totalPrecio = this.totalPrecioAnterior;
              this.totalPrecioAnteriorRecalculado = true;
            }
            else if(this.flagDto == false)
            {
              if(this.totalPrecioAnterior == 0)
              {
                this.totalPrecio = this.totalPrecioOriginal;
              }
              else{
                this.totalPrecio = this.totalPrecio + (this.totalPrecioAnterior*this.aumentoListaPorcentajeAnterior)/100;
              }

            }

          }
        }
      }
      this.aumentoListaPorcentajeAnterior = this.aumentoListaPorcentaje;
      this.totalPrecioAnterior =this.totalPrecio;
      if(this.totalPrecioOriginal == 0)
      {
        this.totalPrecioOriginal = this.totalPrecio;
      }
    }
      this.totalPrecio -= (this.totalPrecio*this.aumentoListaPorcentaje)/100;
      if(this.flagDto)
      {
        this.flagDto = false;
      }
      this.calcularVuelto();
      this.calcularResto();
  }

  aumentoListaGuardar() {
    this.guardarAumentoLista = true;
  }

  aumentoListaMontoGuardar() {
    this.guardarAumentoListaMonto = true;
  }
  aumentoListaPorcentajeGuardar() {
    this.guardarAumentoListaPorcentaje = true;
  }

  agregarArticuloPorNombre() {
    const dialogRef = this.dialog.open(AgregararticuloModalComponent, {
      data: {
        'idSucursalVendedor': this.idSucursalVendedor,
        'aumentoLista': this.aumentoLista,
        'pageCarga': this.pageCarga,
        'filtroCarga': this.filtroCarga,
        'nombreAumentoLista': this.aumentoListaNombre,
        'idLista': this.listaprecioID
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.articuloCBDefault = result.idArticulo;
        this.getArticulo(result.codigo);

        this.pageCarga=result.page;
        this.filtroCarga=result.filtroCarga;
      }

    });
  }

  pesableClick(value: any) {
    this.pesable = value.target.checked;
    this.codigoInput.nativeElement.focus();
  }
  qrClick(value: any) {
    this.codigoQR = value.target.checked;
    this.codigoInput.nativeElement.focus();
  }
  ivaClick(value: any) {
    this.ivaCheck = value.target.checked;
  }
  entregasClick(value: any) {
    this.entregasCheck = value.target.checked;
  }
  getArticulo(value: any) {
    this.codigoArticulo;
    this.pesoArticulo;
    let codigoArt;



      if ( value == null || value.target == null) { codigoArt = value; } else { codigoArt = value.target.value; }
      if(this.pesable != true)
      {
        this. dataArt =
        {
          'codigo': codigoArt,
          'idArticulo': this.articuloCBDefault,
          'idSucursal': this.idSucursalVendedor,
          'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
          'qr':this.codigoQR,
          'estadoPedido': this.estadoPedido
        };
      }
      else
      {
        this.codigoArticulo=codigoArt.slice(2,6)
        let pesoMayor = codigoArt.slice(7,8)
        this.pesoArticulo=codigoArt.slice(8,12)
        if(pesoMayor != 0)
        {
          this.pesoArticulo=codigoArt.slice(7,12)
        }
         this.dataArt = {
          'codigo': this.codigoArticulo,
          'idSucursal': this.idSucursalVendedor,
          'idClienteNegotis': localStorage.getItem('idClienteNegotis')
        };
      }
      this.articuloServ.getArticuloByCodigo(this.dataArt).subscribe(async data => {
        this.getArtCant = data;
        if (this.getArtCant.Articulo != null) {
          const loading = this.generalServ.loadingModal();
          this.getArtByPost = this.getArtCant.Articulo;



           if(this.tieneRolProduccion)
          {
            const dataUser = { 'idArticulo':this.getArtCant.Articulo.Id, 'idSucursal':this.idSucursalVendedor, 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
            let result = await this.articuloServ.getCantidadArticuloMPById(dataUser).toPromise();
            this.getMPCant = result;
          }
             /*  for (const item of this.getMPCant)
              {
                const dataMP = { 'idMateriaPrima':item.MateriaPrima.Id, 'idSucursal':this.idSucursalVendedor};
                let result2 = await this.mpServ.getMPCantById(dataMP).toPromise()

                  this.MPCantidad = result2;
                  if(this.limitarStockMP && item.CantidadArticulo > this.MPCantidad.CantidadArticulo )
                  {
                    var stockMP = this.MPCantidad.CantidadArticulo;
                    const modalCantidad = this.dialog.open(ArticulosincantidadModalComponent,
                      {
                        width: '450px',data
                      });
                      loading.close();
                      return null;
                  }
                  else
                  {
                    this.MPCantidad.CantidadArticulo -= item.CantidadArticulo;
                    let data4= {
                      'idMateriaPrima': item.IdMateriaPrima, 'idSucursal': this.idSucursalVendedor,
                      'cantidadMP': this.MPCantidad.CantidadArticulo, 'idClienteNegotis' : localStorage.getItem('idClienteNegotis')
                    };
                    this.mpServ.guardarCantidadMP(data4).subscribe(datas => {

                     }, error => { console.log(error);});
                  }

            }

          }


          if(this.tieneRolCombo)
          {
              const dataUser = { 'idArticulo':this.getArtCant.Articulo.Id, 'idSucursal':this.idSucursalVendedor, 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
             let result = await this.articuloServ.getCantidadArticuloComboById(dataUser).toPromise();
              this.getComboCant = result;

              for (const item of this.getComboCant)
              {
                const dataMP = { 'codigo': item.ArticuloCombo.CodigoDeBarras, 'idArticulo':item.ArticuloCombo.Id, 'idSucursal':this.idSucursalVendedor, 'IdClienteNegotis':localStorage.getItem('idClienteNegotis')};
                let result2 = await this.articuloServ.getArticuloByCodigo(dataMP).toPromise()
                  this.ComboCantidad = result2;
                  if( this.tieneRolVenderConStock && item.CantidadArticulo > this.ComboCantidad.CantidadArticulo )
                  {
                    var stockCombo = this.ComboCantidad.CantidadArticulo;
                    const modalCantidad = this.dialog.open(ArticulosincantidadModalComponent,
                      {
                        width: '450px',data
                      });
                      loading.close();
                      return null;
                  }
                  else
                  {
                    this.ComboCantidad.CantidadArticulo -= item.CantidadArticulo;
                    let data4= {
                      'idArticulo': item.IdArticuloCombo, 'idSucursal': this.idSucursalVendedor,
                      'cantidadArticulo': this.ComboCantidad.CantidadArticulo, 'idClienteNegotis' : localStorage.getItem('idClienteNegotis')
                    };
                    this.articuloServ.guardarCantidadArticulo(data4).subscribe(datas => {

                     }, error => { console.log(error);});
                  }
            }
          } */
           // rol produccion y combo ambos se pueden mover al backend?|
          if((this.tieneRolVenderConStock==true) && ((Number(this.getArtCant.CantidadArticulo) <= 0) || (Number(this.getArtCant.CantidadArticulo)< this.stock)) || this.stock <=0 )
          {
                  this.asignado=false;
                   this.stockReal = this.listaArticulo.filter((x: any) => x.Id == this.getArtByPost.Id);

                  if (this.stockReal.Lenght > 0 && this.stockReal[0].Stock != null)
                  {
                    this.stock = this.stockReal[0].Stock;
                    this.asignado=true;
                  }
                  else
                  {
                    if(this.asignado != true)
                    {
                      this.stock=undefined;
                    }
                  }
              if (value.target != null)
              {
                value.target.value = null;
              }
              const modalCantidad = this.dialog.open(ArticulosincantidadModalComponent,
              {
                width: '450px', data
              });
              loading.close();
              return null;
          }
          else
          {
            if(this.getArtByPost.PrecioUnidad != 0 && this.getArtByPost.PrecioUnidad != undefined)
            {
              this.getArtByPost.PrecioUnidad = this.getArtByPost.PrecioUnidad;
            }
            else
            {
            this.getArtByPost.PrecioUnidad = ((Number(this.aumentoLista) * Number(this.getArtByPost.PrecioBase)) / 100) + Number(this.getArtByPost.PrecioBase);
            }
            if (this.iva == true)
            {
                this.getArtByPost.Iva = Math.round((21 * this.getArtByPost.PrecioUnidad) / 100).toFixed(2);
                this.getArtByPost.PrecioUnidad = this.getArtByPost.PrecioUnidad + this.getArtByPost.Iva;
            }
            this.getArtByPost.PrecioFinal = this.getArtByPost.PrecioUnidad;

            let existe = null;
            for (const item of this.listaArticulo)
            {
              if (item.Id == this.getArtByPost.Id)
              {
                if (item.Stock == null)
                {
                  item.Stock = Number(this.getArtCant.CantidadArticulo);
                }
                if(this.tieneRolControlEntregas)
                {
                  item.Entrega = item.Cantidad;
                  item.Pendiente = item.Cantidad;
                }


                if(this.esNotaCredito || this.esNotaCredito == "true")
                {
                  item.Stock++;
                }
                else
                {
                  item.Stock--;
                }


              existe = true;
              if(this.pesable)
              {
                if(item.Cantidad == undefined)
                {item.Cantidad = 0;}
                item.Cantidad = (Number(item.Cantidad) + +(Math.round(this.pesoArticulo) / 1000).toFixed(2));
              }
              else
              {
                item.Cantidad++;
              }

              if (this.idPedido == 0)
              {
                item.PrecioFinal = this.getArtByPost.PrecioFinal * item.Cantidad;

                this.totalPesable= this.getArtByPost.PrecioFinal * item.Cantidad;
                this.codigoAnterior=this.dataArt.codigo;
                if(this.comboOferta &&  item.CantidadPorPack > 0 && item.PrecioXBulto > 0 && item.Cantidad >= item.CantidadPorPack )
                {
                  this.totalPrecio -= Number(item.PrecioUnidad * (item.Cantidad-1));
                  item.PrecioUnidad = item.PrecioXBulto;
                  item.PrecioFinal = item.PrecioUnidad * item.Cantidad;
                  this.getArtByPost.Cantidad = item.Cantidad;
                }
                if(this.aumentoListaNombre == "Lista Costo" || this.aumentoListaNombre == "Lista 1" || this.aumentoListaNombre == "Lista 2" ||
           this.aumentoListaNombre == "Lista 3" || this.aumentoListaNombre == "Lista 4" || this.aumentoListaNombre == "Lista 5" ||
            this.aumentoListaNombre == "Lista 6" || this.aumentoListaNombre == "Lista Ofertas"
            || this.aumentoListaNombre == "Lista 7" || this.aumentoListaNombre == "Lista 8" || this.aumentoListaNombre == "Lista 9")
          {
            if(this.aumentoListaNombre == "Lista Costo")
            {
              item.PrecioUnidad = item.PrecioCosto;
            }
            if(this.aumentoListaNombre == "Lista 1")
            {
              item.PrecioUnidad = item.Precio1;
            }
            if(this.aumentoListaNombre == "Lista 2")
            {
              item.PrecioUnidad = item.Precio2;
            }
            if(this.aumentoListaNombre == "Lista 3")
            {
              item.PrecioUnidad = item.Precio3;
            }
            if(this.aumentoListaNombre == "Lista 4")
            {
              item.PrecioUnidad = item.Precio4;
            }
            if(this.aumentoListaNombre == "Lista 5")
            {
              item.PrecioUnidad = item.Precio5;
            }
            if(this.aumentoListaNombre == "Lista 6")
            {
              item.PrecioUnidad = item.Precio6;
            }
            if(this.aumentoListaNombre == "Lista Ofertas")
            {
              item.PrecioUnidad = item.PrecioXBulto;
            }
            if(this.aumentoListaNombre == "Lista 7")
            {
              item.PrecioUnidad = item.Precio7;
            }
            if(this.aumentoListaNombre == "Lista 8")
            {
              item.PrecioUnidad = item.Precio8;
            }
            if(this.aumentoListaNombre == "Lista 9")
            {
              item.PrecioUnidad = item.Precio9;
            }
          }
                if(this.porcentajeTarjeta != null &&this.porcentajeTarjetas)
                  {
                    if(this.porcentajeTarjeta != 0)
                    {
                      item.PrecioUnidad = item.PrecioUnidad + (item.PrecioUnidad * this.porcentajeTarjeta)/100;
                      item.PrecioFinal = item.PrecioUnidad * item.Cantidad;
                    }
                  }

              }
              else
              {
                if (item.AnteriorCantidad == null)
                {
                  item.AnteriorCantidad = 0;
                }
                if (item.AnteriorPrecioFinal == null)
                {
                  item.AnteriorPrecioFinal = 0;
                }
                item.PrecioFinal = Number(this.getArtByPost.PrecioFinal * (item.Cantidad - item.AnteriorCantidad));
                item.PrecioFinal = Number(item.PrecioFinal + item.AnteriorPrecioFinal);
                item.PrecioBase = Number(this.getArtByPost.PrecioBase);

                if(this.comboOferta && item.CantidadPorPack > 0 && item.PrecioXBulto > 0 && item.Cantidad >= item.CantidadPorPack )
                {
                  item.PrecioUnidad = item.PrecioXBulto;
                  item.PrecioFinal = item.PrecioUnidad * item.Cantidad;
                  this.getArtByPost.Cantidad = item.Cantidad;
                }
              }
            }
          }

          if (existe != true)
          {
            if(this.pesable)
            {
              if(this.getArtByPost.Cantidad == undefined)
              {this.getArtByPost.Cantidad=0;}
              this.getArtByPost.Cantidad = Number(this.getArtByPost.Cantidad) + this.pesoArticulo;
              this.getArtByPost.Cantidad=(Math.round(this.getArtByPost.Cantidad) / 1000).toFixed(2);
              if(this.esNotaCredito == true || this.esNotaCredito == "true")
              {
                this.getArtByPost.Stock = Number(this.getArtCant.CantidadArticulo + this.getArtByPost.Cantidad).toFixed(2);
              }
              else
              {
                this.getArtByPost.Stock = Number(this.getArtCant.CantidadArticulo - this.getArtByPost.Cantidad).toFixed(2);
              }

              this.getArtByPost.PrecioFinal = this.getArtByPost.PrecioFinal * this.getArtByPost.Cantidad;
              this.totalPrecio = Number(this.totalPrecio + this.getArtByPost.PrecioFinal);
              this.rentabilidad = this.rentabilidad + (this.getArtByPost.PrecioFinal - this.getArtByPost.PrecioCosto);
              this.totalArticulos=(Number(this.totalArticulos) + +Number((Math.round(this.pesoArticulo) / 1000).toFixed(2)));
            }
            else
            {
              this.getArtByPost.Cantidad = 1;
              if(this.getArtByPost.Entrega == null)
              {
                this.getArtByPost.Entrega = 0;
              }
              this.getArtByPost.Pendiente = this.getArtByPost.Cantidad;
              if(this.comboOferta  && this.getArtByPost.CantidadPorPack > 0 && this.getArtByPost.PrecioXBulto > 0 && this.getArtByPost.Cantidad >= this.getArtByPost.CantidadPorPack)
              {
                this.getArtByPost.PrecioUnidad = this.getArtByPost.PrecioXBulto;
                this.getArtByPost.PrecioFinal = this.getArtByPost.PrecioUnidad * this.getArtByPost.Cantidad;
              }
              if(this.aumentoListaNombre == "Lista Costo" || this.aumentoListaNombre == "Lista 1" || this.aumentoListaNombre == "Lista 2" || this.aumentoListaNombre == "Lista 3" ||
               this.aumentoListaNombre == "Lista 4" || this.aumentoListaNombre == "Lista 5" || this.aumentoListaNombre == "Lista 6" ||
               this.aumentoListaNombre == "Lista Ofertas" || this.aumentoListaNombre == "Lista 7" || this.aumentoListaNombre == "Lista 8" || this.aumentoListaNombre == "Lista 9")
              {
                if(this.aumentoListaNombre == "Lista Costo")
                {
                  this.getArtByPost.PrecioUnidad = this.getArtByPost.PrecioCosto;
                  this.getArtByPost.PrecioFinal = this.getArtByPost.PrecioUnidad * this.getArtByPost.Cantidad;
                }
                if(this.aumentoListaNombre == "Lista 1")
                {
                  this.getArtByPost.PrecioUnidad = this.getArtByPost.Precio1;
                  this.getArtByPost.PrecioFinal = this.getArtByPost.PrecioUnidad * this.getArtByPost.Cantidad;
                }
                if(this.aumentoListaNombre == "Lista 2")
                {
                  this.getArtByPost.PrecioUnidad = this.getArtByPost.Precio2;
                  this.getArtByPost.PrecioFinal = this.getArtByPost.PrecioUnidad * this.getArtByPost.Cantidad;
                }
                if(this.aumentoListaNombre == "Lista 3")
                {
                  this.getArtByPost.PrecioUnidad = this.getArtByPost.Precio3;
                  this.getArtByPost.PrecioFinal = this.getArtByPost.PrecioUnidad * this.getArtByPost.Cantidad;
                }
                if(this.aumentoListaNombre == "Lista 4")
                {
                  this.getArtByPost.PrecioUnidad = this.getArtByPost.Precio4;
                  this.getArtByPost.PrecioFinal = this.getArtByPost.PrecioUnidad * this.getArtByPost.Cantidad;
                }
                if(this.aumentoListaNombre == "Lista 5")
                {
                  this.getArtByPost.PrecioUnidad = this.getArtByPost.Precio5;
                  this.getArtByPost.PrecioFinal = this.getArtByPost.PrecioUnidad * this.getArtByPost.Cantidad;
                }
                if(this.aumentoListaNombre == "Lista 6")
                {
                  this.getArtByPost.PrecioUnidad = this.getArtByPost.Precio6;
                  this.getArtByPost.PrecioFinal = this.getArtByPost.PrecioUnidad * this.getArtByPost.Cantidad;
                }
                if(this.aumentoListaNombre == "Lista Ofertas")
                {
                  this.getArtByPost.PrecioUnidad = this.getArtByPost.PrecioXBulto;
                  this.getArtByPost.PrecioFinal = this.getArtByPost.PrecioUnidad * this.getArtByPost.Cantidad;
                }
                if(this.aumentoListaNombre == "Lista 7")
                {
                  this.getArtByPost.PrecioUnidad = this.getArtByPost.Precio7;
                  this.getArtByPost.PrecioFinal = this.getArtByPost.PrecioUnidad * this.getArtByPost.Cantidad;
                }
                if(this.aumentoListaNombre == "Lista 8")
                {
                  this.getArtByPost.PrecioUnidad = this.getArtByPost.Precio8;
                  this.getArtByPost.PrecioFinal = this.getArtByPost.PrecioUnidad * this.getArtByPost.Cantidad;
                }
                if(this.aumentoListaNombre == "Lista 9")
                {
                  this.getArtByPost.PrecioUnidad = this.getArtByPost.Precio9;
                  this.getArtByPost.PrecioFinal = this.getArtByPost.PrecioUnidad * this.getArtByPost.Cantidad;
                }
              }

              if(this.porcentajeTarjetas)
                  {
                    if(this.porcentajeTarjeta != null && this.porcentajeTarjeta != 0)
                    {
                      this.getArtByPost.PrecioUnidad =  this.getArtByPost.PrecioUnidad + ( this.getArtByPost.PrecioUnidad * this.porcentajeTarjeta)/100;
                      this.getArtByPost.PrecioFinal = this.getArtByPost.PrecioUnidad * this.getArtByPost.Cantidad;
                    }
                  }


              if(this.esNotaCredito == true || this.esNotaCredito == "true")
              {
                this.getArtByPost.Stock = Number(this.getArtCant.CantidadArticulo + 1);
              }
              else
              {
                if(this.estadoPedido != 32)
                {
                  this.getArtByPost.Stock = Number(this.getArtCant.CantidadArticulo - 1);
                }
                else
                {
                  this.getArtByPost.Stock = Number(this.getArtCant.CantidadArticulo);
                }
              }
            }

            this.getArtByPost.DescuentoPorcentaje = 0;
            this.getArtByPost.DescuentoMonto = 0;
            this.getArtByPost.DescuentoPrecio = 0;
            this.listaArticulo.push(this.getArtByPost);
          }
          else
          {
            if(this.pesable)
            {
              if(this.codigoArticulo == this.codigoAnterior && this.listaArticulo.length <2)
              {
                this.totalPrecio =this.totalPesable;
                this.rentabilidad = this.rentabilidad + (this.getArtByPost.PrecioFinal - (this.getArtByPost.PrecioCosto * this.getArtByPost.Cantidad));
                this.totalArticulos=(Number(this.totalArticulos) + +Number((Math.round(this.pesoArticulo) / 1000).toFixed(2)));
              }
              else
              {
                let pesoArt:any;
                pesoArt=((Math.round(this.pesoArticulo) / 1000).toFixed(3));
                this.totalPrecio = Number(this.totalPrecio + (this.getArtByPost.PrecioFinal*pesoArt));
                this.rentabilidad = this.rentabilidad + (this.getArtByPost.PrecioFinal - (this.getArtByPost.PrecioCosto * pesoArt));
                this.totalArticulos=(Number(this.totalArticulos) + +Number((Math.round(this.pesoArticulo) / 1000).toFixed(2)));
              }
            }
          }
          }
          if(this.pesable != true)
          {
            if(this.comboOferta && this.getArtByPost.CantidadPorPack > 0 && this.getArtByPost.PrecioXBulto > 0 && this.getArtByPost.Cantidad >= this.getArtByPost.CantidadPorPack  )
            {
              this.getArtByPost.PrecioUnidad = this.getArtByPost.PrecioXBulto;
              this.getArtByPost.PrecioFinal = this.getArtByPost.PrecioUnidad * this.getArtByPost.Cantidad;
            }
            this.calcTotal = 0;
            this.stockReal = this.listaArticulo.filter((x: any) => x.Id == this.getArtByPost.Id);

            if(this.stockReal.Lenght > 0 && this.stockReal[0].PrecioUnidad != this.getArtByPost.PrecioUnidad && this.stockReal[0].PrecioUnidad != null)
                {
                  this.totalPrecio -= Number(this.stockReal[0].PrecioUnidad * (this.stockReal[0].Cantidad-1));
                  this.getArtByPost.PrecioFinal = this.stockReal[0].PrecioUnidad * this.stockReal[0].Cantidad;
                  this.stockReal[0].PrecioFinal = this.stockReal[0].PrecioUnidad * this.stockReal[0].Cantidad
                }
            /* for (const item of this.listaArticulo)
            {
              if(item.Id == this.getArtByPost.Id)
              {
                if(item.PrecioUnidad != this.getArtByPost.PrecioUnidad && item.PrecioUnidad != null)
                {
                  this.totalPrecio -= Number(item.PrecioUnidad * (item.Cantidad-1));
                  this.getArtByPost.PrecioFinal = item.PrecioUnidad * item.Cantidad;
                  item.PrecioFinal = item.PrecioUnidad * item.Cantidad
                }
              }
              this.calcTotal += item.PrecioUnidad * item.Cantidad;
            } */
            if(this.totalPrecio == null || this.totalPrecio == undefined)
            {
              this.totalPrecio = 0;
            }

              if(this.listaArticulo.length == 1)
              {
                this.totalPrecio =this.getArtByPost.PrecioUnidad * this.listaArticulo[0].Cantidad;
              }
              else
              {
                this.totalPrecio = Number(this.totalPrecio + this.getArtByPost.PrecioFinal);
              }

             if(this.saldoAFavor !=0)
             {
               this.totalPrecio -= this.saldoAFavor;
             }

            this.flagPrecioCambiado = false;
            if(this.totalPrecioAnterior == 0)
            {
              this.totalPrecioOriginal = this.totalPrecioOriginal+ this.getArtByPost.PrecioFinal;
            }
            this.rentabilidad = this.rentabilidad + (this.getArtByPost.PrecioFinal - this.getArtByPost.PrecioCosto);
            this.totalArticulos++;
          }
          if (this.codigo != null)
          {
            this.codigo = null;
          }
          if(this.aumentoListaPorcentajeAnterior != 0)
          {
            this.cambiarAumentoListPorcentaje(this.aumentoListaPorcentajeAnterior);
          }
          if(this.aumentoListaMontoAnterior != 0 )
          {
            this.cambiarAumnetoListMonto(this.aumentoListaMontoAnterior);
          }
          this.rentabilidadPC = 0;
          this.calcTotal = 0;
          //this.rentabilidadPC += this.getArtByPost.PrecioCosto * this.getArtByPost.Cantidad;

          if(this.recalculoUnidad)
          {
            for (const item of this.listaArticulo)
            {
              this.calcTotal += item.PrecioFinal;

              this.rentabilidadPC += item.PrecioCosto * item.Cantidad;
            }
          }
          else
          {
             for (const item of this.listaArticulo)
            {
              /* if(this.fatman && this.estadoPedido != this.estadoPedidoPendiente)
              {
                if(item.PrecioUnidad == item.PrecioBase * this.cotizacionDolar || (item.CantidadAnterior != null && item.CantidadAnterior != 1))
                {
                  item.PrecioUnidad = item.PrecioUnidad / this.cotizacionDolar;
                }
                item.PrecioUnidad = item.PrecioUnidad * this.cotizacionDolar;
                item.PrecioFinal = item.PrecioUnidad * item.Cantidad;
              } */
              this.calcTotal += item.PrecioUnidad * item.Cantidad;

              this.rentabilidadPC += item.PrecioCosto * item.Cantidad;
            }
          }

          if(this.calcTotal != this.totalPrecio)
          {
            this.totalPrecio = this.calcTotal;
          }


          this.porcentajeRentabilidad = ((this.totalPrecio - this.rentabilidadPC) / this.rentabilidadPC) * 100;
          if(this.saldoAFavor != null && this.saldoAFavor != 0 && this.listaArticulo.length == 1)
          {
            this.totalPrecio -= this.saldoAFavor;
          }
          this.calcularVuelto();
          this.calcularResto();
          loading.close();
          return null;
        }
        else
        {
          if(this.getArtCant == false)
          {
            const modalCantidad = this.dialog.open(ArticulosincantidadModalComponent,
              {
                width: '450px',data
              });

              return null;
          }
        }
      }, error => { console.log(error); });

    }

  deleteArt(value: any) {
    const dialogRef = this.dialog.open(EliminarModalComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(async result => {
      this.rentabilidadPC=0;
      if (result == true) {
        let index = 0;
        let indexDelete;
        for (const item of this.listaArticulo) {
          if (item.Id == value.Id) {
              this.totalArticulos = this.totalArticulos - item.Cantidad;
            this.totalPrecio = this.totalPrecio - item.PrecioFinal;
            this.rentabilidadPC=item.PrecioFinal-(item.PrecioCosto*item.Cantidad);
            if(this.tieneRolProduccion)
            {

              const dataUser = { 'idArticulo':value.Id, 'idSucursal':this.idSucursalVendedor,'cantidad': item.Cantidad, 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
              const loading = this.generalServ.loadingModal();
              let result2 = await this.articuloServ.deleteArticuloFromPedido(dataUser).toPromise();
              loading.close();
            }
            indexDelete = index;
          }

/*             let result = await this.articuloServ.getCantidadArticuloMPById(dataUser).toPromise();
            this.getMPCant = result;
            if(this.getMPCant != null)
            {
              for (const itemMP of this.getMPCant)
              {
                const dataMP = { 'idMateriaPrima':itemMP.MateriaPrima.Id, 'idSucursal':this.idSucursalVendedor};
                  let result2 = await this.mpServ.getMPCantById(dataMP).toPromise()
                  this.MPCantidad = result2;
                this.MPCantidad.CantidadArticulo += itemMP.CantidadArticulo * item.Cantidad;
                let data4= {
                  'idMateriaPrima': itemMP.IdMateriaPrima, 'idSucursal': this.idSucursalVendedor,
                  'cantidadMP': this.MPCantidad.CantidadArticulo, 'idClienteNegotis' : localStorage.getItem('idClienteNegotis')
                };
                this.mpServ.guardarCantidadMP(data4).subscribe(datas => {

                }, error => { console.log(error);});
            }

            } */

          if(this.tieneRolCombo)
          {
            const dataUser = { 'idArticulo':value.Id, 'idSucursal':this.idSucursalVendedor, 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
            let result = await this.articuloServ.getCantidadArticuloComboById(dataUser).toPromise();
            //.subscribe(data2 => {

              this.getComboCant = result;
            for (const item2 of this.getComboCant)
            {
              const dataMP = { 'codigo': item2.ArticuloCombo.CodigoDeBarras, 'idArticulo':item2.ArticuloCombo.Id, 'idSucursal':this.idSucursalVendedor, 'IdClienteNegotis':localStorage.getItem('idClienteNegotis')};
              let result2 = await this.articuloServ.getArticuloByCodigo(dataMP).toPromise()


                this.ComboCantidad = result2;
              this.ComboCantidad.CantidadArticulo += item2.CantidadArticulo * item.Cantidad;
              let data4= {
                'idArticulo': item2.IdArticuloCombo, 'idSucursal': this.idSucursalVendedor,
                'cantidadArticulo': this.ComboCantidad.CantidadArticulo, 'idClienteNegotis' : localStorage.getItem('idClienteNegotis')
              };
              this.articuloServ.guardarCantidadArticulo(data4).subscribe(datas => {

              }, error => { console.log(error);});
            }
          }
          index++;
        }

        this.rentabilidad=this.rentabilidad-this.rentabilidadPC;
        this.porcentajeRentabilidad = ((this.totalPrecio - this.rentabilidadPC) / this.rentabilidadPC) * 100;
        if(this.totalPrecio == 0 )
        {
          this.rentabilidad = 0;
          this.porcentajeRentabilidad = 0;
        }
        if(this.aumentoListaPorcentajeAnterior != 0)
        {
          if(this.totalPrecioAnterior == 0 && this.totalPrecioAnteriorRecalculado == false)
          {
            for (const item of this.listaArticulo)
            {
              if (item.Id != value.Id)
              {
              this.totalPrecioAnterior += item.PrecioFinal;
              }
            }

          }
          this.cambiarAumentoListPorcentaje(this.aumentoListaPorcentajeAnterior);
        }
        if(this.aumentoListaMontoAnterior != 0 )
        {
          this.cambiarAumnetoListMonto(this.aumentoListaMontoAnterior);
        }
        this.calcularVuelto();
        this.calcularResto();
        this.listaArticulo.splice(indexDelete, 1);
      }
    });
  }

  cambiarCantidadPendiente(value: any){
    let valEntero = null;
    if (value.Unidad == true || (value.Unidad == null && value.Kilogramo == null)) {
      valEntero = true;
    } else {
      valEntero = false;
    }
    const dialogRef = this.dialog.open(PadnumericoModalComponent, {
      width: '450px',
      data: { cantidad: value.Cantidad, entero: valEntero }
    });
    dialogRef.afterClosed().subscribe(async result => {
      if (result != null) {
        value.Entrega = result;
        value.Pendiente -= result;

      }
    });
  }


  cambiarCantidad(value: any) {
    this.rentabilidadPC=0;
    let valEntero = null;
    if (value.Unidad == true || (value.Unidad == null && value.Kilogramo == null)) {
      valEntero = true;
    } else {
      valEntero = false;
    }
    const dialogRef = this.dialog.open(PadnumericoModalComponent, {
      width: '450px',
      data: { cantidad: value.Cantidad, entero: valEntero }
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result != null) {
        if (result == 0) {
          this.deleteArt(value);
        } else {
          // let restoStock = (value.Stock+value.Cantidad) - result;
          // if (Number(restoStock) < 0) {
          //   const modalCantidad = this.dialog.open(ArticulosincantidadModalComponent, {
          //     width: '450px', data: { stock: value.Stock }
          //   });
          //   return null;
          // }
          if(this.tieneRolProduccion)
          {

            if(this.getMPCant != undefined && this.getMPCant.length > 0 )
            {


            for (const item of this.getMPCant)
              {
                const dataMP = { 'idMateriaPrima':item.MateriaPrima.Id, 'idSucursal':this.idSucursalVendedor};

                let result2 = await this.mpServ.getMPCantById(dataMP).toPromise()

                  result2.CantidadArticulo += item.CantidadArticulo * value.Cantidad;
                  this.MPCantidad = result2;
                  this.MPCantidad.CantidadArticulo -= item.CantidadArticulo * (Number(result));

                let data4= {
                  'idMateriaPrima': item.IdMateriaPrima, 'idSucursal': this.idSucursalVendedor,
                  'cantidadMP': this.MPCantidad.CantidadArticulo, 'idClienteNegotis' : localStorage.getItem('idClienteNegotis')
                };
                this.mpServ.guardarCantidadMP(data4).subscribe(datas => {

                }, error => { console.log(error);});
              }
            }
          }
          if(this.tieneRolCombo)
          {
            if(this.getComboCant != undefined && this.getComboCant.length > 0)
            {


            for (const item of this.getComboCant)
              {
                const dataCombo = { 'idArticulo':item.ArticuloCombo.Id, 'idSucursal':this.idSucursalVendedor};


                let result2 = await this.articuloServ.getCantPorArtSuc(dataCombo).toPromise()

                result2 += item.CantidadArticulo * value.Cantidad;
                this.ComboCantidad = result2;

                this.ComboCantidad.CantidadArticulo -= item.CantidadArticulo * (Number(result) - 1);
                let data4= {
                  'idArticulo': item.IdArticuloCombo, 'idSucursal': this.idSucursalVendedor,
                  'cantidadArticulo': this.ComboCantidad.CantidadArticulo, 'idClienteNegotis' : localStorage.getItem('idClienteNegotis')
                };
                this.articuloServ.guardarCantidadArticulo(data4).subscribe(datas => {

                }, error => { console.log(error);});
              }
            }
          }
          if(this.getArtCant != undefined){
            if(((this.tieneRolVenderConStock) && ((Number(value.Stock) <= 0))) || ((this.tieneRolVenderConStock)) &&(Number(value.Stock + value.Cantidad)< result) )
          {
            const loading = this.generalServ.loadingModal();
              if (value.target != null)
              {
                value.target.value = null;
              }
              const modalCantidad = this.dialog.open(ArticulosincantidadModalComponent,
              {
                width: '450px', data:{stock: value.Stock}
              });
              loading.close();
              return null;
          }
          }else
          {
            if(((this.tieneRolVenderConStock==true) && ((Number(value.Stock) <= 0))) || (this.tieneRolVenderConStock) && (Number(value.Stock+value.CantidadAnterior)< (result)) )
            {
            const loading = this.generalServ.loadingModal();
              if (value.target != null)
              {
                value.target.value = null;
              }
              const modalCantidad = this.dialog.open(ArticulosincantidadModalComponent,
              {
                width: '450px', data:{stock: value.Stock}
              });
              loading.close();
              return null;
            }
          }
          if(this.estadoPedido != PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PEDIDO, EstadosPedido.PENDIENTE)){

          if(this.esNotaCredito == true || this.esNotaCredito == "true")
          {
            value.Stock = value.Stock - value.Cantidad;
            value.Stock = value.Stock + Number(result);
          }
          else
          {
            value.Stock = value.Stock + value.Cantidad;
            value.Stock = value.Stock - Number(result);
          }

          }
          if(value.Pendiente != null && value.Pendiente != Number(result))
          {
            value.Entrega = value.Cantidad - value.Pendiente;
            value.Pendiente = Number(result) - value.Entrega;
          }
          this.totalArticulos = this.totalArticulos - value.Cantidad;
          this.totalArticulos = this.totalArticulos + Number(result);
          this.rentabilidad =this.rentabilidad - (value.PrecioFinal - (value.PrecioCosto*value.Cantidad));

          if(value.PrecioFinal != 0)
          {
            this.totalPrecio = this.totalPrecio - value.PrecioFinal;
          }
          else{
            this.totalPrecio = this.totalPrecio - value.PrecioUnidad.toFixed(2) * value.Cantidad;
          }
          value.Cantidad = Number(result);
          value.PrecioFinal = value.PrecioUnidad * Number(result);
          if(value.CantidadPorPack > 0 && value.PrecioXBulto > 0 && value.Cantidad >= value.CantidadPorPack && this.comboOferta)
          {
            if(this.precioUOriginal == null || this.precioUOriginal == undefined)
            {
              this.precioUOriginal = value.PrecioUnidad;
              this.IDprecioUOriginal = value.Id
            }
            else if(this.IDprecioUOriginal != value.Id)
            {
              this.precioUOriginal = value.PrecioUnidad;
              this.IDprecioUOriginal = value.Id
            }
            value.PrecioUnidad = value.PrecioXBulto;
            value.PrecioFinal = value.PrecioUnidad * value.Cantidad;
          }
          //
          else if(this.precioUOriginal != null  && this.IDprecioUOriginal != null  && this.IDprecioUOriginal == value.Id)
          {
           value.PrecioUnidad = this.precioUOriginal;
           value.PrecioFinal = value.PrecioUnidad * value.Cantidad;
          }
          this.totalPrecio = this.totalPrecio + value.PrecioFinal;
          this.rentabilidadPC = value.PrecioFinal -(value.PrecioCosto*Number(result));
          this.rentabilidad = this.rentabilidad + this.rentabilidadPC;

         }
        if(this.aumentoListaPorcentajeAnterior != 0)
        {
          if(this.totalPrecioAnterior == 0 && this.totalPrecioAnteriorRecalculado == false)
          {
            for (const item of this.listaArticulo)
            {
              this.totalPrecioAnterior += item.PrecioFinal;
            }

          }
          this.cambiarAumentoListPorcentaje(this.aumentoListaPorcentajeAnterior);
        }
        if(this.aumentoListaMontoAnterior != 0 )
        {
          this.cambiarAumnetoListMonto(this.aumentoListaMontoAnterior);
        }

        this.rentabilidadPC = 0;
        for (const item of this.listaArticulo)
        {
          this.rentabilidadPC += item.PrecioCosto * item.Cantidad;
        }
        this.porcentajeRentabilidad = ((this.totalPrecio - this.rentabilidadPC) / this.rentabilidadPC) * 100;
        this.calcularVuelto();
        this.calcularResto();
      }
    });
  }

  cambiarDescuento(value: any) {
    const dialogRef = this.dialog.open(PadnumericoModalComponent, {
      width: '450px',
      data: { cantidad: value.DescuentoPorcentaje, entero: false }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {

        this.flagDto = true;
        if(value.DescuentoPrecio != 0)
        {
          value.PrecioUnidad = value.PrecioUnidad + value.DescuentoPrecio;
        }
        else
        {
          value.PrecioUnidad = value.PrecioUnidad + (value.PrecioBase *  value.DescuentoPorcentaje)/100;
        }

        value.DescuentoPorcentaje = result;
        this.rentabilidad -= value.PrecioFinal - (value.PrecioCosto * value.Cantidad);
        if(this.aumentoListaPorcentajeAnterior != 0)
        {
          if(this.totalPrecioAnterior != 0 )
          {
            this.totalPrecio += (this.totalPrecioAnterior * this.aumentoListaPorcentajeAnterior)/100;
          }
          else
          {
            this.totalPrecio += (this.totalPrecioOriginal * this.aumentoListaPorcentajeAnterior)/100;
          }

        }

        this.totalPrecio = this.totalPrecio - value.PrecioFinal;
        if(this.totalPrecio < 0)
        {
          this.totalPrecio=0;
        }

        value.DescuentoPrecio = (value.DescuentoPorcentaje * value.PrecioUnidad) / 100;
        value.PrecioUnidad = value.PrecioUnidad - value.DescuentoPrecio;
        value.PrecioFinal = value.PrecioUnidad * value.Cantidad;
        this.totalPrecio = this.totalPrecio + value.PrecioFinal;
        this.rentabilidad += value.PrecioFinal - (value.PrecioCosto * value.Cantidad);
        if(this.totalPrecio < 0)
        {
          this.totalPrecio=0;
        }
        if(this.aumentoListaPorcentajeAnterior != 0)
        {
          this.cambiarAumentoListPorcentaje(this.aumentoListaPorcentajeAnterior);
        }
        if(this.aumentoListaMontoAnterior != 0 )
        {
          this.cambiarAumnetoListMonto(this.aumentoListaMontoAnterior);
        }
      }
    });
  }

  cambiarDescuentoMonto(value: any) {
    let descuentoOld = value.DescuentoMonto ? value.DescuentoMonto : 0;
    const dialogRef = this.dialog.open(PadnumericoModalComponent, {
      width: '450px',
      data: { cantidad: value.DescuentoMonto, entero: false }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.flagDto = true;

        value.PrecioUnidad = value.PrecioUnidad + descuentoOld;
        value.PrecioBase = value.PrecioBase + descuentoOld;
        value.DescuentoMonto = result;
        this.totalPrecioAnterior = this.totalPrecio;
        this.totalPrecio = this.totalPrecio - value.PrecioFinal;
        value.PrecioUnidad = value.PrecioUnidad - value.DescuentoMonto;
        value.PrecioBase = value.PrecioBase - value.DescuentoMonto;
        value.PrecioFinal = value.PrecioUnidad * value.Cantidad;
        this.totalPrecio = this.totalPrecio + value.PrecioFinal;

          this.rentabilidad +=  (value.PrecioFinal - value.PrecioCosto * value.Cantidad);
          if(this.aumentoListaPorcentajeAnterior != 0)
          {
            this.cambiarAumentoListPorcentaje(this.aumentoListaPorcentajeAnterior);
          }
          if(this.aumentoListaMontoAnterior != 0 )
          {
            this.cambiarAumnetoListMonto(this.aumentoListaMontoAnterior);
          }

      }
    });
  }

  verPagos() {
    const dialogRef = this.dialog.open(PagoHistorialModalComponent, {
      data: { 'info': this.pedidoById.ListPedidoPagos }
    });
  }

  onSubmit(value: any) {
    //if(this.tieneRolEsconderDatosSucursal)
   // {
   //  this.myForm.controls.idSucursalCliente.errors.required = false;
   //
   // }|| this.totalPrecio< this.pagoParcial

    console.log('onSubmit');
    if ((this.myForm.valid && this.idCliente != null && this.listaArticulo.length > 0)  ||
      (this.cliente == 'Mostrador' && this.listaArticulo.length > 0 && this.estadoPago != null)) {
        this.primerInput = true;
      if ((Number(this.estadoPago) === this.estadoPagoParcial
        && this.pagoParcial > 0) && (Number(this.estadoPago) === this.estadoPagoParcial
        && this.pagoParcial2 > 0) || (this.pagoParcial < 0 || this.pagoParcial2 < 0)){
        if (!this.pagoParcialValido()) {
          this.modalValDatosRequeridos(); return null;

        }
      }

      this.arrayValCantidad = [];
      for (const item of this.listaArticulo) {
        this.arrayValCantidad.push(item.Id);
      }
      const dataValCant = { 'idArticulo': this.arrayValCantidad, 'idSucursal': this.idSucursalVendedor };
      this.arrayListAticuloSinStock = [];
      const loading = this.generalServ.loadingModal();
      this.articuloServ.getListCantPorArtSuc(dataValCant).subscribe(data => {
        this.getArrayValCantidad = data;
        let modelArtSinStock;
        for (const item of this.listaArticulo) {
          for (const itemVal of this.getArrayValCantidad) {
            if (item.Id == itemVal.IdArticulo) {
              if (item.CantidadAnterior == null) {
                item.CantidadAnterior = 0;
              }
              if ((item.Cantidad - item.CantidadAnterior) > itemVal.CantidadArticulo) {
                modelArtSinStock = { 'articulo': item, 'cantidadDisponible': itemVal.CantidadArticulo };
                this.arrayListAticuloSinStock.push(modelArtSinStock);
              }
            }
          }
        }
        // if (this.arrayListAticuloSinStock.length > 0) {
        //   const modalPosibleCantidad = this.dialog.open(ArticuloposiblecantidadModalComponent, {
        //     width: '450px', data: { item: this.arrayListAticuloSinStock }
        //   });
        //   modalPosibleCantidad.afterClosed().subscribe(result => {
        //     if (result == true) {
        //       let index = 0;
        //       for (let item of this.listaArticulo) {
        //         for (let itemVal of this.arrayListAticuloSinStock) {
        //           if (item.Id == itemVal.articulo.Id) {
        //             if (Number(itemVal.cantidadDisponible) == 0) {
        //               this.listaArticulo.splice(index, 1);
        //             } else {
        //               item.Cantidad = itemVal.cantidadDisponible;
        //             }
        //           }
        //         }
        //         index++;
        //       }
        //       if (this.listaArticulo.length > 0) {
        //         this.postCreateEdit(value);
        //       } else {
        //         this.modalValDatosRequeridos();
        //       }
        //     }
        //   });
        // } else {
        //   if (this.listaArticulo.length > 0) {
        //     this.postCreateEdit(value);
        //   } else {
        //     this.modalValDatosRequeridos();
        //   }
        // }

        if (this.listaArticulo.length > 0) {
          this.postCreateEdit(value);
        } else {
          this.modalValDatosRequeridos();
        }
        loading.close();
      }, error => { console.log(error); loading.close(); });
    } else {
      this.modalValDatosRequeridos();
    }

  }

  modalValDatosRequeridos() {
    this.dialog.open(PedidofaltandatosrequeridosModalComponent, {
      width: '450px', data: { item: this.arrayListAticuloSinStock }
    });
  }


  guardarObservacionArt(value:any)
  {
    for (const item of this.listaArticulo) {

      if(item.Id == value.Id)
      {
        item.Observacion = this.observacionArt;

      }

    }
  }

  postCreateEdit(value: any) {
    this.flagCompraMinima = false;
    const loading = this.generalServ.loadingModal();
/*     if ((this.cliente == 'Mostrador' || this.cliente == 'Mostrador 2') && this.estadoPago === PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PAGO, EstadosPago.TOTAL)) {
      value.estadoPedido = PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PEDIDO, EstadosPedido.CERRADO);
    }*/
    if (this.cliente == 'Mostrador' || this.cliente == 'Mostrador 2') {
      value.estadoEntrega = PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_ENTREGA, EstadosEntrega.ENTREGADO);
    }
    // if (this.listaArticulo.some(any => any.Stock < 1) && !this.editMode){
    //   value.estadoEntrega = 'PENDIENTE';
    // }
    if (this.estadoPago !== PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PAGO, EstadosPago.PARCIAL)) { value.pagoParcial = null; }
    if (value.idSucursalCliente == '') {
      value.idSucursalCliente = null;
    } else {
      value.idSucursalCliente = Number(value.idSucursalCliente);
    }
    // fecha de entrega para post
    if((value.formaPago === PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.FORMA_PAGO, FormasPago.CHEQUE)|| value.formaPago2 === PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.FORMA_PAGO, FormasPago.CHEQUE))|| (value.formaPago === PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.FORMA_PAGO, FormasPago.ECHECK)|| value.formaPago2 === PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.FORMA_PAGO, FormasPago.ECHECK)))
    {
    this.request.idClienteNegotis = this.idClienteNegotis;
    this.request.idSucursal = this.idSucursalVendedor;
    this.request.idUser = localStorage.getItem('idUser');

    this.request.importe  = this.totalPrecio;
    this.request.librador = value.libradorCheque;
    this.request.numero = value.numeroCheque;
    this.request.plaza = value.plaza;
    this.request.banco = value.banco;
    this.request.cuit = value.cuitCheque;
    this.request.idCliente = this.idCliente;
    this.request.idEstadoCompra =19;
    this.request.cuenta = value.numeroCuentaCheque;
    this.request.fechaVencimiento = this.vencimientoCheque;
    this.request.fechaIngresoValor = this.fechaPedido;
    this.request.fechaEmision = this.fechaPedido;
    if(value.estadoPago.toString() === this.estadoPagoParcial.toString())
    {
      if(value.formaPago === PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.FORMA_PAGO, FormasPago.CHEQUE) || value.formaPago === PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.FORMA_PAGO, FormasPago.ECHECK))
      {
        this.request.importe = this.pagoParcial;
      }
      if(value.formaPago2 === PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.FORMA_PAGO, FormasPago.CHEQUE) || value.formaPago === PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.FORMA_PAGO, FormasPago.ECHECK))
      {
        this.request.importe = this.pagoParcial2;
      }
    }
    else if(this.restoApagarPagoParcial != 0 && this.restoApagarPagoParcial != this.totalPrecio && value.estadoPago.toString() === this.estadoPagoTotal.toString())
    {
      this.request.importe = this.restoApagarPagoParcial;
    }
    this.cuentaDetalleServ.crearEditar(this.request)
      .subscribe(data => {
        this.post = data;

    this.submitted = true;
  }, error => {
    console.log(error);

  });
}

    this.arraylistaArticulo = [];
    this.totalPrecioOriginal = 0;
    let model;
    for (const item of this.listaArticulo) {
      if(this.tieneRolControlEntregas == false)
      {
        item.Pendiente =0;
        item.Entrega = 0;
        this.entrega = 0;
      }

      model =  new  PedidoArticuloModel(
        item.Id,
        Number(item.Cantidad),
        Number(item.PrecioBase),
        item.PrecioUnidad,
        item.PrecioFinal,
        item.DescuentoPorcentaje,
        item.DescuentoMonto,
        item.Unidad,
        item.Kilogramo,
        item.Pesable,
        item.PrecioCosto,
        item.Pendiente,
        item.Litro,
        item.Metro,
        item.Entrega,
        item.Observacion,
        item.CantidadRecalculo
    );
      this.arraylistaArticulo.push(model);
      this.totalPrecioOriginal += item.PrecioFinal;

      if(this.tieneRolCompraMinima && item.Cantidad < item.CompraMinima && item.CompraMinima > 0)
      {
        this.flagCompraMinima = true;
      }
    }
    if(this.aumentoListaMonto != 0 && this.aumentoListaMonto != undefined)
    {
      this.totalAjuste = this.totalPrecioOriginal - this.aumentoListaMonto;
    }
    else if(this.aumentoListaPorcentaje != 0 && this.aumentoListaPorcentaje != undefined)
    {
      this.totalAjuste = this.totalPrecioOriginal - ((this.totalPrecioOriginal * this.aumentoListaPorcentaje)/100);
    }
    else{
      this.totalAjuste = this.totalPrecioOriginal;
      console.log(this.totalAjuste);
    }
    if(this.totalPrecio != this.totalPrecioOriginal && this.totalPrecioOriginal != undefined && this.idClienteNegotis != '8255f933-443f-459d-91f9-0d00ebebdc46'  && (this.aumentoListaPorcentaje == 0 || this.aumentoListaPorcentaje == undefined) && this.aumentoListaMonto == 0 || this.aumentoListaMonto == undefined)
    {
      this.totalPrecio = this.totalPrecioOriginal;
    }
    else if(this.totalPrecio != this.totalAjuste && this.totalAjuste != undefined && this.idClienteNegotis != '8255f933-443f-459d-91f9-0d00ebebdc46')
    {
      if(this.totalAjuste > this.totalPrecio)
      {
        this.totalPrecio = this.totalAjuste;
        console.log(this.totalAjuste);
      }

    }

    if(this.flagCompraMinima)
    {
      const dialogRef = this.dialog.open(MensajeModalComponent, {
        width: '750px',
        data: {
          titulo: 'Compra Mínima',
          esAfip: false,
          mensaje: 'Compra Mínima mayor a la cantidad ingresada',
          idPedido: this.idPedido,
          pedidoCerrado: this.pedidoCerrado,
          esNotaCredito: this.esNotaCredito
        }
    });
    dialogRef.afterClosed().subscribe(result => {
      var asd= result;
      loading.close();
      return null;
    });

    }
    else{
      if(this.totalPrecioAnterior == 0)
      {
        this.totalPrecioAnterior = this.totalPrecio;
      }
      if(this.comision != 0 && (this.comisionTotal == 0 || this.comisionTotal == undefined) )
      {
        this.comisionTotal = (this.comision * this.totalPrecio) / 100;
      }
      else if((this.comisionTotal != (this.comision * this.totalPrecio) / 100) || ( this.pedidoById != undefined && this.pedidoById.Pedido.IdVendedor != localStorage.getItem('idUser')))
      {
        this.comisionTotal = (this.pedidoById.Pedido.Vendedor.PorcentajeComision * this.totalPrecio) / 100;
      }


      if(value.estadoPedido == null || value.estadoPedido == undefined || value.estadoPedido == '')
      {
        value.estadoPedido = this.estadoPedido;
      }
      if(this.idVendedor == null || this.idVendedor == undefined)
      {
        this.idVendedor =localStorage.getItem('idUser');
      }
      if(this.tieneRolSaldoAFavor && this.saldoAFavor != 0 && this.flagPPMayor && this.restoApagarPagoParcial <= 0 && this.estadoPedido != this.estadoPedidoPendiente && this.estadoPedido != this.estadoPedidoAnulado)
      {
       value.estadoPago = PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PAGO, EstadosPago.TOTAL);
      }
      if(this.estadoPago != this.estadoPagoTotal && this.estadoPedido != this.estadoPedidoPendiente && this.estadoPedido != this.estadoPedidoAnulado && this.restoApagarPagoParcial > 0 && this.tieneRolSaldoAFavor && this.saldoAFavor != null && this.saldoAFavor != 0 &&  0 < this.totalPrecio)
      {
        value.estadoPago = this.estadoPagoParcial;
      }
      if((this.tieneRolSaldoAFavor && this.saldoAFavor != null && this.saldoAFavor != 0 && this.flagPPMayor == false && this.estadoPedido != this.estadoPedidoPendiente && this.estadoPedido != this.estadoPedidoAnulado) ||  (this.flagPPMayor && this.restoApagarPagoParcial >= 0 && this.estadoPedido != this.estadoPedidoPendiente && this.estadoPedido != this.estadoPedidoAnulado))
      {
        this.saldoAFavor = 0;
      }
      if((this.estadoPedido == this.estadoPedidoPendiente || this.estadoPedido == this.estadoPedidoAnulado) && this.saldoAFavor != 0 && this.flagPPMayor)
      {
        this.saldoAFavor = this.saldoAFavorOriginal;
      }
      const dataPedido = new PedidoCrearEditarModel(
        Number(this.idPedido),
        localStorage.getItem('idUser'),
        localStorage.getItem('idClienteNegotis'),
        this.idCliente,
        this.idVendedor,
        value.estadoEntrega,
        value.estadoPago,
        value.comision,
        value.estadoConfirmacion,
        this.fechaEntrega,
        value.estadoPreparacion,
        value.prioridad,
        value.estadoPedido,
        value.aumentoLista,
        value.aumentoListaMonto,
        this.aumentoResto,
        value.idSucursalCliente,
        this.arraylistaArticulo,
        this.idSucursalVendedor,
        value.estadoComision,
        value.observacion,
        this.iva,
        this.totalArticulos,
        this.totalPrecio,
        this.comisionTotal,
        value.formaPago,
        this.pagoParcial,
        this.fechaPedido,
        this.esNotaCredito,
        this.pedidoAsociadoId,
        this.tarjeta,
        this.sesionesRealizadas,
        this.sesionesTratamiento,
        this.sesionesTotales,
        value.aumentoListaPorcentaje,
        this.totalPrecioOriginal,
        this.esNotaDebito,
        this.numeroCheque,
        this.saldoAFavor,
        this.turno,
        this.tipoSesion,
        this.tipoSesion2,
        false,
        this.pagoParcial2,
        this.formaPago2,
        this.fechaVencimiento,
        this.nroOperacion,
        this.fechaOperacion,
        this.retencion
      );
      this.pedidoServ.crearEditar(dataPedido)
        .subscribe(data => {
          this.postPedido = data;

          if (this.postPedido.Resultado == true) {
            if(this.postPedido.IdPedido == -1)
            {
              console.log("Error al ingresar el pedido");
            }
            if (this.puedeImprimirFacturaAfip()) {
              this.pedidoCerrado = true;
            }

            if (this.tieneRolCliente) {
              this.snackBarOperacionExitosa();
            } else {
              const dialogRef = this.dialog.open(VerFacturaModalComponent, {
                width: '450px',
                data: {
                  idPedido: this.postPedido.IdPedido,
                  pedidoCerrado: this.pedidoCerrado,
                  esNotaCredito: this.esNotaCredito,
                  esNotaDebito: this.esNotaDebito,
                  ivaCheck: this.ivaCheck,
                  entregasCheck: this.entregasCheck
                }
              });

              dialogRef.afterClosed().subscribe(result => {
                if(result != false)
                {
                  this.snackBarOperacionExitosa();
                }
             });
            }
          }
          loading.close();
        }, error => { console.log(error); loading.close(); });

    }
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

  private puedeImprimirFacturaAfip() {
    return  !this.tieneRolCliente;
    //this.estadoPago === PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PAGO, EstadosPago.TOTAL) &&
  }

  snackBarOperacionExitosa() {
    this.router.navigate(['/cliente/pedido/panel'], { replaceUrl: true });
    this.snackBar.openFromComponent(SnackBarOperacionExitosaComponent, {
      duration: 1000,
    });
  }

  fotoModal(value: any) {
    const dialogRef = this.dialog.open(FotoCrearEditarModalComponent, {
      width: '750px', data: { idArticulo: value, editar: false },
    });
  }

  generarFactEdit() {
    this.facturaAfip = true;
  }

  fechaPedidoDatePicker() {
    if (this.editMode && this.bloquearFecha && this.estadoPago ===
      PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PAGO, EstadosPago.TOTAL)) {
      return this.fechaPedido;
    }

    this.runDatePicker().subscribe(result => this.fechaPedido = this.getDateAsString(result));
  }


  fechaPedidoDatePickerCheque() {
    if (this.editMode && this.bloquearFecha && this.estadoPago ===
      PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PAGO, EstadosPago.TOTAL)) {
      return this.vencimientoCheque;
    }

    this.runDatePicker().subscribe(result => this.vencimientoCheque = this.getDateAsString(result));
  }

  fechaOperacionDatePicker() {
    if (this.editMode && this.bloquearFecha && this.estadoPago ===
      PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PAGO, EstadosPago.TOTAL)) {
      return this.fechaOperacion;
    }

    this.runDatePicker().subscribe(result => this.fechaOperacion = this.getDateAsString(result));
  }



  validarCondicionParcial() {
    return (this.idPedido === 0) || this.parcialActivado;
  }

  public filtrarCliente() {
    if (this.cliente.toString().length > 3) {

      if (this.cliente.toString().length  >= this.busquedaCliente.toString().length) {
        const loadRef = this.generalServ.loadingModalBuscar();
        let data = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis'), 'textoBusqueda': this.cliente, 'page': this.page, 'pageSize': this.limit };
        this.clienteServ.busquedaClientesClienteNegotisPaginado(data).subscribe(resp => {
          loadRef.close();
          this.infoGeneral.Clientes = resp;
          this.filteredRazonSocial = this.razonSocialCtrl.valueChanges
            .pipe(
              startWith(''),
              map(item => item ? this._filterRazonSocial(item) : this.infoGeneral.Clientes.slice())
            );

          loadRef.close();
        });
      }
    }
    this.busquedaCliente = this.cliente;
  }

  public filtrarVendedor() {
    if (this.vendedor.toString().length > 4) {
      if (this.vendedor.toString().length >= this.busquedaVendedor.toString().length) {
        const loadRef = this.generalServ.loadingModalBuscar();
        const dataFiltro = {
          'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
          'UserName': "",
          'Nombre': "",
          'Apellido': "",
          'CUIL': "",
          'textoBusqueda':this.vendedor,
          'page':1,
          'pageSize':20,
          'idSucursal':JSON.parse(localStorage.getItem('sucursalSeleccionada') ?? '')
        };
        this.userServ.getListEmpleadoByIdClienteNegotis(dataFiltro)
        .subscribe((data: any) => {
          loadRef.close();
          this.infoGeneral.Empleados = data.listado;
          this.filteredVendedor = this.vendedorCtrl.valueChanges
            .pipe(
              startWith(''),
              map(item => item ? this._filterVendedor(item) : this.infoGeneral.Empleados.slice())
            );

          loadRef.close();
        });
      }
    }
    this.busquedaVendedor = this.vendedor;
  }



  cambiarPrecioUnitario(articulo: any) {
    const dialogRef = this.dialog.open(PadnumericoModalComponent, {
      width: '450px',
      data: { cantidad: articulo.PrecioUnidad, entero: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        if (result > 0) {
          let UnidadOG = articulo.PrecioUnidad;
          articulo.PrecioUnidad = Number(result);
          this.totalPrecio -= articulo.PrecioFinal;
          this.rentabilidad -= articulo.PrecioFinal - (articulo.PrecioCosto * articulo.Cantidad)
          if(this.recalculoUnidad)
          {
            articulo.PrecioFinal = articulo.PrecioUnidad;
          }
          else
          {
            articulo.PrecioFinal = articulo.PrecioUnidad * articulo.Cantidad;
          }


          this.rentabilidad = this.rentabilidad + (articulo.PrecioFinal - (articulo.PrecioCosto * articulo.Cantidad))
          this.totalPrecio += articulo.PrecioFinal;
          if(this.aumentoListaPorcentajeAnterior != 0)
          {
            if(this.totalPrecioAnterior == 0 && this.totalPrecioAnteriorRecalculado == false)
            {
              for (const item of this.listaArticulo)
              {
                this.totalPrecioAnterior += item.PrecioFinal;
              }
            }
            this.cambiarAumentoListPorcentaje(this.aumentoListaPorcentajeAnterior);
          }
          if(this.aumentoListaMontoAnterior != 0 )
          {
            this.cambiarAumnetoListMonto(this.aumentoListaMontoAnterior);
          }

          this.rentabilidadPC = 0;
          for (const item of this.listaArticulo)
          {
            this.rentabilidadPC += item.PrecioCosto * item.Cantidad;
          }
          this.porcentajeRentabilidad = ((this.totalPrecio - this.rentabilidadPC) / this.rentabilidadPC) * 100;

          this.calcularVuelto();
          this.calcularResto();

          if(this.recalculoUnidad)
          {
            articulo.Cantidad = result / articulo.PrecioBase;
            articulo.CantidadRecalculo = articulo.Cantidad;
            articulo.PrecioUnidad = Number(articulo.PrecioFinal/articulo.Cantidad).toFixed(2);
            articulo.PrecioUnidad = Number(articulo.PrecioUnidad);
          }




        }



      }
    });

  }
}


