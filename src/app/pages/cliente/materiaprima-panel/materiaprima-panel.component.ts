import { Component, OnInit, Output, EventEmitter, Input,HostListener, ElementRef, ViewChild, } from '@angular/core';
import { ArticuloService } from '../../../Service/articulo.service';
import { ListaPreciosService } from '../../../Service/lista-precios.service';
import { MatDialog } from '@angular/material/dialog';
import { ArticuloCantidadModalComponent } from '../../../components/articulo-cantidad-modal/articulo-cantidad-modal.component';
import { MateriaPrimaCantidadModalComponent } from '../../../components/materiaprima-cantidad-modal/materiaprima-cantidad-modal.component';
import { ActualizarPrecioModalComponent } from '../../../components/actualizar-precio-modal/actualizar-precio-modal.component';
import { EliminarModalComponent } from '../../../components/eliminar-modal/eliminar-modal.component';
import { ErrorforaneaModalComponent } from '../../../components/errorforanea-modal/errorforanea-modal.component';
import { GlobalService } from '../../../Service/global.service';
import { FotoCrearEditarModalComponent } from '../../../components/foto-crear-editar-modal/foto-crear-editar-modal.component';
import { GeneralService } from '../../../Service/general.service';
import { SucursalService } from '../../../Service/sucursal.service';
import { MensajeseleccionarsucursalModalComponent } from '../../../components/mensajeseleccionarsucursal-modal/mensajeseleccionarsucursal-modal.component';
import { UseriosucursalModalComponent } from '../../../components/useriosucursal-modal/useriosucursal-modal.component';
import { ModificarValorModal2Component } from 'src/app/components/modificar-valor-modal2/modificar-valor-modal2.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ArchivoService } from 'src/app/Service/archivo.service';
import { DialogModel } from 'src/app/models/DialogModel';
import { MensajeModalComponent } from '../../../components/mensaje-modal/mensaje-modal.component';
import { MateriaPrimaService } from 'src/app/Service/materiaprima.service';
import { Title } from '@angular/platform-browser';



@Component({
  selector: 'app-materiaprima-panel',
  templateUrl: './materiaprima-panel.component.html',
  styleUrls: ['./materiaprima-panel.component.css']
})
export class MateriaPrimaPanelComponent implements OnInit {

  listadoMP: any;
  listadoMPOriginal: any;
  sucursalActual: any;
  idSucursal: any=JSON.parse(localStorage.getItem('sucursalSeleccionada') ?? '');
  token: any;
  idUser:any;
  idClienteNegotis: any;
  limit: number = 20;
  page: number = 1;
  total: number = 0;
  sucSelecPost: any;
  filtroDescripcionMP: string = "";
  filtroUnidades: any;
  totalCapitalExistente: any = 0;
  OcultarPreciosProduccion:any= false;

  @Output() GetSucursalEmit: EventEmitter<any>;
  @Input() mostrarModalSeleccion!: boolean;
  @Input() selecInput: any;
  constructor(
    private titleService: Title,
    private mpServ: MateriaPrimaService,
    public dialog: MatDialog,
    private globalServ: GlobalService,
    private router: Router,
    private generalServ: GeneralService,
    private route: ActivatedRoute,
    private sucursalServ: SucursalService
  ) {
    this.GetSucursalEmit = new EventEmitter();
    titleService.setTitle("Produccion");
  }

