import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RolService } from '../../../Service/rol.service';
import { GlobalService } from '../../../Service/global.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneralService } from '../../../Service/general.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarOperacionExitosaComponent } from '../../../components/snack-bar-operacion-exitosa/snack-bar-operacion-exitosa.component';
import { RolCrearEditarModel } from './rol-crear-editar-model';
// import { toTypeScript } from '@angular/compiler';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-rol-crear-editar',
  templateUrl: './rol-crear-editar.component.html',
  styleUrls: ['./rol-crear-editar.component.css']
})
export class RolCrearEditarComponent implements OnInit {

  myForm: FormGroup;
  submitted!: boolean;
  postRol: any;
  nombreRol: any;
  idRol: any = 0;

  //checkboxes
  CLIENTES!: boolean;
  ZONAS!: boolean;
  EMPLEADOS!: boolean;
  PEDIDOS!: boolean;
  modificarPedidos!: boolean;
  eliminarPedidos!: boolean;
  visualizarPedidos!: boolean;
  PRECIOS!: boolean;
  PRODUCTOS!: boolean;
  modificarProductos!: boolean;
  ROLES!: boolean;
  proveedores!: boolean;
  ComprasProveedor!: boolean;
  EliminarComprasProveedor!: boolean;
  GASTOS!: boolean;
  TOTALES!: boolean;
  TRANSFERENCIAS!: boolean;
  rolById: any;
  VISUALIZARREPORTES!: boolean;
  DESPACHO: any;
  FILTROCAJA!: boolean;
  StockValor!: boolean;
  FINANZAS!: boolean;
  AUMENTO_DESCUENTO_MONTO!: boolean;
  VISUALIZARSTOCK!: boolean;
  VISUALIZARCODIGO!: boolean;
  VISUALIZARCODIGO_DESCUENTO!: boolean;
  VENDERCONSTOCK!: boolean;
  VISUALIZARCANTIDADVENTAS!: boolean;
  VISUALIZARLISTAPRECIOS!: boolean;
  VISUALIZARCAJA!: boolean;
  VISUALIZARCONFIGURACIONES!: boolean;
  VISUALIZARSTOCKPROVEEDOR!: boolean;
  VISUALIZAR_AUMENTO_DESCUENTOLISTA!: boolean;
  VISUALIZARCANTXPACK!: boolean;
  VISUALIZARIDESTADO!: boolean;
  VISUALIZARMARCAREMITO!: boolean;
  VISUALIZARCANTXPACKREMITO!: boolean;
  ELIMINARCLIENTES!: boolean;
  VISUALIZARUSUARIOREMITO!: boolean;
  VISUALIZAROFERTAS!: boolean;
  VISUALIZARCATEGORIA!: boolean;
  FILTROPEDIDOS!: boolean;
  MOSTRARPORCENTAJELISTA!: boolean;
  VISUALIZARCODIGOARTICULO!: boolean;
  HABILITARHOME!: boolean;
  VISUALIZARPORCENTAJE!: boolean;
  VISUALIZAR_IMPRESIONBT!: boolean;
  VISUALIZARCOMPROBANTE_FACTURA!: boolean;
  VISUALIZARPESABLES!: boolean;
  VISUALIZARREPORTEVENCIMIENTO!: boolean;
  VISUALIZARLISTAARTICULOS!: boolean;
  VISUALIZARRENTABILIDAD!: boolean;
  VISUALIZARFECHAESTADOFACTURA!: boolean;
  VISUALIZARLOGONEGOTIS!: boolean;
  VISUALIZARTALLE!: boolean;
  VISUALIZARLOGO!: boolean;
  VISUALIZARACTUALIZARPRECIOS!: boolean;
  VISUALIZARCOLOR!: boolean;
  VISUALIZAROBJETIVO!: boolean;
  CARGARDUPLICADOS!: boolean;
  OCULTARDATOSE!: boolean;
  MODIFICARUNIDADES!: boolean;
  FILTROVENDEDOR!: boolean;
  VISUALIZARESTADOSPEDIDOS!: boolean;
  VISUALIZARDATOSFISCALES!: boolean;
  PRECIOSCOSTOADICIONALES!: boolean;
  VISUALIZARPRECIODOLAR!: boolean;
  VISUALIZARDESCUENTOS!: boolean;
  VISUALIZARRUBROCATEGORIA!: boolean;
  IMPRIMIRDUPLICADO!: boolean;
  VISUALIZARDATOSESTETICA!: boolean;
  EDITARPRECIOS!: boolean;
  FILTROUSUARIO!: boolean;
  FILTROGASTOSTOTALES!: boolean;
  FILTROENTER!: boolean;
  VISUALIZARDESCUENTO!: boolean;
  OCULTARRUBRO!: boolean;
  ORDENARPORRUBRO!: boolean;
  VISUALIZARPORCENTAJEAUMENTO!: boolean;
  VISUALIZARPRECIOLISTA!: boolean;
  LISTARPORRUBRO!: boolean;
  COMBOOFERTA!: boolean;
  ROLEXCEL!: boolean;
  VISUALIZARACCIONES!: boolean;
  SINCRONIZAREXCEL!: boolean;
  IMPRIMIRETIQUETAS!: boolean;
  MOSTRARPRECIOOFERTA!: boolean;
  VISUALIZARDATOSTALLER!: boolean;
  FILTROCLIENTESUCURSAL!: boolean;
  VISUALIZARDATOSSUCURSAL!: boolean;
  VISUALIZARCATEGORIARUBROPEDIDOS!: boolean;
  OCULTARCODIGOBARRAS!: boolean;
  VISUALIZARDESCRIPCION!: boolean;
  SINCRONIZARAPI!: boolean;
  COMPRAMINIMA!: boolean;
  OCULTARPRECIOS!: boolean;
  OCULTARPRESUPUESTO!: boolean;
  OCULTARCODIGOUNIDADES!: boolean;
  OCULTARFILTROSARTICULOS!: boolean;
  PEDIDOVENDEDOR!: boolean;
  SINCRONIZARPEDIDOS!: boolean;
  IMPRESIONCOMANDERA!: boolean;
  OCULTARPRECIOSCOMPROBANTE!: boolean;
  OCULTARCOMPROBANTE!: boolean;
  LIMITARCONFIGURACION!: boolean;
  PRODUCCION!: boolean;
  ARTICULOSMP!: boolean;
  MPSTOCK!: boolean;
  ORDENARPORNUMERO!: boolean;
  VISUALIZARUBICACION!: boolean;
  VISUALIZARCODIGOCLIENTE!: boolean;
  OCULTARPRECIOSPRODUCCION!: boolean;
  OCULTARTOTALES!: boolean;
  VISUALIZARACTIVARLISTA!: boolean;
  VISUALIZARFILTROMULTIPLE!: boolean;
  MODIFICARPRECIOSMP!:boolean;
  CARGARCODIGOBARRA!: boolean;
  CONTROLENTREGAS!: boolean;
  VISUALIZARCOMPROBANTEUNIFICADO !: boolean;
  VISUALIZARIVA!: boolean;
  SALDOAFAVOR!: boolean;
  UBICACIONARTICULOS!: boolean;
  OCULTARPRECIOSPEDIDOS!: boolean;
  VISUALIZARIMAGENESRUBROS!: boolean;
  AGREGARLISTA!: boolean;
  COMBOARTICULOS!: boolean;
  DISTANCIA !: boolean;
  IMPRIMIR80MM!: boolean;
  FICHAMEDICA!: boolean;
  MOSTRADOREFECTIVO !: boolean;
  OCULTARFILTROSCOMPRAS !: boolean;
  MODIFICARLISTA !: boolean;
  MENSAJEAPLICACION !: boolean;
  IVA27 !: boolean;
  IVA10 !: boolean;
  CODIGOQR!: boolean;
  VISUALIZARCAMBIOESTADOS: boolean = true;
  OCULTARFACTURA !: boolean;
  OCULTARQR !: boolean;
  OCULTARPRECIOSETIQUETAS !: boolean;
  MOSTRARCODIGOETIQUETAS!: boolean;
  OCULTARFACTURACOMANDERA!: boolean;
  REVERTIRORDENPEDIDOS!: boolean;
  VISUALIZARLIBROS!: boolean;
  OCULTARDATOSGENERALES !: boolean;
  MOSTRARRUBROSETIQUETAS!: boolean;
  IMPRIMIRETIQUETAS80MM!: boolean;
  TURNOSCAJA!: boolean;
  OBSERVACIONARTICULOS!: boolean;
  CREARDUPLICADOS!: boolean;
  OCULTARGANANCIAS!: boolean;
  OCULTARCOMPRAS!: boolean;
  IMPRESIONDOBLE!: boolean;
  OCULTAREDITARDEPOSITOS!:boolean;
  BLOQUEARFECHA!: boolean;
  PEDIDOENTREGADO!: boolean;
  PRESTAMOS!: boolean;
  OCULTARFP!: boolean;
  COSTOCHECK!: boolean;
  ACTIVOSUCURSAL!: boolean;
  ROLOXY!: boolean;
  BLOQUEAREDITARCOMPRAS!: boolean;
  BLOQUEARPRECIOS!: boolean;
  VISUALIZARCODIGOARTICULOCOMPROBANTE!: boolean;
  ORDENARPORCODIGO !: boolean;
  AUTOASIGNARCODIGOBARRA!: boolean;
  COMPROBANTESINAZUL!: boolean;
  BLOQUEOPEDIDOS !: boolean;
  CATEGORIALIBROS!: boolean;
  ESCONDERDELETEARTICULOS!: boolean;
  VISUALIZARSELECCIONARSUCURSAL!: boolean;
  SALDOAFAVORCOMPRAS!: boolean;
  OCULTARAPROBADOAFIP!: boolean;
  OCULTARFANTASIA!: boolean;
  FOOTER!: boolean;
  OCULTARINDICADORVENTAS!:boolean;
  CREARPEDIDODIRECTO!: boolean;
  RECALCULOUNIDAD!: boolean;
  OCULTARINDICADORESEGRESO!: boolean;
  PORCENTAJETARJETAS!:boolean;
  FACTURAM!:boolean;
  OCULTARDELETEINGRESOS!:boolean;
  COMPROBANTEWS!:boolean;
  FATMAN!:boolean;
  MOSTRADOR2!:boolean;
  COMPROBANTEESPEJO!:boolean;
  ETIQUETASJPG!: boolean;
  MEDINOR!: boolean;
  DATOSMEDINOR!:boolean;
  REPARTOXDEFECTO !: boolean;
  OCULTARALGUNOSDATOSGENERALES!: boolean;
  idModuloSelected: any;

