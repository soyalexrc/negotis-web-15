import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GeneralService } from '../../../Service/general.service';
import { ArticuloService } from 'src/app/Service/articulo.service';
import { AlarmaStockModel } from 'src/app/models/AlarmaStockModel';
import { GlobalService } from 'src/app/Service/global.service';
import { MensajeseleccionarsucursalModalComponent } from 'src/app/components/mensajeseleccionarsucursal-modal/mensajeseleccionarsucursal-modal.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-alarma-stock-panel',
  templateUrl: './alarma-stock-panel.component.html',
  styleUrls: ['./alarma-stock-panel.component.css']
})
export class AlarmaStockPanelComponent implements OnInit {

  public urlImprimir!: string;
  filtroEstado: boolean=false;
  filtroDescripcionArticulo: any;
  verProveedorHabilitado: boolean = false;
  visualizarIDEstadoHabilitado: boolean = false;
  visualizarCantidadXPackHabilitado: boolean = false;
  total: number = 0;
  limit: number = 20;
  page: number = 1;
  alarmaLista: AlarmaStockModel;
  sucursalServ: any;
  sucSelecPost: any;
  mostrarModalSeleccion!: boolean;
  dialog: any;
  @Output() GetSucursalEmit: EventEmitter<any>;
  constructor(
    private titleService: Title,
    private generalServ: GeneralService,
    private articuloServ: ArticuloService,
    private globalService: GlobalService
  ) {
    titleService.setTitle("Reportes");
    this.alarmaLista= new AlarmaStockModel();
    this.GetSucursalEmit = new EventEmitter();
  }

  ngOnInit() {
    var roles = JSON.parse(localStorage.getItem('roles') ?? '');
    var sucursalSeleccionada = JSON.parse(localStorage.getItem('sucursalSeleccionada') ?? '');
    let tieneRolCliente = eval(localStorage.getItem('RolClienteNegotis') ?? '') || false;
    this.verProveedorHabilitado = (roles != null && roles.VisualizarStockProveedor) || tieneRolCliente;
    this.visualizarCantidadXPackHabilitado = (roles != null && roles.VisualizarCantXPack) || tieneRolCliente;
    this.visualizarIDEstadoHabilitado= (roles != null && roles.VisualizarIDEstado) || tieneRolCliente;
    if (sucursalSeleccionada == null) {
      let dataUser = { 'idUser': localStorage.getItem('idUser') };
      this.sucursalServ.sucursalSeleccionadaByUsuario(dataUser)
        .subscribe((data: any) => {
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
  armarUrlBusqueda() {
    this.urlImprimir = this.globalService.urlApi + '/ApiArticulo/Get/Pdf/Listado/Alarma?' +
    'idClienteNegotis=' + localStorage.getItem('idClienteNegotis') +
    '&filtro=' + this.filtroEstado +
    '&idSucursal=' + this.sucSelecPost.IdSucursal +
    '&Page=' + this.page +
    '&PageSize=' + this.limit +
    '&token=' + localStorage.getItem('token');
}
cargarModel(){
this.alarmaLista.activo=this.filtroEstado;
this.alarmaLista.filtroMultiple = this.filtroDescripcionArticulo;
this.alarmaLista.sucursal=this.sucSelecPost.IdSucursal;
this.buscar();
}
  buscar(){

    const loadRef = this.generalServ.loadingModal();
    const dataFiltro = {
      'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
      'filtro':this.alarmaLista.activo,
      'filtroMultiple': this.alarmaLista.filtroMultiple,
      'idSucursal':this.alarmaLista.sucursal,
      'page': this.page,
      'pageSize': this.limit,
    };
    this.articuloServ.getListAlarma(dataFiltro).subscribe((data: any) => {
      this.alarmaLista.listaArticulos = data.articulos;
      this.total = data.total;
      console.log(data.articulos);
      this.armarUrlBusqueda();
      loadRef.close();
  }, (error: any) => { console.log(error); loadRef.close(); });
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
