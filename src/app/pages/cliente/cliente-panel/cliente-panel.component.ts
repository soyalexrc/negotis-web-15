import { Component, OnInit } from '@angular/core';
import { ClienteclienteService } from '../../../Service/clientecliente.service';
import { GlobalService } from '../../../Service/global.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { GeneralService } from '../../../Service/general.service';
import { CrearUsuarioClienteModalComponent } from '../usuario-cliente-crear/crear-usuario-cliente-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ErrorforaneaModalComponent } from 'src/app/components/errorforanea-modal/errorforanea-modal.component';
import { EliminarModalComponent } from 'src/app/components/eliminar-modal/eliminar-modal.component';
import { RutaService } from 'src/app/Service/ruta.service';
import {ZonaService} from '../../../Service/zona.service';
import { PedidoService } from '../../../Service/pedido.service';
import {ClienteListadoModel} from '../../../models/ClienteListadoModel';
import { Title } from '@angular/platform-browser';
import { CategoriaGastoService } from 'src/app/Service/categoriagasto.service';
import { CategotriaClienteService } from 'src/app/Service/categoria-cliente.service';
import * as internal from 'assert';
import { MensajeModalComponent } from 'src/app/components/mensaje-modal/mensaje-modal.component';

@Component({
  selector: 'app-cliente-panel',
  templateUrl: './cliente-panel.component.html',
  styleUrls: ['./cliente-panel.component.css']
})
export class ClientePanelComponent implements OnInit {

  urlImprimir!: string;

  rsCtrl = new FormControl();
  filteredRS!: Observable<any[]>;
  fantCtrl = new FormControl();
  zonaCtrl = new FormControl();
  filteredFant!: Observable<any[]>;
  filteredZona!: Observable<any[]>;
  cuitCtrl = new FormControl();
  rutaCtrl = new FormControl();
  filterValueRS!: string;
  filterValueF!:string;
  filterValueZ!:string;
  filteredCuit!: Observable<any[]>;
  filterVendedor!:string;


  listCliente: any;
  listClienteOriginal: any;
  listCompleto: any;
  razonSocFiltro: any;
  nombreFantasiaFiltro: any;
  zonaFiltro: any;
  cuitFiltro: any;
  vendedorfiltro: any;
  infoGeneral: any;
  vendedorNombres: any;
  IdVendedor: any;
  filtroPatente: string = "";
  filtroNroSiniestro: string = "";

  sucursalSeleccionada = JSON.parse(localStorage.getItem('sucursalSeleccionada') ?? '');

  vendedorCtrl = new FormControl();
  filteredVendedor!: Observable<any[]>;

  IdCategoria:any;
  categoriaClientes: any;
  filterValueC!:Number;
  categoriaCCtrl = new FormControl();
  filteredCategoria!: Observable<any[]>;
  listadoCategoria: any;

  listaRutasOrig!: any[];
  listaZonasOrig!: any[];
  rutaNgModel: any;
  filteredRuta!: Observable<any[]>;
  rutaId: any;
  zonaId: any;

  limit: number = 20;
  page: number = 1;
  total: number = 0;
  totalClientes: number = 0;

  idCliente: any;
  eliminarClientesHabilitado : boolean = false;
  filtroClientesHabilitado!: boolean;
  datosEsteticaHabilitado!: boolean;
  verDatosTaller!: boolean;
  fichaMedica: boolean= false;
  constructor(
    private titleService: Title,
    private clienteServ: ClienteclienteService,
    private globalService: GlobalService,
    private generalServ: GeneralService,
    public dialog: MatDialog,
    private rutaServ: RutaService,
    private pedidoServ: PedidoService,
    private catServ: CategotriaClienteService,
    private zonaServ: ZonaService
    )
    {
      titleService.setTitle("Clientes");
     }

