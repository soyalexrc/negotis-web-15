import {Component, OnInit, Inject, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {fromEvent} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import { FotoCrearEditarModalComponent } from '../../components/foto-crear-editar-modal/foto-crear-editar-modal.component';
import { EspecificacionModalComponent } from '../../components/especificacion-modal/especificacion-modal.component';
import { ArticuloService } from 'src/app/Service/articulo.service';
import { GeneralService } from 'src/app/Service/general.service';
import { ArchivoService } from 'src/app/Service/archivo.service';
import { GlobalService } from '../../Service/global.service';
import { ArticulosincantidadModalComponent } from 'src/app/components/articulosincantidad-modal/articulosincantidad-modal.component';

@Component({
  selector: 'app-agregararticulo-modal',
  templateUrl: './agregararticulo-modal.component.html',
  styleUrls: ['./agregararticulo-modal.component.css']
})
export class AgregararticuloModalComponent implements OnInit, AfterViewInit {
  listado: any;
  listadoOriginal: any;
  idSucursalVendedor: any;

  filtroDescripcionArticulo: string = "";
  limit: number = 20;
  page: number = 1;
  total: number = 0;
  idClienteNegotis: string | null;
  token: string | null;
  aumentoLista: any;
  nombreAumentoLista: any;
  listaID: any;
  dataArt :any;
  getArtByPost: any;
  getArtCant: any;
  esCompra: any;

  tieneRolCliente = false;
  tieneRolVisualizarCategoria = false;
  tieneRolVisualizarOfertas = false;
  tieneRolVisualizarCantXPack = false;
  tieneRolVisualizarTalle = false;
  tieneRolVisualizarColor = false;
  tieneRolOcultarRubro = false;
  tieneRolComboOferta = false;
  visualizarPrecioOferta = false;
  tieneRolVenderConStock = false;
  activoSucursal = false;
  fatman= false;

  @ViewChild('descripcionArticulo') descripcionArticuloInput!: ElementRef;
  @ViewChild('submit') submitForm!: ElementRef;
  source: any;

  constructor(public dialogRef: MatDialogRef<AgregararticuloModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog,
    private articuloService: ArticuloService,
    private archivoService: ArchivoService,
    private generalService: GeneralService,
    public globalService: GlobalService) {
      this.idSucursalVendedor = data.idSucursalVendedor;
      this.aumentoLista = data.aumentoLista;
      this.nombreAumentoLista = data.nombreAumentoLista;
      this.listaID = data.idLista;
      this.idClienteNegotis = localStorage.getItem('idClienteNegotis');
      this.token = localStorage.getItem('token');
      this.page=data.pageCarga;
      this.esCompra = data.compra;
      if(this.esCompra == null)
      {
        this.esCompra = false;
      }
      if(data.filtroCarga != null){
      this.filtroDescripcionArticulo=data.filtroCarga;}
  }

  ngOnInit() {
    this.tieneRolCliente = JSON.parse(localStorage.getItem('RolCliente') ?? 'false');

    const roles = JSON.parse(localStorage.getItem('roles') ?? '[]');
    const tieneRolClienteNegotis = eval(localStorage.getItem('RolClienteNegotis') ?? 'false') || false;
    this.tieneRolVisualizarCategoria = (roles != null && roles.VisualizarCategoria ) || tieneRolClienteNegotis;
    this.tieneRolVisualizarOfertas = (roles != null && roles.VisualizarOfertas ) || tieneRolClienteNegotis;
    this.tieneRolVisualizarCantXPack = (roles != null && roles.VisualizarCantXPack ) || tieneRolClienteNegotis;
    this.tieneRolVisualizarTalle = (roles != null && roles.VisualizarTalle ) || tieneRolClienteNegotis;
    this.tieneRolVisualizarColor = (roles != null && roles.VisualizarColor ) || tieneRolClienteNegotis;
    this.tieneRolOcultarRubro = (roles != null && roles.OcultarRubro ) || tieneRolClienteNegotis;
    this.tieneRolVenderConStock = (roles != null && roles.VenderConStock ) || tieneRolClienteNegotis;
    this.tieneRolComboOferta = (roles != null && roles.ComboOferta ) || tieneRolClienteNegotis;
    this.visualizarPrecioOferta = (roles != null && roles.VisualizarAcciones ) || tieneRolClienteNegotis;
    this.fatman = (roles != null && roles.Fatman );
    this.activoSucursal = (roles != null && roles.ActivoSucursal );
    this.buscar();
  }

  ngAfterViewInit(): void {
    this.source = fromEvent(this.descripcionArticuloInput.nativeElement, 'keypress');
    this.source.pipe(debounceTime(1000)).subscribe((c: any) => {
      this.buscar();
      }
    );
  }

  seleccionar(value: any) {
  let result ={
    'filtroCarga': this.filtroDescripcionArticulo,
    'page': this.page,
    'codigo': value.codigoDeBarras,
    'idArticulo': value.id,

  }
  this.dialogRef.close(result);
}


  cerrar() {
    this.dialogRef.close();
  }

  buscar() {
    const loading = this.generalService.loadingModal();
    if(this.activoSucursal)
    {
      let dataUser = {
        'idClienteNegotis': this.idClienteNegotis,
        'filtro': this.filtroDescripcionArticulo,
        'idSucursal': this.idSucursalVendedor,
        'pageSize': this.limit,
        'page': this.page,
        'esCarro':true,
        'idListaPrecio': this.listaID
      };
      this.articuloService.ListaArticuloByIdClienteNegotis(dataUser)
        .subscribe((data: any) => {
          this.listado = data.listado;
          this.listadoOriginal=data.listado
          this.total = data.totalItems;
          this.cargarImagenes();
          loading.close();
        }, (error: any) => { console.log(error); loading.close(); })
    }
    else
    {
      let dataUser = {
        'idClienteNegotis': this.idClienteNegotis,
        'idUser':localStorage.getItem('idUser'),
        'filtro': this.filtroDescripcionArticulo,
        'idSucursal': this.idSucursalVendedor,
        'pageSize': this.limit,
        'page': this.page,
        'idListaPrecio': this.listaID
      };
      this.articuloService.ListaArticuloSP(dataUser)
        .subscribe((data: any) => {
          this.listado = data.listado;

          this.listadoOriginal=data.listado
          /* this.listado.forEach(each => {
            each.precioUnitario = each.precioBase;
            if (this.aumentoLista > 0){
              each.precioUnitario = ((Number(this.aumentoLista) * Number(each.precioBase)) / 100) + Number(each.precioBase)
            }
            if(this.nombreAumentoLista == 'Lista Costo')
            {
              each.precioUnitario = each.precioCosto;
            }
            if(this.nombreAumentoLista == 'Lista 1')
            {
              each.precioUnitario = each.precio1;
            }
            if(this.nombreAumentoLista == 'Lista 2')
            {
              each.precioUnitario = each.precio2;
            }
            if(this.nombreAumentoLista == 'Lista 3')
            {
              each.precioUnitario = each.precio3;
            }
          }); */
          this.total = data.totalItems;
          this.cargarImagenes();
          loading.close();
        }, (error: any) => { console.log(error); loading.close(); })
    }

  }

  cargarImagenes() {
    this.listado.forEach((each: any) => {
      let requestExiste = {
        'idClienteNegotis': this.idClienteNegotis,
        'idArticulo': each.id,
        'idCategoria': 0,
        'idRubro': 0
      };
      // this.archivoService.existenciaArchivo(requestExiste).subscribe(responseExiste => {
      //   each.existe = responseExiste;
      //
      //   let requestObtener = {
      //     idClienteNegotis: this.idClienteNegotis,
      //     idArticulo : each.id
      //   };
      //   this.archivoService.obtenerArchivo(requestObtener).subscribe(responseObtener => {
      //     each.imagen = responseObtener;
      //     this.descripcionArticuloInput.nativeElement.focus();
      //   });
      // });

      if (each.existeImagen) {
        each.imagen = this.archivoService.getArchivoUrl(requestExiste.idClienteNegotis,requestExiste.idArticulo, requestExiste.idCategoria,requestExiste.idRubro);
        this.descripcionArticuloInput.nativeElement.focus();
      }
    });
  }

  limpiar() {
    this.filtroDescripcionArticulo="";
    this.page=1;
    this.buscar();
  }

  fotoModal(value: any) {
    const dialogRef = this.dialog.open(FotoCrearEditarModalComponent, {
      width: '650px', data: { idArticulo: value, editar: false },
    });
  }

  especModal(value: any) {
    const dialogRef = this.dialog.open(EspecificacionModalComponent, {
      width: '450px', data: { especificacion: value },
    });
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

}
