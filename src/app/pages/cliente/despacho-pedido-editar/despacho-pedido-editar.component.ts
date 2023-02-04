import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { PedidoService } from '../../../Service/pedido.service';
import { ArticuloService } from '../../../Service/articulo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneralService } from '../../../Service/general.service';
import { SucursalService } from '../../../Service/sucursal.service';
import { MatDialog } from '@angular/material/dialog';
import { DatepickerModalComponent } from '../../../components/datepicker-modal/datepicker-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarOperacionExitosaComponent } from '../../../components/snack-bar-operacion-exitosa/snack-bar-operacion-exitosa.component';
import { GlobalService } from '../../../Service/global.service';
import { NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { FotoCrearEditarModalComponent } from '../../../components/foto-crear-editar-modal/foto-crear-editar-modal.component';
import { EspecificacionModalComponent } from '../../../components/especificacion-modal/especificacion-modal.component';
import PropertyUtil, {TiposPropiedad} from '../../../util/property.util';
import {EstadosEntrega, EstadosPago, Prioridades, FormasPago, EstadosPedido} from '../../../util/property.util'
import {PedidoDespachoEditarModel} from './PedidoDespachoEditarModel';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-despacho-pedido-editar',
  templateUrl: './despacho-pedido-editar.component.html',
  styleUrls: ['./despacho-pedido-editar.component.css']
})
export class DespachoPedidoEditarComponent implements OnInit {

  razonSocialCtrl = new FormControl();
  filteredRazonSocial!: Observable<any[]>;

  cliSucursalCtrl = new FormControl();
  filteredCliSucursal!: Observable<any[]>;

  myForm: FormGroup;
  submitted!: boolean;
  postPedido: any;
  idPedido: any = 0;
  pedidoById: any;
  iva: boolean = true;