  ngOnInit() {
    const roles = JSON.parse(localStorage.getItem('roles') ?? '');
    const tieneRolClienteNegotis = eval(localStorage.getItem('RolClienteNegotis') ?? '') || false;
    this.eliminarClientesHabilitado = (roles != null && roles.EliminarClientes) || tieneRolClienteNegotis;
    this.filtroClientesHabilitado = (roles != null && roles.FiltroVendedor)
    this.datosEsteticaHabilitado = (roles != null && roles.VisualizarDatosEstetica) || tieneRolClienteNegotis;
    this.verDatosTaller = (roles != null && roles.VisualizarDatosTaller) || tieneRolClienteNegotis;
    this.fichaMedica = (roles != null && roles.FichaMedica)|| tieneRolClienteNegotis;

    this.urlImprimir = this.globalService.urlApi + '/ApiCliente/Get/Pdf/Listado/Busqueda?' +
      'idClienteNegotis=' + localStorage.getItem('idClienteNegotis') +
      '&razonSocial='+ this.razonSocFiltro +
      '&zonaId=' + this.zonaFiltro+
      '&rutaId=' + this.rutaNgModel +
      '&fantasia=' + this.nombreFantasiaFiltro+
      '&cuit=' +this.cuitFiltro+
      '&idVendedor=' +this.vendedorfiltro+
      '&filtroPatente=' + this.filtroPatente +
      '&filtroNroSiniestro=' + this.filtroNroSiniestro+
      '&idVendedor=' + this.IdVendedor +
      '&token=' + localStorage.getItem('token');

    const loadingRuta = this.generalServ.loadingModal();
    this.rutaServ.getRutasByIdClienteNegotis({ 'idClienteNegotis': localStorage.getItem('idClienteNegotis') })
      .subscribe(
        data => {
          this.listaRutasOrig = data as any[];
          loadingRuta.close();
        }, error => {
          console.log(error);
          this.generalServ.goToNoEncontrado();
          loadingRuta.close();
        });

    const loadingZona = this.generalServ.loadingModal();
    this.zonaServ.listadoZonasByIdClienteNegotis({ 'idClienteNegotis': localStorage.getItem('idClienteNegotis') })
      .subscribe(data => {
          this.listaZonasOrig = data as any[];
        loadingZona.close();
      }, error => {
        console.log(error);
        this.generalServ.goToNoEncontrado();
        loadingZona.close();
      });
      this.loadData();
  const loadingVendedor = this.generalServ.loadingModal();
  let datos = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis')};
  this.pedidoServ.getInfoGeneral(datos).subscribe(result => {
    this.infoGeneral = result;
    loadingVendedor.close();
    this.filteredVendedor = this.vendedorCtrl.valueChanges
    .pipe(
      startWith(''),
      map(item => item ? this._filterVendedor(item) : this.infoGeneral.Empleados.slice())
    );
    console.log(this.filteredVendedor);
  }, error => {
    console.log(error);
    this.generalServ.goToNoEncontrado();
    loadingVendedor.close();
});

const loadingCategoria = this.generalServ.loadingModal();
let datosCategoria = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis'), 'Page':1};
this.catServ.listadoCategoriaClienteByIdClienteNegotis(datosCategoria).subscribe((result: any) => {
  this.listadoCategoria = result;
  loadingCategoria.close();
  this.filteredCategoria = this.categoriaCCtrl.valueChanges
  .pipe(
    startWith(''),
    map(item => item ? this._filterCat(item) : this.listadoCategoria.categorias.slice())
  );

  console.log(this.filteredCategoria);
}, (error: any) => {
  console.log(error);
  this.generalServ.goToNoEncontrado();
  loadingCategoria.close();
});



  }


  //Razon social
  private _filterRS(value: string): any[] {
    this.filterValueRS = value.toLowerCase();

    return this.listClienteOriginal.filter((item: any) => item.RazonSocial.toLowerCase().includes(this.filterValueRS.toLowerCase()));
  }
  //fantasia
  private _filterFant(value: string): any[] {
    this.filterValueF = value.toLowerCase();

    return this.listClienteOriginal.filter((item: any) => item.NombreFantasia.toLowerCase().includes(this.filterValueF.toLowerCase()));
  }
  //vendedor
  private _filterVendedor(value: string): any[] {
    const filterValue = value.toLowerCase();

     return this.infoGeneral.Empleados.filter((item: any) => item.Nombres.toLowerCase().includes(filterValue.toLowerCase()) || item.Apellidos.toLowerCase().includes(filterValue.toLowerCase()));
   }
  //zona
  private _filterZona(value: string): any[] {
    this.filterValueZ = value.toLowerCase();

    var filtered = this.listClienteOriginal.filter((item: any) => item.Zona != null && item.Zona.toLowerCase().includes(this.filterValueZ.toLowerCase()));

    var zonasNoRepetidas = new Array();
    filtered.forEach((element: any) => {
      if (zonasNoRepetidas.indexOf(element.Zona) == -1) {
        zonasNoRepetidas.push(element.Zona);
      }
    });

    return zonasNoRepetidas;
  }
  private _filterCat(value: Number): any[] {
    this.filterValueC = value;

    return this.listadoCategoria.categorias.filter((item: any) => item.Id == this.filterValueC);

  }

