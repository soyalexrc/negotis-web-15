import {Component, OnInit, Inject, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {fromEvent} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import { FotoCrearEditarModalComponent } from '../foto-crear-editar-modal/foto-crear-editar-modal.component';
import { EspecificacionModalComponent } from '../especificacion-modal/especificacion-modal.component';
import { ArticuloService } from 'src/app/Service/articulo.service';
import { GeneralService } from 'src/app/Service/general.service';
import { ArchivoService } from 'src/app/Service/archivo.service';
import { GlobalService } from '../../Service/global.service';
import { ArticulosincantidadModalComponent } from 'src/app/components/articulosincantidad-modal/articulosincantidad-modal.component';
import { MateriaPrimaService } from 'src/app/Service/materiaprima.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregarMP-modal',
  templateUrl: './agregarMP-modal.component.html',
  styleUrls: ['./agregarMP-modal.component.css']
})
export class AgregarMPModalComponent implements OnInit, AfterViewInit {
  listado: any;
  listadoOriginal: any;
  idSucursalVendedor: any;

  myForm: FormGroup;
  limit: number = 20;
  page: number = 1;
  total: number = 0;
  idClienteNegotis: string;
  token: string;
  aumentoLista: any;
  nombreAumentoLista: any;
  dataArt :any;

  getArtByPost: any;
  getArtCant: any;
  post: any;
  cantidad: any = 0;
  valEntero!: boolean;
  errorEntero!: boolean;
  idMateriaPrima!: boolean;
  idArticulo: any;
  listadoMP: any;
  listadoMPOriginal: any;
  sucursalActual: any;
  idSucursal: any=JSON.parse(localStorage.getItem('sucursalSeleccionada') ?? '');
  idUser:any;
  precio:any;
  tieneRolModificarPrecio: any;
  filtroDescripcionMP : string = "";
  filtro :any = "";
  idSucursalActual: any;

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

  @ViewChild('descripcionMP') descripcionMPInput!: ElementRef;
  @ViewChild('submit') submitForm!: ElementRef;
  source: any;

  constructor(public dialogRef: MatDialogRef<AgregarMPModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private fb: FormBuilder,  private dialog: MatDialog,private mpServ: MateriaPrimaService,
    private articuloService: ArticuloService,
    private archivoService: ArchivoService,
    private generalServ: GeneralService,
    private globalService: GlobalService) {
      this.myForm = fb.group({
        filtroDescripcionMP : ['', Validators.compose([])],
      });
      this.idSucursalVendedor = data.idSucursalVendedor;
      this.aumentoLista = data.aumentoLista;
      this.nombreAumentoLista = data.nombreAumentoLista;
      this.idClienteNegotis = localStorage.getItem('idClienteNegotis') ?? '';
      this.token = localStorage.getItem('token') ?? '';
      this.page=data.pageCarga;
/*       if(data.filtroCarga != null){
      this.filtroDescripcionMP=data.filtroCarga;} */

  }

  ngOnInit() {
    this.tieneRolCliente = JSON.parse(localStorage.getItem('RolCliente') ?? '');

    const roles = JSON.parse(localStorage.getItem('roles') ?? '');
    const tieneRolClienteNegotis = eval(localStorage.getItem('RolClienteNegotis') ?? '') || false;
    this.tieneRolVisualizarCategoria = (roles != null && roles.VisualizarCategoria ) || tieneRolClienteNegotis;
    this.tieneRolVisualizarOfertas = (roles != null && roles.VisualizarOfertas ) || tieneRolClienteNegotis;
    this.tieneRolVisualizarCantXPack = (roles != null && roles.VisualizarCantXPack ) || tieneRolClienteNegotis;
    this.tieneRolVisualizarTalle = (roles != null && roles.VisualizarTalle ) || tieneRolClienteNegotis;
    this.tieneRolVisualizarColor = (roles != null && roles.VisualizarColor ) || tieneRolClienteNegotis;
    this.tieneRolOcultarRubro = (roles != null && roles.OcultarRubro ) || tieneRolClienteNegotis;
    this.tieneRolVenderConStock = (roles != null && roles.VenderConStock ) || tieneRolClienteNegotis;
    this.tieneRolComboOferta = (roles != null && roles.ComboOferta ) || tieneRolClienteNegotis;
    this.visualizarPrecioOferta = (roles != null && roles.VisualizarAcciones ) || tieneRolClienteNegotis;
    this.buscar();
  }

  ngAfterViewInit(): void {
    this.source = fromEvent(this.descripcionMPInput.nativeElement, 'keypress');
    this.source.pipe(debounceTime(1000)).subscribe((c: any) => {
      this.buscar();
      }
    );
  }

  seleccionar(value: any) {
  let result ={
    'filtroCarga': this.filtroDescripcionMP,
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
    const loading = this.generalServ.loadingModal();

    let dataUser = {
      'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
      'filtro': this.filtroDescripcionMP,
      'idSucursal': this.idSucursalVendedor,
      'pageSize': this.limit,
      'page': this.page
    };
    this.mpServ.ListaMPByIdClienteNegotis(dataUser)
      .subscribe((data: any) => {
        this.listadoMP = data.listado;
        this.listadoMPOriginal = data.listado;
        this.total = data.totalItems;
        loading.close();
        //loading.close();
      }, (error: any) => { console.log(error);  loading.close();})
  }



  limpiar() {
    this.filtroDescripcionMP="";
    this.page=1;
    this.buscar();
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