  constructor(private titleService: Title,private fb: FormBuilder, private router: Router,
    private rolServ: RolService, private globalServ: GlobalService, private route: ActivatedRoute
    , private generalServ: GeneralService, private snackBar: MatSnackBar) {
    titleService.setTitle("Roles");
    this.myForm = fb.group({
      nombreRol: ['', Validators.compose([Validators.required])],
    });
    route.params.subscribe(params => { this.idRol = params['idrol']; });
    if (this.idRol != null) {
      const loading = this.generalServ.loadingModal();
      let dataRol = { 'idRol': this.idRol, 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
      this.rolServ.GetRolById(dataRol).subscribe(data => {
        this.rolById = data;
        if (this.rolById == null) {
          loading.close();
          this.generalServ.goToNoEncontrado();
        }
        this.CLIENTES = this.rolById.CLIENTES;
        this.ZONAS = this.rolById.ZONAS;
        this.EMPLEADOS = this.rolById.EMPLEADOS;
        this.PEDIDOS = this.rolById.PEDIDOS;
        this.modificarPedidos = this.rolById.ModificarPedidos;
        this.eliminarPedidos = this.rolById.EliminarPedidos;
        this.visualizarPedidos = this.rolById.VisualizarPedidos;
        this.PRECIOS = this.rolById.PRECIOS;
        this.PRODUCTOS = this.rolById.PRODUCTOS;
        this.modificarProductos = this.rolById.ModificarProductos;
        this.ROLES = this.rolById.ROLES;
        this.proveedores = this.rolById.Proveedores;
        this.ComprasProveedor = this.rolById.ComprasProveedor;
        this.EliminarComprasProveedor = this.rolById.EliminarComprasProveedor;
        this.FILTROCAJA = this.rolById.FiltroCaja;
        this.StockValor = this.rolById.StockValor;
        this.GASTOS = this.rolById.GASTOS;
        this.TOTALES = this.rolById.TOTALES;
        this.TRANSFERENCIAS = this.rolById.TRANSFERENCIAS;
        this.VISUALIZARREPORTES = this.rolById.VisualizarReportes;
        this.DESPACHO = this.rolById.DESPACHO;
        this.nombreRol = this.rolById.Name;
        this.FINANZAS = this.rolById.FINANZAS;
        this.AUMENTO_DESCUENTO_MONTO = this.rolById.Aumentodescuentomonto;
        this.VISUALIZARSTOCK = this.rolById.VisualizarStock;
        this.VISUALIZARCODIGO = this.rolById.VisualizarCodigo;
        this.VISUALIZARCODIGO_DESCUENTO = this.rolById.VisualizarCodDesc;
        this.VENDERCONSTOCK = this.rolById.VenderConStock;
        this.VISUALIZARCANTIDADVENTAS = this.rolById.VisualizarCantidadVentas;
        this.VISUALIZARLISTAPRECIOS = this.rolById.VisualizarListaPrecios;
        this.VISUALIZARCAJA = this.rolById.VisualizarCaja;
        this.VISUALIZARCONFIGURACIONES = this.rolById.VisualizarConfiguraciones;
        this.VISUALIZARSTOCKPROVEEDOR = this.rolById.VisualizarStockProveedor;
        this.VISUALIZAR_AUMENTO_DESCUENTOLISTA = this.rolById.VisualizarAumentoDescuentoLista;
        this.VISUALIZARCANTXPACK = this.rolById.VisualizarCantXPack;
        this.VISUALIZARIDESTADO = this.rolById.VisualizarIDEstado;
        this.VISUALIZARMARCAREMITO = this.rolById.VisualizarMarcaRemito;
        this.VISUALIZARCANTXPACKREMITO = this.rolById.VisualizarCantXPackRemito;
        this.VISUALIZARUSUARIOREMITO = this.rolById.VisualizarUsuarioRemito;
        this.ELIMINARCLIENTES = this.rolById.EliminarClientes;
        this.VISUALIZAROFERTAS = this.rolById.VisualizarOfertas;
        this.VISUALIZARCATEGORIA = this.rolById.VisualizarCategoria;
        this.FILTROPEDIDOS = this.rolById.FiltroPedidos;
        this.MOSTRARPORCENTAJELISTA = this.rolById.MostrarPorcentajeLista;
        this.VISUALIZARCODIGOARTICULO = this.rolById.VisualizarCodigoArticulo;
        this.HABILITARHOME = this.rolById.HabilitarHome;
        this.VISUALIZARPORCENTAJE = this.rolById.VisualizarPorcentaje;
        this.VISUALIZAR_IMPRESIONBT = this.rolById.VisualizarImpresionBT;
        this.VISUALIZARCOMPROBANTE_FACTURA = this.rolById.VisualizarComprobanteYFactura;
        this.VISUALIZARPESABLES = this.rolById.VisualizarPesables;
        this.VISUALIZARREPORTEVENCIMIENTO = this.rolById.VisualizarReporteVencimiento;
        this.VISUALIZARLISTAARTICULOS = this.rolById.VisualizarListaArticulos;
        this.VISUALIZARRENTABILIDAD = this.rolById.VisualizarRentabilidad;
        this.VISUALIZARFECHAESTADOFACTURA = this.rolById.VisualizarFechaEstadoFactura;
        this.VISUALIZARLOGONEGOTIS = this.rolById.VisualizarLogoNegotis;
        this.VISUALIZARTALLE = this.rolById.VisualizarTalle;
        this.VISUALIZARCOLOR = this.rolById.VisualizarColor;
        this.VISUALIZARLOGO = this.rolById.VisualizarLogo;
        this.VISUALIZARACTUALIZARPRECIOS = this.rolById.VisualizarActualizarPrecios;
        this.VISUALIZAROBJETIVO = this.rolById.VisualizarObjetivo;
        this.CARGARDUPLICADOS = this.rolById.CargarDuplicado;
        this.OCULTARDATOSE = this.rolById.DatosEcommerce;
        this.MODIFICARUNIDADES = this.rolById.ModificarUnidades;
        this.FILTROVENDEDOR = this.rolById.FiltroVendedor;
        this.VISUALIZARESTADOSPEDIDOS = this.rolById.VisualizarEstadosPedidos;
        this.VISUALIZARDATOSFISCALES = this.rolById.VisualizarDatosFiscales;
        this.PRECIOSCOSTOADICIONALES = this.rolById.PreciosCostosAdicionales;
        this.VISUALIZARPRECIODOLAR = this.rolById.VisualizarPrecioDolar;
        this.VISUALIZARDESCUENTOS = this.rolById.VisualizarDescuentos;
        this.VISUALIZARRUBROCATEGORIA = this.rolById.VisualizarRubroCategoria;
        this.IMPRIMIRDUPLICADO = this.rolById.ImprimirDuplicado;
        this.VISUALIZARDATOSESTETICA = this.rolById.VisualizarDatosEstetica;
        this.EDITARPRECIOS = this.rolById.EditarPrecios;
        this.FILTROUSUARIO = this.rolById.FiltroUsuario;
        this.FILTROGASTOSTOTALES = this.rolById.FiltroTotalesGastos;
        this.FILTROENTER = this.rolById.FiltroEnter;
        this.VISUALIZARDESCUENTO = this.rolById.VisualizarDescuentoComprobante;
        this.OCULTARRUBRO = this.rolById.OcultarRubro;
        this.ORDENARPORRUBRO = this.rolById.OrdernarPorRubro;
        this.VISUALIZARPORCENTAJEAUMENTO = this.rolById.VisualizarAumentoPorcentaje;
        this.VISUALIZARPRECIOLISTA = this.rolById.VisualizarPrecioLista;
        this.LISTARPORRUBRO = this.rolById.ImprimirArticulosOrdenado;
        this.COMBOOFERTA = this.rolById.ComboOferta;
        this.ROLEXCEL = this.rolById.RolExcel;
        this.VISUALIZARACCIONES = this.rolById.VisualizarAcciones;
        this.SINCRONIZAREXCEL = this.rolById.SinicronizarExcel;
        this.IMPRIMIRETIQUETAS = this.rolById.ImprimirEtiquetas;
        this.MOSTRARPRECIOOFERTA = this.rolById.MostrarPrecioOferta;
        this.VISUALIZARDATOSTALLER = this.rolById.VisualizarDatosTaller;
        this.FILTROCLIENTESUCURSAL = this.rolById.FiltroClienteSucursal;
        this.VISUALIZARDATOSSUCURSAL = this.rolById.VisualizarDatosSucursal;
        this.VISUALIZARCATEGORIARUBROPEDIDOS = this.rolById.VisualizarCategoriaRubroPedidos;
        this.OCULTARCODIGOBARRAS = this.rolById.OcultarCodigosBarraArticulos;
        this.VISUALIZARDESCRIPCION = this.rolById.VisualizarDescripcion;
        this.SINCRONIZARAPI = this.rolById.SincronizarApi;
        this.COMPRAMINIMA = this.rolById.CompraMinima;
        this.OCULTARPRECIOS = this.rolById.OcultarPrecios;
        this.OCULTARPRESUPUESTO = this.rolById.OcultarPresupuesto;
        this.OCULTARCODIGOUNIDADES = this.rolById.OcultarCodigoUnidades;
        this.OCULTARFILTROSARTICULOS = this.rolById.OcultarFiltrosArticulos;
        this.PEDIDOVENDEDOR = this.rolById.pedidoVendedor;
        this.SINCRONIZARPEDIDOS = this.rolById.sincronizarPedidos;
        this.IMPRESIONCOMANDERA = this.rolById.ImpresionComandera;
        this.OCULTARPRECIOSCOMPROBANTE = this.rolById.OcultarPreciosComprobante;
        this.OCULTARCOMPROBANTE = this.rolById.OcultarComprobante;
        this.LIMITARCONFIGURACION = this.rolById.LimitarConfiguracion;
        this.PRODUCCION = this.rolById.Produccion;
        this.MPSTOCK = this.rolById.MPStock;
        this.ARTICULOSMP = this.rolById.ArticulosMP;
        this.ORDENARPORNUMERO = this.rolById.OrdenarPorNumero;
        this.VISUALIZARUBICACION = this.rolById.Ubicaciones;
        this.VISUALIZARCODIGOCLIENTE = this.rolById.VerCodigoCliente;
        this.OCULTARPRECIOSPRODUCCION = this.rolById.OcultarPreciosProduccion;
        this.OCULTARTOTALES = this.rolById.OcultarTotalesSinPrecios;
        this.VISUALIZARACTIVARLISTA = this.rolById.VisualizarActivarLista;
        this.VISUALIZARFILTROMULTIPLE = this.rolById.VisualizarFiltrMultiple;
        this.MODIFICARPRECIOSMP = this.rolById.ModificarPrecioMP;
        this.CARGARCODIGOBARRA = this.rolById.CargarCodigoBarra;
        this.CONTROLENTREGAS = this.rolById.ControlEntregas;
        this.VISUALIZARCOMPROBANTEUNIFICADO = this.rolById.ComprobanteUnificado;
        this.VISUALIZARIVA = this.rolById.VisualizarIVA;
        this.SALDOAFAVOR = this.rolById.SaldoAFavor;
        this.UBICACIONARTICULOS = this.rolById.UbicacionArticuloPedido;
        this.OCULTARPRECIOSPEDIDOS = this.rolById.OcultarPreciosPedido;
        this.VISUALIZARIMAGENESRUBROS = this.rolById.ImagenesRubro;
        this.AGREGARLISTA = this.rolById.AgregarLista;
        this.COMBOARTICULOS = this.rolById.ComboArticulos;
        this.DISTANCIA = this.rolById.Distancia;
        this.IMPRIMIR80MM = this.rolById.Imprimir80mm;
        this.FICHAMEDICA = this.rolById.FichaMedica;
        this.MOSTRADOREFECTIVO = this.rolById.MostradorEfectivo;
        this.OCULTARFILTROSCOMPRAS = this.rolById.OcultarFiltrosCompras;
        this.MODIFICARLISTA = this.rolById.ModificarLista;
        this.MENSAJEAPLICACION = this.rolById.MensajeAplicacion;
        this.IVA27 = this.rolById.Iva27;
        this.IVA10 = this.rolById.Iva10;
        this.CODIGOQR = this.rolById.CodigoQR;
        this.VISUALIZARCAMBIOESTADOS = this.rolById.VisualizarCambioEstados;
        this.OCULTARFACTURA = this.rolById.OcultarFactura;
        this.OCULTARQR = this.rolById.OcultarQR;
        this.OCULTARPRECIOSETIQUETAS = this.rolById.OcultarPreciosEtiquetas;
        this.MOSTRARCODIGOETIQUETAS = this.rolById.MostrarCodigoEtiquetas;
        this.OCULTARFACTURACOMANDERA = this.rolById.OcultarFacturaComandera;
        this.REVERTIRORDENPEDIDOS = this.rolById.RevertirOrdenPedidos;
        this.VISUALIZARLIBROS = this.rolById.VisualizarLibros;
        this.OCULTARDATOSGENERALES = this.rolById.OcultarDatosGenerales;
        this.MOSTRARRUBROSETIQUETAS = this.rolById.MostrarRubroEtiqueta;
        this.IMPRIMIRETIQUETAS80MM = this.rolById.Etiquetas80mm;
        this.TURNOSCAJA = this.rolById.TurnosCaja;
        this.OBSERVACIONARTICULOS = this.rolById.ObservacionArticulos;
        this.CREARDUPLICADOS = this.rolById.CrearDuplicado;
        this.OCULTARGANANCIAS = this.rolById.OcultarGanancias;
        this.OCULTARCOMPRAS = this.rolById.OcultarCompras;
        this.IMPRESIONDOBLE = this.rolById.ImpresionDoble;
        this.OCULTAREDITARDEPOSITOS = this.rolById.OcultarEditarDepositos;
        this.BLOQUEARFECHA = this.rolById.OcultarFechaPedido;
        this.PEDIDOENTREGADO = this.rolById.PedidoEntregado;
        this.PRESTAMOS = this.rolById.Prestamos;
        this.OCULTARFP = this.rolById.OcultarFPFactura;
        this.COSTOCHECK = this.rolById.CostoCheck;
        this.ACTIVOSUCURSAL = this.rolById.ActivoSucursal;
        this.ROLOXY = this.rolById.RolOxy;
        this.BLOQUEAREDITARCOMPRAS = this.rolById.BloquearEditarPrecios;
        this.BLOQUEARPRECIOS = this.rolById.BloquearPrecios;
        this.VISUALIZARCODIGOARTICULOCOMPROBANTE = this.rolById.VisualizarCodigoArticuloComprobante;
        this.ORDENARPORCODIGO = this.rolById.OrdenarArticulosPorCodigo;
        this.AUTOASIGNARCODIGOBARRA = this.rolById.AutoAsignarCodigoBarra;
        this.COMPROBANTESINAZUL = this.rolById.ComprobanteSinAzul;
        this.BLOQUEOPEDIDOS = this.rolById.BloqueoPedidos;
        this.CATEGORIALIBROS = this.rolById.CategoriaLibros;
        this.ESCONDERDELETEARTICULOS = this.rolById.EsconderDeleteArt;
        this.VISUALIZARSELECCIONARSUCURSAL = this.rolById.VisualizarSucursalConfig;
        this.SALDOAFAVORCOMPRAS = this.rolById.SaldoAFavorCompras;
        this.OCULTARAPROBADOAFIP = this.rolById.OcultarAprobadoAfip;
        this.OCULTARFANTASIA = this.rolById.OcultarFantasia;
        this.FOOTER = this.rolById.Footer;
        this.OCULTARINDICADORVENTAS = this.rolById.OcultarIndicadorVentas;
        this.CREARPEDIDODIRECTO = this.rolById.CrearPedidoDirecto;
        this.RECALCULOUNIDAD = this.rolById.RecalculoUnidad;
        this.OCULTARINDICADORESEGRESO = this.rolById.OcultarIndicadorEgreso;
        this.PORCENTAJETARJETAS = this.rolById.PorcentajeTarjetas;
        this.FACTURAM = this.rolById.FacturaM;
        this.OCULTARDELETEINGRESOS = this.rolById.OcultarDeleteIngresos;
        this.COMPROBANTEWS = this.rolById.PDFWS;
        this.FATMAN = this.rolById.Fatman;
        this.MOSTRADOR2 = this.rolById.Mostrador2;
        this.COMPROBANTEESPEJO = this.rolById.ComprobanteEspejo;
        this.ETIQUETASJPG = this.rolById.etiquetasJPG;
        this.MEDINOR = this.rolById.Medinor;
        this.DATOSMEDINOR = this.rolById.DatosMedinor;
        this.REPARTOXDEFECTO = this.rolById.RepartoXDefecto;
        this.OCULTARALGUNOSDATOSGENERALES = this.rolById.OcultarAlgunosDatosGenerales;

        loading.close();
      }, error => { console.log(error); this.generalServ.goToNoEncontrado(); loading.close(); })
    } else {
      this.idRol = 0;
    }
  }

  ngOnInit() {
  }

  clientesClick(value: any) {
    this.CLIENTES = value.target.checked;
  }

  zonasClick(value: any) {
    this.ZONAS = value.target.checked;
  }

  empleadosClick(value: any) {
    this.EMPLEADOS = value.target.checked;
  }

  pedidosClick(value: any) {
    this.PEDIDOS = value.target.checked;
  }

  modificarPedidosClick(value: any) {
    this.modificarPedidos = value.target.checked;
  }

  eliminarPedidosClick(value: any) {
    this.eliminarPedidos = value.target.checked;
  }

  visualizarPedidosClick(value: any) {
    this.visualizarPedidos = value.target.checked;
  }

  preciosClick(value: any) {
    this.PRECIOS = value.target.checked;
  }

  productosClick(value: any) {
    this.PRODUCTOS = value.target.checked;
  }

  modificarProductosClick(value: any) {
    this.modificarProductos = value.target.checked;
  }

  rolesClick(value: any) {
    this.ROLES = value.target.checked;
  }

  proveedoresClick(value: any) {
    this.proveedores = value.target.checked;
  }

  comprasProveedorClick(value: any) {
    this.ComprasProveedor = value.target.checked;
  }

  eliminarComprasProveedorClick(value: any) {
    this.EliminarComprasProveedor = value.target.checked;
  }

  filtroCajaClick(value: any) {
    this.FILTROCAJA = value.target.checked;
  }

  stockValorClick(value: any) {
    this.StockValor = value.target.checked;
  }

  gastosClick(value: any) {
    this.GASTOS = value.target.checked;
  }

  totalesClick(value: any) {
    this.TOTALES = value.target.checked;
  }

  transferenciasClick(value: any) {
    this.TRANSFERENCIAS = value.target.checked;
  }

  VisualizarReportesClick(value: any) {
    this.VISUALIZARREPORTES = value.target.checked;
  }

  despachoClick(value: any) {
    this.DESPACHO = value.target.checked;
  }

  finanzasClick(value: any) {
    this.FINANZAS = value.target.checked;
  }

  aumentoDescuentoMontoClick(value: any) {
    this.AUMENTO_DESCUENTO_MONTO = value.target.checked;
  }
  visualizarStockClick(value: any) {
    this.VISUALIZARSTOCK = value.target.checked;
  }
  visualizarCodigoClick(value: any) {
    this.VISUALIZARCODIGO = value.target.checked;
  }

  visualizarCodigoDescuentoClick(value: any) {
    this.VISUALIZARCODIGO_DESCUENTO = value.target.checked;
  }
  venderConStockClick(value: any) {
    this.VENDERCONSTOCK = value.target.checked;
  }
  visualizarCantidadVentasClick(value: any) {
    this.VISUALIZARCANTIDADVENTAS = value.target.checked;
  }
  visualizarListaPreciosClick(value: any) {
    this.VISUALIZARLISTAPRECIOS = value.target.checked;
  }
  visualizarCajaClick(value: any) {
    this.VISUALIZARCAJA = value.target.checked;
  }
  visualizarConfiguracionesClick(value: any) {
    this.VISUALIZARCONFIGURACIONES = value.target.checked;
  }
  visualizarStockProveedorClick(value: any) {
    this.VISUALIZARSTOCKPROVEEDOR = value.target.checked;
  }
  visualizarAumentoDescuentoListaClick(value: any) {
    this.VISUALIZAR_AUMENTO_DESCUENTOLISTA = value.target.checked;
  }
  visualizarCantXPackClick(value: any) {
    this.VISUALIZARCANTXPACK = value.target.checked;
  }
  visualizarIDEstadoClick(value: any) {
    this.VISUALIZARIDESTADO = value.target.checked;
  }
  visualizarMarcaRemitoClick(value: any) {
    this.VISUALIZARMARCAREMITO = value.target.checked;
  }
  visualizarCantXPackRemitoClick(value: any) {
    this.VISUALIZARCANTXPACKREMITO = value.target.checked;
  }
  eliminarClientesClick(value: any) {
    this.ELIMINARCLIENTES = value.target.checked;
  }
  visualizarUsuarioRemitoClick(value: any) {
    this.VISUALIZARUSUARIOREMITO = value.target.checked;
  }
  visualizarOfertasClick(value: any) {
    this.VISUALIZAROFERTAS = value.target.checked;
  }
  visualizarCategoriaClick(value: any) {
    this.VISUALIZARCATEGORIA = value.target.checked;
  }
  filtroPedidosClick(value: any) {
    this.FILTROPEDIDOS = value.target.checked;
  }
  mostrarPorcentajeListaClick(value: any) {
    this.MOSTRARPORCENTAJELISTA = value.target.checked;
  }
  visualizarCodigoArticuloClick(value: any) {
    this.VISUALIZARCODIGOARTICULO = value.target.checked;
  }
  habilitarHomeClick(value: any) {
    this.HABILITARHOME = value.target.checked;
  }
  visualizarPorcentajeClick(value: any) {
    this.VISUALIZARPORCENTAJE = value.target.checked;
  }
  visualizarImpresionBTClick(value: any) {
    this.VISUALIZAR_IMPRESIONBT = value.target.checked;
  }
  visualizarComprobante_FacturaClick(value: any) {
    this.VISUALIZARCOMPROBANTE_FACTURA = value.target.checked;
  }
  visualizarPesablesClick(value: any) {
    this.VISUALIZARPESABLES = value.target.checked;
  }
  visualizarReporteVencimientoClick(value: any) {
    this.VISUALIZARREPORTEVENCIMIENTO = value.target.checked;
  }
  visualizarListaArticulosClick(value: any) {
    this.VISUALIZARLISTAARTICULOS = value.target.checked;
  }
  visualizarRentabilidadClick(value: any) {
    this.VISUALIZARRENTABILIDAD = value.target.checked;
  }
  visualizarFechaEstadoFacturaClick(value: any) {
    this.VISUALIZARFECHAESTADOFACTURA = value.target.checked;
  }
  visualizarLogoNegotisClick(value: any) {
    this.VISUALIZARLOGONEGOTIS = value.target.checked;
  }
  visualizarTalleClick(value: any) {
    this.VISUALIZARTALLE = value.target.checked;
  }
  visualizarLogoClick(value: any) {
    this.VISUALIZARLOGO = value.target.checked;
  }
  visualizarActualizarPreciosClick(value: any) {
    this.VISUALIZARACTUALIZARPRECIOS = value.target.checked;
  }
  visualizarColorClick(value: any) {
    this.VISUALIZARCOLOR = value.target.checked;
  }
  visualizarObjetivoClick(value: any) {
    this.VISUALIZAROBJETIVO = value.target.checked;
  }
  cargarDuplicadosClick(value: any) {
    this.CARGARDUPLICADOS = value.target.checked;
  }
  ocultarDatosEClick(value: any) {
    this.OCULTARDATOSE = value.target.checked;
  }
  modificarUnidadesClick(value: any) {
    this.MODIFICARUNIDADES = value.target.checked;
  }
  filtroVendedorClick(value: any) {
    this.FILTROVENDEDOR = value.target.checked;
  }
  visualizarEstadosPedidosClick(value: any) {
    this.VISUALIZARESTADOSPEDIDOS = value.target.checked;
  }
  preciosCostoAdicionalesClick(value: any) {
    this.PRECIOSCOSTOADICIONALES = value.target.checked;
  }
  visualizarDatosFiscalesClick(value: any) {
    this.VISUALIZARDATOSFISCALES = value.target.checked;
  }
  visualizarPrecioDolarClick(value: any) {
    this.VISUALIZARPRECIODOLAR = value.target.checked;
  }
  visualizarDescuentosClick(value: any) {
    this.VISUALIZARDESCUENTOS = value.target.checked;
  }
  visualizarCategoriaRubroClick(value: any) {
    this.VISUALIZARRUBROCATEGORIA = value.target.checked;
  }
  imprimirDuplicadoClick(value: any) {
    this.IMPRIMIRDUPLICADO = value.target.checked;
  }
  visualizarDatosEsteticaClick(value: any) {
    this.VISUALIZARDATOSESTETICA = value.target.checked;
  }
  editarPreciosClick(value: any) {
    this.EDITARPRECIOS = value.target.checked;
  }
  filtroUsuarioClick(value: any) {
    this.FILTROUSUARIO = value.target.checked;
  }
  filtroGastosTotalesClick(value: any) {
    this.FILTROGASTOSTOTALES = value.target.checked;
  }
  filtroEnterClick(value: any) {
    this.FILTROENTER = value.target.checked;
  }
  visualizarDescuentoClick(value: any) {
    this.VISUALIZARDESCUENTO = value.target.checked;
  }
  ordenarPorRubroClick(value: any) {
    this.ORDENARPORRUBRO = value.target.checked;
  }
  ocultarRubroClick(value: any) {
    this.OCULTARRUBRO = value.target.checked;
  }
  visualizarAumentoDescuentoPorcentajeClick(value: any) {
    this.VISUALIZARPORCENTAJEAUMENTO = value.target.checked;
  }
  visualizarPrecioListaClick(value: any) {
    this.VISUALIZARPRECIOLISTA = value.target.checked;
  }
  listarPorRubroClick(value: any) {
    this.LISTARPORRUBRO = value.target.checked;
  }
  comboOfertaClick(value: any) {
    this.COMBOOFERTA = value.target.checked;
  }
  rolExcelClick(value: any) {
    this.ROLEXCEL = value.target.checked;
  }
  visualizarAccionesClick(value: any) {
    this.VISUALIZARACCIONES = value.target.checked;
  }
  sincronizarExcelClick(value: any) {
    this.SINCRONIZAREXCEL= value.target.checked;
  }
  mostrarPrecioOfertaClick(value: any) {
    this.MOSTRARPRECIOOFERTA= value.target.checked;
  }
  imprimirEtiquetasClick(value: any) {
    this.IMPRIMIRETIQUETAS= value.target.checked;
  }
  visualizarDatosTallerClick(value: any) {
    this.VISUALIZARDATOSTALLER= value.target.checked;
  }
  filtroClienteSucursalClick(value: any) {
    this.FILTROCLIENTESUCURSAL= value.target.checked;
  }
  visualizarDatosSucursalClick(value: any) {
    this.VISUALIZARDATOSSUCURSAL= value.target.checked;
  }
  visualizarCategoriaRubroPedidosClick(value: any) {
    this.VISUALIZARCATEGORIARUBROPEDIDOS= value.target.checked;
  }
  ocultarCodigoBarrasClick(value: any) {
    this.OCULTARCODIGOBARRAS= value.target.checked;
  }
  visualizarDescripcionClick(value: any) {
    this.VISUALIZARDESCRIPCION= value.target.checked;
  }
  sincronizarApiClick(value: any) {
    this.SINCRONIZARAPI= value.target.checked;
  }
  compraMinimaClick(value: any) {
    this.COMPRAMINIMA= value.target.checked;
  }
  ocultarPreciosClick(value: any) {
    this.OCULTARPRECIOS= value.target.checked;
  }
  ocultarPresupuestoClick(value: any) {
    this.OCULTARPRESUPUESTO= value.target.checked;
  }
  ocultarCodigoYUnidadesClick(value: any) {
    this.OCULTARCODIGOUNIDADES= value.target.checked;
  }
  ocultarFiltrosClick(value: any) {
    this.OCULTARFILTROSARTICULOS= value.target.checked;
  }
  pedidoVendedorClick(value: any) {
    this.PEDIDOVENDEDOR= value.target.checked;
  }
  sincronizarPedidosClick(value: any) {
    this.SINCRONIZARPEDIDOS= value.target.checked;
  }
  imprimirComanderaClick(value: any) {
    this.IMPRESIONCOMANDERA= value.target.checked;
  }

  ocultarPreciosComprobanteClick(value: any) {
    this.OCULTARPRECIOSCOMPROBANTE= value.target.checked;
  }
  ocultarComprobanteClick(value: any) {
    this.OCULTARCOMPROBANTE= value.target.checked;
  }
  limitarConfiguracionClick(value: any) {
    this.LIMITARCONFIGURACION= value.target.checked;
  }
  produccionClick(value: any) {
    this.PRODUCCION= value.target.checked;
  }
  mpStockClick(value: any) {
    this.MPSTOCK= value.target.checked;
  }
  articulosMPClick(value: any) {
    this.ARTICULOSMP= value.target.checked;
  }
  ordenarPorNumeroClick(value: any) {
    this.ORDENARPORNUMERO= value.target.checked;
  }
  visualizarUbicacionesClick(value: any) {
    this.VISUALIZARUBICACION= value.target.checked;
  }
  visualizarCodigoClienteClick(value: any) {
    this.VISUALIZARCODIGOCLIENTE= value.target.checked;
  }
  ocultarPreciosProduccionClick(value: any) {
    this.OCULTARPRECIOSPRODUCCION= value.target.checked;
  }
  ocultarTotalesClick(value: any) {
    this.OCULTARTOTALES= value.target.checked;
  }
  visualizarActivarListaClick(value: any) {
    this.VISUALIZARACTIVARLISTA= value.target.checked;
  }
  visualizarFiltroMultipleClick(value: any) {
    this.VISUALIZARFILTROMULTIPLE= value.target.checked;
  }
  modificarPreciosMPClick(value: any) {
    this.MODIFICARPRECIOSMP= value.target.checked;
  }
  cargarCodigoBarraClick(value: any) {
    this.CARGARCODIGOBARRA= value.target.checked;
  }
  controlEntregasClick(value: any) {
    this.CONTROLENTREGAS= value.target.checked;
  }
  visualizarComprobanteUnificadoClick(value: any) {
    this.VISUALIZARCOMPROBANTEUNIFICADO= value.target.checked;
  }
  visualizarIVAClick(value: any) {
    this.VISUALIZARIVA= value.target.checked;
  }
  saldoAFavorClick(value: any) {
    this.SALDOAFAVOR= value.target.checked;
  }
  ubicacionArticulosClick(value: any) {
    this.UBICACIONARTICULOS= value.target.checked;
  }
  visualizarImagenesRubrosClick(value: any) {
    this.VISUALIZARIMAGENESRUBROS= value.target.checked;
  }
  ocultarPreciosPedidoClick(value: any) {
    this.OCULTARPRECIOSPEDIDOS= value.target.checked;
  }
  agregarListaClick(value: any) {
    this.AGREGARLISTA= value.target.checked;
  }
  comboArticulosClick(value: any) {
    this.COMBOARTICULOS= value.target.checked;
  }
  distanciaClick(value: any) {
    this.DISTANCIA= value.target.checked;
  }
  imprimir80mmClick(value: any) {
    this.IMPRIMIR80MM= value.target.checked;
  }
  fichaMedicaClick(value: any) {
    this.FICHAMEDICA= value.target.checked;
  }
  mostradorEfectivoClick(value: any) {
    this.MOSTRADOREFECTIVO= value.target.checked;
  }

  ocultarFiltrosComprasClick(value: any) {
    this.OCULTARFILTROSCOMPRAS= value.target.checked;
  }
  modificarListaClick(value: any) {
    this.MODIFICARLISTA= value.target.checked;
  }
  mensajeClick(value: any) {
    this.MENSAJEAPLICACION= value.target.checked;
  }
  iva27Click(value: any) {
    this.IVA27= value.target.checked;
  }
  iva10Click(value: any) {
    this.IVA10= value.target.checked;
  }
  codigoQRClick(value: any) {
    this.CODIGOQR= value.target.checked;
  }
  cambioEstadosClick(value: any) {
    this.VISUALIZARCAMBIOESTADOS= value.target.checked;
  }
  ocultarFacturasClick(value: any) {
    this.OCULTARFACTURA= value.target.checked;
  }
  ocultarQRClick(value: any) {
    this.OCULTARQR= value.target.checked;
  }
  ocultarPreciosEtiquetasClick(value: any) {
    this.OCULTARPRECIOSETIQUETAS= value.target.checked;
  }
  mostrarCodigosEtiquetasClick(value: any) {
    this.MOSTRARCODIGOETIQUETAS= value.target.checked;
  }
  ocultarFacturasComanderaClick(value: any) {
    this.OCULTARFACTURACOMANDERA= value.target.checked;
  }
  revertirOrdenPedidosClick(value: any) {
    this.REVERTIRORDENPEDIDOS= value.target.checked;
  }
  visualizarLibrosClick(value: any) {
    this.VISUALIZARLIBROS= value.target.checked;
  }
  ocultarDatosGeneralesClick(value: any) {
    this.OCULTARDATOSGENERALES= value.target.checked;
  }
  mostrarRubrosEtiquetasClick(value: any) {
    this.MOSTRARRUBROSETIQUETAS= value.target.checked;
  }
  imprimirEtiquetas80mmClick(value: any) {
    this.IMPRIMIRETIQUETAS80MM= value.target.checked;
  }
  turnosCajaClick(value: any) {
    this.TURNOSCAJA= value.target.checked;
  }
  observacionArticulosClick(value: any) {
    this.OBSERVACIONARTICULOS= value.target.checked;
  }
  crearDuplicadosClick(value: any) {
    this.CREARDUPLICADOS= value.target.checked;
  }
  ocultarGananciasClick(value: any) {
    this.OCULTARGANANCIAS= value.target.checked;
  }
  ocultarComprasClick(value: any) {
    this.OCULTARCOMPRAS= value.target.checked;
  }
  impresionDobleClick(value: any) {
    this.IMPRESIONDOBLE= value.target.checked;
  }
  ocultarEditarDepositosClick(value: any) {
    this.OCULTAREDITARDEPOSITOS= value.target.checked;
  }
  ocultarFechaClick(value: any) {
    this.BLOQUEARFECHA= value.target.checked;
  }
  pedidoEntregadoClick(value: any) {
    this.PEDIDOENTREGADO= value.target.checked;
  }
  prestamosClick(value: any) {
    this.PRESTAMOS= value.target.checked;
  }
  ocultarFPClick(value: any) {
    this.OCULTARFP= value.target.checked;
  }
  costoCheckClick(value: any) {
    this.COSTOCHECK= value.target.checked;
  }
  activoSucursalClick(value: any) {
    this.ACTIVOSUCURSAL= value.target.checked;
  }
  rolOxyClick(value: any) {
    this.ROLOXY= value.target.checked;
  }
  editarPreciosComprasClick(value: any) {
    this.BLOQUEAREDITARCOMPRAS= value.target.checked;
  }
  bloquearPreciosClick(value: any) {
    this.BLOQUEARPRECIOS= value.target.checked;
  }
  VisualizarCodigoArticuloClick(value: any) {
    this.VISUALIZARCODIGOARTICULOCOMPROBANTE= value.target.checked;
  }
  AutoAsignarCodigoBarraClick(value: any) {
    this.AUTOASIGNARCODIGOBARRA= value.target.checked;
  }
  OrdenarPorCodigoClick(value: any) {
    this.ORDENARPORCODIGO= value.target.checked;
  }
  comprobanteSinAzulClick(value: any) {
    this.COMPROBANTESINAZUL= value.target.checked;
  }
  bloqueoPedidosClick(value: any) {
    this.BLOQUEOPEDIDOS= value.target.checked;
  }
  categoriaLibrosClick(value: any) {
    this.CATEGORIALIBROS= value.target.checked;
  }
  bloqueoDeleteArticulosClick(value: any) {
    this.ESCONDERDELETEARTICULOS= value.target.checked;
  }
  visualizarSeleccionSucursalClick(value: any) {
    this.VISUALIZARSELECCIONARSUCURSAL= value.target.checked;
  }
  saldoAFavorProveedoresClick(value: any) {
    this.SALDOAFAVORCOMPRAS= value.target.checked;
  }

  OcultarAprobadoAfipClick(value: any) {
    this.OCULTARAPROBADOAFIP= value.target.checked;
  }
  ocultarFantasiaClick(value: any) {
    this.OCULTARFANTASIA= value.target.checked;
  }
  footerClick(value: any) {
    this.FOOTER= value.target.checked;
  }
  ocultarIndicadorVentasClick(value: any) {
    this.OCULTARINDICADORVENTAS= value.target.checked;
  }
  crearPedidoDirectoClick(value: any) {
    this.CREARPEDIDODIRECTO= value.target.checked;
  }
  recalculoUnidadClick(value: any) {
    this.RECALCULOUNIDAD= value.target.checked;
  }
  ocultarIndicadoresEgresoClick(value: any) {
    this.OCULTARINDICADORESEGRESO= value.target.checked;
  }
  porcentajeTarjetasClick(value: any) {
    this.PORCENTAJETARJETAS= value.target.checked;
  }
  facturaMClick(value: any) {
    this.FACTURAM= value.target.checked;
  }
  ocultarDeleteIngresosClick(value: any) {
    this.OCULTARDELETEINGRESOS= value.target.checked;
  }
  comprobanteWSClick(value: any) {
    this.COMPROBANTEWS= value.target.checked;
  }
  FatmanClick(value: any) {
    this.FATMAN= value.target.checked;
  }
  mostrador2Click(value: any) {
    this.MOSTRADOR2= value.target.checked;
  }
  comprobanteEspejoClick(value: any) {
    this.COMPROBANTEESPEJO= value.target.checked;
  }
  imprimirEtiquetasJPGClick(value: any) {
    this.ETIQUETASJPG= value.target.checked;
  }

  MedinorClick(value: any) {
    this.MEDINOR= value.target.checked;
  }
  datosMedinorClick(value: any) {
    this.DATOSMEDINOR= value.target.checked;
  }
  repartoXDefectoClick(value: any) {
    this.REPARTOXDEFECTO= value.target.checked;
  }
  ocultarAlgunosDatosGeneralesClick(value: any) {
    this.OCULTARALGUNOSDATOSGENERALES= value.target.checked;
  }



  onSubmit(value: any) {
    if (this.myForm.valid) {
      const loadRef = this.generalServ.loadingModal();
      let dataRol: RolCrearEditarModel = {
        idUser: localStorage.getItem('idUser') ?? '',
        idRol: this.idRol,
        rolName: value.nombreRol,
        idClienteNegotis: localStorage.getItem('idClienteNegotis') ?? '',
        clientes: this.CLIENTES,
        zonas: this.ZONAS,
        empleados: this.EMPLEADOS,
        pedidos: this.PEDIDOS,
        modificarPedidos: this.modificarPedidos,
        eliminarPedidos: this.eliminarPedidos,
        visualizarPedidos: this.visualizarPedidos,
        precios: this.PRECIOS,
        productos: this.PRODUCTOS,
        modificarProductos: this.modificarProductos,
        roles: this.ROLES,
        proveedores: this.proveedores,
        ComprasProveedor: this.ComprasProveedor,
        EliminarComprasProveedor: this.EliminarComprasProveedor,
        gastos: this.GASTOS,
        totales: this.TOTALES,
        transferencias: this.TRANSFERENCIAS,
        visualizarReportes: this.VISUALIZARREPORTES,
        despacho: this.DESPACHO,
        filtroCaja: this.FILTROCAJA,
        stockValor: this.StockValor,
        finanzas: this.FINANZAS,
        aumentoDescuentoMonto: this.AUMENTO_DESCUENTO_MONTO,
        visualizarStock: this.VISUALIZARSTOCK,
        visualizarCodigo: this.VISUALIZARCODIGO,
        visualizarCodDesc: this.VISUALIZARCODIGO_DESCUENTO,
        venderConStock: this.VENDERCONSTOCK,
        visualizarCantidadVentas: this.VISUALIZARCANTIDADVENTAS,
        visualizarListaPrecios: this.VISUALIZARLISTAPRECIOS,
        visualizarCaja: this.VISUALIZARCAJA,
        visualizarConfiguraciones: this.VISUALIZARCONFIGURACIONES,
        visualizarStockProveedor: this.VISUALIZARSTOCKPROVEEDOR,
        visualizarAumentoDescuentoLista: this.VISUALIZAR_AUMENTO_DESCUENTOLISTA,
        visualizarCantXPack: this.VISUALIZARCANTXPACK,
        visualizarIDEstado: this.VISUALIZARIDESTADO,
        visualizarMarcaRemito: this.VISUALIZARMARCAREMITO,
        visualizarCantXPackRemito: this.VISUALIZARCANTXPACKREMITO,
        visualizarUsuarioRemito: this.VISUALIZARUSUARIOREMITO,
        eliminarClientes: this.ELIMINARCLIENTES,
        visualizarOfertas: this.VISUALIZAROFERTAS,
        visualizarCategoria: this.VISUALIZARCATEGORIA,
        filtroPedidos: this.FILTROPEDIDOS,
        mostrarPorcentajeLista: this.MOSTRARPORCENTAJELISTA,
        visualizarCodigoArticulo: this.VISUALIZARCODIGOARTICULO,
        habilitarHome: this.HABILITARHOME,
        visualizarPorcentaje: this.VISUALIZARPORCENTAJE,
        visualizarImpresionBT: this.VISUALIZAR_IMPRESIONBT,
        visualizarComprobanteYFactura: this.VISUALIZARCOMPROBANTE_FACTURA,
        visualizarPesables: this.VISUALIZARPESABLES,
        visualizarReporteVencimiento: this.VISUALIZARREPORTEVENCIMIENTO,
        visualizarListaArticulos: this.VISUALIZARLISTAARTICULOS,
        visualizarRentabilidad: this.VISUALIZARRENTABILIDAD,
        visualizarFechaEstadoFactura: this.VISUALIZARFECHAESTADOFACTURA,
        visualizarLogoNegotis: this.VISUALIZARLOGONEGOTIS,
        visualizarTalle: this.VISUALIZARTALLE,
        visualizarLogo: this.VISUALIZARLOGO,
        visualizarActualizarPrecios: this.VISUALIZARACTUALIZARPRECIOS,
        visualizarColor : this.VISUALIZARCOLOR,
        visualizarObjetivo : this.VISUALIZAROBJETIVO,
        cargarDuplicado : this.CARGARDUPLICADOS,
        datosEcommerce : this.OCULTARDATOSE,
        modificarUnidades : this.MODIFICARUNIDADES,
        filtroVendedor : this.FILTROVENDEDOR,
        visualizarEstadosPedidos : this.VISUALIZARESTADOSPEDIDOS,
        visualizarDatosFiscales : this.VISUALIZARDATOSFISCALES,
        preciosCostosAdicionales : this.PRECIOSCOSTOADICIONALES,
        visualizarPrecioDolar : this.VISUALIZARPRECIODOLAR,
        visualizarDescuentos : this.VISUALIZARDESCUENTOS,
        visualizarRubroCategoria : this.VISUALIZARRUBROCATEGORIA,
        imprimirDuplicado : this.IMPRIMIRDUPLICADO,
        visualizarDatosEstetica : this.VISUALIZARDATOSESTETICA,
        editarPrecios : this.EDITARPRECIOS,
        filtroUsuario : this.FILTROUSUARIO,
        filtroTotalesGastos : this.FILTROGASTOSTOTALES,
        filtroEnter : this.FILTROENTER,
        visualizarDescuentoComprobante : this.VISUALIZARDESCUENTO,
        ocultarRubro : this.OCULTARRUBRO,
        ordernarPorRubro : this.ORDENARPORRUBRO,
        visualizarAumentoPorcentaje : this.VISUALIZARPORCENTAJEAUMENTO,
        visualizarPrecioLista : this.VISUALIZARPRECIOLISTA,
        imprimirArticulosOrdenado : this.LISTARPORRUBRO,
        comboOferta : this.COMBOOFERTA,
        rolExcel : this.ROLEXCEL,
        visualizarAcciones : this.VISUALIZARACCIONES,
        sinicronizarExcel : this.SINCRONIZAREXCEL,
        imprimirEtiquetas : this.IMPRIMIRETIQUETAS,
        mostrarPrecioOferta : this.MOSTRARPRECIOOFERTA,
        visualizarDatosTaller : this.VISUALIZARDATOSTALLER,
        filtroClienteSucursal : this.FILTROCLIENTESUCURSAL,
        visualizarDatosSucursal : this.VISUALIZARDATOSSUCURSAL,
        visualizarCategoriaRubroPedidos : this.VISUALIZARCATEGORIARUBROPEDIDOS,
        ocultarCodigosBarraArticulos : this.OCULTARCODIGOBARRAS,
        visualizarDescripcion : this.VISUALIZARDESCRIPCION,
        sincronizarApi : this.SINCRONIZARAPI,
        compraMinima : this.COMPRAMINIMA,
        ocultarPrecios : this.OCULTARPRECIOS,
        ocultarPresupuesto : this.OCULTARPRESUPUESTO,
        ocultarCodigoUnidades : this.OCULTARCODIGOUNIDADES,
        ocultarFiltrosArticulos : this.OCULTARFILTROSARTICULOS,
        pedidoVendedor : this.PEDIDOVENDEDOR,
        sincronizarPedidos : this.SINCRONIZARPEDIDOS,
        impresionComandera : this.IMPRESIONCOMANDERA,
        ocultarPreciosComprobante : this.OCULTARPRECIOSCOMPROBANTE,
        ocultarComprobante : this.OCULTARCOMPROBANTE,
        limitarConfiguracion : this.LIMITARCONFIGURACION,
        produccion : this.PRODUCCION,
        mPStock : this.MPSTOCK,
        articulosMP : this.ARTICULOSMP,
        ordenarPorNumero : this.ORDENARPORNUMERO,
        ubicaciones : this.VISUALIZARUBICACION,
        verCodigoCliente : this.VISUALIZARCODIGOCLIENTE,
        ocultarPreciosProduccion : this.OCULTARPRECIOSPRODUCCION,
        ocultarTotalesSinPrecios : this.OCULTARTOTALES,
        visualizarActivarLista : this.VISUALIZARACTIVARLISTA,
        visualizarFiltrMultiple : this.VISUALIZARFILTROMULTIPLE,
        modificarPrecioMP : this.MODIFICARPRECIOSMP,
        cargarCodigoBarra: this.CARGARCODIGOBARRA,
        controlEntregas: this.CONTROLENTREGAS,
        comprobanteUnificado: this.VISUALIZARCOMPROBANTEUNIFICADO,
        visualizarIVA : this.VISUALIZARIVA,
        saldoAFavor : this.SALDOAFAVOR,
        imagenesRubro: this.VISUALIZARIMAGENESRUBROS,
        ubicacionArticuloPedido: this.UBICACIONARTICULOS,
        ocultarPreciosPedido: this.OCULTARPRECIOSPEDIDOS,
        agregarLista : this.AGREGARLISTA,
        comboArticulos : this.COMBOARTICULOS,
        distancia : this.DISTANCIA,
        imprimir80mm : this.IMPRIMIR80MM,
        fichaMedica: this.FICHAMEDICA,
        mostradorEfectivo: this.MOSTRADOREFECTIVO,
        ocultarFiltrosCompras : this.OCULTARFILTROSCOMPRAS,
        modificarLista : this.MODIFICARLISTA,
        mensajeAplicacion : this.MENSAJEAPLICACION,
        iva27 : this.IVA27,
        iva10 : this.IVA10,
        codigoQR : this.CODIGOQR,
        visualizarCambioEstados : this.VISUALIZARCAMBIOESTADOS,
        ocultarFactura : this.OCULTARFACTURA,
        ocultarQR : this.OCULTARQR,
        ocultarPreciosEtiquetas : this.OCULTARPRECIOSETIQUETAS,
        mostrarCodigoEtiquetas : this.MOSTRARCODIGOETIQUETAS,
        ocultarFacturaComandera : this.OCULTARFACTURACOMANDERA,
        revertirOrdenPedidos : this.REVERTIRORDENPEDIDOS,
        visualizarLibros : this.VISUALIZARLIBROS,
        ocultarDatosGenerales : this.OCULTARDATOSGENERALES,
        mostrarRubroEtiqueta : this.MOSTRARRUBROSETIQUETAS,
        etiquetas80mm : this.IMPRIMIRETIQUETAS80MM,
        turnosCaja : this.TURNOSCAJA,
        observacionArticulos : this.OBSERVACIONARTICULOS,
        crearDuplicado : this.CREARDUPLICADOS,
        ocultarGanancias : this.OCULTARGANANCIAS,
        ocultarCompras : this.OCULTARCOMPRAS,
        impresionDoble : this.IMPRESIONDOBLE,
        ocultarEditarDepositos : this.OCULTAREDITARDEPOSITOS,
        ocultarFechaPedido : this.BLOQUEARFECHA,
        pedidoEntregado : this.PEDIDOENTREGADO,
        prestamos : this.PRESTAMOS,
        ocultarFPFactura : this.OCULTARFP,
        costoCheck: this.COSTOCHECK,
        activoSucursal: this.ACTIVOSUCURSAL,
        rolOxy: this.ROLOXY,
        bloquearEditarCompras: this.BLOQUEAREDITARCOMPRAS,
        bloquearPrecios: this.BLOQUEARPRECIOS,
        visualizarCodigoArticuloComprobante : this.VISUALIZARCODIGOARTICULOCOMPROBANTE,
        ordenarArticulosPorCodigo : this.ORDENARPORCODIGO,
        autoAsignarCodigoBarra : this.AUTOASIGNARCODIGOBARRA,
        comprobanteSinAzul : this.COMPROBANTESINAZUL,
        bloqueoPedidos : this.BLOQUEOPEDIDOS,
        categoriaLibros : this.CATEGORIALIBROS,
        esconderDeleteArt: this.ESCONDERDELETEARTICULOS,
        visualizarSucursalConfig : this.VISUALIZARSELECCIONARSUCURSAL,
        saldoAFavorCompras : this.SALDOAFAVORCOMPRAS,
        ocultarAprobadoAfip : this.OCULTARAPROBADOAFIP,
        ocultarFantasia : this.OCULTARFANTASIA,
        footer: this.FOOTER,
        ocultarIndicadorVentas: this.OCULTARINDICADORVENTAS,
        crearPedidoDirecto: this.CREARPEDIDODIRECTO ,
        recalculoUnidad: this.RECALCULOUNIDAD,
        ocultarIndicadorEgreso: this.OCULTARINDICADORESEGRESO,
        porcentajeTarjetas : this.PORCENTAJETARJETAS,
        facturaM: this.FACTURAM,
        ocultarDeleteIngresos : this.OCULTARDELETEINGRESOS,
        pdfWs : this.COMPROBANTEWS,
        fatman : this.FATMAN,
        mostrador2 : this.MOSTRADOR2        ,
        comprobanteEspejo : this.COMPROBANTEESPEJO,
        etiquetasJPG : this.ETIQUETASJPG,
        medinor : this.MEDINOR,
        datosMedinor : this.DATOSMEDINOR,
        repartoXDefecto : this.REPARTOXDEFECTO,
        ocultarAlgunosDatosGenerales : this.OCULTARALGUNOSDATOSGENERALES,
      };

      this.rolServ.crearEditarRol(dataRol).subscribe(data => {
        this.postRol = data; loadRef.close();
        if (this.postRol.Repetido != true) {
          localStorage.setItem('roles', JSON.stringify(this.postRol.Roles));
          this.router.navigate(["/cliente/rol/panel"], { replaceUrl: true });
          this.snackBar.openFromComponent(SnackBarOperacionExitosaComponent, {
            duration: 1000,
          });
        }
      }, error => { console.log(error); loadRef.close(); })
    }
    this.submitted = true;
  }

}
