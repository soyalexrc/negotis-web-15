import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { CompraproveedorService } from '../../../Service/compraproveedor.service';
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
import { ClienteclienteService } from '../../../Service/clientecliente.service';
import { CompraFiltroViewModel } from 'src/app/pages/cliente/compraprovider-panel/CompraFiltroModel';
import PropertyUtil, { FormasPago, EstadosEntrega } from '../../../util/property.util';
import { EstadosPago, TiposPropiedad } from '../../../util/property.util'
import { UserService } from '../../../Service/user.service';
import * as moment from 'moment';
import { CambiarEstadoModalComponent } from 'src/app/components/cambiar-estado-modal/cambiar-estado-modal.component';
import { CompraProveedorModel, CompraProveedorModelPagedResponse, CompraProveedorPagoModel } from '../../../models/CompraProveedorModel';
import { ProveedorService } from 'src/app/Service/proveedor.service';
import { CompraFiltroRequest } from './CompraFiltroRequest';
import { CambiarEstadoCompraRequest } from './CambiarEstadoCompraRequest';
import { stringify } from 'querystring';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-compraprovider-panel',
  templateUrl: './compraprovider-panel.component.html',
  styleUrls: ['./compraprovider-panel.component.css']
})
export class CompraproviderPanelComponent implements OnInit {
  private readonly keyLastCompraFilter = 'compra-panel_LastFilter';

  //AUTOCOMPLETE_FIELDS
  ctrlProveedor = new FormControl();
  filteredProveedor!: Observable<any>;
  proveedores!: any[];

