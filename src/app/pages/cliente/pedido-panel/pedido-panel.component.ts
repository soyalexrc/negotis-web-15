import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { PedidoService } from '../../../Service/pedido.service';
import { SucursalService } from '../../../Service/sucursal.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DatepickerModalComponent } from '../../../components/datepicker-modal/datepicker-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { EliminarModalComponent } from '../../../components/eliminar-modal/eliminar-modal.component';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneralService } from '../../../Service/general.service';
import { GlobalService } from 'src/app/Service/global.service';
import { MensajeModalComponent } from 'src/app/components/mensaje-modal/mensaje-modal.component';
import { PagosPedidosPendientesModalComponent } from '../../../components/pago-pedidos-pendientes-modal/pagos-pedidos-pendientes-modal.component';
import { FacturaPedidosPendientesModalComponent } from '../../../components/factura-pedidos-pendientes-modal/factura-pedidos-pendientes-modal.component';
import { ClienteclienteService } from '../../../Service/clientecliente.service';
import { PedidoFiltroModel } from 'src/app/pages/cliente/pedido-panel/PedidoFiltroModel';
import PropertyUtil, {FormasPago, EstadosEntrega, EstadosPedido} from '../../../util/property.util';
import {EstadosPago, TiposPropiedad} from '../../../util/property.util'
import { UserService } from '../../../Service/user.service';
import { DocumentoModel } from 'src/app/models/DocumentoModel';
import * as moment from 'moment';
import { CambiarEstadoModalComponent } from 'src/app/components/cambiar-estado-modal/cambiar-estado-modal.component';
import {PedidoCrearEditarModel} from '../../../models/PedidoCrearEditarModel';
import {PedidoEditarModel} from './PedidoEditarModel';
import { DocumentoService } from 'src/app/Service/documento.service';
import { Title } from '@angular/platform-browser';
import { CuentaDetalleModel } from 'src/app/models/CuentaDetalleModel';
import { CuentaFinanzaDetalleService } from 'src/app/Service/cuenta-finanza-detalle.service';

@Component({
  selector: 'app-pedido-panel',
  templateUrl: './pedido-panel.component.html',
  styleUrls: ['./pedido-panel.component.css']
})
export class PedidoPanelComponent implements OnInit {
  private readonly keyLastPedidoFilter = 'pedido-panel_LastFilter';
  private readonly lastTurno = 'caja-totales_LastTurno';
  public urlImprimir!: string;
  public urlImprimir2!: string;
  clienteCtrl = new FormControl();
  filteredCliente!: Observable<any[]>;
  vendedorCtrl = new FormControl();
  filteredVendedor!: Observable<any[]>;
  zonaCtrl = new FormControl();
  filteredZona!: Observable<any[]>;
  regionCtrl = new FormControl();
  filteredRegion!: Observable<any[]>;

  filesToUpload: any[] = [];
  documentos: DocumentoModel[] = [];
  fileName!: string;
  filesSaved: string[] = [];
  verPagos:boolean = false;

  request: CuentaDetalleModel;
  pedidoActivo: any
  pedidosCerrado: any
  pedidoPendiente: any
  pedidoAnulado: any


