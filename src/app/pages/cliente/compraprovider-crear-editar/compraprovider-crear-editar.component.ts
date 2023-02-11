import { Component, OnInit, HostListener, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, fromEvent } from 'rxjs';
import { map, startWith, debounceTime } from 'rxjs/operators';
import { ArticuloService } from '../../../Service/articulo.service';
import { CompraproveedorService } from '../../../Service/compraproveedor.service';
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
import { ClienteclienteService } from '../../../Service/clientecliente.service';
import { PedidoArticuloModel } from '../../../models/PedidoArticuloModel';
import { ArticulosincantidadModalComponent } from 'src/app/components/articulosincantidad-modal/articulosincantidad-modal.component';
import PropertyUtil, { TiposPropiedad } from '../../../util/property.util';
import { EstadosEntrega, EstadosPago, Prioridades, FormasPago, EstadosPedido } from '../../../util/property.util'
import { CompraProveedorArticuloExtendido, CompraProveedorModel, CompraProveedorPagoModel } from 'src/app/models/CompraProveedorModel';
import { ProveedorService } from 'src/app/Service/proveedor.service';
import { ArticuloModule } from 'src/app/modules/articulo/articulo.module';
import { Title } from '@angular/platform-browser';
import { AgregarMPModalPrecioComponent } from 'src/app/components/agregarMP-precio-modal/agregarMP-precio-modal.component';
import { AgregarMPModalComponent } from 'src/app/components/agregarMP-modal/agregarMP-modal.component';
import { MateriaPrimaService } from 'src/app/Service/materiaprima.service';
import { UserService } from 'src/app/Service/user.service';
import { ListaPreciosService } from 'src/app/Service/lista-precios.service';

@Component({
  selector: 'app-compraprovider-crear-editar',
  templateUrl: './compraprovider-crear-editar.component.html',
  styleUrls: ['./compraprovider-crear-editar.component.css']
})
export class CompraproviderCrearEditarComponent implements OnInit, AfterViewInit {

  myForm: FormGroup;
  submitted!: boolean;
  idCompra: any = 0;
  filtroCarga: string = "";
  pageCarga: number = 1;
  idArtCarga: any;
  source: any;
  esNotaCredito!: boolean;
  pedidoAsociadoId: any;
  //Roles
  rolComprador = true;
  tieneRolProduccion = false;
  turnoCaja = false;
  tieneRolEditarPrecios = false;
  costoCheck = false;
  editarPrecios = false;
  tieneRolSaldoAFavor = false;
  //AUTOCOMPLETE_FIELDS
  ctrlProveedor = new FormControl();
  filteredProveedor!: Observable<any>;
  proveedores!: any[];

  listaNombres: any;
  listaPrecio : any;
  listaprecioID: any;
  lista: any;
  listaCtrl = new FormControl();
  filteredLista!: Observable<any[]>;
  listadoPrecios: any;
  artCargaSF: any;


  //ESTATICOS
  formasPago = PropertyUtil.getPropertiesByType(TiposPropiedad.FORMA_PAGO);
  estadosEntrega = PropertyUtil.getPropertiesByType(TiposPropiedad.ESTADO_ENTREGA);
  estadosPago = PropertyUtil.getPropertiesByType(TiposPropiedad.ESTADO_PAGO);
  idClienteNegotis = localStorage.getItem('idClienteNegotis');
  token = localStorage.getItem('token');

  //ESTADOS
  compraCerrada = false;
  compraMP = false;

  //REFERENCIAS AL HTML
  @ViewChild('codigoBarras') codigoInput!: ElementRef;
  @ViewChild('pagoCliente') pagoClienteInput!: ElementRef;
  @ViewChild('submit') submitForm!: ElementRef;

  //FORM
  selectedProvider: any;
  tasa: any;
  percepcion: any;
  retencion: any;
  formasPagoHabilitadas = this.formasPago;
  formaPago: any;
  estadosPagoHabilitadas = this.estadosPago;
  estadoPago: any;
  estadoEntrega: any;
  fechaCompra: any;
  fechaEntrega: any;
  tipoComprobante: any;
  numeroComprobante: any;
  idSucursal: any;
  proveedor: any;

  //Articulos
  listaArticulo: CompraProveedorArticuloExtendido[] | any = [];

  tieneRolCliente: any
  pesable: any;
  codigo: any;
  precioCostoCheck: any;
  //Pago
  observacion: any;
  totalArticulos = 0;
  totalAPagar = 0;
  totalPagado = 0;
  pagoParcial = 0;
  restoAPagar = 0;
  saldoAFavor = 0;
  saldoAFavorCompra = 0;

//TURNOS
turno: any;
turnos:any;