  //ESTATICOS
  formasPago = PropertyUtil.getPropertiesByType(TiposPropiedad.FORMA_PAGO);
  estadosEntrega = PropertyUtil.getPropertiesByType(TiposPropiedad.ESTADO_ENTREGA);
  estadosPago = PropertyUtil.getPropertiesByType(TiposPropiedad.ESTADO_PAGO);
  codigosEstadosPagoPendiente = PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PAGO,'PENDIENTE');
  codigosEstadosPagoParcial = PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PAGO,'PARCIAL');
  idClienteNegotis = localStorage.getItem('idClienteNegotis');
  token = localStorage.getItem('token');

  //VARIABLES PAGOS PARCIALES
  flagPagosParciales:any;
  listaCompras:any;
  pagoFinal:any;
  totalPagado: any = 0;

  //FORM
  filtro = new CompraFiltroViewModel();
  idCompra: any;
  idSucursal: any;
  proveedor: any;

  //TABLE
  deudaCalculada: any = 0;
  listaCompra!: CompraProveedorModel[] | any[];

  montoTotalCompras = 0;
  montoTotalPagado = 0;

  //paging
  page: any = 0;
  limit: any = 0;
  total: any = 0;

  //Roles
  rolEliminarCompra: boolean = false;
  ocultarFiltroCompras: boolean = false;
  turnoCaja: boolean = false;
  visualizarCambioEstados = false;

  //Print
  public urlImprimir!: string;


  //TURNO
  turno: any;

  //REFERENCIAS HTML
  @ViewChild('numFactura') numFactura!: ElementRef;

  constructor(
    private titleService: Title,
    private compraServ: CompraproveedorService,
    private provServ: ProveedorService,
    private sucursalServ: SucursalService,
    private dialog: MatDialog,
    private calendar: NgbCalendar,
    private router: Router,
    private generalServ: GeneralService,
    private route: ActivatedRoute,
    private globalService: GlobalService,
    private clienteServ: ClienteclienteService,
    private userServ: UserService
  ) {
    titleService.setTitle("Compras");
  }

  ngOnInit() {

    const dataTurno = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
      this.userServ.obtenerTurno(dataTurno).subscribe((data: any) => {
        this.turno = data;
      }, (error: any) => { console.log(error);});

    const roles = JSON.parse(localStorage.getItem('roles') ?? '');
    const soporte = eval(localStorage.getItem('soporte') ?? '') || false;
    this.rolEliminarCompra=(roles != null && roles.EliminarComprasProveedor);
    this.ocultarFiltroCompras = (roles != null && roles.OcultarFiltrosCompras);
    this.turnoCaja = (roles != null && roles.TurnosCaja) || soporte;
    this.visualizarCambioEstados = (roles != null && roles.VisualizarCambioEstados);
    this.initAutoProveedor();
    this.initFiltro();
  }

  ngAfterViewInit() {
    this.buscar();
  }


  initFiltro() {
    this.filtro.fechaDesde = this.calendar.getToday().day.toString().padStart(2, '0') + '/' + this.calendar.getToday().month.toString().padStart(2, '0') + '/' + this.calendar.getToday().year.toString().padStart(4, '0');
    this.filtro.fechaHasta = this.calendar.getToday().day.toString().padStart(2, '0') + '/' + this.calendar.getToday().month.toString().padStart(2, '0') + '/' + this.calendar.getToday().year.toString().padStart(4, '0');
    this.setCompra(true);

    const strFiltro = localStorage.getItem('compraProveedorFiltro');
    if (strFiltro != null) {
      this.filtro = JSON.parse(strFiltro);
    }
  }

  setCompra(value: boolean) {
    this.filtro.chkCompra = value;
  }

  limpiar() {
    localStorage.removeItem('compraProveedorFiltro');
    this.filtro = new CompraFiltroViewModel();
    this.proveedor="";
    this.initFiltro();
    this.buscar();
  }

  buscar() {
    localStorage.setItem('compraProveedorFiltro', JSON.stringify(this.filtro));
    //Buscar
    let request = new CompraFiltroRequest();
    request.estadoEntrega = this.filtro.estadoEntrega;
    request.estadoPago = this.filtro.estadoPago;
    if (this.filtro.chkCompra) {
      request.fechaCompraDesde = this.filtro.fechaDesde;
      request.fechaCompraHasta = this.filtro.fechaHasta;
    } else {
      request.fechaEntregaDesde = this.filtro.fechaDesde;
      request.fechaEntregaHasta = this.filtro.fechaHasta;
    }
    request.formaPago = this.filtro.formaPago;
    request.idClienteNegotis = localStorage.getItem('idClienteNegotis');
    if (this.filtro.selectedProveedor != null) {
      request.idProveedor = this.filtro.selectedProveedor.id;
    }
    request.idSucursal = this.idSucursal;
    request.tipoComprobante = this.filtro.tipoComprobante;
    request.numeroComprobante = this.filtro.numeroComprobante;
    request.page = this.page;
    request.pageSize = this.limit;

    let loading = this.generalServ.loadingModal();
    this.compraServ.getComprasPorFiltros(request).subscribe((response: CompraProveedorModelPagedResponse | any) => {

      this.listaCompra = response.lista;
      console.log(this.listaCompra);
      this.listaCompras = response.lista;
      this.page = response.page;
      this.limit = response.pageSize;
      this.total = response.totalItems;
      this.montoTotalCompras = response.totalCompras;
      this.montoTotalPagado = response.totalPagado;

      if (this.filtro.formaPago === PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.FORMA_PAGO, FormasPago.CTA_CTE) && this.validarPedidos()) {
        this.flagPagosParciales=0;
        this.buscarComprasPagas();
      }
      this.recalcularDeuda();
      this.armarUrlBusqueda();
      loading.close();
    }, error => {
      console.log(error);
      loading.close();
    });
  }

  armarUrlBusqueda() {
    // this.fechaDesdeFormat = this.fechaDesde.split("/").reverse().join("/");
    // this.fechaHastaFormat = this.fechaHasta.split("/").reverse().join("/");
    let request = new CompraFiltroRequest();
    request.estadoEntrega = this.filtro.estadoEntrega;
    request.estadoPago = this.filtro.estadoPago;
    if (this.filtro.chkCompra) {
      request.fechaCompraDesde = this.filtro.fechaDesde;
      request.fechaCompraHasta = this.filtro.fechaHasta;
    } else {
      request.fechaEntregaDesde = this.filtro.fechaDesde;
      request.fechaEntregaHasta = this.filtro.fechaHasta;
    }
    request.formaPago = this.filtro.formaPago;
    request.idClienteNegotis = localStorage.getItem('idClienteNegotis');
    if (this.filtro.selectedProveedor != null) {
      request.idProveedor = this.filtro.selectedProveedor.id;
    }
    request.idSucursal = this.idSucursal;
    request.tipoComprobante = this.filtro.tipoComprobante;
    request.numeroComprobante = this.filtro.numeroComprobante;



      this.urlImprimir = this.globalService.urlApi + '/ApiCompraProveedor/Get/Pdf/Listado/Busqueda?' +
      'idClienteNegotis=' + localStorage.getItem('idClienteNegotis') +
      '&idSucursal=' + this.idSucursal +
      '&idProveedor=' + request.idProveedor +
      '&estadoEntrega=' + this.filtro.estadoEntrega +
      '&estadoPago=' + this.filtro.estadoPago +
      '&formaPago=' + this.filtro.formaPago +
      '&fechaCompraDesde=' + this.filtro.fechaDesde +
      '&fechaCompraHasta=' + this.filtro.fechaHasta +
      '&numeroComprobante=' + this.filtro.numeroComprobante +
      '&tipoComprobante=' + this.filtro.tipoComprobante +
      '&page=' + this.page +
      '&pageSize=' + this.limit +
      '&token=' + localStorage.getItem('token')

  }






  validarPedidos() {
    if (this.listaCompra) {
      return this.listaCompra.length > 0;
    }
    return false;
  }

  async buscarComprasPagas() {
    this.listaCompra = this.listaCompra.filter(x => x.datosPago.codigoEstadoPago === this.codigosEstadosPagoPendiente || x.datosPago.codigoEstadoPago === this.codigosEstadosPagoParcial);
    const forLoop = async (_: any) => {
      for (let index = 0; index < this.listaCompra.length; index++) {
        const result = await this.compraServ.getComprasPagos({
          'idCompra': this.listaCompras[index].idCompra
        }).toPromise();
        this.listaCompras[index].ComprasPagas = result;
      }
    };

    // @ts-ignore
    await forLoop();

    this.verificarComprasParciales();
  }

  verificarComprasParciales() {
    this.montoTotalCompras=0;
    if(this.flagPagosParciales === 0){
      this.flagPagosParciales=1;
    let pedidosAux: any = [];
    this.listaCompras.forEach((item: any, index: any, object: any) => {
      if (item.ComprasPagas) {
        this.pagoFinal = 0;
        let pedidoCtaCteIndex: any = null;

        const pedidosPagoCtaCte = item.ComprasPagas.filter((x: any) => x.FormaPago === PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.FORMA_PAGO, FormasPago.CTA_CTE));
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

        const pedidosPagoNoCtaCte = item.ComprasPagas.filter((x: any) => x.FormaPago !== PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.FORMA_PAGO, FormasPago.CTA_CTE));

        item.ComprasPagas = [];

        if (pedidoPagoCtaCteAuxActual !== null) {
          item.ComprasPagas.push(pedidoPagoCtaCteAuxActual);
        }

        if (pedidosPagoNoCtaCte.length > 0) {
          pedidosPagoNoCtaCte.forEach((pedidoPagoNoCtaCte: any) => item.ComprasPagas.push(pedidoPagoNoCtaCte));
        }

        item.ComprasPagas.forEach((itemCompraPago: any) => {
          const itemAux = { ...item };
          itemAux.UltimaFormaPago = itemCompraPago.FormaPago;
          itemAux.UltimoEstadoPago = itemCompraPago.EstadoPago;
          itemAux.PrecioTotal = itemCompraPago.Monto;


          if (itemAux.UltimoEstadoPago === EstadosPago.PARCIAL) {

            itemAux.esParcial = true;
            this.pagoFinal += itemAux.PrecioTotal;
          }

          pedidosAux.push(itemAux);

          if (itemAux.UltimoEstadoPago !== EstadosPago.PARCIAL) {
            this.montoTotalCompras += itemAux.totalCompra;
            pedidoCtaCteIndex = pedidosAux.indexOf(itemAux);
          }
        });
        pedidosAux[pedidoCtaCteIndex].PagoFinal = pedidosAux[pedidoCtaCteIndex].totalCompra - this.pagoFinal;
        this.totalPagado += pedidosAux[pedidoCtaCteIndex].PagoFinal;
      }
    });
    this.listaCompra = pedidosAux;
    console.log(this.listaCompra);
    this.total=pedidosAux.length;
    let pagado = this.montoTotalCompras - this.totalPagado;
    this.montoTotalPagado = pagado;
    this.totalPagado = 0;

  }
  }



  recalcularDeuda() {
    if (this.listaCompra == null) return;
    this.deudaCalculada = 0;

    this.listaCompra.forEach((item) => {
      let checked = (item as any).compraChecked == true;
      if (checked) {
        this.deudaCalculada += item.totalCompra - item.totalPagado;
      }
    });
  }

  cambiarEstados(value:any) {


    const dialogRef = this.dialog.open(CambiarEstadoModalComponent, {
      width: '600px',
      data: {
        'idCompra': this.listaCompra,
        'compra' : true
      }
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data.result == true) {
        let loading = this.generalServ.loadingModal();

        let formaPagoCtaCte = PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.FORMA_PAGO, FormasPago.CTA_CTE);

        let request = new CambiarEstadoCompraRequest();
        request.codigoEstadoEntrega = data.estadoEntrega;
        request.codigoEstadoPago = data.estadoPago;
        request.codigoFormaPago = data.formaPago;
        request.selectedIds = this.listaCompra.filter(x => (x as any).compraChecked == true).map(x => x.idCompra);

        this.compraServ.cambiarEstadoCompra(request).subscribe(result => {
          this.buscar();
          loading.close();
        }, error => {
          loading.close();
        });
      }
    });
  }

  crearNotaCredito(nroFactura: any) {
    const loading = this.generalServ.loadingModal();

    const request = {
      'idCompra': nroFactura,
      'idClienteNegotis': localStorage.getItem('idClienteNegotis')
    };
    this.compraServ.getCompraById(request).subscribe(data => {
      loading.close();

      const response = data as any;

    //  if (response == null ||
      //  response.Pedido == null) {
       // this.dialog.open(MensajeModalComponent, {
       //   width: '450px',
       //   data: {
      //      titulo: 'Error al abrir pedido',
      //      mensaje: 'No se ha podido abrir el pedido debido a que o no esta facturado o no existe.'
      //    }
     //   });

    //    return;
      //}

      this.router.navigate(['/cliente/compras/crear'], { queryParams: {pedidoAsociadoId: nroFactura,notaCredito: true } });
    }, error => {
      console.log(error);
      loading.close();
    });
  }

  //#region TableMethods
  seleccionarTodosPedidosPendientes(event: any) {
    if (this.listaCompra == null) return;

    this.listaCompra.forEach((item) => {
      (item as any).compraChecked = event.target.checked;
    });

    this.recalcularDeuda();
  }

  esCompraPagable(item: CompraProveedorModel) {
    let estadoPagoPagable = PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PAGO, EstadosPago.TOTAL);
    return item.datosPago.codigoEstadoPago != estadoPagoPagable;
  }

  getProveedorName(id: any) {
    let selected = this.proveedores.find(x => x.id == id);
    if (selected == null) {
      return '';
    }
    else if(selected.razonSocial != null) {
      return selected.razonSocial;
    }
    else{
      return selected.nombre;
    }
  }

  getFormaDePago(pago: CompraProveedorPagoModel) {
    let founded = this.formasPago.find(x => x.Id == pago.codigoFormaPago);
    if (founded == null) {
      return '';
    }
    else {
      return founded.Valor;
    }
  }

  getEstadoDePago(pago: CompraProveedorPagoModel) {
    let founded = this.estadosPago.find(x => x.Id == pago.codigoEstadoPago);
    if (founded == null) {
      return '';
    }
    else {
      return founded.Valor;
    }
  }

  getEstadoEntrega(code: any) {
    let founded = this.estadosEntrega.find(x => x.Id == code);
    if (founded == null) {
      return '';
    }
    else {
      return founded.Valor;
    }
  }

  getEstadoCompra(compra: CompraProveedorModel) {
    let pagoTotal = compra.datosPago.codigoEstadoPago == PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PAGO, EstadosPago.TOTAL);
    let entregado = compra.estadoEntrega == PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_ENTREGA, EstadosEntrega.ENTREGADO);
    if (pagoTotal && entregado) {
      return 'CERRADO';
    }
    else {
      return 'ABIERTO';
    }
  }

  delete(compra: CompraProveedorModel) {
    let loading = this.generalServ.loadingModal();
    this.compraServ.eliminarCompra({ idCompra: compra.idCompra }).subscribe(
      result => {
        this.buscar();
        loading.close();
      },
      error => {
        loading.close();
      }
    );
  }
  //#endregion

  //#region Paging

  goToPage(event: any) {
    let actualPage = this.page;
    this.page = event - 1;
    if (actualPage != this.page) {
      this.buscar();
    }
  }

  onNext() {
    let actualPage = this.page;
    let maxPage = this.limit == 0 || this.total == 0 ? 0 : Math.ceil(this.total / this.limit);
    this.page = Math.min(maxPage - 1, this.page + 1);
    if (actualPage != this.page) {
      this.buscar();
    }
  }

  onPrev() {
    let actualPage = this.page;
    this.page = Math.max(0, this.page - 1);
    if (actualPage != this.page) {
      this.buscar();
    }
  }

  //#endregion

  @HostListener('window:keyup', ['$event'])
  focusCodigo(event: any) {
    if (event.keyCode === 107) {
      this.router.navigate(['/cliente/compras++/crear'], { replaceUrl: false });
    }
    if (event.keyCode === 115) {
      this.numFactura.nativeElement.focus();
    }
  }

  getSucursal(value: any) {
    this.idSucursal = value.Sucursal.Id;
  }

  //#region autoProveedor
  selectProveedor = (key: any) => { this.filtro.selectedProveedor = key.option.value; }
  resetProveedor = () => { this.filtro.selectedProveedor = null; }
  displayProveedorSelected = (option?: any): string => option ? option.razonSocial ? option.razonSocial : option.nombre : '';
  displayProveedorOption = (option?: any): string => option ? option.razonSocial ? option.razonSocial : option.nombre : '';
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
  //#endregion autoProveedor

  //#region fechas
  fechaDesdeFunc() {
    this.runDatePicker().subscribe(result => {
      this.filtro.fechaDesde = this.getDateAsString(result);
    });
  }

  fechaHastaFunc() {
    this.runDatePicker().subscribe(result => {
      this.filtro.fechaHasta = this.getDateAsString(result);
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
  //#endregion fechas
}