  ngOnInit() {
    if (this.route.snapshot.queryParams['filter'] != null) {
      this.filtroDescripcionMP = this.route.snapshot.queryParams['filter'];
    }
    if (this.route.snapshot.queryParams['page'] != null) {
      this.page = this.route.snapshot.queryParams['page'];
    }
    this.token = localStorage.getItem('token');
    this.idClienteNegotis = localStorage.getItem('idClienteNegotis');
    this.idUser = localStorage.getItem('idUser');
    var sucursalSeleccionada = JSON.parse(localStorage.getItem('sucursalSeleccionada') ?? '');
    let roles = JSON.parse(localStorage.getItem('roles') ?? '');
    this.OcultarPreciosProduccion = (roles != null && roles.OcultarPreciosProduccion);
    if (sucursalSeleccionada == null) {
      let dataUser = { 'idUser': localStorage.getItem('idUser') };
      this.sucursalServ.sucursalSeleccionadaByUsuario(dataUser)
        .subscribe(data => {
          this.sucSelecPost = data;
          this.GetSucursalEmit.emit(this.sucSelecPost);
          if (sucursalSeleccionada == null && this.mostrarModalSeleccion == true) {
            const dialogRef = this.dialog.open(MensajeseleccionarsucursalModalComponent, {
              width: '450px', hasBackdrop: false
            });
          }
        })
    } else {
      this.GetSucursalEmit.emit(sucursalSeleccionada);
      this.sucSelecPost = sucursalSeleccionada;
    }
  }


  editArticulo(value:any)
  {

    localStorage.setItem('page', JSON.stringify(this.page));
    this.router.navigate(["/cliente/materiaprima/editar/{{" + value.id + "}}/#"]);
  }


  openCantidadModal(value: any, index: any): void {
    let cantArt = 0;
    cantArt = value.cantidad;
    const dialogRef = this.dialog.open(MateriaPrimaCantidadModalComponent, {
      width: '450px',
      data: {
        idArt: value.id,
        cantidad: cantArt,
        idSuc: this.sucursalActual.Sucursal.Id,
        unidad: value.unidad,
        kilogramo: value.kilogramo,
        idClienteNegotis : this.idClienteNegotis
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.listadoMP[index].cantidad = result;
      }
    });
}

 openPrecioCostoModal(value: any, index: any): void {

  let rq: DialogModel = new DialogModel();
  rq.title = 'Modificar Costo';
  rq.valueName = 'Costo';
  rq.value = value.precioCosto
  rq.valueType = 'float';

  const dialogRef = this.dialog.open(ModificarValorModal2Component, {
    width: '450px',
    data: rq
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result != null) {
      const loadRef = this.generalServ.loadingModal();
      let request = {
        'idMP': value.id,
        'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
        'value': result,
        'idSucursal' : this.sucursalActual.Sucursal.Id
      };
      this.mpServ.guardarPrecioCosto(request)
        .subscribe(data => {
          value.precioCosto = result;
          let datos = {
            'idArticulo': value.id,
            'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
            'value': value.precioCosto+((result*value.porcentaje)/100)
          };
    }, error => { console.log(error); loadRef.close(); });
    loadRef.close();
    }
  });
}

  goToPage(n: number): void {
    this.page = n;
    this.getMPCantidad(this.sucursalActual);
  }

  onNext(): void {
    this.page++;
   this.getMPCantidad(this.sucursalActual);
  }

  onPrev(): void {
    this.page--;
    this.getMPCantidad(this.sucursalActual);
  }


  limpiar() {
    this.filtroDescripcionMP = "";
    this.filtroUnidades = null;
    this.getMPCantidad(this.sucursalActual);
  }


  getMPCantidad(value: any) {
    const loading = this.generalServ.loadingModal();
    this.sucursalActual = value;
    let dataUser = {
      'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
      'filtro': this.filtroDescripcionMP,
      'filtroUnidades' : this.filtroUnidades,
      'idSucursal': this.sucursalActual.Sucursal.Id,
      'pageSize': this.limit,
      'page': this.page
    };
    this.mpServ.ListaMPByIdClienteNegotis(dataUser)
      .subscribe((data: any) => {
        this.listadoMP = data.listado;
        this.listadoMPOriginal = data.listado;
        this.totalCapitalExistente = data.totalCapitalExistente;
        this.total = data.totalItems;
        loading.close();
      }, (error: any) => { console.log(error); loading.close(); })
  }


  buscar() {
    this.listadoMP = this.listadoMPOriginal;

    if (this.sucursalActual)
    {
      this.getMPCantidad(this.sucursalActual);
    }
  }

  delete(value: any) {
    console.log(value)
  }

}