  constructor(
    private titleService: Title,
    private articuloServ: ArticuloService,
    private mpServ: MateriaPrimaService,
    private fb: FormBuilder,
    private compraServ: CompraproveedorService,
    private listaPrecServ: ListaPreciosService,
    private router: Router,
    private route: ActivatedRoute,
    private generalServ: GeneralService,
    private sucursalServ: SucursalService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    public globalServ: GlobalService,
    private calendar: NgbCalendar,
    private clienteServ: ClienteclienteService,
    private provServ: ProveedorService,
    private userServ:  UserService,

  ) {
    titleService.setTitle("Compras");
    this.token = localStorage.getItem('token');
    this.myForm = fb.group({
      formaPago: ['', Validators.compose([])],
      estadoPago: ['', Validators.compose([Validators.required])],
      estadoEntrega: ['', Validators.compose([])],
      fechaCompra: ['', Validators.compose([Validators.required])],
      fechaEntrega: ['', Validators.compose([Validators.required])],
      codigo: ['', Validators.compose([])],
      observacion: ['', Validators.compose([])],
      pagoParcial: ['', Validators.compose([])],
      numeroComprobante : ['', Validators.compose([])],
      tipoComprobante : ['', Validators.compose([])],
      tasa : ['', Validators.compose([])],
      retencion : ['', Validators.compose([])],
      percepcion : ['', Validators.compose([])],
      turno: ['', Validators.compose([])],
    });
    route.params.subscribe(params => {
      this.idCompra = params['idcompra'];
      if (this.idCompra == null) {
        this.idCompra = 0;
      }
    });
    route.queryParams.subscribe(params => {
      this.pedidoAsociadoId = params['pedidoAsociadoId'];
      this.esNotaCredito = params['notaCredito'];
    });

    this.cargarVistaNotaCredito();
    const dataTurno = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
    console.log('dataTurno', dataTurno);
      // this.userServ.obtenerTurnos(dataTurno).subscribe(data => {
      //   this.turnos = data;
      // }, error => { console.log(error);});
      this.userServ.obtenerTurno(dataTurno).subscribe((data: any) => {
        this.turno = data;
      }, (error: any) => { console.log(error);});
  }


  ngOnInit() {

    const roles = JSON.parse(localStorage.getItem('roles') ?? '[]');
    const tieneRolClienteNegotis = eval(localStorage.getItem('RolClienteNegotis') ?? 'false') || false;
    const soporte = eval(localStorage.getItem('soporte') ?? 'false') || false;
    this.tieneRolProduccion = (roles != null && roles.Produccion);
    this.turnoCaja = (roles != null && roles.TurnosCaja) || soporte;
    this.tieneRolEditarPrecios = (roles != null && roles.EditarPrecios) || soporte;
    this.costoCheck = (roles != null && roles.CostoCheck) || soporte;
    this.editarPrecios = (roles != null && roles.BloquearEditarCompras);
    this.tieneRolSaldoAFavor = (roles != null && roles.SaldoAFavorCompras);

    this.initAutoProveedorAsync(() => {

      this.fechaCompra = this.calendar.getToday().day.toString().padStart(2, '0') + '/' + this.calendar.getToday().month.toString().padStart(2, '0') + '/' + this.calendar.getToday().year.toString().padStart(4, '0');
      this.fechaEntrega = this.calendar.getToday().day.toString().padStart(2, '0') + '/' + this.calendar.getToday().month.toString().padStart(2, '0') + '/' + this.calendar.getToday().year.toString().padStart(4, '0');
      this.pesable = false;
      this.precioCostoCheck = false;
      this.codigo = null;
      if(this.costoCheck)
      {
        this.precioCostoCheck = true;
      }
      let dataUser = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis'), 'activo': true };
      this.listaPrecServ.ListaPreciosByIdClienteNegotis(dataUser)
        .subscribe(data => {
          this.listadoPrecios = data
          this.filteredLista = this.listaCtrl.valueChanges
          .pipe(
            startWith(''),
            map(item => item ? this._filterLista(item) : this.listadoPrecios.slice()));
        // loading.close();

        })

      if (this.idCompra != 0) {
        this.CargarCompraProveedorAsync();

      }
      else{
        this.updateDropdowns();
      }

    });



  }

  private _filterLista(value: string): any[] {
    const filterValue = value.toLowerCase();
     return this.listadoPrecios.filter((item: any) => item.Nombre.toLowerCase().includes(filterValue.toLowerCase()));
   }