  estadoPedidoPendiente: any = PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PEDIDO, EstadosPedido.PENDIENTE);
  estadoPedidoActivo: any = PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PEDIDO, EstadosPedido.ACTIVO);
  estadoPedidoCerrado: any = PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PEDIDO, EstadosPedido.CERRADO);
  estadoPedidoAnulado: any = PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PEDIDO, EstadosPedido.ANULADO);

  pedidoLista: any;
  listCompleto: any;
  filtrados: any[] = [];
  infoGeneral: any;
  tieneRolCliente = false;
  filtroPedidosHabilitado= false;
  tieneObjetivo = false;
  sincroPedidos = false;
  modificarPedidosHabilitado = false;
  eliminarPedidosHabilitado = false;
  visualizarPedidosHabilitado = false;
  visualizarCantidadVentas = false;
  visualizarCambioEstados = false;
  crearDuplicado = false;
  objetivo: any;
  vendedor: any;
  idVendedor: any;
  ApellidoVendedor: any;
  RazonSocialVendedor: any;
  cliente: any = '';
  idCliente: any;
  saldoAFavor: any=0;
  idUser: any;
  origenPedido: any= null;
  clienteSucursales: any;
  idSucursalCliente: any = '';
  estadoEntrega: any;
  estadoEntregas: any;
  estadoPago: any = null;
  estadoComision: any = null;
  estadoConfirmacion: any = '';
  fechaDesde: any = this.calendar.getToday().day.toString().padStart(2, '0') + '/' + this.calendar.getToday().month.toString().padStart(2, '0') + '/' + this.calendar.getToday().year.toString().padStart(4, '0');
  fechaHasta: any = this.calendar.getToday().day.toString().padStart(2, '0') + '/' + this.calendar.getToday().month.toString().padStart(2, '0') + '/' + this.calendar.getToday().year.toString().padStart(4, '0');
  fechaHoy: any = this.calendar.getToday().day.toString().padStart(2, '0') + '/' + this.calendar.getToday().month.toString().padStart(2, '0') + '/' + this.calendar.getToday().year.toString().padStart(4, '0');
  fechaVencimiento: any;
  fechaFiltrado: any = this.calendar.getToday();
  estadoPreparacion: any = '';
  filtroFactura: any;
  prioridad: any = '';
  estadoPedido: any = null;
  formaPago: any = null;
  zona: any;
  idZona: any;
  region: any;
  idRegion: any;
  flagbusqueda: any;
  flagPagosParciales: any;
  filtradoEstadoEntregaPago=false;
  VisualizarFiltroMultiple = false;
  rolSaldoAFavor = false;
  ocultarIndicadorVentas = false;
  turnoCaja = false;
  montoVtas: any = 0;
  montoComision: any = 0;
  montototalVtas: any = 0;
  montoTotalArticulos: any =0;
  restoACobrar: any=0;
  fechaTipoVta = true;
  fechaTipoEntrega = false;
  submittedTipoVta: any;
  submittedTipoEntrega: any;
  submittedFechaDesde: any;
  submittedFechaHasta: any;
  numFactEdit: any;
  fechaDesdeFormat: any;
  fechaHastaFormat: any;
  sucursalVendedor: any;
  idSucursalVendedor: any;
  listaTarjetas : any;
  tarjeta : any = null;
  tipoTarjeta : any = null;
  seleccionarTodos : any;
  @ViewChild('numFactura') codigoInput!: ElementRef;

  pedidosPendientesIndices: any = [];
  pedidosPendientesCambioEstado = [];
  pedidosPendientesMonto = 0;
  pedidosCambiarEstadoIndices: any =[];
  pedidosImprimir: any = [];
  idClienteNegotis=localStorage.getItem('idClienteNegotis');
  token=localStorage.getItem('token');
  estadosPago = PropertyUtil.getPropertiesByType(TiposPropiedad.ESTADO_PAGO);
  formasPago = PropertyUtil.getPropertiesByType(TiposPropiedad.FORMA_PAGO);
  estadosEntrega = PropertyUtil.getPropertiesByType(TiposPropiedad.ESTADO_ENTREGA);
  estadosComision = PropertyUtil.getPropertiesByType(TiposPropiedad.ESTADO_COMISION);
  estadosPedido = PropertyUtil.getPropertiesByType(TiposPropiedad.ESTADO_PEDIDO);
  tiposComprobante = PropertyUtil.getPropertiesByType(TiposPropiedad.TIPO_COMPROBANTE);
  multiple = '';
  tipoComprobante = null;
  montototalVtasFiltroMultiple = 0;

  limit: number = 20;
  page: number = 1;
  total: number = 0;
  busquedaCliente = '';
  busquedaVendedor = '';
  turno : any;
  cancelarPedidos: any = 0;
  turnos: any;
  flag: any = false;
  pedidoFiltro: PedidoFiltroModel = JSON.parse(localStorage.getItem(this.keyLastPedidoFilter) ?? '');
  private filtro: any;

  constructor(
    private titleService: Title,
    private pedidoServ: PedidoService,
    private cuentaDetalleServ : CuentaFinanzaDetalleService,
    private sucursalServ: SucursalService,
    private dialog: MatDialog,
    private calendar: NgbCalendar,
    private router: Router,
    private generalServ: GeneralService,
    private route: ActivatedRoute,
    public globalService: GlobalService,
    private clienteServ: ClienteclienteService,
    private userServ: UserService,
    private documentoServ: DocumentoService
  ) {
    titleService.setTitle("Ventas");
    this.request = new CuentaDetalleModel();
  }

  ngOnInit() {
    const dataTurno = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
    this.userServ.obtenerTurnos(dataTurno).subscribe((data: any) => {
      this.turnos = data;
    }, (error: any) => { console.log(error);});
    this.userServ.obtenerTurno(dataTurno).subscribe((data: any) => {
      this.turno = data;
      console.log('turno', this.turno);
    }, (error: any) => { console.log(error);});
    this.idUser = localStorage.getItem('idUser');
    this.tieneRolCliente = JSON.parse(localStorage.getItem('RolCliente') ?? '');
    const roles = JSON.parse(localStorage.getItem('roles') ?? '');
    const tieneRolClienteNegotis = eval(localStorage.getItem('RolClienteNegotis') ?? '') || false;
    const soporte = eval(localStorage.getItem('soporte') ?? '') || false;
    this.modificarPedidosHabilitado = (roles != null && roles.ModificarPedidos) || tieneRolClienteNegotis || soporte;
    this.eliminarPedidosHabilitado = (roles != null && roles.EliminarPedidos) || tieneRolClienteNegotis || soporte;
    this.visualizarPedidosHabilitado = (roles != null && roles.VisualizarPedidos) || tieneRolClienteNegotis || soporte;
    this.visualizarCantidadVentas = (roles != null && roles.VisualizarCantidadVentas) || tieneRolClienteNegotis || soporte;
    this.filtroPedidosHabilitado= (roles != null && roles.FiltroPedidos) || soporte;
    this.tieneObjetivo= (roles != null && roles.VisualizarObjetivo);
    this.sincroPedidos= (roles != null && roles.sincronizarPedidos);
    this.VisualizarFiltroMultiple= (roles != null && roles.VisualizarFiltrMultiple);
    this.visualizarCambioEstados = (roles != null && roles.VisualizarCambioEstados);
    this.crearDuplicado = (roles != null && roles.CrearDuplicado) || soporte;
    this.turnoCaja = (roles != null && roles.TurnosCaja) || soporte;
    this.rolSaldoAFavor = (roles != null && roles.SaldoAFavor);
    this.ocultarIndicadorVentas = (roles != null && roles.OcultarIndicadorVentas);
    const loadRef = this.generalServ.loadingModal();

    const dataUser = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis'), 'idUser': localStorage.getItem('idUser') };
    this.pedidoServ.getInfoGeneral(dataUser).subscribe(data => {
      this.infoGeneral = data;
      console.log('infoGeneral', data)
      loadRef.close();
      this.filteredCliente = new Observable<any[]>();
      // this.filteredCliente = this.clienteCtrl.valueChanges
      //   .pipe(
      //     startWith(''),
      //     map(item => item ? this._filterCliente(item) : this.infoGeneral.Clientes.slice())
      //   );
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

        if((this.flagbusqueda === 0 ) && (this.infoGeneral !== undefined)){
          this.flagbusqueda=1;
          this.buscar();
          }

    },
      error => { console.log(error); loadRef.close(); },
      () => {
        //cargar el localStorage
        if (this.pedidoFiltro != null) {
          this.idVendedor = this.pedidoFiltro.idVendedor;
          this.idCliente = this.pedidoFiltro.idCliente;
          this.idSucursalCliente = this.pedidoFiltro.idSucursalCliente;
          this.estadoEntrega = this.pedidoFiltro.estadoEntrega;
          this.estadoPago = this.pedidoFiltro.estadoPago;
          this.estadoComision = this.pedidoFiltro.estadoComision;
          this.estadoConfirmacion = this.pedidoFiltro.estadoConfirmacion;
          this.fechaDesde = this.pedidoFiltro.fechaDesde;
          this.fechaHasta = this.pedidoFiltro.fechaHasta;
          this.fechaTipoEntrega = this.pedidoFiltro.fechaTipoEntrega;
          this.fechaTipoVta = this.pedidoFiltro.fechaTipoVta;
          this.estadoPreparacion = this.pedidoFiltro.estadoPreparacion;
          this.prioridad = this.pedidoFiltro.prioridad;
          this.estadoPedido = this.pedidoFiltro.estadoPedido;
          this.idZona = this.pedidoFiltro.idZona;
          this.idRegion = this.pedidoFiltro.idRegion;
          this.formaPago = this.pedidoFiltro.formaPago;
          this.multiple = this.pedidoFiltro.multiple;
          this.tipoComprobante = this.pedidoFiltro.tipoComprobante;
          this.vendedor = this.pedidoFiltro.vendedor;
          this.cliente = this.pedidoFiltro.cliente;
          this.region = this.pedidoFiltro.region;
          this.zona = this.pedidoFiltro.zona;
          this.flagbusqueda = this.pedidoFiltro.flagbusqueda;
          this.origenPedido = this.origenPedido;
          this.estadoEntregas = this.estadoEntregas;
          console.log(this.pedidoFiltro);
              this.buscar();

        }
      });
       this.armarUrlBusqueda();
  }

  guardarTurno()
  {
    localStorage.setItem(this.lastTurno, JSON.stringify(this.turno));
    const loading = this.generalServ.loadingModal();
    const dataUser = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis'), 'turno': this.turno };
    this.userServ.guardarTurno(dataUser).subscribe(data => {
      loading.close();

    }, error => { console.log(error);  loading.close();});
  }
  getSucursalVendedor(value: any) {
    this.sucursalVendedor = value.Sucursal;
    this.idSucursalVendedor = value.Sucursal.Id;
    this.flagPagosParciales =0;
    // this.buscar();
    this.flagbusqueda=0;
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


  armarUrlBusqueda() {
    // this.fechaDesdeFormat = this.fechaDesde.split("/").reverse().join("/");

    // this.fechaHastaFormat = this.fechaHasta.split("/").reverse().join("/");
      this.urlImprimir = this.globalService.urlApi + '/ApiPedido/Get/Pdf/Listado/Busqueda?' +
      'idClienteNegotis=' + localStorage.getItem('idClienteNegotis') +
      '&idVendedor=' + this.idVendedor +
      '&idCliente=' + this.idCliente +
      '&idSucursalEmpresa=' + this.idSucursalVendedor +
      '&idSucursalCliente=' + this.idSucursalCliente +
      '&estadoEntrega=' + this.estadoEntrega +
      '&estadoPago=' + this.estadoPago +
      '&estadoComision=' + this.estadoComision +
      '&estadoConfirmacion=' + this.estadoConfirmacion +
      '&fechaDesde=' + this.fechaDesde +
      '&fechaHasta=' + this.fechaHasta +
      '&fechaTipoEntrega=' + this.fechaTipoEntrega +
      '&fechaTipoVta=' + this.fechaTipoVta +
      '&estadoPreparacion=' + this.estadoPreparacion +
      '&prioridad=' + this.prioridad +
      '&estadoPedido=' + this.estadoPedido +
      '&idZona=' + this.idZona +
      '&idRegion=' + this.idRegion +
      '&formaPago=' + this.formaPago +
      '&token=' + localStorage.getItem('token') +
      '&ventasTotal=' + +(Math.round(this.montoVtas * 100) / 100).toFixed(2) +
      '&comisionTotal=' + +(Math.round(this.montoComision * 100) / 100).toFixed(2) +
      '&tipoComprobante=' + this.tipoComprobante +
      '&estadoEntregas=' + this.estadoEntregas +
      '&turno=' + this.turno +
      '&fechaVencimiento=' + this.fechaVencimiento +
      '&verPagos=' + this.verPagos;




      this.urlImprimir2 = this.globalService.urlApi + '/ApiPedido/Get/Pdf/Listado/Busqueda?' +
      'idClienteNegotis=' + localStorage.getItem('idClienteNegotis') +
      '&idVendedor=' + this.idVendedor +
      '&idCliente=' + this.idCliente +
      '&idSucursalEmpresa=' + this.idSucursalVendedor +
      '&idSucursalCliente=' + this.idSucursalCliente +
      '&estadoEntrega=' + this.estadoEntrega +
      '&estadoPago=' + this.estadoPago +
      '&estadoComision=' + this.estadoComision +
      '&estadoConfirmacion=' + this.estadoConfirmacion +
      '&fechaDesde=' + this.fechaDesde +
      '&fechaHasta=' + this.fechaHasta +
      '&fechaTipoEntrega=' + this.fechaTipoEntrega +
      '&fechaTipoVta=' + this.fechaTipoVta +
      '&estadoPreparacion=' + this.estadoPreparacion +
      '&prioridad=' + this.prioridad +
      '&estadoPedido=' + this.estadoPedido +
      '&idZona=' + this.idZona +
      '&idRegion=' + this.idRegion +
      '&formaPago=' + this.formaPago +
      '&token=' + localStorage.getItem('token') +
      '&ventasTotal=' + +(Math.round(this.montoVtas * 100) / 100).toFixed(2) +
      '&comisionTotal=' + +(Math.round(this.montoComision * 100) / 100).toFixed(2) +
      '&tipoComprobante=' + this.tipoComprobante +
      '&estadoEntregas=' + this.estadoEntregas +
      '&turno=' + this.turno +
      '&fechaVencimiento=' + this.fechaVencimiento +
      '&verPagos=' + this.verPagos +
      '&es80mm=' + true;
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

    this.RazonSocialVendedor = value.RazonSocial;
    this.ApellidoVendedor = value.Apellidos;

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
  getCliente(value: any) {
    const dataUser = { 'idCliente': value.Id, 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
    this.sucursalServ.getSucursalesByUsuario(dataUser)
      .subscribe(data => {
        this.clienteSucursales = data;
      });
    this.idCliente = value.Id;
    if(value.SaldoAFavor != 0)
    {
      this.saldoAFavor = value.SaldoAFavor;
    }
    if(this.formaPago === PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.FORMA_PAGO, FormasPago.CTA_CTE))
    {
      this.fechaFiltrado.day = this.calendar.getToday().day;
      this.fechaFiltrado.month = this.calendar.getToday().month - 3;
      this.fechaFiltrado.year = this.calendar.getToday().year;


      this.fechaDesde = this.getDateAsString(this.fechaFiltrado);

    }
  }


  ajustarFechas(){

    if(this.formaPago === PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.FORMA_PAGO, FormasPago.CTA_CTE))
    {
      this.estadoPedido = PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PEDIDO, EstadosPedido.ACTIVO);
    }
    if(this.formaPago === PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.FORMA_PAGO, FormasPago.CTA_CTE) && this.idCliente != null)
    {
      this.fechaFiltrado.day = this.calendar.getToday().day;

      let fechaH = this.calendar.getToday().month;
      if(fechaH < 4 )
      {
        this.fechaFiltrado.month = (12 + this.calendar.getToday().month) - 3;
        this.fechaFiltrado.year = this.calendar.getToday().year - 1;
        if(this.calendar.getToday().day == 30 && this.fechaFiltrado.month == 2)
        {
          this.fechaFiltrado.day = 27
        }
      }
      else
      {

        this.fechaFiltrado.month = this.calendar.getToday().month - 3;
        this.fechaFiltrado.year = this.calendar.getToday().year;
        if(this.calendar.getToday().day == 30 && this.fechaFiltrado.month == 2)
        {
          this.fechaFiltrado.day = 27
        }
      }




      this.fechaDesde = this.getDateAsString(this.fechaFiltrado);

    }

  }

  fechaDesdeFunc() {
    this.runDatePicker().subscribe(result => {
      this.fechaDesde = this.getDateAsString(result);
      this.armarUrlBusqueda();
    });
  }

  fechaHastaFunc() {
    this.runDatePicker().subscribe(result => {
      this.fechaHasta = this.getDateAsString(result);
      this.armarUrlBusqueda();
    });
  }

  fechaVencFunc() {
    this.runDatePicker().subscribe(result => {
      this.fechaVencimiento = this.getDateAsString(result);
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

  limpiar() {
    localStorage.removeItem(this.keyLastPedidoFilter);
    const fechaHoy = this.calendar.getToday();
    this.vendedor = null;
    this.idVendedor = null;
    this.cliente = null;
    this.idCliente = null;
    this.clienteSucursales = null;
    this.idSucursalCliente = '';
    this.estadoEntrega = null;
    this.estadoPago = null;
    this.origenPedido = null;
    this.formaPago = null;
    this.estadoComision = null;
    this.estadoConfirmacion = '';
    this.fechaDesde = fechaHoy.day.toString().padStart(2, '0') + '/' + fechaHoy.month.toString().padStart(2, '0') + '/' + fechaHoy.year.toString().padStart(4, '0');
    this.fechaHasta = fechaHoy.day.toString().padStart(2, '0') + '/' + fechaHoy.month.toString().padStart(2, '0') + '/' + fechaHoy.year.toString().padStart(4, '0');
    this.fechaVencimiento = null;
    this.estadoPreparacion = '';
    this.prioridad = '';
    this.estadoPedido = null;
    this.fechaTipoVta = true;
    this.fechaTipoEntrega = false;
    this.zona = null;
    this.region = null;
    this.multiple = '';
    this.tipoComprobante = null;
    this.flagPagosParciales = 0;
    this.flagbusqueda=0;
    this.pedidosPendientesIndices = [];
    this.pedidosPendientesMonto = 0;
    this.filteredCliente = new Observable<any[]>();
    this.page = 1;
    this.pedidosCambiarEstadoIndices = [];
    this.pedidosPendientesMonto = 0;
    this.filtradoEstadoEntregaPago=false;
    this.estadoEntregas = null;
    this.verPagos = false;
    this.buscar();
  }

  buscar2(){
    this.verPagos=true;
    this.buscar();
  }

  async buscar() {

    const loadRef = this.generalServ.loadingModal();
    // this.fechaDesdeFormat = this.fechaDesde.split("/").reverse().join("/");
    // this.fechaHastaFormat = this.fechaHasta.split("/").reverse().join("/");
    if(this.turnoCaja && this.turno == null)
    {
        const dataTurno = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
      const result = await this.userServ.obtenerTurno(dataTurno).subscribe((data: any) => {
        this.turno = data;
        console.log('turno', data);
      }, (error: any) => { console.log(error);});
    }



      this.fechaDesde = moment(this.fechaDesde, 'DD/MM/YYYY').format('MM/DD/YYYY');
      this.fechaHasta = moment(this.fechaHasta, 'DD/MM/YYYY').format('MM/DD/YYYY');

      if(this.fechaVencimiento != undefined)
      {
        this.fechaVencimiento = moment(this.fechaVencimiento, 'DD/MM/YYYY').format('MM/DD/YYYY');
      }




    let dataFiltro = new PedidoFiltroModel(
      localStorage.getItem('idClienteNegotis'),
      localStorage.getItem('idUser'),
      this.idVendedor,
      null,
      this.idCliente,
      null,
      this.idSucursalVendedor,
      this.idSucursalCliente,
      this.estadoEntrega,
      this.estadoPago,
      this.estadoComision,
      this.estadoConfirmacion,
      this.fechaDesde,
      this.fechaHasta,
      this.fechaTipoEntrega,
      this.fechaTipoVta,
      this.estadoPreparacion,
      this.prioridad,
      this.estadoPedido,
      this.idZona,
      null,
      this.idRegion,
      null,
      this.formaPago,
      this.multiple,
      this.tipoComprobante,
      this.page,
      this.limit,
      this.flagbusqueda,
      this.filtroPedidosHabilitado,
      this.origenPedido,
      this.tarjeta,
      this.estadoEntregas,
      this.turno,
      this.cancelarPedidos,
      this.filtroFactura,
      this.fechaVencimiento,
      this.verPagos
    );

    let pedidoFiltro = dataFiltro.getEntity();

    pedidoFiltro.cliente = this.cliente;
    pedidoFiltro.vendedor = this.vendedor;
    pedidoFiltro.zona = this.zona;
    pedidoFiltro.region = this.region;

    this.fechaDesde = moment(this.fechaDesde, 'MM/DD/YYYY').format('DD/MM/YYYY');
    this.fechaHasta = moment(this.fechaHasta, 'MM/DD/YYYY').format('DD/MM/YYYY');

    if(this.fechaVencimiento != undefined)
    {
      this.fechaVencimiento = moment(this.fechaVencimiento, 'MM/DD/YYYY').format('DD/MM/YYYY');
    }
    pedidoFiltro.fechaDesde = this.fechaDesde;
    pedidoFiltro.fechaHasta = this.fechaHasta;
    localStorage.setItem(this.keyLastPedidoFilter, JSON.stringify(pedidoFiltro));

    // this.fechaDesde = moment(this.fechaDesde, 'DD/MM/YYYY').format('MM/DD/YYYY');
    // this.fechaHasta = moment(this.fechaHasta, 'DD/MM/YYYY').format('MM/DD/YYYY');
    // pedidoFiltro.fechaDesde = this.fechaDesde;
    // pedidoFiltro.fechaHasta = this.fechaHasta;

    this.pedidoServ.getPedidosPorFiltros(dataFiltro).subscribe((data: any) => {
      // this.fechaDesde = moment(this.fechaDesde, 'MM/DD/YYYY').format('DD/MM/YYYY');
      // this.fechaHasta = moment(this.fechaHasta, 'MM/DD/YYYY').format('DD/MM/YYYY');



      this.pedidoLista = data;
      console.log(this.pedidoLista);
      this.listCompleto=data.ListadoCompleto;
      this.submitFunc();
      this.total=this.pedidoLista.totalItems;
      this.calcularTotales();
      if (this.validarCliente() && this.formaPago === PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.FORMA_PAGO, FormasPago.CTA_CTE) && this.validarPedidos()) {
        this.flagPagosParciales=1;
        this.buscarPedidosPagos();
      }
      let estadoPagoTotal=this.estadoPago !== PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PAGO, EstadosPago.TOTAL);
      let estadoEntregaEntregado = this.estadoEntrega !== PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_ENTREGA, EstadosEntrega.ENTREGADO );
      if ((this.estadoPago !== null && estadoPagoTotal ) || (this.estadoEntrega !== null && estadoEntregaEntregado ))
      {
        this.filtradoEstadoEntregaPago=true;
      }
      if(this.infoGeneral != null && this.infoGeneral.Clientes != null  && this.infoGeneral.Clientes.length == 1)
      {

          if(this.infoGeneral.Clientes[0].SaldoAFavor != 0)
          {
            this.saldoAFavor = this.infoGeneral.Clientes[0].SaldoAFavor;
          }


      }
      if ((this.tieneRolCliente) && (this.infoGeneral !== undefined)) {
        this.idCliente = this.infoGeneral.idClientePorDefecto;
        let requestCliente = { 'idCliente': this.idCliente, 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
        this.clienteServ.clientesById(requestCliente).subscribe(dataCliente => {
          // @ts-ignore
          this.pedidoLista.Pedidos = this.pedidoLista.Pedidos.filter(x => x.RazonSocial === dataCliente.RazonSocial);

          this.total=this.pedidoLista.Pedidos.length;
        });
      }
      if (this.filtroPedidosHabilitado && this.flagPagosParciales != 1) {
        let requestUser = { 'id': localStorage.getItem('idUser')};
        this.userServ.getUserById(requestUser).subscribe((dataUser: any)=> {
        // @ts-ignore
        this.pedidoLista.Pedidos = this.listCompleto.filter(x => x.IdUser === dataUser.User.Id);

        this.total=this.pedidoLista.Pedidos.length;
        this.formatoFecha();
      });
      }
      this.formatoFecha();
      this.montoComision=this.pedidoLista.comision;
      this.montoVtas=this.pedidoLista.montoVentas;
      if(this.saldoAFavor != 0)
      {
        this.montoVtas = this.montoVtas - this.saldoAFavor;
      }
      this.montototalVtas=this.pedidoLista.totalVta;
      this.montoTotalArticulos = this.pedidoLista.totalArticulos;
      this.restoACobrar = this.pedidoLista.restoACobrar;
      this.objetivo = this.pedidoLista.objetivo;
      console.log(this.objetivo);
      this.armarUrlBusqueda();
      console.log(this.pedidoLista.Pedidos)
      if(this.verPagos)
      {
         this.verPagos = false;
      }
      loadRef.close();
      if(this.cancelarPedidos != 0)
      {
        this.cancelarPedidos = 0;
        this.buscar();
      }
    }, (error: any) => { console.log(error); loadRef.close(); });
  }

  verificarPedidosParciales() {
    if(this.flagPagosParciales === 0){
      this.flagPagosParciales=1;
    let pedidosAux: any = [];
    this.pedidoLista.Pedidos.forEach((item: any, index: any, object: any) => {
      if (item.PedidosPago) {
        let pagoFinal = 0;
        let pedidoCtaCteIndex: any = null;

        const pedidosPagoCtaCte = item.PedidosPago.filter((x: any) => x.FormaPago === PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.FORMA_PAGO, FormasPago.CTA_CTE));
        let pedidoPagoCtaCteAuxActual: any = null;

        pedidosPagoCtaCte.forEach((pedidoPagoCtaCte: any) => {
          if (pedidoPagoCtaCteAuxActual === null) {
            pedidoPagoCtaCteAuxActual = pedidoPagoCtaCte;
          } else {
            if (new Date(Number(pedidoPagoCtaCte.FechaCracion.replace('/Date(', '').replace(')/', ''))) >
              new Date(Number(pedidoPagoCtaCteAuxActual.FechaCracion.replace('/Date(', '').replace(')/', '')))) {
              pedidoPagoCtaCteAuxActual = pedidoPagoCtaCte;
            }
          }
        });

        const pedidosPagoNoCtaCte = item.PedidosPago.filter((x: any) => x.FormaPago !== PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.FORMA_PAGO, FormasPago.CTA_CTE));

        item.PedidosPago = [];

        if (pedidoPagoCtaCteAuxActual !== null) {
          item.PedidosPago.push(pedidoPagoCtaCteAuxActual);
        }

        if (pedidosPagoNoCtaCte.length > 0) {
          pedidosPagoNoCtaCte.forEach((pedidoPagoNoCtaCte: any) => item.PedidosPago.push(pedidoPagoNoCtaCte));
        }

        item.PedidosPago.forEach((itemPedidoPago: any) => {
          const itemAux = { ...item };
          itemAux.UltimaFormaPago = itemPedidoPago.FormaPago;
          itemAux.UltimoEstadoPago = itemPedidoPago.EstadoPago;
          itemAux.PrecioTotal = itemPedidoPago.Monto;
          itemAux.FechaPago = itemPedidoPago.FechaPago;

          if (itemAux.UltimoEstadoPago === EstadosPago.PARCIAL) {
           this.montoVtas = this.montoVtas - itemAux.PrecioTotal;
            itemAux.esParcial = true;
            pagoFinal += itemAux.PrecioTotal;
          }
          pedidosAux.push(itemAux);

          if (itemAux.UltimoEstadoPago !== EstadosPago.PARCIAL) {

            pedidoCtaCteIndex = pedidosAux.indexOf(itemAux);
          }
        });
        pedidosAux[pedidoCtaCteIndex].PagoFinal = pedidosAux[pedidoCtaCteIndex].PrecioTotal - pagoFinal;

      }
    });
    this.pedidoLista.Pedidos = pedidosAux;
    console.log(this.pedidoLista.Pedidos);
    this.total=pedidosAux.length;
    this.armarUrlBusqueda();
  }
  }

  async CancelarPedidos()
  {
    this.idCliente
    const dataPedido = new PedidoCrearEditarModel(
      0,
      localStorage.getItem('idUser'),
      localStorage.getItem('idClienteNegotis'),
      this.idCliente,
      localStorage.getItem('idUser'),
      null,
      null,
      0,
      null,
      this.fechaHoy,
      null,
      null,
      32,
      0,
      0,
      0,
      null,
      null,
      this.idSucursalVendedor,
      null,
      null,
      null,
      0,
      this.cancelarPedidos,
      0,
      8,
      false,
      this.fechaHoy,
      false,
      null,
      this.tarjeta,
      null,
      null,
      null,
      0,
      this.cancelarPedidos,
      false,
      null,
      0,
      this.turno,
      null,
      null,
      true,
      0,
      null,
      null,
      null,
      null,
      0
    );
    this.pedidoServ.crearEditar(dataPedido)
      .subscribe(data => {

      }, error => { console.log(error);});
      this.buscar();
  }


  submitFunc() {
    this.submittedFechaDesde = this.fechaDesde;
    this.submittedFechaHasta = this.fechaHasta;
    if (this.fechaTipoEntrega == true) { this.submittedTipoEntrega = true; this.submittedTipoVta = null; }
    if (this.fechaTipoVta == true) { this.submittedTipoVta = true; this.submittedTipoEntrega = null; }
  }

  calcularTotales() {
    this.montototalVtasFiltroMultiple = 0;

    for (const item of this.pedidoLista.Pedidos) {

      if (this.multiple !== '') {
        this.montototalVtasFiltroMultiple = this.montototalVtasFiltroMultiple + item.MontoTotalArticulos;
        }
      }

    }
  formatoFecha() {
    for (const item of this.pedidoLista.Pedidos) {
      const fechaEntregaTransformed = new Date(item.FechaEntrega.match(/\d+/)[0] * 1);
      item.FechaEntrega = fechaEntregaTransformed.getUTCDate() + '/' + (fechaEntregaTransformed.getUTCMonth() + 1) + '/' + fechaEntregaTransformed.getUTCFullYear();

      const fechaPedidoTransformed = new Date(item.FechaPedido.match(/\d+/)[0] * 1);
      item.FechaPedidoFormat = fechaPedidoTransformed.getUTCDate() + '/' + (fechaPedidoTransformed.getUTCMonth() + 1) + '/' + fechaPedidoTransformed.getUTCFullYear();
      if(item.FechaActualizacion != null)
      {
        const fechaActualizacionTransformed = new Date(item.FechaActualizacion.match(/\d+/)[0] * 1);
        item.FechaActualizacion = fechaActualizacionTransformed.getHours() + ":" + fechaActualizacionTransformed.getMinutes();
      }
      if(item.fechaPago != null)
      {
        const fechaPagoTransformed = new Date(item.fechaPago.match(/\d+/)[0] * 1);
        item.fechaPago = fechaPagoTransformed.getUTCDate() + '/' + (fechaPagoTransformed.getUTCMonth() + 1) + '/' + fechaPagoTransformed.getUTCFullYear();
        if(item.fechaPago == '31/12/2039')
        {
          item.fechaPago = null;
        }
      }
    }
  }

  delete(value: any, i:any) {

    const dialogRef = this.dialog.open(EliminarModalComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        const loadRef = this.generalServ.loadingModal();
        const dataPedido = { 'idPedido': value.Id, 'index': i + 1, 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
        this.pedidoServ.eliminarPedido(dataPedido).subscribe(data => {
          if (data == true) {
            let index = 0;
            for (const item of this.pedidoLista.Pedidos) {
              if (item.Id == value.Id) {
                this.pedidoLista.Pedidos.splice(i, 1 + 1);
                break;
              }
              index++;
            }
          }
          loadRef.close();
        }, error => { console.log(error); loadRef.close(); });
      }
    });
  }

  @HostListener('window:keyup', ['$event'])
  focusCodigo(event: any) {
    if (event.keyCode === 107) {
      this.router.navigate(['/cliente/pedido/crear'], { replaceUrl: false });
    }
    if (event.keyCode === 115) {
      this.codigoInput.nativeElement.focus();
    }
  }

  crearNotaCredito(nroFactura: any) {
    //const loading = this.generalServ.loadingModal();

    const request = {
      'idPedido': nroFactura,
      'idClienteNegotis': localStorage.getItem('idClienteNegotis')
    };
    this.pedidoServ.getPedidoById(request).subscribe(data => {
      //loading.close();

      const response = data as any;

      if (response == null ||
        response.Pedido == null) {
        this.dialog.open(MensajeModalComponent, {
          width: '450px',
          data: {
            titulo: 'Error al abrir pedido',
            mensaje: 'No se ha podido abrir el pedido debido a que o no esta facturado o no existe.'
          }
        });

        return;
      }

      this.router.navigate(['/cliente/pedido/crear'], { queryParams: { pedidoAsociadoId: nroFactura, notaCredito: true } });
    }, error => {
      console.log(error);
     // loading.close();
    });
  }
  crearNotaCreditoDefault(nroFactura: any) {

      this.router.navigate(['/cliente/pedido/crear'], { queryParams: {pedidoAsociadoId: nroFactura,notaCredito: true,ncDefault: true } });
    }

  duplicarSeleccionado()
  {
    const loading = this.generalServ.loadingModal();
    const dataUser = { 'pedidosCambiarEstadoIndices':this.pedidosImprimir[0], 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
    this.pedidoServ.crearDuplicado(dataUser)
    .subscribe(data => {
      loading.close();

    }, error => { console.log(error); loading.close(); })


  }
  sincronizarExcel()
  {
    const loading = this.generalServ.loadingModal();
    this.filesToUpload.forEach(element => {
      let request = new FormData();
      request.append('idClienteNegotis', localStorage.getItem('idClienteNegotis') ?? '');
      request.append('idUser', localStorage.getItem('idUser') ?? '');
      request.append('document', element);
      this.pedidoServ.sincronizarExcel(request)
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
    });

  }


  saveDocuments(idCliente: any) {

    this.filesToUpload.forEach(element => {
      let request = new FormData();
      request.append('idClienteNegotis', localStorage.getItem('idClienteNegotis') ?? '');
      request.append('idUser', localStorage.getItem('idUser') ?? '');
      request.append('document', element);

      this.documentoServ.crearEditar(request).subscribe(response => {
        if (response !== false) {
          let requestDocXCli = {
            'idCliente': idCliente,
            'idDocumento': response,
            'idClienteNegotis': localStorage.getItem('idClienteNegotis')
          };
          this.clienteServ.AddDocument(requestDocXCli).subscribe(
            responseDocXCli => { },
            errorDocXCli => { console.log(errorDocXCli); }
          );
        }
      }, error => { console.log(error); });
    });
  }


  fileChanged(value: any) {
    if (value.target.files && value.target.files[0]) {
      let file = value.target.files[0];
      if (!this.filesToUpload.some((x) => x.name === file.name)) {
        //cargar archivo a filesUpload
        this.filesToUpload.push(file);

        //cargar Documento en Lista
        let newDoc = new DocumentoModel();
        newDoc.filename = file.name;
        this.documentos.push(newDoc);
      }
    }
    this.filesToUpload.forEach(element => {
      let request = new FormData();
      request.append('idClienteNegotis', localStorage.getItem('idClienteNegotis') ?? '');
      request.append('idUser', localStorage.getItem('idUser') ?? '');
      request.append('document', element);
      this.documentoServ.crearEditar(request).subscribe(response => {
        if (response !== false) {
        }
        }, error => { console.log(error); });
    }, (error: any) => { console.log(error); });
    this.sincronizarExcel();
  }


  crearNotaDebito(nroFactura: any) {
    const loading = this.generalServ.loadingModal();

    const request = {
      'idPedido': nroFactura,
      'idClienteNegotis': localStorage.getItem('idClienteNegotis')
    };
    this.pedidoServ.getPedidoById(request).subscribe(data => {
      loading.close();

      const response = data as any;

      if (response == null ||
        response.Pedido == null) {
        this.dialog.open(MensajeModalComponent, {
          width: '450px',
          data: {
            titulo: 'Error al abrir pedido',
            mensaje: 'No se ha podido abrir el pedido debido a que o no esta facturado o no existe.'
          }
        });

        return;
      }

      this.router.navigate(['/cliente/pedido/crear'], { queryParams: { pedidoAsociadoId: nroFactura, notaCredito: false , notaDebito: true} });
    }, error => {
      console.log(error);
      loading.close();
    });
  }

  validarCliente() {
    if (this.cliente !== null && this.cliente !== undefined && this.formaPago === PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.FORMA_PAGO, FormasPago.CTA_CTE)) {
      return this.cliente.toString().length > 0;
    } else {
      return false;
    }
  }


  abrirCambiarEstado(value:any) {
    value = [];
    for (let index = 0; index < this.pedidosCambiarEstadoIndices.length; index++)
    {
      value.push(this.pedidoLista.Pedidos[this.pedidosCambiarEstadoIndices[index]].Id);
    }

    const dialogRef = this.dialog.open(CambiarEstadoModalComponent, {
      width: '600px',
      data: {
       'idPedido':value
      }
    });
    dialogRef.afterClosed().subscribe(async data => {
      if (data.result) {
        const loadRef = this.generalServ.loadingModal();
        var pedidosPendientesPagados: any = [];

        const forLoop = async (_: any)=> {

          for (let index = 0; index < this.pedidosCambiarEstadoIndices.length; index++) {
            const pedido: any = await this.pedidoServ.getPedidoById({
              'idPedido': this.pedidoLista.Pedidos[this.pedidosCambiarEstadoIndices[index]].Id,
              'idClienteNegotis': localStorage.getItem('idClienteNegotis')
            }).toPromise();

            let arraylistaArticulo: any = [];

            pedido.ListPedidoArticulo.forEach((item: any) => {
              arraylistaArticulo.push({
                'idArticulo': item.IdArticulo,
                'cantidad': item.Cantidad,
                'precioBase': item.PrecioBase,
                'precioFinal': item.PrecioFinal,
                'descuentoPorcentaje': item.DescuentoPorcentaje,
                'unidad': item.Unidad,
                'kilogramo': item.Kilogramo,
                'precioCosto': item.PrecioCosto
              });
            });

            const getFechaEntrega = new Date(Number(pedido.Pedido.FechaEntrega
              .replace('/Date(', '').replace(')/', '')));
            const fechaEntrega = getFechaEntrega.getUTCDate().toString().padStart(2, '0') + '/' + (getFechaEntrega
              .getUTCMonth() + 1).toString().padStart(2, '0') + '/' + getFechaEntrega.getUTCFullYear().toString().padStart(4, '0');

            const getFechaPedido = new Date(Number(pedido.Pedido.FechaPedido
              .replace('/Date(', '').replace(')/', '')));
            const fechaPedido = getFechaPedido.getUTCDate().toString().padStart(2, '0') + '/' + (getFechaPedido
              .getUTCMonth() + 1).toString().padStart(2, '0') + '/' + getFechaPedido.getUTCFullYear().toString().padStart(4, '0');

            const pagoPedidoPendiente = new PedidoEditarModel(
              pedido.Pedido.Id,
              localStorage.getItem('idUser'),
              localStorage.getItem('idClienteNegotis'),
              pedido.Pedido.IdCliente,
              localStorage.getItem('idUser'),
              data.estadoEntrega,
              PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PAGO, EstadosPago.TOTAL),
              null,
              pedido.Pedido.CodigoEstadoConfirmacion,
              fechaEntrega,
              pedido.Pedido.CodigoEstadoPreparacion,
              pedido.Pedido.CodigoPrioridad,
              pedido.Pedido.CodigoEstadoPedido,
              pedido.Pedido.AumentoListaPorcentaje,
              null,
              null,
              pedido.Pedido.IdSucursalCliente,
              arraylistaArticulo,
              pedido.Pedido.IdSucursalEmpleado,
              pedido.Pedido.CodigoEstadoComision,
              pedido.Pedido.Observacion,
              pedido.Pedido.Iva,
              pedido.Pedido.CantidadArticulo,
              pedido.Pedido.PrecioTotal,
              pedido.Pedido.ComisionTotal,
              data.formaPago,
              null,
              fechaPedido,
              pedido.Pedido.NotaCredito,
              pedido.Pedido.PedidoAsociadoId,
              this.tipoTarjeta,
              0,
              0,
              0,
              pedido.Pedido.AumentoPorcentaje
            );

            await this.pedidoServ.editarPedidos(pagoPedidoPendiente).toPromise();
            pedidosPendientesPagados.push(this.pedidoLista.Pedidos[this.pedidosCambiarEstadoIndices[index]]);


          }

        };

        // @ts-ignore
        await forLoop();
        loadRef.close();
        const dialogRefFacturas = this.dialog.open(FacturaPedidosPendientesModalComponent, {
          width: '600px',
          data: {
            pedidosPendientesPagados: pedidosPendientesPagados
          }
        });

        this.buscar();
        this.pedidosCambiarEstadoIndices =[];
        this.pedidosPendientesIndices = [];
        this.pedidosPendientesMonto = 0;
      }
    });

  }

  async cambiarEstado(event: any, i: number) {
    if (event.target.checked) {
      this.pedidosImprimir = [];
      this.pedidosCambiarEstadoIndices.push(i);
      const index = this.pedidosCambiarEstadoIndices.indexOf(i);
      for (let index = 0; index < this.pedidosCambiarEstadoIndices.length; index++) {
      this.pedidosImprimir.push(this.pedidoLista.Pedidos[this.pedidosCambiarEstadoIndices[index]].Id);
      }
    }
    else
    {
      let index2 = 0;
      //this.articulosResaltar = [];
      //this.articulosResaltar.push(i);
      const index = this.pedidosCambiarEstadoIndices.indexOf(i);

      for (let item of this.pedidosCambiarEstadoIndices) {
        if(item == i)
        {
          this.pedidosImprimir.splice(index2,1);
          this.pedidosImprimir.splice(index2,1);
        }
        index2++;
        }
        console.log(this.pedidosImprimir);
    }
  }
  async agregarPagoPendiente(event: any, i: number) {
    if (event.target.checked) {
      this.pedidosPendientesIndices.push(i);
      const index = this.pedidosPendientesIndices.indexOf(i);
      if (index !== -1) {
        console.log('pagar');
        this.pedidosPendientesMonto +=
        (this.pedidoLista.Pedidos[i].pagoFinal ? this.pedidoLista.Pedidos[i].pagoFinal : this.pedidoLista.Pedidos[i].PrecioTotal) -
        this.getMontoNCAsociado(this.pedidoLista.Pedidos[i].Id);
        /*
        if(this.pedidoLista.Pedidos[i].PagoFinal != null && this.pedidoLista.Pedidos[i].PagoFinal != 0)
        {
          this.pedidosPendientesMonto +=this.pedidoLista.Pedidos[i].PagoFinal;
        }
        else
        {
          this.pedidosPendientesMonto +=
          this.pedidoLista.Pedidos[i].PrecioTotal -
          this.getMontoNCAsociado(this.pedidoLista.Pedidos[i].Id);
        }
         */
      }
    } else {
      const index = this.pedidosPendientesIndices.indexOf(i);
      if (index !== -1) {
        this.pedidosPendientesMonto -=
          this.pedidoLista.Pedidos[i].pagoFinal ? this.pedidoLista.Pedidos[i].pagoFinal : this.pedidoLista.Pedidos[i].PrecioTotal +
            this.getMontoNCAsociado(this.pedidoLista.Pedidos[i].Id);
        this.pedidosPendientesIndices.splice(index, 1);
      }
    }
    this.pedidosPendientesMonto = +(Math.round(this.pedidosPendientesMonto * 100) / 100).toFixed(2);

  }

  async seleccionarTodosPedidosCambioEstado(event: any) {
    this.pedidosCambiarEstadoIndices = [];
    this.pedidosImprimir = [];

    for (let i = 0; i < this.pedidoLista.Pedidos.length; i++) {
      if (event.target.checked) {
        this.pedidosCambiarEstadoIndices.push(i);
      }
      this.pedidoLista.Pedidos[i].pedidosPendienteChecked = event.target.checked;
    }
    for (let index = 0; index < this.pedidosCambiarEstadoIndices.length; index++) {
      this.pedidosImprimir.push(this.pedidoLista.Pedidos[this.pedidosCambiarEstadoIndices[index]].Id);
      }
  }

  async seleccionarTodosPedidosPendientes(event: any) {
    this.pedidosPendientesIndices = [];
    this.pedidosPendientesMonto = 0;

    for (let i = 0; i < this.pedidoLista.Pedidos.length; i++) {
      if (event.target.checked && !this.pedidoLista.Pedidos[i].esParcial) {
        this.pedidosPendientesIndices.push(i);
        this.pedidosPendientesMonto +=
          (this.pedidoLista.Pedidos[i].pagoFinal ? this.pedidoLista.Pedidos[i].pagoFinal : this.pedidoLista.Pedidos[i].PrecioTotal) -
          - this.getMontoNCAsociado(this.pedidoLista.Pedidos[i].Id);
      }
      this.pedidoLista.Pedidos[i].pedidosPendienteChecked = event.target.checked;
    }
    this.pedidosPendientesMonto = +(Math.round(this.pedidosPendientesMonto * 100) / 100).toFixed(2);

  }

  validarEstadoPagoEstadoEntrega() {
    let flag = true;
    this.flag = true;
    if (this.pedidoLista !== undefined) {
      this.pedidoLista.Pedidos.forEach((item: any) => {
        if (item.UltimoEstadoPago !== EstadosPago.PARCIAL && item.UltimoEstadoPago !== EstadosPago.PENDIENTE) {
          flag = false;
          this.flag = false;
        }
      });
    }

    return flag;
  }

  async abrirPagarPedidosPendientes() {
    const dialogRef = this.dialog.open(PagosPedidosPendientesModalComponent, {
      width: '600px',
      data: {
        pedidosPendientesMonto: this.pedidosPendientesMonto,
        pedidosPendientes: this.pedidosPendientesIndices.length,
      }
    });

    dialogRef.afterClosed().subscribe(async data => {
      if (data.result) {
        console.log(data.formaPago);
        const loadRef = this.generalServ.loadingModal();
        var pedidosPendientesPagados: any = [];

        const forLoop = async (_: any) => {

          for (let index = 0; index < this.pedidosPendientesIndices.length; index++) {
            const pedido: any = await this.pedidoServ.getPedidoById({
              'idPedido': this.pedidoLista.Pedidos[this.pedidosPendientesIndices[index]].Id,
              'idClienteNegotis': localStorage.getItem('idClienteNegotis')
            }).toPromise();

            let arraylistaArticulo: any = [];

            pedido.ListPedidoArticulo.forEach((item: any) => {
              arraylistaArticulo.push({
                'idArticulo': item.IdArticulo,
                'cantidad': item.Cantidad,
                'precioBase': item.PrecioBase,
                'precioFinal': item.PrecioFinal,
                'descuentoPorcentaje': item.DescuentoPorcentaje,
                'unidad': item.Unidad,
                'kilogramo': item.Kilogramo,
                'precioCosto': item.PrecioCosto
              });
            });

            const getFechaEntrega = new Date(Number(pedido.Pedido.FechaEntrega
              .replace('/Date(', '').replace(')/', '')));
            const fechaEntrega = getFechaEntrega.getUTCDate().toString().padStart(2, '0') + '/' + (getFechaEntrega
              .getUTCMonth() + 1).toString().padStart(2, '0') + '/' + getFechaEntrega.getUTCFullYear().toString().padStart(4, '0');

            const getFechaPedido = new Date(Number(pedido.Pedido.FechaPedido
              .replace('/Date(', '').replace(')/', '')));
            const fechaPedido = getFechaPedido.getUTCDate().toString().padStart(2, '0') + '/' + (getFechaPedido
              .getUTCMonth() + 1).toString().padStart(2, '0') + '/' + getFechaPedido.getUTCFullYear().toString().padStart(4, '0');

            const pagoPedidoPendiente = new PedidoCrearEditarModel(
              pedido.Pedido.Id,
              localStorage.getItem('idUser'),
              localStorage.getItem('idClienteNegotis'),
              pedido.Pedido.IdCliente,
              localStorage.getItem('idUser'),
              pedido.Pedido.CodigoEstadoEntrega,
              PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PAGO, EstadosPago.TOTAL),
              null,
              pedido.Pedido.CodigoEstadoConfirmacion,
              fechaEntrega,
              pedido.Pedido.CodigoEstadoPreparacion,
              pedido.Pedido.CodigoPrioridad,
              pedido.Pedido.CodigoEstadoPedido,
              pedido.Pedido.AumentoListaPorcentaje,
              null,
              null,
              pedido.Pedido.IdSucursalCliente,
              arraylistaArticulo,
              pedido.Pedido.IdSucursalEmpleado,
              pedido.Pedido.CodigoEstadoComision,
              pedido.Pedido.Observacion,
              pedido.Pedido.Iva,
              pedido.Pedido.CantidadArticulo,
              pedido.Pedido.PrecioTotal,
              pedido.Pedido.ComisionTotal,
              data.formaPago,
              null,
              fechaPedido,
              pedido.Pedido.NotaCredito,
              pedido.Pedido.PedidoAsociadoId,
              this.tipoTarjeta,
              0,
              0,
              0,
              pedido.Pedido.AumentoPorcentaje,
              pedido.Pedido.PrecioTotal,
              pedido.Pedido.NotaDebito,
              0,
              0 ,
              null,
              "",
              "",
              false,
              0,
              null,
              null,
              null,
              null,
              0
            );

            await this.pedidoServ.crearEditar(pagoPedidoPendiente).toPromise();

            pedidosPendientesPagados.push(this.pedidoLista.Pedidos[this.pedidosPendientesIndices[index]]);
          }

        };

        // @ts-ignore
        await forLoop();

        loadRef.close();

        if(data.formaPago === PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.FORMA_PAGO, FormasPago.CHEQUE))
        {
            this.request = new CuentaDetalleModel();
            this.request.idClienteNegotis = this.idClienteNegotis;
            this.request.idSucursal = this.idSucursalVendedor;
            this.request.idUser = localStorage.getItem('idUser');

            this.request.importe  =  data.totalCheque;
            this.request.librador = "";
            this.request.numero = data.numeroCheque;
            this.request.plaza = "";
            this.request.banco = "";
            this.request.cuit = "";
            this.request.idCliente = this.idCliente;
            this.request.idEstadoCompra =19;
            this.request.cuenta = "";
            this.request.fechaVencimiento = data.vencimientoCheque;
            this.request.fechaIngresoValor = this.fechaHoy;
            this.request.fechaEmision = this.fechaHoy;
          await  this.cuentaDetalleServ.crearEditar(this.request).toPromise();
        }
        // pedidosPendientesPagados

        const dialogRefFacturas = this.dialog.open(FacturaPedidosPendientesModalComponent, {
          width: '600px',
          data: {
            pedidosPendientesPagados: pedidosPendientesPagados
          }
        });

        this.buscar();

        this.pedidosPendientesIndices = [];
        this.pedidosPendientesMonto = 0;
      }
    });
  }

  async buscarPedidosPagos() {
    this.pedidoLista.Pedidos = this.pedidoLista.Pedidos.filter((x: any) => x.UltimoEstadoPago === EstadosPago.PENDIENTE || x.UltimoEstadoPago === EstadosPago.PARCIAL);
    const forLoop = async (_: any) => {
      for (let index = 0; index < this.pedidoLista.Pedidos.length; index++) {
        const result = await this.pedidoServ.getPedidosPagos({
          'idPedido': this.pedidoLista.Pedidos[index].Id
        }).toPromise();
        this.pedidoLista.Pedidos[index].PedidosPago = result;
      }
    };

    // @ts-ignore
    await forLoop();

    this.verificarPedidosParciales();
  }


  validarPedidos() {
    if (this.pedidoLista) {
      return this.pedidoLista.Pedidos.length > 0;
    }
    return false;
  }

  validarMultipleFiltro() {
    return this.multiple !== '' && this.pedidoLista.Pedidos.length > 0;
  }

  private getMontoNCAsociado(id: number) {
    const pedido = this.pedidoLista.Pedidos.find((x: any) => x.IdPedidoAsociado === id);
    if (pedido !== undefined) {
      return pedido.PrecioTotal;
    } else {
      return 0;
    }
  }

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

  goToPage(n: number): void {
    this.page = n;
    this.seleccionarTodos = false;
    this.buscar();
  }
  onNext(): void {
    this.page++;
    this.seleccionarTodos = false;
    this.buscar();
  }
  onPrev(): void {
    this.page--;
    this.buscar();
  }
}