  //fantasia
  private _filterCuit(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.listClienteOriginal.filter((item: any) => item.CUIT.toLowerCase().includes(filterValue.toLowerCase()));
  }

  selectOptionRuta = (key: any) => {
    this.rutaId = key.target.value;
    this.page = 1;
  }

  selectOptionZona = (key: any) => {
    this.zonaId = key.target.value;
    this.page = 1;
  }
  resetKeyRuta = () => { };
  displayWithRuta = (option?: any): string => option ? option.Nombre : '';
  doFilterRuta(value: any) {
    if (value == null) {
      return this.listaRutasOrig;
    }
    let filterVal = value.toString().toLowerCase();
    return this.listaRutasOrig.filter(option => option.Nombre.toLowerCase().includes(filterVal));
  }

  buscar() {
    this.listCliente = this.listCompleto;
    if (this.filtroClientesHabilitado){
      this.idCliente = this.infoGeneral.Id;
     // let requestCliente = { 'idCliente': this.idCliente, 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
      //this.clienteServ.clientesById(requestCliente).subscribe(dataCliente => {
        // @ts-ignore
        this.listCliente = this.listCompleto.filter((x: any) => x.IdVendedor === this.idCliente);
        this.total=this.listCliente.length;
        this.totalClientes = this.total;
      //});
    }
    this.ngOnInit();

  }

  getVendedor(item: any) {
    this.IdVendedor = item.Id;
    this.vendedorNombres = item.Nombres;
  }

  resetVendedor() {
    this.IdVendedor = null;
  }


  getCategoria(item: any) {
    this.IdCategoria = item.Id;
    this.categoriaClientes = item.Nombre;
  }

  resetCategoria() {
    this.IdCategoria = null;
  }

  limpiar() {
    this.nombreFantasiaFiltro = null;
    this.razonSocFiltro = null;
    this.cuitFiltro = null;
    this.rutaNgModel = null;
    this.zonaFiltro = null;
    this.IdVendedor =null;
    this.vendedorNombres='';
    this.IdCategoria =null;
    this.categoriaClientes='';
    this.razonSocFiltro='';
    this.nombreFantasiaFiltro='';
    this.filtroPatente = '';
    this.filtroNroSiniestro ='';
    this.zonaId='';
    this.rutaId='';
    this.cuitFiltro='';
  }

  openCrearUsuarioClienteModal(value: any, index: any): void {
    const dialogRef = this.dialog.open(CrearUsuarioClienteModalComponent, {
      width: '450px',
      data: {
        idCliente: value.Id,
        usuario: value.Usuario
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        // this.listadoArticulo[index].cantidad = result;
      }
    });
  }

