import { Component, OnInit } from '@angular/core';
import { RolService } from '../../../Service/rol.service';
import { GlobalService } from '../../../Service/global.service';
import { MatDialog } from '@angular/material/dialog';
import { EliminarModalComponent } from '../../../components/eliminar-modal/eliminar-modal.component';
import { ErrorforaneaModalComponent } from '../../../components/errorforanea-modal/errorforanea-modal.component';
import { GeneralService } from '../../../Service/general.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-rol-panel',
  templateUrl: './rol-panel.component.html',
  styleUrls: ['./rol-panel.component.css']
})
export class RolPanelComponent implements OnInit {

  rolCtrl = new FormControl();
  filteredRol!: Observable<any[]>;

  listRol: any;
  listRolOriginal: any;
  idRol: any;
  token: any;

  nombreRol: any;
  CLIENTES: boolean = false;
  ZONAS: boolean = false;
  EMPLEADOS: boolean = false;
  PEDIDOS: boolean = false;
  modificarPedidos: boolean = false;
  eliminarPedidos: boolean = false;
  visualizarPedidos: boolean = false;
  PRECIOS: boolean = false;
  PRODUCTOS: boolean = false;
  modificarProductos: boolean = false;
  proveedores: boolean = false;
  ComprasProveedor: boolean = false;
  EliminarComprasProveedor: boolean = false;
  ROLES: boolean = false;
  GASTOS: boolean = false;
  TOTALES: boolean = false;
  TRANSFERENCIAS: boolean = false;
  VISUALIZARREPORTES: boolean = false;
  DESPACHO: boolean = false;
  FILTROCAJA: boolean = false;
  stockValor: boolean = false;
  FINANZAS: boolean = false;
  AUMENTO_DESCUENTO_MONTO: boolean = false;
  VISUALIZARSTOCK: boolean = false;
  VISUALIZARCODIGO: boolean = false;
  VISUALIZARCODIGO_DESCUENTO: boolean = false;
  VENDERCONSTOCK: boolean = false;
  VISUALIZARCANTIDADVENTAS: boolean = false;
  VISUALIZARLISTAPRECIOS: boolean = false;
  VISUALIZARCAJA: boolean = false;
  VISUALIZARCONFIGURACIONES: boolean = false;
  VISUALIZARSTOCKPROVEEDOR: boolean = false;
  VISUALIZAR_AUMENTO_DESCUENTOLISTA: boolean = false;
  VISUALIZARCANTXPACK: boolean = false;
  VISUALIZARIDESTADO: boolean = false;
  VISUALIZARCANTIDADXPACKREMITO: boolean = false;
  VISUALIZARMARCAREMITO: boolean = false;
  VISUALIZARUSUARIOREMITO: boolean = false;
  ELIMINARCLIENTES: boolean = false;
  VISUALIZAROFERTAS: boolean = false;
  VISUALIZARCATEGORIA: boolean = false;
  FILTROPEDIDOS: boolean = false;
  MOSTRARPORCENTAJELISTA: boolean = false;
  VISUALIZARCODIGOARTICULO: boolean = false;
  HABILITARHOME: boolean = false;
  VISUALIZARPORCENTAJE: boolean = false;
  VISUALIZAR_IMPRESIONBT: boolean = false;
  VISUALIZARCOMPROBANTE_FACTURA: boolean = false;
  VISUALIZARPESABLES: boolean = false;
  VISUALIZARREPORTEVENCIMIENTO: boolean = false;
  VISUALIZARLISTAARTICULOS: boolean = false;
  VISUALIZARRENTABILIDAD: boolean = false;
  VISUALIZARFECHAESTADOFACTURA: boolean = false;
  VISUALIZARLOGONEGOTIS: boolean = false;
  VISUALIZARTALLE: boolean = false;
  VISUALIZARLOGO: boolean = false;
  VISUALIZARACTUALIZARPRECIOS: boolean = false;
  VISUALIZARCOLOR: boolean = false;
  VISUALIZAROBJETIVO: boolean = false;
  CARGARDUPLICADOS: boolean = false;
  OCULTARDATOSE: boolean = true;
  MODIFICARUNIDADES: boolean = true;
  FILTROVENDEDOR: boolean = false;
  VISUALIZARESTADOSPEDIDOS : boolean = false ;
  VISUALIZARDATOSFISCALES: boolean  = false ;
  PRECIOSCOSTOADICIONALES: boolean  = false ;
  VISUALIZARPRECIODOLAR: boolean  = false ;
  VISUALIZARDESCUENTOS: boolean  = false ;
  VISUALIZARCATEGORIARUBRO: boolean  = false ;
  IMPRIMIRDUPLICADO: boolean = false;
  VISUALIZARDATOSESTETICA : boolean=false;
  EDITARPRECIOS : boolean=false;
  FILTROUSUARIO : boolean=false;
  FILTROGASTOSTOTALES : boolean =false;
  FILTROENTER : boolean = false;
  VISUALIZARDESCUENTO: boolean = false;
  OCULTARRUBRO : boolean = false;
  ORDENARPORRUBRO : boolean = false;
  VISUALIZARPORCENTAJEAUMENTO : boolean = false;
  VISUALIZARPRECIOLISTA: boolean = false;
  LISTARPORRUBRO: boolean = false;
  COMBOOFERTA: boolean = false;
  ROLEXCEL: boolean = false;
  VISUALIZARACCIONES: boolean = false;
  SINCRONIZAREXCEL: boolean = false;
  MOSTRARPRECIOOFERTA: boolean = false;
  IMPRIMIRETIQUETAS: boolean = false;
  VISUALIZARDATOSTALLER: boolean = false;
  VISUALIZARDATOSSUCURSAL: boolean = false;
  VISUALIZARCATEGORIARUBROPEDIDOS: boolean = false;
  OCULTARCODIGOBARRAS: boolean = false;
  VISUALIZARDESCRIPCION: boolean = false;
  SINCRONIZARAPI: boolean = false;
  COMPRAMINIMA: boolean = false;
  OCULTARPRECIOS: boolean = false;
  OCULTARPRESUPUESTO: boolean = false;
  OCULTARCODIGOUNIDADES: boolean = false;
  OCULTARFILTROSARTICULOS: boolean = false;
  PEDIDOVENDEDOR: boolean = false;
  IMPRESIONCOMANDERA: boolean = false;
  OCULTARPRECIOSCOMPROBANTE: boolean = false;
  OCULTARCOMPROBANTE: boolean = false;
  LIMITARCONFIGURACION: boolean = false;
  PRODUCCION: boolean =false;
  ARTICULOSMP: boolean=false;
  MPSTOCK: boolean=false;
  ORDENARPORNUMERO: boolean = false;
  OCULTARTOTALES: boolean = false;
  VISUALIZARACTIVARLISTA: boolean = false;
  VISUALIZARFILTROMULTIPLE: boolean = false;
  MODIFICARPRECIOMP:boolean = false;
  CARGARCODIGOBARRA: boolean = false;
  CONTROLENTREGAS: boolean = false;
  VISUALIZARCOMPROBANTEUNIFICADO: boolean = false;
  VISUALIZARIVA: boolean = false;
  SALDOAFAVOR: boolean = false;
  AGREGARLISTA: boolean = false;
  COMBOARTICULOS: boolean = false;
  DISTANCIA: boolean = false;
  IMPRIMIR80MM: boolean=false;
  FICHAMEDICA: boolean = false;
  MOSTRADOREFECTIVO: boolean= false;
  OCULTARFILTROSCOMPRAS: boolean= false;
  MODIFICARLISTA: boolean= false;
  MENSAJEAPLICACION: boolean= false;
  IVA27: boolean = false;
  IVA10: boolean = false;
  VISUALIZARCAMBIOESTADOS : boolean = true;
  OCULTARFACTURAS!: boolean;
  OCULTARQR : boolean = false;
  OCULTARPRECIOSETIQUETAS : boolean = false;
  MOSTRARCODIGOSETIQUETAS : boolean = false;
  OCULTARFACTURASCOMANDERA: boolean = false;
  REVERTIRORDENPEDIDOS: boolean = false;
  VISUALIZARLIBROS: boolean = false;
  OCULTARDATOSGENERALES: boolean = false;
  MOSTRARRUBROSETIQUETAS: boolean = false;
  IMPRIMIRETIQUETAS80MM: boolean = false;
  TURNOSCAJA: boolean = false;
  OBSERVACIONARTICULOS: boolean = false;
  CREARDUPLICADOS: boolean = false;
  OCULTARGANANCIAS: boolean = false;
  OCULTARCOMPRAS: boolean = false;
  IMPRESIONDOBLE: boolean = false;
  OCULTAREDITARDEPOSITOS: boolean = false;
  BLOQUEARFECHA: boolean = false;
  PEDIDOENTREGADO: boolean = false;
  PRESTAMOS: boolean = false;
  OCULTARFP: boolean = false;
  COSTOCHECK: boolean = false;
  ACTIVOSUCURSAL: boolean= false;
  ROLOXY: boolean = false;
  BLOQUEAREDITARCOMPRAS: boolean = false;
  BLOQUEARPRECIOS: boolean = false;
  VISUALIZARCODIGOARTICULOCOMPROBANTE: boolean = false;
  ORDENARPORCODIGO : boolean = false;
  AUTOASIGNARCODIGOBARRA: boolean = false;
  COMPROBANTESINAZUL: boolean = false;
  BLOQUEOPEDIDOS: boolean = false;
  CATEGORIALIBROS: boolean= false;
  ESCONDERDELETEARTICULOS: boolean = false;
  VISUALIZARSELECCIONARSUCURSAL: boolean = false;
  SALDOAFAVORCOMPRAS: boolean = false;
  OCULTARAPROBADOAFIP: boolean = false;
  OCULTARNOMBREFANTASIA: boolean = false;
  FOOTER: boolean = false;
  OCULTARINDICADORVENTAS:boolean= false;
  CREARPEDIDODIRECTO: boolean= false;
  RECALCULOUNIDAD: boolean= false;
  OCULTARINDICADORESEGRESO: boolean= false;
  PORCENTAJETARJETAS: boolean= false;
  FACTURAM: boolean= false;
  OCULTARDELETEINGRESOS: boolean = false;
  COMPROBANTEWS:boolean =false;
  FATMAN:boolean = false;
  MOSTRADOR2: boolean= false;
  COMPROBANTEESPEJO: boolean = false;
  ETIQUETASJPG:boolean = false;
  MEDINOR: boolean = false;
  DATOSMEDINOR: boolean = false;
  REPARTOXDEFECTO: boolean = false;
  OCULTARALGUNOSDATOSGENERALES: boolean = false;