   async cambiarLista(value: any) {


        this.listaprecioID = value.Id;
        this.listaPrecio  = value.Nombre;
        this.myForm.value.aumentoLista = 0;
        this.myForm.value.aumentoListaMonto = 0;
        if (this.listaArticulo.length > 0) {
          for (const item of this.listaArticulo) {
            this.totalAPagar = this.totalAPagar - item.PrecioFinal;
           // item.PrecioUnidad = (((Number(value.PorcentajeAumento) * Number(item.PrecioBase)) / 100) + Number(item.PrecioBase));

            if(value.Nombre == "Lista Costo")
            {
              item.PrecioCosto = item.PrecioCosto;
            }
            if(value.Nombre == "Lista Base")
            {
              item.PrecioCosto = item.PrecioBase;
            }
            if(value.Nombre == "Lista 1")
            {
              item.PrecioCosto = item.Precio1;
            }
            if(value.Nombre == "Lista 2")
            {
              item.PrecioCosto = item.Precio2;
            }
            if(value.Nombre == "Lista 3")
            {
              item.PrecioCosto = item.Precio3;
            }
            if(value.Nombre == "Lista 4")
            {
              item.PrecioCosto = item.Precio4;
            }
            if(value.Nombre == "Lista 5")
            {
              item.PrecioCosto = item.Precio5;
            }
            if(value.Nombre == "Lista 6")
            {
              item.PrecioCosto = item.Precio6;
            }
            if(value.Nombre == "Lista Ofertas")
            {
              item.PrecioCosto = item.PrecioXBulto;
            }
            if(value.Nombre == "Lista 7")
            {
              item.PrecioCosto = item.Precio7;
            }
            if(value.Nombre == "Lista 8")
            {
              item.PrecioCosto = item.Precio8;
            }
            if(value.Nombre == "Lista 9")
            {
              item.PrecioCosto = item.Precio9;
            }

            item.PrecioFinal = item.PrecioCosto;

            this.totalAPagar = this.totalAPagar + item.PrecioFinal;
          }
        }
      }


  cargarVistaNotaCredito() {

    if (this.pedidoAsociadoId != null) {
    let cargadorCompra = this.generalServ.loadingModal();

    let request = {
      idCompra: Number(this.pedidoAsociadoId),
      idClienteNegotis: this.idClienteNegotis
    }

    this.compraServ.getCompraById(request).subscribe((compra: any) => {

      console.log(compra);
      this.fechaCompra = compra.fechaCompra;
      this.fechaEntrega = compra.fechaEntrega;
      this.estadoEntrega = compra.estadoEntrega;
      this.ctrlProveedor.setValue(this.proveedores.find(x => x.id == compra.idProveedor));
      this.selectedProvider = this.proveedores.find(x => x.id == compra.idProveedor);

      this.listaArticulo = compra.articulos;
      this.observacion = compra.observacion;
      this.totalPagado = compra.totalPagado;
      this.idSucursal = compra.idSucursal;
      this.formaPago = compra.datosPago.codigoFormaPago;
      this.estadoPago = compra.datosPago.codigoEstadoPago
      this.numeroComprobante = compra.numeroComprobante;
      this.tipoComprobante = compra.tipoComprobante;
      this.tasa = this.selectedProvider.tasa;
      this.retencion = this.selectedProvider.retencion;
      this.percepcion = this.selectedProvider.percepcion;

      if (!this.esNotaCredito) {
        this.esNotaCredito = this.selectedProvider.NotaCredito;
      }

      this.calcularTotales();
      this.calcularResto();
      this.calcularInhabilitaciones();
      this.updateDropdowns();

      cargadorCompra.close();
    }, error => {
      cargadorCompra.close();
      this.generalServ.goToNoEncontrado();
    });
  }
  }
  calcularInhabilitaciones() {
    let entregado = this.estadoEntrega == PropertyUtil.getPropertyIdByTypeAndValue(TiposPropiedad.ESTADO_ENTREGA, EstadosEntrega.ENTREGADO);
    this.compraCerrada = this.restoAPagar == 0 && entregado;
    if (this.compraCerrada) {
      this.myForm.get("formaPago")?.disable();
      this.myForm.get("estadoPago")?.disable();
      this.myForm.get("estadoEntrega")?.disable();
      this.ctrlProveedor.disable();
    }
  }

  ngAfterViewInit(): void {
    this.source = fromEvent(this.codigoInput.nativeElement, 'keypress');
    this.source.pipe(debounceTime(1000)).subscribe((c: any) => {
      this.agregarArticuloALista(this.codigo);
    }
    );
  }

  @HostListener('window:keyup', ['$event'])
  focusCodigo(event: any) {
    if (event.keyCode === 113) {
      this.codigoInput.nativeElement.focus();
    }
    if (event.keyCode === 115) {
      this.pagoClienteInput.nativeElement.focus();
    }
    if (event.keyCode === 45) {
      const el: HTMLElement = this.submitForm.nativeElement as HTMLElement;
      el.click();
    }
    if (event.keyCode === 119) {
      if (this.pesable == true) {
        this.pesable = false;
      } else {
        this.pesable = true;
      }

    }
    if (event.keyCode === 120) {
      this.onSubmit(this.myForm.value);
    }
  }

  agregarArticuloPorNombre() {
    const dialogRef = this.dialog.open(AgregararticuloModalComponent, {
      data: {
        'idSucursalVendedor': this.idSucursal,
        'aumentoLista': 0,
        'pageCarga': this.pageCarga,
        'filtroCarga': this.filtroCarga,
        'compra':true,
        'idLista': this.listaprecioID
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.idArtCarga = result.idArticulo;
        this.agregarArticuloALista(result.codigo);

        this.pageCarga = result.page;
        this.filtroCarga = result.filtroCarga;
      }
    });
  }