  delete(value: any) {

    const dialogRef = this.dialog.open(EliminarModalComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        const loadRef = this.generalServ.loadingModal();
        this.clienteServ.delete(value.Id).subscribe((data: any) => {
          if (data) {
            let index = 0;
            for (let item of this.listCliente.listado) {
              if (item.Id == value.Id) {
                this.listCliente.listado.splice(index, 1)
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
        }, (error: any) => { console.log(error); loadRef.close(); })
        loadRef.close();
        this.buscar();

      }
    });
  }

  goToPage(n: number): void {
    this.page = n;
    this.loadData();
  }
  onNext(): void {
    this.page++;
    this.loadData();
  }
  onPrev(): void {
    this.page--;
    this.loadData();
  }

  sincronizarExcel2()
  {
      const loading = this.generalServ.loadingModal();
      let dataUser = {
        'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
        'idUser' : localStorage.getItem('idUser'),
        'idSucursal' : this.sucursalSeleccionada.Sucursal.Id
      };
      this.clienteServ.sincronizarExcel(dataUser)
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


  }
  armarUrlBusqueda() {
    this.urlImprimir = this.globalService.urlApi + '/ApiCliente/Get/Pdf/Listado/Busqueda?' +
    'idClienteNegotis=' + localStorage.getItem('idClienteNegotis') +
    '&razonSocial='+ this.razonSocFiltro +
    '&zonaId=' + this.zonaFiltro+
    '&rutaId=' + this.rutaNgModel +
    '&fantasia=' + this.nombreFantasiaFiltro+
    '&cuit=' +this.cuitFiltro+
    '&filtroPatente=' + this.filtroPatente +
    '&filtroNroSiniestro=' + this.filtroNroSiniestro+
    '&idVendedor=' + this.IdVendedor +
    '&token=' + localStorage.getItem('token');
  }


  loadData() {
    this.armarUrlBusqueda();
    const loading = this.generalServ.loadingModal();
    let idSucursal =JSON.parse(localStorage.getItem('sucursalSeleccionada') ?? '');
    let dataUser = new ClienteListadoModel(
      localStorage.getItem('idClienteNegotis'),
      this.page,
      this.limit,
      this.razonSocFiltro,
      this.nombreFantasiaFiltro,
      this.zonaId,
      this.rutaId,
      this.cuitFiltro,
      this.IdVendedor,
      idSucursal.IdSucursal,
      this.filtroPatente,
      this.filtroNroSiniestro,
      this.IdCategoria
    );


    this.clienteServ.listadoClientesClienteNegotis(dataUser)
      .subscribe((data: any) => {
        this.listCliente = data.listado;
        this.listClienteOriginal = data.listado;
        this.listCompleto = data.listadoCompleto;
        this.total = data.totalItems;
        this.totalClientes = this.total;

        if (this.filtroClientesHabilitado){
          this.idCliente = localStorage.getItem('idUser');
         // let requestCliente = { 'idCliente': this.idCliente, 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
          //this.clienteServ.clientesById(requestCliente).subscribe(dataCliente => {
            // @ts-ignore
            this.listCliente = this.listClienteOriginal.filter((s: any) => x.Vendedor === this.idCliente);
            this.total=this.listCliente.length;
            this.totalClientes=this.listCliente.length;
          //});
        }
        //Patente
        if(this.filtroPatente != '')
        {
            this.listCliente = this.listClienteOriginal.filter((x: any) => x.patente === this.filtroPatente);
            this.total=this.listCliente.length;
            this.totalClientes=this.listCliente.length;
        }
        //NroSiniestro
        if(this.filtroNroSiniestro != '')
        {
            this.listCliente = this.listClienteOriginal.filter((x: any) => x.nroSiniestro === this.filtroNroSiniestro);
            this.total=this.listCliente.length;
            this.totalClientes=this.listCliente.length;
        }
        //Razon social
        this.filteredRS = this.rsCtrl.valueChanges
          .pipe(
            startWith(''),
            map(item => item ? this._filterRS(item) : this.listClienteOriginal.filter((s: any) => s.RazonSocial != null).slice())
          );
        //Fantasia
        this.filteredFant = this.fantCtrl.valueChanges
          .pipe(
            startWith(''),
            map(item => item ? this._filterFant(item) : this.listClienteOriginal.filter((s: any) => s.NombreFantasia != null).slice())
          );
        //cuit
        this.filteredCuit = this.cuitCtrl.valueChanges
          .pipe(
            startWith(''),
            map(item => item ? this._filterCuit(item) : this.listClienteOriginal.filter((s: any) => s.CUIT != null).slice())
          );
          this.filteredCuit = this.cuitCtrl.valueChanges
          .pipe(
            startWith(''),
            map(item => item ? this._filterCuit(item) : this.listClienteOriginal.filter((s: any) => s.CUIT != null).slice())
          );
          this.filteredCategoria = this.categoriaCCtrl.valueChanges
          .pipe(
            startWith(''),
            map(item => item ? this._filterCat(item) : this.listadoCategoria.categorias.filter((s: any) => s.Id != null).slice())
          );
        loading.close();
      }
      , (error: any) => { console.log(error); loading.close(); })
  }
}