  idCliente: any;
  cliente: any;
  vendedor: any;
  observacion: any;
  estadoEntrega: any = PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_ENTREGA, EstadosEntrega.PENDIENTE);
  estadosEntrega = PropertyUtil.getPropertiesByType(TiposPropiedad.ESTADO_ENTREGA);
  estadoPago: any = PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PAGO, EstadosPago.TOTAL);
  comision: any = 0;
  estadoComision: any = null;
  estadoConfirmacion: any = null;
  estadosConfirmacion = PropertyUtil.getPropertiesByType(TiposPropiedad.ESTADO_CONFIRMACION);
  fechaEntrega: any = this.calendar.getToday().day + '/' + this.calendar.getToday().month + '/' + this.calendar.getToday().year;
  estadoPreparacion: any = null;
  estadosPreparacion = PropertyUtil.getPropertiesByType(TiposPropiedad.ESTADO_PREPARACION);
  prioridad: any = PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.PRIORIDAD, Prioridades.MEDIA);
  prioridades = PropertyUtil.getPropertiesByType(TiposPropiedad.PRIORIDAD);
  estadoPedido: any = null;
  estadosPedido = PropertyUtil.getPropertiesByType(TiposPropiedad.ESTADO_PEDIDO);
  aumentoLista: any = 0;
  idSucursalCliente: any = '';
  formaPago: any = PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.FORMA_PAGO, FormasPago.EFECTIVO);
  idSucursalVendedor: any;
  comisionTotal: any;
  pedidoCerrado!: boolean;
  infoGeneral: any;
  clienteSucursales: any;
  getArtByPost: any;
  getArtCant: any;
  activaListaAumento: boolean = true;
  codigo: any;
  listaArticulo: any[] = [];
  totalArticulos: any = 0;
  totalPrecio: any = 0;
  arraylistaArticulo: any[] = [];
  arrayValCantidad: any[] = [];
  getArrayValCantidad: any;
  arrayListAticuloSinStock: any[] = [];
  getStockToEdit: any;
  guardarAumentoLista!: boolean;
  aumentoListaViejo!: number;
  listadoArticulo: any;
  token: any;
  pagoParcial: number = 0;
  idClienteNegotis: any = localStorage.getItem('idClienteNegotis');
  pagoCantidad: any = 0;
  vuelto: any = 0;
  readOnlyCliente: boolean;
  restoApagarPagoParcial: number = 0;

  @ViewChild('codigoBarras') codigoInput!: ElementRef;
  @ViewChild('pagoCliente') pagoClienteInput!: ElementRef;

  constructor(private titleService: Title,private pedidoServ: PedidoService, private fb: FormBuilder,private articuloServ: ArticuloService,
    private router: Router, private route: ActivatedRoute, private generalServ: GeneralService,
    private sucursalServ: SucursalService, private dialog: MatDialog, private snackBar: MatSnackBar,
    private globalServ: GlobalService, private calendar: NgbCalendar) {
     titleService.setTitle("Caja");
    this.token = localStorage.getItem('token');
    this.myForm = fb.group({
      idSucursalCliente: ['', Validators.compose([Validators.required])],
      estadoEntrega: ['', Validators.compose([/*Validators.required*/])],
      estadoPago: ['', Validators.compose([Validators.required])],
      comision: ['', Validators.compose([Validators.required])],
      estadoConfirmacion: ['', Validators.compose([/*Validators.required*/])],
      fechaEntrega: ['', Validators.compose([Validators.required])],
      estadoPreparacion: ['', Validators.compose([/*Validators.required*/])],
      prioridad: ['', Validators.compose([Validators.required])],
      estadoPedido: ['', Validators.compose([/*Validators.required*/])],
      estadoComision: ['', Validators.compose([])],
      aumentoLista: ['', Validators.compose([Validators.required])],
      formaPago: ['', Validators.compose([])],
      pagoParcial: ['', Validators.compose([])],
      pagoCantidad: ['', Validators.compose([])],
      observacion: ['', Validators.compose([])],
    });
    route.params.subscribe(params => { this.idPedido = params['idpedido']; });
    if (this.idPedido != null) {
      const loading = this.generalServ.loadingModal();
      this.readOnlyCliente = true;
      let dataPedido = { 'idPedido': this.idPedido, 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
      this.pedidoServ.getPedidoById(dataPedido).subscribe(data => {
        this.pedidoById = data;
        if (this.pedidoById == null) {
          loading.close();
          this.generalServ.goToNoEncontrado();
        }

        this.idCliente = this.pedidoById.Pedido.IdCliente;
        this.cliente = this.pedidoById.Pedido.Cliente.RazonSocial;
        this.clienteSucursales = { 'ListSucursal': {} };
        this.clienteSucursales.ListSucursal = this.pedidoById.ListClienteSucursale;
        this.vendedor = this.pedidoById.Pedido.Vendedor.Apellidos;
        this.estadoEntrega = this.pedidoById.Pedido.CodigoEstadoEntrega;
        this.estadoPago = this.pedidoById.Pedido.CodigoEstadoPago;
        this.estadoConfirmacion = this.pedidoById.Pedido.CodigoEstadoConfirmacion;
        this.iva = this.pedidoById.Pedido.Iva;
        this.idSucursalVendedor = this.pedidoById.Pedido.IdSucursalEmpleado;

        let getFecha = new Date(Number(this.pedidoById.Pedido.FechaEntrega.replace('/Date(', '').replace(')/', '')));
        this.fechaEntrega = getFecha.getUTCDate() + '/' + (getFecha.getUTCMonth() + 1) + '/' + getFecha.getUTCFullYear();

        this.estadoPreparacion = this.pedidoById.Pedido.CodigoEstadoPreparacion;
        this.prioridad = this.pedidoById.Pedido.CodigoPrioridad;
        this.estadoPedido = this.pedidoById.Pedido.CodigoEstadoPedido;
        if (this.pedidoById.Pedido.Cliente.ListaPrecios != null) {
          this.aumentoLista = this.pedidoById.Pedido.AumentoListaPorcentaje;
        }
        this.idSucursalCliente = this.pedidoById.Pedido.IdSucursalCliente;
        this.estadoComision = this.pedidoById.Pedido.CodigoEstadoComision;
        this.formaPago = this.pedidoById.Pedido.CodigoFormaPago;
        this.observacion = this.pedidoById.Pedido.Observacion;

        if (this.pedidoById.Pedido.PagoParcial != null) {
          this.pagoParcial = this.pedidoById.Pedido.PagoParcial;
          this.restoApagarPagoParcial = this.pedidoById.Pedido.PrecioTotal - this.pedidoById.Pedido.PagoParcial;
        }

        if (this.estadoPedido == PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PEDIDO, EstadosPedido.CERRADO) &&
          this.estadoPago == PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PAGO, EstadosPago.TOTAL)) { this.pedidoCerrado = true }

        let idArtEditar = [];

        for (let item of this.pedidoById.ListPedidoArticulo) {
          this.listaArticulo.push(item.Articulo);

          item.Articulo.Cantidad = item.Cantidad;
          item.Articulo.PrecioFinal = item.PrecioFinal;
          item.Articulo.DescuentoPorcentaje = item.DescuentoPorcentaje;

          item.Articulo.AnteriorCantidad = item.Cantidad;
          item.Articulo.AnteriorPrecioFinal = item.PrecioFinal;
          item.Articulo.PrecioUnidad = (((Number(this.aumentoLista) * Number(item.PrecioBase)) / 100) + Number(item.PrecioBase));
          if (item.Articulo.DescuentoPorcentaje != 0) {
            item.Articulo.DescuentoPrecio = (item.Articulo.DescuentoPorcentaje * item.Articulo.PrecioUnidad) / 100;
            item.Articulo.PrecioUnidad = item.Articulo.PrecioUnidad - item.Articulo.DescuentoPrecio;
          } else {
            item.Articulo.DescuentoPrecio = 0;
          }
          if (this.iva == true) {
            item.Articulo.Iva = ((21 * item.Articulo.PrecioUnidad) / 100)
            item.Articulo.PrecioUnidad = item.Articulo.PrecioUnidad + item.Articulo.Iva;
          }
          item.Articulo.PrecioBase = item.PrecioBase;

          idArtEditar.push(item.Articulo.Id);

          this.totalArticulos = this.pedidoById.Pedido.CantidadArticulo;
          this.totalPrecio = this.pedidoById.Pedido.PrecioTotal;
        }
        if (idArtEditar.length > 0) {
          let buscarStock = { 'idArticulo': idArtEditar, 'idSucursal': this.pedidoById.Pedido.IdSucursalEmpleado };
          this.articuloServ.getListCantPorArtSuc(buscarStock).subscribe(data => {
            this.getStockToEdit = data;
            for (let item of this.pedidoById.ListPedidoArticulo) {
              for (let itemStock of this.getStockToEdit) {
                if (item.Articulo.Id == itemStock.IdArticulo) {
                  item.Articulo.Stock = itemStock.CantidadArticulo;
                }
              }
            }
          })
        }
        loading.close();
      }, error => { console.log(error); this.generalServ.goToNoEncontrado(); loading.close(); })
    } else {
      this.idPedido = 0;
      this.estadoPedido = PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_PEDIDO, EstadosPedido.ACTIVO);
      this.readOnlyCliente = false;
    }
  }

  ngOnInit() {
    let dataUser = {
      'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
      'desbloquados': true, 'idUser': localStorage.getItem('idUser'), 'crearEditar': true,
      'idPedido': Number(this.idPedido)
    }
    const loading = this.generalServ.loadingModal();
    this.pedidoServ.getInfoGeneral(dataUser).subscribe(data => {
      this.infoGeneral = data;
      this.comision = this.infoGeneral.PorcentajeComision;
      this.filteredRazonSocial = this.razonSocialCtrl.valueChanges
        .pipe(
          startWith(''),
          map(item => item ? this._filterRazonSocial(item) : this.infoGeneral.Clientes.slice())
        );
      if (this.infoGeneral.ClienteMostradorDefault == true && Number(this.idPedido) == 0) {
        this.idCliente = this.infoGeneral.IdClienteMostrador;
        this.aumentoLista = Number(this.infoGeneral.AumentoLista);
        this.activaListaAumento = this.infoGeneral.activaListaAumento;
        this.cliente = 'Mostrador';
      }
      loading.close();
    }, error => { console.log(error); loading.close(); });
  }



  especModal(value: any) {
    const dialogRef = this.dialog.open(EspecificacionModalComponent, {
      width: '450px', data: { especificacion: value },
    });
  }

  getSucursalVendedor(value: any) {
    if (this.idPedido == 0) {
      this.idSucursalVendedor = value.Sucursal.Id;
    }
  }

  private _filterRazonSocial(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.infoGeneral.Clientes.filter((item: any) => item.RazonSocial.toLowerCase().includes(filterValue.toLowerCase()));
  }


  datePicker() {
    const dialogRef = this.dialog.open(DatepickerModalComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.fechaEntrega = result.day + '/' + result.month + '/' + result.year;
      }
    });
  }


  onSubmit(value: any) {
    const loading = this.generalServ.loadingModal();

    //fecha de entrega para post
    var date = value.fechaEntrega;
    var d = new Date(date.split("/").reverse().join("-"));
    var dd = d.getDate();
    var mm = d.getMonth() + 1;
    var yy = d.getFullYear();
    let fechaEntregaPost = yy + "/" + mm + "/" + dd;

    let dataPedido = new PedidoDespachoEditarModel(
      Number(this.idPedido),
      localStorage.getItem('idClienteNegotis'),
      value.estadoEntrega,
      value.estadoPago,
      value.estadoConfirmacion,
      fechaEntregaPost,
    value.estadoPreparacion,
      value.prioridad,
      value.estadoPedido,
      value.idSucursalCliente,
      value.observacion
    );
    this.pedidoServ.despachoEditar(dataPedido)
      .subscribe(data => {
        this.postPedido = data;
        if (this.postPedido.Resultado == true) {
          this.snackBarOperacionExitosa();
        }
        loading.close();
      }, error => { console.log(error); loading.close(); });
    this.submitted = true;
  }

  snackBarOperacionExitosa() {
    this.router.navigate(["/cliente/despacho/pedido/panel"], { replaceUrl: true });
    this.snackBar.openFromComponent(SnackBarOperacionExitosaComponent, {
      duration: 1000,
    });
  }

  fotoModal(value: any) {
    const dialogRef = this.dialog.open(FotoCrearEditarModalComponent, {
      width: '750px', data: { idArticulo: value, editar: false },
    });
  }

}