  agregarMPPorNombre ()
  {
    const dialogRef = this.dialog.open(AgregarMPModalComponent, {
      data: {
        'idSucursalVendedor': this.idSucursal,
        'aumentoLista': 0,
        'pageCarga': this.pageCarga,
        'filtroCarga': this.filtroCarga
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.agregarMPALista(result.codigo);
        this.pageCarga = result.page;
        this.filtroCarga = result.filtroCarga;
      }
    });
  }

  pesableClick(value: any) {
    this.pesable = value.target.checked;
    this.codigoInput.nativeElement.focus();
  }

  precioCostoClick(value: any) {
    this.precioCostoCheck = value.target.checked;
    this.codigoInput.nativeElement.focus();
  }

  getSucursalVendedor(value: any) {
    if (this.idCompra == 0) {
      this.idSucursal = value.Sucursal.Id;
    }
  }

  fotoModal(value: any) {
    const dialogRef = this.dialog.open(FotoCrearEditarModalComponent, {
      width: '750px', data: { idArticulo: value, editar: false },
    });
  }

  cambiarCantidad(articulo: CompraProveedorArticuloExtendido) {
    let valEntero = null;
    if (articulo.Unidad == true || (articulo.Unidad == null && articulo.Kilogramo == null)) {
      valEntero = true;
    } else {
      valEntero = false;
    }

    const dialogRef = this.dialog.open(PadnumericoModalComponent, {
      width: '450px',
      data: { cantidad: articulo.Cantidad, entero: valEntero }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        if (result == 0) {
          this.deleteArt(articulo);
        } else {
          articulo.Stock -= (articulo.Cantidad - result);
          articulo.Cantidad = result;
          this.calcularTotales();
          this.calcularResto();
        }
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


        if(value.DescuentoPrecio != 0 && value.DescuentoPrecio != null && value.DescuentoPrecio != NaN)
        {
          value.PrecioCosto = value.PrecioCosto + value.DescuentoPrecio;
          this.totalAPagar += value.DescuentoPrecio;
        }


        value.DescuentoPorcentaje = result;


        this.totalAPagar = this.totalAPagar - value.PrecioCosto;

        value.DescuentoPrecio = (value.DescuentoPorcentaje * value.PrecioCosto) / 100;
        value.PrecioCosto = value.PrecioCosto - value.DescuentoPrecio;
        value.PrecioFinal = value.PrecioCosto * value.Cantidad;
        this.totalAPagar = this.totalAPagar + value.PrecioFinal;
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




        value.PrecioCosto = value.PrecioCosto + descuentoOld;
        value.DescuentoMonto = result;
        if(descuentoOld != 0 && result != 0)
        {
          this.totalAPagar = this.totalAPagar + value.PrecioCosto * value.Cantidad;
        }
        else if(descuentoOld != 0 && result == 0)
        {
          this.totalAPagar = this.totalAPagar +descuentoOld;
        }

          this.totalAPagar = this.totalAPagar - value.PrecioCosto * value.Cantidad;



        value.PrecioCosto = value.PrecioCosto - value.DescuentoMonto;
        value.PrecioFinal = value.PrecioCosto * value.Cantidad;
        this.totalAPagar = this.totalAPagar + value.PrecioFinal;
      }
    });
  }


  cambiarPrecioUnitario(articulo: CompraProveedorArticuloExtendido) {
    const dialogRef = this.dialog.open(PadnumericoModalComponent, {
      width: '450px',
      data: { cantidad: articulo.PrecioCosto, entero: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        if (result > 0) {
          articulo.PrecioCosto = Number(result);
          articulo.PrecioBase = articulo.PrecioCosto + (articulo.PrecioCosto * articulo.Porcentaje)/100;
/*           if(articulo.Porcentaje >0)
          {
            let request = {
              'idArticulo': articulo.Id,
              'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
              'value': articulo.PrecioCosto + (articulo.PrecioCosto * articulo.Porcentaje)/100
            };
            this.articuloServ.guardarPrecioBase(request)
              .subscribe(data => {


              }, error => { console.log(error);});
          } */
        }

        this.calcularTotales();
        this.calcularResto();
      }
    });
  }

  deleteArt(value: CompraProveedorArticuloExtendido) {
    const dialogRef = this.dialog.open(EliminarModalComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listaArticulo = this.listaArticulo.filter((x: any) => x.Id != value.Id);
      this.calcularTotales();
      this.calcularResto();
    });

  }

  onSubmit(value: any) {
    this.submitted = true;
    let validacionesExtra = this.validarExtras();

    if (this.myForm.valid && validacionesExtra) {
      if(this.tieneRolSaldoAFavor) {
        if(this.idCompra == 0 && this.saldoAFavorCompra == 0) {
          this.saldoAFavorCompra = this.saldoAFavor;
        }
        if(this.totalPagado > this.totalAPagar) this.saldoAFavor = this.totalPagado -this.totalAPagar;
        if( this.totalAPagar >=this.pagoParcial) this.saldoAFavor =-1;
      }
      let loadRef = this.generalServ.loadingModal();

      let request = new CompraProveedorModel();
      request.idCompra = this.idCompra;
      request.idUser = localStorage.getItem('idUser');
      request.idClienteNegotis = localStorage.getItem('idClienteNegotis')
      request.idSucursal = this.idSucursal;
      request.idProveedor = this.selectedProvider.id;
      request.tasa = this.selectedProvider.tasa;
      request.percepcion = this.selectedProvider.percepcion;
      request.retencion = this.selectedProvider.retencion;
      request.articulos = this.listaArticulo;
      request.fechaCompra = this.fechaCompra;
      request.estadoEntrega = this.estadoEntrega;
      request.fechaEntrega = this.fechaEntrega;
      request.observacion = this.observacion;
      request.datosPago = new CompraProveedorPagoModel();
      request.datosPago.codigoEstadoPago = this.estadoPago;
      request.datosPago.codigoFormaPago = this.formaPago;
      request.datosPago.monto = this.pagoParcial;
      request.tipoComprobante = this.tipoComprobante;
      request.numeroComprobante = this.numeroComprobante;
      request.esNotaCredito = this.esNotaCredito;
      request.compraAsociadaId = this.pedidoAsociadoId;
      request.compraMP = this.compraMP;
      request.turno = this.turno;
      request.listaPreciosId = this.listaprecioID;
      request.saldoAFavor = this.saldoAFavor;
      request.totalCompra2 = this.totalAPagar;
      request.saldoAFavorCompra = this.saldoAFavorCompra;

     // request.precioCostoCheck  = this.precioCostoCheck;

      this.compraServ.crearEditar(request).subscribe(rs => {
        loadRef.close();
        this.router.navigate(['/cliente/compras/panel'], { replaceUrl: true });
        this.snackBar.openFromComponent(SnackBarOperacionExitosaComponent, {
          duration: 1000,
        });
      }, error => {
        console.log(error);
        loadRef.close();
      });
    }
  }

  //#region autoProveedor
  selectProveedor = (key: any) => {
     this.selectedProvider = key.option.value;
     this.tasa = key.option.value.tasa;
     this.percepcion = key.option.value.percepcion;
     this.retencion = key.option.value.retencion;
    }
  resetProveedor = () => { this.selectedProvider = null; }
  displayProveedorSelected = (option?: any): string => option ? option.razonSocial ? option.razonSocial : option.nombre : '';
  displayProveedorOption = (option?: any): string => option ? option.razonSocial ? option.razonSocial : option.nombre : '';
  filterProveedor(value: string): any[] {
    if (value == null || value === '') {
      return this.proveedores;
    }
    var prov:any;
    prov = value;

    let filterVal = value.toString().toLowerCase().trim();
    this.cargarSaldo(prov.razonSocial);
    return this.proveedores.filter(option => {
      if (option.razonSocial != null) {
        return option.razonSocial.toLowerCase().trim().includes(filterVal);
      } else if (option.nombre != null){
        return option.nombre.toLowerCase().trim().includes(filterVal);
      }
      else {
        return false;
      }
    });

  }

  cargarSaldo(value: any)
  {
    if(this.tieneRolSaldoAFavor )
      {

        var prov: any;
        this.proveedores.forEach(item =>{
          if(item.razonSocial != null)
          {
            if(item.razonSocial == value)
            {
              prov= item;
            }
          }
        });


/*         var prov = this.proveedores.filter(option => {
          if (option.razonSocial != null) {
            return option.razonSocial.toLowerCase().includes(value);
          } else {
            return false;
          }
      } ); */
      if(prov != null && prov.saldoAFavor != 0 && prov.saldoAFavor != null)
      {
        this.totalAPagar += this.saldoAFavor;
        this.saldoAFavor = prov.saldoAFavor;
        this.totalAPagar -= this.saldoAFavor;
      }
      else if(prov != null &&  (prov.saldoAFavor == 0 || prov.saldoAFavor == null ))
      {
        this.totalAPagar += this.saldoAFavor;
        this.saldoAFavor = 0;
      }
      if(this.tieneRolSaldoAFavor && this.idCompra == 0)
      {
        this.saldoAFavorCompra = this.saldoAFavor
      }



  }
}

  initAutoProveedorAsync(next: Function) {
    const loadingProv = this.generalServ.loadingModal();

    this.provServ.getAll().subscribe(next => {
      loadingProv.close();
      this.proveedores = Object.values(next);
    }, error => {
      console.log(error);
      loadingProv.close();
    }, () => {
      this.filteredProveedor = this.ctrlProveedor.valueChanges
        .pipe(
          startWith(''),
          map(value => this.filterProveedor(value))
        );
      if (next != null) {
        next();
      }
    });


  }

  //#endregion autoProveedor

  //#region fechas
  fechaCompraDatePicker() {
    this.runDatePicker().subscribe(result => {
      this.fechaCompra = this.getDateAsString(result);
    });
  }

  fechaEntregaDatePicker() {
    this.runDatePicker().subscribe(result => {
      this.fechaEntrega = this.getDateAsString(result);
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

  //#region Metodos

  agregarMPALista(codigo: any) {
    let codigoArticulo;

    codigoArticulo = codigo;

    let rqArticulo = {
      'codigo': codigoArticulo,
      'idSucursal': this.idSucursal,
      'idClienteNegotis': localStorage.getItem('idClienteNegotis')
    };

    this.mpServ.getMPByCodigoBarras(rqArticulo).subscribe((data: any) => {

      if (data != null && data.MateriaPrima != null) {
        let rsCantidad = Number(data.CantidadMP);
        let rsMP = this.getArticuloExtendido(data.MateriaPrima);



        const loading = this.generalServ.loadingModal();

        let articuloEnLista = this.listaArticulo.find((x: any) => x.Id == rsMP.Id);

        if (articuloEnLista == null) {
          rsMP.Cantidad = 0;
          this.listaArticulo.push(rsMP);
        } else {
          rsMP = articuloEnLista;
        }


        rsMP.Cantidad++;
        this.compraMP = true;

        rsMP.Stock = Number(rsCantidad + rsMP.Cantidad);

        //Hacer calculos pertinentes
        this.calcularTotales();
        this.calcularResto();
        loading.close();

        this.codigo = null;
      }
    }, (error: any) => { console.log(error); });
  }


  agregarArticuloALista(codigo: any) {
    let codigoArticulo;
    let pesoArticulo: any;

    if (this.pesable) {
      codigoArticulo = codigo.slice(2, 6);
      pesoArticulo = codigo.slice(8, 12);
    } else {
      codigoArticulo = codigo;
    }

    let rqArticulo = {
      'codigo': codigoArticulo,
      'idArticulo':this.idArtCarga,
      'idSucursal': this.idSucursal,
      'idClienteNegotis': localStorage.getItem('idClienteNegotis')


    };

    this.articuloServ.getArticuloByCodigo(rqArticulo).subscribe((data: any) => {

      if (data != null && data.Articulo != null) {
        let rsCantidad = Number(data.CantidadArticulo);
        let rsArticulo = this.getArticuloExtendido(data.Articulo);


        const loading = this.generalServ.loadingModal();

        let articuloEnLista = this.listaArticulo.find((x: any) => x.Id == rsArticulo.Id);

        if (articuloEnLista == null) {
          rsArticulo.Cantidad = 0;
          this.listaArticulo.push(rsArticulo);
        } else {
          rsArticulo = articuloEnLista;
        }

        if (this.pesable) {
          rsArticulo.Cantidad = Number(rsArticulo.Cantidad) + (Math.round(pesoArticulo) / 1000).toFixed(3);
        } else {
          rsArticulo.Cantidad++;
        }
        this.artCargaSF = rsArticulo;
        rsArticulo.Stock = Number(rsCantidad + rsArticulo.Cantidad);

        //Hacer calculos pertinentes
        this.calcularTotales();
        this.calcularResto();
        loading.close();

        this.codigo = null;
      }
    }, error => { console.log(error); });
  }

  calcularTotales() {
    var totalAnt = this.totalAPagar;
    this.totalAPagar = this.listaArticulo.reduce((totalPagar: any, articulo: any) => totalPagar + this.getPrecioTotalArticulo(articulo), 0);
    this.totalArticulos = this.listaArticulo.reduce((totalArticulo: any, articulo: any) => totalArticulo + this.getCantArticulos(articulo), 0);
    if(this.tieneRolSaldoAFavor && this.idCompra == 0 && this.saldoAFavor !=0)
    {
      this.totalAPagar -= this.saldoAFavor;
    }
    if(this.tieneRolSaldoAFavor && this.idCompra != 0)
    {
      this.totalAPagar -= this.saldoAFavorCompra;
    }
  }

  getPrecioTotalArticulo(articulo: CompraProveedorArticuloExtendido): number {
    if (articulo.PrecioCosto == null) { articulo.PrecioCosto = 0; }
    return this.getCantArticulos(articulo) * articulo.PrecioCosto;
  }

  getCantArticulos(articulo: CompraProveedorArticuloExtendido): number {
    if (articulo.Cantidad == null) { articulo.Cantidad = 0; }
    return articulo.Cantidad;
  }

  calcularResto() {
    this.restoAPagar = this.totalAPagar - this.totalPagado - this.pagoParcial;
  }

  getArticuloExtendido(articulo: any) {
    let result = new CompraProveedorArticuloExtendido();
    result.Id = articulo.Id;
    result.Nombre = articulo.Nombre;
    result.CodigoDeBarras = articulo.CodigoDeBarras;
    result.Cantidad = articulo.Cantidad;
    result.Marca = articulo.Marca.Nombre;
    result.CantidadPorPack = articulo.CantidadPorPack;
    result.PrecioCosto = articulo.PrecioCosto;
    result.Stock = articulo.Stock;
    result.Kilogramo = articulo.Kilogramo;
    result.Unidad = articulo.Unidad;
    result.Pesable = articulo.Pesable;
    result.PrecioBase = articulo.PrecioBase;
    result.Porcentaje = articulo.Porcentaje;
    result.PrecioCostoCheck = this.precioCostoCheck;
    result.PrecioFinal = articulo.PrecioCosto;
    result.Precio1 = articulo.Precio1;
    result.Precio2 = articulo.Precio2;
    result.Precio3 = articulo.Precio3;
    result.Precio4 = articulo.Precio4;
    result.Precio5 = articulo.Precio5;
    result.Precio6 = articulo.Precio6;
    result.Precio7 = articulo.Precio7;
    result.Precio8 = articulo.Precio8;
    result.Precio9 = articulo.Precio9;
    result.PrecioXBulto = articulo.PrecioXBulto;
    if(this.listaPrecio == "Lista Costo" || this.listaPrecio == "Lista 1" || this.listaPrecio == "Lista 2" || this.listaPrecio == "Lista 3" || this.listaPrecio == "Lista 4" || this.listaPrecio == "Lista 5" || this.listaPrecio == "Lista 6" || this.listaPrecio == "Lista Ofertas")
    {
      if(this.listaPrecio == "Lista Costo")
          {
            result.PrecioCosto = result.PrecioCosto;
          }
          if(this.listaPrecio == "Lista 1")
          {
            result.PrecioCosto = result.Precio1;
          }
          if(this.listaPrecio == "Lista 2")
          {
            result.PrecioCosto = result.Precio2;
          }
          if(this.listaPrecio == "Lista 3")
          {
            result.PrecioCosto = result.Precio3;
          }
          if(this.listaPrecio == "Lista 4")
          {
            result.PrecioCosto = result.Precio4;
          }
          if(this.listaPrecio == "Lista 5")
          {
            result.PrecioCosto = result.Precio5;
          }
          if(this.listaPrecio == "Lista 6")
          {
            result.PrecioCosto = result.Precio6;
          }
          if(this.listaPrecio == "Lista Ofertas")
          {
            result.PrecioCosto = result.PrecioXBulto;
          }
          if(this.listaPrecio == "Lista 7")
          {
            result.PrecioCosto = result.Precio7;
          }
          if(this.listaPrecio == "Lista 8")
          {
            result.PrecioCosto = result.Precio8;
          }
          if(this.listaPrecio == "Lista 9")
          {
            result.PrecioCosto = result.Precio9;
          }
          result.PrecioFinal = result.PrecioCosto;

          this.totalAPagar = this.totalAPagar + result.PrecioFinal;
    }
    else
    {
      result.PrecioFinal = result.PrecioCosto;

      this.totalAPagar = this.totalAPagar + result.PrecioFinal;
    }
    return result;
  }

  CargarCompraProveedorAsync(next?: Function) {
    let cargadorCompra = this.generalServ.loadingModal();

    let request = {
      idCompra: this.idCompra,
      idClienteNegotis: this.idClienteNegotis
    }

    this.compraServ.getCompraById(request).subscribe((compra: any) => {

      console.log(compra);
      this.fechaCompra = compra.fechaCompra;
      this.fechaEntrega = compra.fechaEntrega;
      this.estadoEntrega = compra.estadoEntrega;
      this.ctrlProveedor.setValue(this.proveedores.find(x => x.id == compra.idProveedor));
      this.selectedProvider = this.proveedores.find(x => x.id == compra.idProveedor);
      if(this.tieneRolSaldoAFavor  && this.selectedProvider.saldoAFavor != undefined && this.selectedProvider.saldoAFavor != 0)
      {
        this.totalAPagar = this.totalAPagar - this.selectedProvider.saldoAFavor;
        this.saldoAFavor = -1;
      }
      this.listaArticulo = compra.articulos;
      this.observacion = compra.observacion;
      this.totalPagado = compra.totalPagado;
      this.idSucursal = compra.idSucursal;
      this.formaPago = compra.datosPago.codigoFormaPago;
      this.estadoPago = compra.datosPago.codigoEstadoPago
      this.numeroComprobante = compra.numeroComprobante;
      this.tipoComprobante = compra.tipoComprobante;
      this.tasa = this.selectedProvider.tasa;
      this.retencion = this.selectedProvider.retencion;
      this.percepcion = this.selectedProvider.percepcion;
      this.compraMP = compra.compraMP;
      this.listaprecioID = compra.listaPreciosId;
      this.saldoAFavorCompra = compra.saldoAFavorCompra;

      let dataUser = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis'), 'idListaPrecios':this.listaprecioID };
      this.listaPrecServ.ListaPreciosById(dataUser)
        .subscribe(data => {
         this.listaNombres = data;
         this.listaNombres = this.listaNombres.Nombre;
        }, error => { console.log(error);})




      if (!this.esNotaCredito) {
        this.esNotaCredito = this.selectedProvider.NotaCredito;
      }

      if(this.tieneRolSaldoAFavor)
      {
        this.totalAPagar = compra.totalCompra;
      }
      else{
        this.calcularTotales();
      }

      this.calcularResto();
      this.calcularInhabilitaciones();
      this.updateDropdowns();

      cargadorCompra.close();
    }, error => {
      cargadorCompra.close();
      this.generalServ.goToNoEncontrado();
    }, () => {
      if (next != null) {
        next();
      }
    });
  }
  //#endregion

  //#region Validaciones

  validarExtras() {
    let validaciones: boolean[] = [];

    validaciones.push(this.pagoParcialValido());
    validaciones.push(this.selectedProvider != null);
    validaciones.push(this.listaArticulo.length > 0);

    return validaciones.every(x => x == true);
  }

  pagoParcialValido() {
    let faltaPagar = Number(this.totalAPagar) - Number(this.totalPagado);
    const pagoParcialSelected = this.estadoPago == 2;
    var pagoParcialEnRango = false;
    if(this.tieneRolSaldoAFavor)
    {
      pagoParcialEnRango = this.pagoParcial > 0/*  && this.pagoParcial <= faltaPagar */;
      if(this.pagoParcial > faltaPagar)
      {
        this.saldoAFavor = this.pagoParcial - faltaPagar;
      }
    }
    else
    {
      pagoParcialEnRango = this.pagoParcial > 0  && this.pagoParcial <= faltaPagar;
    }

    return !pagoParcialSelected || (pagoParcialSelected && pagoParcialEnRango);
  }

  mostrarPagoParcial() {
    let faltaPagar = Number(this.totalAPagar) - Number(this.totalPagado);
    return this.estadoPago == 2 && faltaPagar > 0;
  }

  updateDropdowns() {
    this.saldoAFavor = 0;
    //Formas de pago
    if (this.idCompra != 0) {
     this.formasPagoHabilitadas = this.formasPago;
     //.filter(x => x.Id != 10);
    }
    if (!this.formasPagoHabilitadas.some(x => this.formaPago == x.Id)) {
      if (this.formasPagoHabilitadas.length > 0 && (this.formaPago == 0 || this.formaPago == undefined)) { this.formaPago = 10 /* this.formasPagoHabilitadas[0].Id; */ }
      else { this.formaPago = null; }
    }

    //Estados de Pago
    if (this.formaPago == 10) {
      this.estadosPagoHabilitadas = this.estadosPago.filter(x => x.Id == 3)
    } else {
      this.estadosPagoHabilitadas = this.estadosPago.filter(x => x.Id != 3)
    }
    //&& (this.estadoPago == 0 || this.estadoPago == undefined)
    if (!this.estadosPagoHabilitadas.some(x => this.estadoPago == x.Id)) {
      if (this.estadosPagoHabilitadas.length > 0 ) { this.estadoPago = this.estadosPagoHabilitadas[0].Id; }
      else {
        if(this.estadoPago == 0 || this.estadoPago == undefined)
        {
        this.estadoPago = null;
      }
      }
    }

    if(this.idCompra == 0)
    {
      if(this.proveedores[0].nombre != 'Items Afip')
      {
        if(this.proveedor == null)
        {
          this.proveedor = this.proveedores[0];

          if(this.tieneRolSaldoAFavor && this.proveedor.saldoAFavor != 0)
          {
            this.saldoAFavor = this.proveedor.saldoAFavor;
            if(this.saldoAFavorCompra == null || this.saldoAFavorCompra == 0)
            {
              this.saldoAFavorCompra = this.saldoAFavor;
            }
          }

        }

      }
      else if(this.proveedores[1] != null)
      {
        this.proveedor = this.proveedores[1];
        if(this.tieneRolSaldoAFavor && this.proveedor.saldoAFavor != 0)
        {
          this.saldoAFavor = this.proveedor.saldoAFavor;
          if(this.saldoAFavorCompra == null || this.saldoAFavorCompra == 0)
          {
            this.saldoAFavorCompra = this.saldoAFavor;
          }
        }
      }
      if(this.selectedProvider == null)
      {
        this.selectedProvider = this.proveedor;
      }

      if(this.tieneRolSaldoAFavor && this.saldoAFavor != 0)
      {
        this.totalAPagar = this.totalAPagar  - this.saldoAFavor;
      }


      if(this.idClienteNegotis == '3cfb52b5-f27d-48b4-ab94-a155f426f99f')
      {

        if(this.selectedProvider == null)
        {
          this.proveedor = this.proveedores.filter(x=> x.id == 4608);
          this.selectedProvider = this.proveedor[0];
          this.ctrlProveedor.setValue(this.proveedores.find(x => x.id ==  4608));
        }

        let dataUser = { 'nombre': 'Lista 1' , 'idClienteNegotis': localStorage.getItem('idClienteNegotis')};
        this.listaPrecServ.ListaPreciosByNombre(dataUser)
          .subscribe(data => {

            this.lista  = data;
            this.listaNombres = this.lista.Nombre;
            this.listaprecioID = this.lista.Id;
            this.listaPrecio = this.listaNombres;
          })

      }
    }

    //Estado de entrega
    if (!this.estadosEntrega.some(x => this.estadoEntrega == x.Id)) {
      if (this.estadosEntrega.length > 0) { this.estadoEntrega = this.estadosEntrega[0].Id; }
      else { this.estadoEntrega = null; }
    }
  }


  //#endregion
}