  constructor(private titleService: Title,private global: GlobalService, private rolServ: RolService, public dialog: MatDialog, private generalServ: GeneralService) {
    titleService.setTitle("Roles");
  }

  ngOnInit() {
    const loading = this.generalServ.loadingModal();
    let data = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
    this.rolServ.GetListRolByClienteNegotis(data).subscribe(data => {
      this.listRol = data;
      this.listRolOriginal = data;
      //user name
      this.filteredRol = this.rolCtrl.valueChanges
        .pipe(
          startWith(''),
          map(item => item ? this._filterRol(item) : this.listRolOriginal.slice())
        );
      loading.close();
    }, error => { console.log(error); loading.close(); });
  }

  //rol
  private _filterRol(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.listRolOriginal.filter((item: any) => item.Name.toLowerCase().includes(filterValue.toLowerCase()));
  }

  delete(value: any) {

    const dialogRef = this.dialog.open(EliminarModalComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        const loadRef = this.generalServ.loadingModal();
        let dataRol = { 'idRol': value.Id, 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
        this.rolServ.delete(dataRol).subscribe(data => {
          if (data == true) {
            let index = 0;
            for (let item of this.listRol) {
              if (item.Id == value.Id) {
                this.listRol.splice(index, 1)
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

  buscar() {
    this.listRol = this.listRolOriginal;
    console.log(this.listRol);
    if (this.nombreRol != null && this.nombreRol != '') {
      this.listRol = this.listRol.filter((s: any) => s.Name.toUpperCase().includes(this.nombreRol.toUpperCase()));
    }
    if (this.CLIENTES == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.CLIENTES == this.CLIENTES
      );
    }
    if (this.ZONAS == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.ZONAS == this.ZONAS
      );
    }
    if (this.EMPLEADOS == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.EMPLEADOS == this.EMPLEADOS
      );
    }
    if (this.PEDIDOS == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.PEDIDOS == this.PEDIDOS
      );
    }
    if (this.modificarPedidos == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.modificarPedidos == this.modificarPedidos
      );
    }
    if (this.eliminarPedidos == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.eliminarPedidos == this.eliminarPedidos
      );
    }
    if (this.visualizarPedidos == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.visualizarPedidos == this.visualizarPedidos
      );
    }
    if (this.PRECIOS == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.PRECIOS == this.PRECIOS
      );
    }
    if (this.PRODUCTOS == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.PRODUCTOS == this.PRODUCTOS
      );
    }
    if (this.modificarProductos == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.modificarProductos == this.modificarProductos
      );
    }
    if (this.proveedores == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.proveedores == this.proveedores
      );
    }
    if (this.ComprasProveedor == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.ComprasProveedor == this.ComprasProveedor
      );
    }
    if (this.EliminarComprasProveedor == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.EliminarComprasProveedor == this.EliminarComprasProveedor
      );
    }
    if (this.FILTROCAJA == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.FiltroCaja == this.FILTROCAJA
      );
    }
    if (this.stockValor == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.stockValor == this.stockValor
      );
    }
    if (this.ROLES == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.ROLES == this.ROLES
      );
    }
    if (this.GASTOS == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.GASTOS == this.GASTOS
      );
    }
    if (this.TOTALES == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.TOTALES == this.TOTALES
      );
    }
    if (this.TRANSFERENCIAS == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.TRANSFERENCIAS == this.TRANSFERENCIAS
      );
    }
    if (this.VISUALIZARREPORTES == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.VISUALIZARREPORTES == this.VISUALIZARREPORTES
      );
    }
    if (this.DESPACHO == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.DESPACHO == this.DESPACHO
      );
    }
    if (this.FINANZAS == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.FINANZAS == this.FINANZAS
      );
    }
    if (this.VISUALIZARSTOCK == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.VISUALIZARSTOCK == this.VISUALIZARSTOCK
      );
    }
    if (this.VISUALIZARCODIGO == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.VISUALIZARCODIGO == this.VISUALIZARCODIGO
      );
    }
    if (this.VISUALIZARCODIGO_DESCUENTO == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.VISUALIZARCODDESC == this.VISUALIZARCODIGO_DESCUENTO
      );
    }
    if (this.VENDERCONSTOCK == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.VENDERCONSTOCK == this.VENDERCONSTOCK
      );
    }
    if (this.VISUALIZARCANTIDADVENTAS == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.VISUALIZARCANTIDADVENTAS == this.VISUALIZARCANTIDADVENTAS
      );
    }
    if (this.VISUALIZARLISTAPRECIOS == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.VISUALIZARLISTAPRECIOS == this.VISUALIZARLISTAPRECIOS
      );
    }
    if (this.VISUALIZARCAJA == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.VISUALIZARCAJA == this.VISUALIZARCAJA
      );
    }
    if (this.VISUALIZARCONFIGURACIONES == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.VISUALIZARCONFIGURACIONES == this.VISUALIZARCONFIGURACIONES
      );
    }
    if (this.VISUALIZARSTOCKPROVEEDOR == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.VISUALIZARSTOCKPROVEEDOR == this.VISUALIZARSTOCKPROVEEDOR
      );
    }
    if (this.VISUALIZAR_AUMENTO_DESCUENTOLISTA == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.VISUALIZAR_AUMENTO_DESCUENTOLISTA == this.VISUALIZAR_AUMENTO_DESCUENTOLISTA
      );
    }
    if (this.VISUALIZARCANTXPACK == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.VISUALIZARCANTXPACK == this.VISUALIZARCANTXPACK
      );
    }
    if (this.VISUALIZARIDESTADO == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.VISUALIZARIDESTADO == this.VISUALIZARIDESTADO
      );
    }
    if (this.VISUALIZARMARCAREMITO == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.VISUALIZARMARCAREMITO == this.VISUALIZARMARCAREMITO
      );
    }
    if (this.VISUALIZARCANTIDADXPACKREMITO == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.VISUALIZARCANTIDADXPACKREMITO == this.VISUALIZARCANTIDADXPACKREMITO
      );
    }
    if (this.VISUALIZARUSUARIOREMITO == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.VISUALIZARUSUARIOREMITO == this.VISUALIZARUSUARIOREMITO
      );
    }
    if (this.ELIMINARCLIENTES == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.ELIMINARCLIENTES == this.ELIMINARCLIENTES
      );
    }
    if (this.VISUALIZAROFERTAS == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.VISUALIZAROFERTAS == this.VISUALIZAROFERTAS
      );
    }
    if (this.VISUALIZARCATEGORIA == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.VISUALIZARCATEGORIA == this.VISUALIZARCATEGORIA
      );
    }
    if (this.FILTROPEDIDOS == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.FILTROPEDIDOS == this.FILTROPEDIDOS
      );
    }
    if (this.MOSTRARPORCENTAJELISTA == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.MOSTRARPORCENTAJELISTA == this.MOSTRARPORCENTAJELISTA
      );
    }
    if (this.VISUALIZARCODIGOARTICULO == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.VISUALIZARCODIGOARTICULO == this.VISUALIZARCODIGOARTICULO
      );
    }
    if (this.HABILITARHOME == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.HABILITARHOME == this.HABILITARHOME
      );
    }
    if (this.VISUALIZARPORCENTAJE == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.VISUALIZARPORCENTAJE == this.VISUALIZARPORCENTAJE
      );
    }
    if (this.VISUALIZAR_IMPRESIONBT == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.VISUALIZAR_IMPRESIONBT == this.VISUALIZAR_IMPRESIONBT
      );
    }
    if (this.VISUALIZARCOMPROBANTE_FACTURA == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.VISUALIZARCOMPROBANTE_FACTURA == this.VISUALIZARCOMPROBANTE_FACTURA
      );
    }
    if (this.VISUALIZARPESABLES == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.VISUALIZARPESABLES == this.VISUALIZARPESABLES
      );
    }
    if (this.VISUALIZARREPORTEVENCIMIENTO == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.VISUALIZARREPORTEVENCIMIENTO == this.VISUALIZARREPORTEVENCIMIENTO
      );
    }
    if (this.VISUALIZARLISTAARTICULOS == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.VISUALIZARLISTAARTICULOS == this.VISUALIZARLISTAARTICULOS
      );
    }
    if (this.VISUALIZARRENTABILIDAD == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.VISUALIZARRENTABILIDAD == this.VISUALIZARRENTABILIDAD
      );
    }
    if (this.VISUALIZARFECHAESTADOFACTURA == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.VISUALIZARFECHAESTADOFACTURA == this.VISUALIZARFECHAESTADOFACTURA
      );
    }
    if (this.VISUALIZARLOGONEGOTIS == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.VISUALIZARLOGONEGOTIS == this.VISUALIZARLOGONEGOTIS
      );
    }
    if (this.VISUALIZARTALLE == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.VISUALIZARTALLE == this.VISUALIZARTALLE
      );
    }
    if (this.VISUALIZARLOGO == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.VISUALIZARLOGO == this.VISUALIZARLOGO
      );
    }
    if (this.VISUALIZARACTUALIZARPRECIOS == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.VISUALIZARACTUALIZARPRECIOS == this.VISUALIZARACTUALIZARPRECIOS
      );
    }
    if (this.VISUALIZARCOLOR == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.VISUALIZARCOLOR == this.VISUALIZARCOLOR
      );
    }
    if (this.VISUALIZAROBJETIVO == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.VISUALIZAROBJETIVO == this.VISUALIZAROBJETIVO
      );
    }
    if (this.CARGARDUPLICADOS == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.CARGARDUPLICADOS == this.CARGARDUPLICADOS
      );
    }
    if (this.OCULTARDATOSE == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.OCULTARDATOSE == this.OCULTARDATOSE
      );
    }
    if (this.MODIFICARUNIDADES == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.MODIFICARUNIDADES == this.MODIFICARUNIDADES
      );
    }
    if (this.FILTROVENDEDOR == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.FILTROVENDEDOR == this.FILTROVENDEDOR
      );
    }
    if (this.VISUALIZARESTADOSPEDIDOS == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.VISUALIZARESTADOSPEDIDOS  == this.VISUALIZARESTADOSPEDIDOS
      );
    }
    if (this.VISUALIZARDATOSFISCALES == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.VISUALIZARDATOSFISCALES  == this.VISUALIZARDATOSFISCALES
      );
    }
    if (this.PRECIOSCOSTOADICIONALES == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.PRECIOSCOSTOADICIONALES  == this.PRECIOSCOSTOADICIONALES
      );
    }
    if (this.VISUALIZARPRECIODOLAR == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.VISUALIZARPRECIODOLAR  == this.VISUALIZARPRECIODOLAR
      );
    }
    if (this.VISUALIZARDESCUENTOS == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.VISUALIZARDESCUENTOS  == this.VISUALIZARDESCUENTOS
      );
    }
    if (this.VISUALIZARCATEGORIARUBRO == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.VISUALIZARCATEGORIARUBRO  == this.VISUALIZARCATEGORIARUBRO
      );
    }
    if (this.IMPRIMIRDUPLICADO == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.IMPRIMIRDUPLICADO  == this.IMPRIMIRDUPLICADO
      );
    }
    if (this.VISUALIZARDATOSESTETICA == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.VISUALIZARDATOSESTETICA  == this.VISUALIZARDATOSESTETICA
      );
    }
    if (this.EDITARPRECIOS == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.EDITARPRECIOS  == this.EDITARPRECIOS
      );
    }
    if (this.FILTROUSUARIO == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.FILTROUSUARIO  == this.FILTROUSUARIO
      );
    }
    if (this.FILTROGASTOSTOTALES == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.FILTROGASTOSTOTALES  == this.FILTROGASTOSTOTALES
      );
    }
    if (this.FILTROENTER == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.FILTROENTER  == this.FILTROENTER
      );
    }
    if (this.VISUALIZARDESCUENTO == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.VISUALIZARDESCUENTO  == this.VISUALIZARDESCUENTO
      );
    }
    if (this.OCULTARRUBRO == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.OCULTARRUBRO  == this.OCULTARRUBRO
      );
    }
    if (this.ORDENARPORRUBRO == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.ORDENARPORRUBRO  == this.ORDENARPORRUBRO
      );
    }
    if (this.VISUALIZARPORCENTAJEAUMENTO == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.VISUALIZARPORCENTAJEAUMENTO  == this.VISUALIZARPORCENTAJEAUMENTO
      );
    }
    if (this.VISUALIZARPRECIOLISTA == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.VISUALIZARPRECIOLISTA  == this.VISUALIZARPRECIOLISTA
      );
    }
    if (this.LISTARPORRUBRO == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.LISTARPORRUBRO  == this.LISTARPORRUBRO
      );
    }
    if (this.COMBOOFERTA == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.COMBOOFERTA  == this.COMBOOFERTA
      );
    }
    if (this.ROLEXCEL == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.ROLEXCEL  == this.ROLEXCEL
      );
    }
    if (this.VISUALIZARACCIONES == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.VISUALIZARACCIONES  == this.VISUALIZARACCIONES
      );
    }
    if (this.SINCRONIZAREXCEL == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.SINCRONIZAREXCEL  == this.SINCRONIZAREXCEL
      );
    }
    if (this.MOSTRARPRECIOOFERTA == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.MOSTRARPRECIOOFERTA  == this.MOSTRARPRECIOOFERTA
      );
    }
    if (this.IMPRIMIRETIQUETAS == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.IMPRIMIRETIQUETAS  == this.IMPRIMIRETIQUETAS
      );
    }
    if (this.VISUALIZARDATOSTALLER == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.VISUALIZARDATOSTALLER  == this.VISUALIZARDATOSTALLER
      );
    }
    if (this.VISUALIZARDATOSSUCURSAL == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.VISUALIZARDATOSSUCURSAL  == this.VISUALIZARDATOSSUCURSAL
      );
    }
    if (this.VISUALIZARCATEGORIARUBROPEDIDOS == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.VISUALIZARCATEGORIARUBROPEDIDOS  == this.VISUALIZARCATEGORIARUBROPEDIDOS
      );
    }
    if (this.OCULTARCODIGOBARRAS == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.OCULTARCODIGOBARRAS  == this.OCULTARCODIGOBARRAS
      );
    }
    if (this.VISUALIZARDESCRIPCION == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.VISUALIZARDESCRIPCION  == this.VISUALIZARDESCRIPCION
      );
    }
    if (this.SINCRONIZARAPI == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.SINCRONIZARAPI  == this.SINCRONIZARAPI
      );
    }
    if (this.COMPRAMINIMA == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.COMPRAMINIMA  == this.COMPRAMINIMA
      );
    }
    if (this.OCULTARPRECIOS == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.OCULTARPRECIOS  == this.OCULTARPRECIOS
      );
    }
    if (this.OCULTARPRESUPUESTO == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.OCULTARPRESUPUESTO  == this.OCULTARPRESUPUESTO
      );
    }
    if (this.OCULTARCODIGOUNIDADES == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.OCULTARCODIGOUNIDADES  == this.OCULTARCODIGOUNIDADES
      );
    }
    if (this.OCULTARFILTROSARTICULOS == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.OCULTARFILTROSARTICULOS  == this.OCULTARFILTROSARTICULOS
      );
    }
    if (this.PEDIDOVENDEDOR == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.PEDIDOVENDEDOR  == this.PEDIDOVENDEDOR
      );
    }
    if (this.IMPRESIONCOMANDERA == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.IMPRESIONCOMANDERA  == this.IMPRESIONCOMANDERA
      );
    }
    if (this.OCULTARPRECIOSCOMPROBANTE == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.OCULTARPRECIOSCOMPROBANTE  == this.OCULTARPRECIOSCOMPROBANTE
      );
    }
    if (this.OCULTARCOMPROBANTE == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.OCULTARCOMPROBANTE  == this.OCULTARCOMPROBANTE
      );
    }
    if (this.LIMITARCONFIGURACION == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.LIMITARCONFIGURACION  == this.LIMITARCONFIGURACION
      );
    }
    if (this.PRODUCCION == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.PRODUCCION  == this.PRODUCCION
      );
    }
    if (this.MPSTOCK == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.MPSTOCK  == this.MPSTOCK
      );
    }
    if (this.ARTICULOSMP == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.ARTICULOSMP  == this.ARTICULOSMP
      );
    }
    if (this.ORDENARPORNUMERO == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.ORDENARPORNUMERO  == this.ORDENARPORNUMERO
      );
    }
    if (this.OCULTARTOTALES == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.OCULTARTOTALES  == this.OCULTARTOTALES
      );
    }
    if (this.VISUALIZARACTIVARLISTA == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.VISUALIZARACTIVARLISTA  == this.VISUALIZARACTIVARLISTA
      );
    }
    if (this.VISUALIZARFILTROMULTIPLE == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.VISUALIZARFILTROMULTIPLE  == this.VISUALIZARFILTROMULTIPLE
      );
    }
    if (this.MODIFICARPRECIOMP == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.MODIFICARPRECIOMP  == this.MODIFICARPRECIOMP
      );
    }
    if (this.CARGARCODIGOBARRA == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.CARGARCODIGOBARRA  == this.CARGARCODIGOBARRA
      );
    }
    if (this.CONTROLENTREGAS == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.CONTROLENTREGAS  == this.CONTROLENTREGAS
      );
    }
    if (this.VISUALIZARCOMPROBANTEUNIFICADO == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.VISUALIZARCOMPROBANTEUNIFICADO  == this.VISUALIZARCOMPROBANTEUNIFICADO
      );
    }
    if (this.VISUALIZARIVA == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.VISUALIZARIVA  == this.VISUALIZARIVA
      );
    }
    if (this.SALDOAFAVOR == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.SALDOAFAVOR  == this.SALDOAFAVOR
      );
    }
    if (this.AGREGARLISTA == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.AGREGARLISTA  == this.AGREGARLISTA
      );
    }
    if (this.COMBOARTICULOS == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.COMBOARTICULOS  == this.COMBOARTICULOS
      );
    }

    if (this.DISTANCIA == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.DISTANCIA  == this.DISTANCIA
      );
    }
    if (this.IMPRIMIR80MM == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.IMPRIMIR80MM  == this.IMPRIMIR80MM
      );
    }
    if (this.FICHAMEDICA == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.FICHAMEDICA  == this.FICHAMEDICA
      );
    }
    if (this.MOSTRADOREFECTIVO == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.MOSTRADOREFECTIVO  == this.MOSTRADOREFECTIVO
      );
    }

    if (this.OCULTARFILTROSCOMPRAS == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.OCULTARFILTROSCOMPRAS  == this.OCULTARFILTROSCOMPRAS
      );
    }
    if (this.MODIFICARLISTA == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.MODIFICARLISTA  == this.MODIFICARLISTA
      );
    }

    if (this.MENSAJEAPLICACION == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.MENSAJEAPLICACION  == this.MENSAJEAPLICACION
      );
    }
    if (this.IVA27 == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.IVA27  == this.IVA27
      );
    }
    if (this.IVA10 == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.IVA10  == this.IVA10
      );
    }
    if (this.VISUALIZARCAMBIOESTADOS == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.VISUALIZARCAMBIOESTADOS  == this.VISUALIZARCAMBIOESTADOS
      );
    }
    if (this.OCULTARFACTURAS == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.OCULTARFACTURAS  == this.OCULTARFACTURAS
      );
    }
    if (this.OCULTARQR == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.OCULTARQR  == this.OCULTARQR
      );
    }
    if (this.OCULTARPRECIOSETIQUETAS == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.OCULTARPRECIOSETIQUETAS  == this.OCULTARPRECIOSETIQUETAS
      );
    }
    if (this.MOSTRARCODIGOSETIQUETAS == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.MOSTRARCODIGOSETIQUETAS  == this.MOSTRARCODIGOSETIQUETAS
      );
    }
    if (this.OCULTARFACTURASCOMANDERA == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.OCULTARFACTURASCOMANDERA  == this.OCULTARFACTURASCOMANDERA
      );
    }
    if (this.REVERTIRORDENPEDIDOS == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.REVERTIRORDENPEDIDOS  == this.REVERTIRORDENPEDIDOS
      );
    }
    if (this.VISUALIZARLIBROS == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.VISUALIZARLIBROS  == this.VISUALIZARLIBROS
      );
    }
    if (this.OCULTARDATOSGENERALES == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.OCULTARDATOSGENERALES  == this.OCULTARDATOSGENERALES
      );
    }
    if (this.MOSTRARRUBROSETIQUETAS == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.MOSTRARRUBROSETIQUETAS  == this.MOSTRARRUBROSETIQUETAS
      );
    }
    if (this.IMPRIMIRETIQUETAS80MM == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.IMPRIMIRETIQUETAS80MM  == this.IMPRIMIRETIQUETAS80MM
      );
    }
    if (this.TURNOSCAJA == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.TURNOSCAJA  == this.TURNOSCAJA
      );
    }

    if (this.OBSERVACIONARTICULOS == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.OBSERVACIONARTICULOS  == this.OBSERVACIONARTICULOS
      );
    }
    if (this.CREARDUPLICADOS == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.CREARDUPLICADOS  == this.CREARDUPLICADOS
      );
    }
    if (this.OCULTARGANANCIAS == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.OCULTARGANANCIAS  == this.OCULTARGANANCIAS
      );
    }
    if (this.OCULTARCOMPRAS == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.OCULTARCOMPRAS  == this.OCULTARCOMPRAS
      );
    }
    if (this.IMPRESIONDOBLE == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.IMPRESIONDOBLE  == this.IMPRESIONDOBLE
      );
    }
    if (this.OCULTAREDITARDEPOSITOS == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.OCULTAREDITARDEPOSITOS  == this.OCULTAREDITARDEPOSITOS
      );
    }
    if (this.BLOQUEARFECHA == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.BLOQUEARFECHA  == this.BLOQUEARFECHA
      );
    }
    if (this.PEDIDOENTREGADO == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.PEDIDOENTREGADO  == this.PEDIDOENTREGADO
      );
    }
    if (this.PRESTAMOS == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.PRESTAMOS  == this.PRESTAMOS
      );
    }
    if (this.OCULTARFP == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.OCULTARFP  == this.OCULTARFP
      );
    }
    if (this.COSTOCHECK == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.COSTOCHECK  == this.COSTOCHECK
      );
    }
    if (this.ACTIVOSUCURSAL == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.ACTIVOSUCURSAL  == this.ACTIVOSUCURSAL
      );
    }
    if (this.ROLOXY == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.ROLOXY  == this.ROLOXY
      );
    }
    if (this.BLOQUEAREDITARCOMPRAS == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.BLOQUEAREDITARCOMPRAS  == this.BLOQUEAREDITARCOMPRAS
      );
    }
    if (this.BLOQUEARPRECIOS == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.BLOQUEARPRECIOS  == this.BLOQUEARPRECIOS
      );
    }
    if (this.VISUALIZARCODIGOARTICULOCOMPROBANTE == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.VISUALIZARCODIGOARTICULOCOMPROBANTE  == this.VISUALIZARCODIGOARTICULOCOMPROBANTE
      );
    }
    if (this.ORDENARPORCODIGO == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.ORDENARPORCODIGO  == this.ORDENARPORCODIGO
      );
    }
    if (this.AUTOASIGNARCODIGOBARRA == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.AUTOASIGNARCODIGOBARRA  == this.AUTOASIGNARCODIGOBARRA
      );
    }
    if (this.COMPROBANTESINAZUL == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.COMPROBANTESINAZUL  == this.COMPROBANTESINAZUL
      );
    }
    if (this.BLOQUEOPEDIDOS == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.BLOQUEOPEDIDOS  == this.BLOQUEOPEDIDOS
      );
    }
    if (this.CATEGORIALIBROS == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.CATEGORIALIBROS  == this.CATEGORIALIBROS
      );
    }
    if (this.ESCONDERDELETEARTICULOS == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.ESCONDERDELETEARTICULOS  == this.ESCONDERDELETEARTICULOS
      );
    }
    if (this.VISUALIZARSELECCIONARSUCURSAL == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.VISUALIZARSELECCIONARSUCURSAL  == this.VISUALIZARSELECCIONARSUCURSAL
      );
    }
    if (this.SALDOAFAVORCOMPRAS == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.SALDOAFAVORCOMPRAS  == this.SALDOAFAVORCOMPRAS
      );
    }
    if (this.OCULTARAPROBADOAFIP == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.OCULTARAPROBADOAFIP  == this.OCULTARAPROBADOAFIP
      );
    }
    if (this.OCULTARNOMBREFANTASIA == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.OCULTARNOMBREFANTASIA  == this.OCULTARNOMBREFANTASIA
      );
    }
    if (this.FOOTER == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.FOOTER  == this.FOOTER
      );
    }
    if (this.OCULTARINDICADORVENTAS == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.OCULTARINDICADORVENTAS  == this.OCULTARINDICADORVENTAS
      );
    }
    if (this.CREARPEDIDODIRECTO == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.CREARPEDIDODIRECTO  == this.CREARPEDIDODIRECTO
      );
    }
    if (this.FOOTER == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.RECALCULOUNIDAD  == this.RECALCULOUNIDAD
      );
    }
    if (this.OCULTARINDICADORESEGRESO == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.OCULTARINDICADORESEGRESO  == this.OCULTARINDICADORESEGRESO
      );
    }
    if (this.PORCENTAJETARJETAS == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.PORCENTAJETARJETAS  == this.PORCENTAJETARJETAS
      );
    }
    if (this.FACTURAM == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.FACTURAM  == this.FACTURAM
      );
    }
    if (this.OCULTARDELETEINGRESOS == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.OCULTARDELETEINGRESOS  == this.OCULTARDELETEINGRESOS
      );
    }
    if (this.COMPROBANTEWS == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.COMPROBANTEWS  == this.COMPROBANTEWS
      );
    }
    if (this.FATMAN == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.FATMAN  == this.FATMAN
      );
    }
    if (this.MOSTRADOR2 == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.MOSTRADOR2  == this.MOSTRADOR2
      );
    }
    if (this.COMPROBANTEESPEJO == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.COMPROBANTEESPEJO  == this.COMPROBANTEESPEJO
      );
    }
    if (this.ETIQUETASJPG == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.ETIQUETASJPG  == this.ETIQUETASJPG
      );
    }

    if (this.MEDINOR == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.MEDINOR  == this.MEDINOR
      );
    }
    if (this.DATOSMEDINOR == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.DATOSMEDINOR  == this.DATOSMEDINOR
      );
    }
    if (this.REPARTOXDEFECTO == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.REPARTOXDEFECTO  == this.REPARTOXDEFECTO
      );
    }
    if (this.OCULTARALGUNOSDATOSGENERALES == true) {
      this.listRol = this.listRol.filter((s: any) =>
        s.OCULTARALGUNOSDATOSGENERALES  == this.OCULTARALGUNOSDATOSGENERALES
      );
    }



  }
  limpiar() {
    this.nombreRol = null;
    this.listRol = this.listRolOriginal;
  }

}


