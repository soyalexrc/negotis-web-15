import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteclienteService } from '../../../Service/clientecliente.service';
import { ListaPreciosService } from '../../../Service/lista-precios.service';
import { GlobalService } from '../../../Service/global.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneralService } from '../../../Service/general.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarOperacionExitosaComponent } from '../../../components/snack-bar-operacion-exitosa/snack-bar-operacion-exitosa.component';
import { DocumentoModel } from 'src/app/models/DocumentoModel';
import { DocumentoService } from 'src/app/Service/documento.service';
import { EliminarModalComponent } from 'src/app/components/eliminar-modal/eliminar-modal.component';
import { UserService } from '../../../Service/user.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { PedidoService } from '../../../Service/pedido.service';
import { map, startWith } from 'rxjs/operators';
import {ClienteCrearEditarModel} from './ClienteCrearEditarModel';
import { RutaService } from 'src/app/Service/ruta.service';
import { SucursalService } from 'src/app/Service/sucursal.service';
import { ZonaService } from 'src/app/Service/zona.service';
import { SucursalCrearEditarModel } from '../../general/sucursal-crear-editar/sucursal-crear-editar-model';
import { Title } from '@angular/platform-browser';
import { CategotriaClienteService } from 'src/app/Service/categoria-cliente.service';
import { EmpleadoCrearModel } from '../empleado-crear-editar/EmpleadoCrearModel';
import * as Constants from 'src/app/util/constants';


@Component({
  selector: 'app-cliente-crear-editar',
  templateUrl: './cliente-crear-editar.component.html',
  styleUrls: ['./cliente-crear-editar.component.css']
})
export class ClienteCrearEditarComponent implements OnInit {

  myForm: FormGroup;
  submitted!: boolean;
  post: any;
  razonSocial: any;
  nombreFantasia: any;
  desdeHora: any;
  desdeMinuto: any;
  desdeAmPm: any;
  hastaHora: any;
  hastaMinuto: any;
  hastaAmPm: any;
  desdeHoraDos: any;
  desdeMinutoDos: any;
  desdeAmPmDos: any;
  hastaHoraDos: any;
  hastaMinutoDos: any;
  hastaAmPmDos: any;
  cuit: any;
  dni: any;
  idSucursalSelected: any[] = [];
  condicionImpositiva: any= "CONSUMIDOR FINAL";
  ingresosBrutos: any;
  listaPrecios: any;
  categoriaCliente: any;
  idCliente: any = 0;
  clienteById: any;
  listadoPrecios: any;
  categoriasClientes: any;
  readOnlyMostrador: boolean = false;
  telefono: any;
  email: any;
  redSocialUno: any;
  redSocialDos: any;
  descripcion: any;

  calle: any;
  listAfip: any;
  sucursalesGuardadas: any;
  sucursalGuardada: any;
  cargaSuc : boolean = true;
  numero: any;
  barrio: any;
  idZona: any;
  idSucursal: any = 0;
  sucursalById: any;
  listadoZonas: any;
  valZona!: boolean;
  sucursalCliente!: boolean;
  punoDeVenta: any;
  sesionesRealizadas: any;
  sesionesTratamiento: any;
  sesionesTotal:any;
  tipoSesion:any;
  tipoSesion2:any;
  tipoSesion3:any;
  sucursalList: any;
  cantidadSesion: any;
  cantidadSesion2: any;
  cantidadSesion3: any;
  saldoAFavor:any=0;
  rolSaldoAFavor:any = false;
  color: any;
  patente: any;
  nSiniestro: any;
  nSiniestro2: any;
  vehiculo: any;
  nroCliente: any;
  distancia:any;
  userName:any;

  tieneRolCliente = false;
  tieneRolProduccion = false;
  datosEsteticaHabilitado! : boolean;
  verDatosTaller! : boolean;
  tieneRolEsconderDatosSucursal! : boolean;
  vendedor: any;
  vendedorNombres: any;
  IdVendedor: any;
  infoGeneral: any;
  vendedorCtrl = new FormControl();
  filteredVendedor!: Observable<any[]>;
  busquedaVendedor = '';
  vendedorList: any;

  filesToUpload: any[] = [];
  documentos: DocumentoModel[] = [];
  fileName!: string;
  filesSaved: string[] = [];

  idUser: any;
  pfxAfip!: string;
  listaRutas: any = [];
  listaRutasOrig: any = [];
  rutaNgModel: any;
  filteredRuta: Observable<any> | any;
  valPtoVta: any;
  valPfx: any

  displayWithRuta: any


  constructor( private titleService: Title,private fb: FormBuilder, private clienteServ: ClienteclienteService, private router: Router,
    private global: GlobalService, private route: ActivatedRoute,
    private userServ: UserService,
    private pedidoServ: PedidoService,
    private clienteService: ClienteclienteService,
    private generalServ: GeneralService, private snackBar: MatSnackBar,
    private listaPrecServ: ListaPreciosService,
    private catClienteServ: CategotriaClienteService,
    private documentoServ: DocumentoService,
    private sucursalServ: SucursalService,
    private zonaServ: ZonaService,
    private rutaServ: RutaService,
    private dialog: MatDialog) {
    titleService.setTitle("Clientes");
    this.myForm = fb.group({
      razonSocial: ['', Validators.compose([Validators.required])],
      nombreFantasia: ['', Validators.compose([])],
      desdeHora: ['', Validators.compose([])],
      desdeMinuto: ['', Validators.compose([])],
      desdeAmPm: ['', Validators.compose([])],
      hastaHora: ['', Validators.compose([])],
      hastaMinuto: ['', Validators.compose([])],
      hastaAmPm: ['', Validators.compose([])],
      desdeHoraDos: ['', Validators.compose([])],
      desdeMinutoDos: ['', Validators.compose([])],
      desdeAmPmDos: ['', Validators.compose([])],
      hastaHoraDos: ['', Validators.compose([])],
      hastaMinutoDos: ['', Validators.compose([])],
      hastaAmPmDos: ['', Validators.compose([])],
      cuit: ['', Validators.compose([])],
      dni: ['', Validators.compose([])],
      condicionImpositiva: ['', Validators.compose([])],
      ingresosBrutos: ['', Validators.compose([])],
      listaPrecios: ['', Validators.compose([Validators.required])],
      telefono: ['', Validators.compose([])],
      email: ['', Validators.compose([Validators.email])],
      redSocialUno: ['', Validators.compose([])],
      redSocialDos: ['', Validators.compose([])],
      descripcion: ['', Validators.compose([])],
      calle: ['', Validators.compose([Validators.required])],
      numero: ['', Validators.compose([Validators.required])],
      barrio: ['', Validators.compose([Validators.required])],
      idZona: ['', Validators.compose([])],
      punoDeVenta: ['', Validators.compose([Validators.pattern('^[0-9]+$')])],
      pfxAfip: ['', Validators.compose([])],
      nombreRuta: ['', Validators.compose([])],
      sesionesRealizadas: ['', Validators.compose([])],
      sesionesTratamiento: ['', Validators.compose([])],
      sesionesTotal: ['', Validators.compose([])],
      patente: ['', Validators.compose([])],
      nSiniestro: ['', Validators.compose([])],
      nSiniestro2: ['', Validators.compose([])],
      vehiculo: ['', Validators.compose([])],
      color: ['', Validators.compose([])],
      nroCliente : ['', Validators.compose([])],
      distancia: ['', Validators.compose([])],
      saldoAFavor: ['', Validators.compose([])],
      categoriaCliente: ['', Validators.compose([])],
      userName: ['', Validators.compose([])],
      cantidadSesion: ['', Validators.compose([])],
      cantidadSesion2: ['', Validators.compose([])],
      cantidadSesion3: ['', Validators.compose([])],
      tipoSesion: ['', Validators.compose([])],
      tipoSesion2: ['', Validators.compose([])],
      tipoSesion3: ['', Validators.compose([])],

    });
    route.params.subscribe(params => { this.idCliente = params['idcliente']; });
    route.params.subscribe(params => { this.idUser = params['iduser']; });
    if (this.idCliente != null) {
      const loading = this.generalServ.loadingModal();
      let dataCliente = { 'idCliente': this.idCliente, 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
      this.clienteServ.clientesById(dataCliente).subscribe(async data => {
        this.clienteById = data;
        if (this.clienteById == null) {
          loading.close();
          this.generalServ.goToNoEncontrado();
        }
        this.razonSocial = this.clienteById.RazonSocial;
        this.nombreFantasia = this.clienteById.NombreFantasia;
        this.desdeHora = this.clienteById.HoraDesde;
        this.desdeMinuto = this.clienteById.MinutoDesde;
        this.desdeAmPm = this.clienteById.SistHorarioDesde;
        this.hastaHora = this.clienteById.HoraHasta;
        this.hastaMinuto = this.clienteById.MinutoHasta;
        this.hastaAmPm = this.clienteById.SistHorarioHasta;
        this.desdeHoraDos = this.clienteById.HoraDesdeDos;
        this.desdeMinutoDos = this.clienteById.MinutoDesdeDos;
        this.desdeAmPmDos = this.clienteById.SistHorarioDesdeDos;
        this.hastaHoraDos = this.clienteById.HoraHastaDos;
        this.hastaMinutoDos = this.clienteById.MinutoHastaDos;
        this.hastaAmPmDos = this.clienteById.SistHorarioHastaDos;
        this.cuit = this.clienteById.CUIT;
        this.dni = this.clienteById.DNI;
        this.condicionImpositiva = this.clienteById.CondicionImpositiva;
        this.ingresosBrutos = this.clienteById.IngresosBrutos;
        this.listaPrecios = this.clienteById.IdListaPrecios;
        if(this.clienteById.IdCategoriaCliente != null)
        {
          this.categoriaCliente = this.clienteById.IdCategoriaCliente;
        }

        if (this.razonSocial == 'Mostrador') {
          this.readOnlyMostrador = true;
        }
        this.email = this.clienteById.Email;
        this.telefono = this.clienteById.Telefono;
        this.redSocialUno = this.clienteById.RedSocialUno;
        this.redSocialDos = this.clienteById.RedSocialDos;
        this.descripcion = this.clienteById.Descripcion;
        this.IdVendedor =this.clienteById.Vendedor;
        this.sesionesRealizadas = this.clienteById.CantidadSesionesRealizadas;
        this.sesionesTratamiento = this.clienteById.CantidadSesionesTratamiento;
        this.sesionesTotal = this.sesionesTratamiento - this.sesionesRealizadas;
        this.cantidadSesion = this.clienteById.CantidadSesion;
        this.cantidadSesion2 = this.clienteById.CantidadSesion2;
        this.cantidadSesion3 = this.clienteById.CantidadSesion3;
        this.tipoSesion = this.clienteById.TipoSesion;
        this.tipoSesion2 = this.clienteById.TipoSesion2;
        this.tipoSesion3 = this.clienteById.TipoSesion3;

        this.color = this.clienteById.Color;
        if(this.rolSaldoAFavor)
        {
          this.saldoAFavor = this.clienteById.SaldoAFavor;
        }

        this.patente = this.clienteById.Patente;
        this.vehiculo = this.clienteById.Vehiculo;
        this.nSiniestro = this.clienteById.NSiniestro;
        this.nSiniestro2 = this.clienteById.NSiniestro2;
        this.nroCliente = this.clienteById.NumeroCliente;
        this.distancia = this.clienteById.Distancia;
        this.userName = this.clienteById.UserName;
        this.sucursalesGuardadas = this.clienteById.IdSucursal;
        if(this.IdVendedor != null)
        {
          let dataUser = { 'Id': this.IdVendedor};
          this.userServ.getUserById(dataUser).subscribe(async (d: any) => {
            this.vendedor=d;
            this.vendedorNombres=this.vendedor.User.Nombres;
            this.IdVendedor=this.vendedor.User.Id;
          }, (error: any) => { console.log(error);loading.close(); })
        }



        loading.close();
        this.loadDocuments();
      }, error => { console.log("asd"); this.generalServ.goToNoEncontrado(); loading.close(); })
      let dataSuc = { 'IdUser':  this.idUser, 'idCliente': this.idCliente, 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
      this.sucursalServ.getSucursalesByUsuario(dataSuc).subscribe(data => {
        this.sucursalById = data;
        if (this.sucursalById == null) {
          loading.close();

        }
        this.calle = this.sucursalById.ListSucursal[0].Calle;
        this.numero =this.sucursalById.ListSucursal[0].Numero;
        this.barrio = this.sucursalById.ListSucursal[0].Barrio;
        this.idZona = this.sucursalById.ListSucursal[0].IdZona;
        this.idUser = this.sucursalById.ListSucursal[0].IdUser;
        this.idCliente = this.sucursalById.ListSucursal[0].IdCliente;
        this.punoDeVenta = this.sucursalById.ListSucursal[0].PuntoDeVenta;
        this.idSucursal = this.sucursalById.ListSucursal[0].Id;
        if (this.sucursalById.ListSucursal[0].IdAfip == null) {
          this.pfxAfip = '';
        } else {
          this.pfxAfip = this.sucursalById.ListSucursal[0].IdAfip
        }

        const idRutas = this.sucursalById.ListSucursal[0].IdRutas as any[];
        this.listaRutas = this.listaRutasOrig.filter((x: any) => idRutas.includes(x.Id))

        loading.close();

      }, error => { console.log("aaa"); this.generalServ.goToNoEncontrado(); loading.close(); })
    } else {
    this.idCliente = 0;
    }

    const loadingRuta = this.generalServ.loadingModal();
    rutaServ.getRutasByIdClienteNegotis({ 'idClienteNegotis': localStorage.getItem('idClienteNegotis') })
      .subscribe(
        data => {
          this.listaRutasOrig = data as any[];
          //Nombre
          this.filteredRuta = this.myForm.get('nombreRuta')?.valueChanges
            .pipe(
              startWith(''),
              map(item => item ? this.doFilter(item) : this.listaRutasOrig.slice())
            );

          this.LoadSucursal();
          loadingRuta.close();
        }, error => {
          console.log("bbb");
          this.generalServ.goToNoEncontrado();
          loadingRuta.close();
        });
  }

  LoadSucursal() {
    if (this.idSucursal != null) {
      const loading = this.generalServ.loadingModal();
      let superAdminValue = localStorage.getItem('RolSuperAdmin');
      if (superAdminValue == 'false') { this.sucursalCliente = true; }
      let dataSuc = { 'idSucursal': this.idSucursal, 'cliente': this.sucursalCliente, 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
      this.sucursalServ.getSucursalById(dataSuc).subscribe(data => {
        this.sucursalById = data;
        if (this.sucursalById == null) {
          loading.close();
          console.log("ccc");
          this.generalServ.goToNoEncontrado();
        }
        if(this.sucursalById.ListSucursal != null)
        {
          this.calle = this.sucursalById.ListSucursal[0].Calle;
          this.numero = this.sucursalById.ListSucursal[0].Numero;
          this.barrio =this.sucursalById.ListSucursal[0].Barrio;
          this.idZona = this.sucursalById.ListSucursal[0].IdZona;
          this.idUser =this.sucursalById.ListSucursal[0].IdUser;
          this.idCliente = this.sucursalById.ListSucursal[0].IdCliente;
          this.punoDeVenta = this.sucursalById.ListSucursal[0].PuntoDeVenta;
          this.idSucursal = this.sucursalById.ListSucursal[0].Id;
          if (this.sucursalById.ListSucursal[0] == null) {
            this.pfxAfip = '';
          } else {
            this.pfxAfip = this.sucursalById.ListSucursal[0].IdAfip;
          }
        }
        else
        {
          this.calle = this.sucursalById.Calle;
        this.numero = this.sucursalById.Numero;
        this.barrio =this.sucursalById.Barrio;
        this.idZona = this.sucursalById.IdZona;
        this.idUser =this.sucursalById.IdUser;
        this.idCliente = this.sucursalById.IdCliente;
        this.punoDeVenta = this.sucursalById.PuntoDeVenta;
        this.idSucursal = this.sucursalById.Id;
        if (this.sucursalById == null) {
          this.pfxAfip = '';
        } else {
          this.pfxAfip = this.sucursalById.IdAfip;
        }
        }


        const idRutas = this.sucursalById.IdRutas as any[];
        this.listaRutas = this.listaRutasOrig.filter((x: any) => idRutas.includes(x.Id))

        loading.close();

      }, error => { console.log("ddd");loading.close(); })
    } else {
      this.idSucursal = 0;
    }
  }
  selectOptionRuta = (key: any) => {
    const value = this.myForm.get('nombreRuta')?.value;
    if (this.listaRutas.find((x: any) => x.Id == value.Id) == null) {
      this.listaRutas.push(value);
    }
    this.rutaNgModel = "";
  }
  deleteRuta(item: any) {
    this.listaRutas = this.listaRutas.filter((x: any) => x !== item)
  }
  doFilter(value: any) {
    if (value == null) {
      return this.listaRutasOrig;
    }
    let filterVal = value.toString().toLowerCase();
    return this.listaRutasOrig.filter((option: any) => option.Nombre.toLowerCase().includes(filterVal));
  }
  async ngOnInit() {
    let data = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis')};
    if((this.idCliente == undefined && this.idCliente == null)|| this.idCliente == 0)
    {
      const result = await this.listaPrecServ.GetListaDefault(data).subscribe(dat =>
        this.listaPrecios = dat,
      );
    }


    //
    //this.listaPrecServ.GetListaDefault(data).subscribe(data => { this.listaPrecios = data})
    this.tieneRolCliente = JSON.parse(localStorage.getItem('RolCliente') ?? '');
    const tieneRolClienteNegotis = eval(localStorage.getItem('RolClienteNegotis') ?? '') || false;
    const roles = JSON.parse(localStorage.getItem('roles') ?? '');
    this.datosEsteticaHabilitado = (roles != null && roles.VisualizarDatosEstetica) || tieneRolClienteNegotis;
    this.verDatosTaller = (roles != null && roles.VisualizarDatosTaller) || tieneRolClienteNegotis;
    this.tieneRolEsconderDatosSucursal = (roles != null && roles.VisualizarDatosSucursal) || tieneRolClienteNegotis;
    this.tieneRolProduccion= (roles != null && roles.Produccion);
    this.rolSaldoAFavor = (roles != null && roles.SaldoAFavor);
    if(this.tieneRolEsconderDatosSucursal)
    {
      this.numero = '0',
      this.barrio = 'Ignorar',
      this.calle = 'Ignorar';
    }
    const loadRef = this.generalServ.loadingModal();
    let dataUser = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis'), 'activo': true };
    this.listaPrecServ.ListaPreciosByIdClienteNegotis(dataUser)
      .subscribe((data: any) => { this.listadoPrecios = data;
      if((this.idCliente == undefined && this.idCliente == null)|| this.idCliente == 0)
      {
        this.listaPrecios = data[0];
      }


      if((this.idCliente == undefined && this.idCliente == null)|| this.idCliente == 0)
      {
        this.myForm.controls['listaPrecios'].setValue(this.listadoPrecios[0].Id);
        var d = this.listadoPrecios.filter((x: any) => x.Nombre.includes('Lista Base'));
        this.myForm.controls['listaPrecios'].setValue(d[0].Id);
      }

    })
      let dataCatCliente = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis'), 'Page': 1 };
      this.catClienteServ.listadoCategoriaClienteByIdClienteNegotis(dataCatCliente)
        .subscribe((data: any) => { this.categoriasClientes = data.categoriasTotales })
      let dataOne = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
      this.zonaServ.listadoZonasByIdClienteNegotis(dataOne)
        .subscribe(data => { this.listadoZonas = data})
      let datos = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis')};
    this.pedidoServ.getInfoGeneral(datos).subscribe(result => {
      this.infoGeneral = result;
      loadRef.close();
      this.filteredVendedor = this.vendedorCtrl.valueChanges
      .pipe(
        startWith(''),
        map(item => item ? this._filterVendedor(item) : this.infoGeneral.Empleados.slice())
      );
    },
    error => { console.log(error); loadRef.close();});
    const loadingSuc = this.generalServ.loadingModal();
    let dataTwo = { 'idUser': localStorage.getItem('idClienteNegotis'), 'idCliente': 0 };
    this.sucursalServ.getSucursalesByUsuario(dataTwo)
      .subscribe(dataSuc => {
        this.sucursalList = dataSuc;
        let listadoSucCliente = this.sucursalList.ListSucursal;
        for (let item of this.sucursalList.ListSucursal) {
          if(this.sucursalesGuardadas == item.Id)
            {
              this.sucursalGuardada = item;
            }
        }
        if (this.idUser == null) {
          try {
            // seleccionamos la primera sucursal
            //this.selectSucursal(this.sucursalList.ListSucursal[0].Id);
          } catch (e) {
            console.log(e);
          }
        }

        loadingSuc.close();
        let data3 = { 'idUser': this.idUser };
        const loadingUsuSuc = this.generalServ.loadingModal();
        this.sucursalServ.getUsuarioSucursalesByUser(data3)
          .subscribe(data => {
            //this.sucursalGuardada = data;
            let index = 0;
            for (let item of listadoSucCliente) {
                if (this.sucursalGuardada != null && item.Id == this.sucursalGuardada.Id) {
                  item.seleccionar = true;
                  this.idSucursalSelected.push(item.Id);
                }

              index++;
            }

            loadingUsuSuc.close();
            this.selectSucursal(this.sucursalGuardada.Id);
          }, error => { console.log(error); loadingUsuSuc.close(); })
      }, error => { console.log(error); loadingSuc.close(); });
  }

  private _filterVendedor(value: string): any[] {
   const filterValue = value.toLowerCase();

    return this.infoGeneral.Empleados.filter((item: any) => item.Nombres.toLowerCase().includes(filterValue.toLowerCase()) || item.Apellidos.toLowerCase().includes(filterValue.toLowerCase()));
  }

  getVendedor(item: any) {
    this.IdVendedor = item.Id;
    this.vendedorNombres = item.Nombres;
  }

  resetVendedor() {
    this.IdVendedor = null;
  }
  resetKeyRuta() {
  }

  selectSucursal(value: any) {
    if(this.sucursalGuardada != null && this.cargaSuc)
    {
      //this.idSucursalSelected.push(this.sucursalGuardada.Id);
      value = this.sucursalGuardada.Id;
      this.cargaSuc = false;
    }
    else
    {
      this.idSucursalSelected.push(value);
    }

    for (let item of this.sucursalList.ListSucursal) {
      if (item.Id == value) {
        item.seleccionar = true;
      }
    }
  }

  eliminarSucursal(value: any) {
    let index = 0;
    for (let item of this.idSucursalSelected) {
      if (item == value) {
        this.idSucursalSelected.splice(index, 1);
       //this.idSucursalSelected= [];
      }
      index++;
    }

    for (let item of this.sucursalList.ListSucursal) {
      if (item.Id == value) {
        item.seleccionar = null;
      }
    }

  }

  /*public filtrarVendedor() {
    if (this.vendedor.toString().length > 4) {

      if (this.vendedor.toString().length  >= this.busquedaVendedor.toString().length) {
        const loadRef = this.generalServ.loadingModalBuscar();
        let data = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis'), 'textoBusqueda': this.vendedor };
        this.userServ.getListEmpleadoByIdClienteNegotis(data).subscribe(data => {
          this.vendedorList = data;
          loadRef.close();
        });
      }
    }
    this.busquedaVendedor = this.vendedor;
  }*/

  onSubmit(value: any) {
    if (this.myForm.valid) {
      if (value.desdeHora == '') { value.desdeHora = null; }
      if (value.desdeMinuto == '') { value.desdeMinuto = null; }
      if (value.hastaHora == '') { value.hastaHora = null; }
      if (value.hastaMinuto == '') { value.hastaMinuto = null; }
      if (value.desdeAmPm == '') { value.desdeAmPm = null; }
      if (value.hastaAmPm == '') { value.hastaAmPm = null; }
      if (value.desdeHoraDos == '') { value.desdeHoraDos = null; }
      if (value.desdeMinutoDos == '') { value.desdeMinutoDos = null; }
      if (value.hastaHoraDos == '') { value.hastaHoraDos = null; }
      if (value.hastaMinutoDos == '') { value.hastaMinutoDos = null; }
      if (value.desdeAmPmDos == '') { value.desdeAmPmDos = null; }
      if (value.hastaAmPmDos == '') { value.hastaAmPmDos = null; }
      if (value.cuit == '') { value.cuit = null; }
      if (value.dni == '') { value.dni = null; }
      if (value.condicionImpositiva == '') { value.condicionImpositiva = null; }
      if (value.ingresosBrutos == '') { value.ingresosBrutos = null; }
      if(value.IdVendedor == ''){value.IdVendedor = null; }
      if(value.calle == ''){value.calle = null; }
      if(value.numero == ''){value.numero = null; }
      if(value.barrio == ''){value.barrio = null; }
      if(value.idZona == ''){value.idZona = null; }
      if(value.puntoDeVenta == ''){value.puntoDeVenta = null; }
      if(value.pfxAfip == ''){value.pfxAfip = null; }
      if(value.nombreRuta == ''){value.nombreRuta = null; }


      const loadRef = this.generalServ.loadingModal();
      let data = new ClienteCrearEditarModel(
        localStorage.getItem('idUser'),
        this.idCliente,
        localStorage.getItem('idClienteNegotis'),
        value.razonSocial,
        value.nombreFantasia,
        value.desdeHora,
        value.desdeMinuto,
        value.desdeAmPm,
        value.hastaHora,
        + value.hastaMinuto,
        value.hastaAmPm,
        value.desdeHoraDos,
        value.desdeMinutoDos,
        value.desdeAmPmDos,
        value.hastaHoraDos,
        value.hastaMinutoDos,
        value.hastaAmPmDos,
        value.cuit,
        value.condicionImpositiva,
        value.ingresosBrutos,
        value.listaPrecios,
        this.telefono,
        this.email,
        this.redSocialUno,
        this.redSocialDos,
        value.dni,
        value.descripcion,
        this.IdVendedor,
        this.sesionesRealizadas,
        this.sesionesTratamiento,
        this.sesionesTotal,
        this.patente,
        this.nSiniestro,
        this.nSiniestro2,
        this.vehiculo,
        this.color,
        this.idSucursalSelected[0],
        this.nroCliente,
        this.distancia,
        this.saldoAFavor,
        value.categoriaCliente,
        this.tipoSesion,
        this.tipoSesion2,
        this.tipoSesion3,
        this.cantidadSesion,
        this.cantidadSesion2,
        this.cantidadSesion3,
      );

      this.clienteServ.crearEditarCliente(data).subscribe(data => {
        this.post = data;
        if (this.post.RepetidoRS != true) {

          this.saveDocuments(this.post.Id);

          loadRef.close();
          this.router.navigate(["/cliente/panel"], { replaceUrl: true });
          this.snackBar.openFromComponent(SnackBarOperacionExitosaComponent, {
            duration: 1000,
          });
        }
        loadRef.close();
        if(value.userName != null)
        {
         let idSucursal2 = JSON.parse(localStorage.getItem('sucursalSeleccionada') ?? '');
          let dataUser = new EmpleadoCrearModel(
            null,
            0,
            value.userName,
            "",
            "",
            Constants.defaultPassword,
            localStorage.getItem('idClienteNegotis'),
            true,
            idSucursal2.Sucursal.Id,
            -1,
            "",
            "",
            this.post.Id,
            0
          );
          this.userServ.crearEditar(dataUser).subscribe(datos => {
            var test = datos;
          }, error => { console.log(error); loadRef.close(); })
        }

        if (this.post.RepetidoRS != true) {

          let datosSucursal: SucursalCrearEditarModel = {
            idSucursal: this.idSucursal,
            idUser: null,
            idCliente: this.idCliente,
            calle: value.calle,
            numero: value.numero,
            barrio: value.barrio,
            idZona: value.idZona,
            puntoDeVenta: value.punoDeVenta,
            idAfip: Number(value.pfxAfip),
            idRutas: this.listaRutas.map((x: any) => x.Id),
            razonSocial:value.razonSocial,
            idClienteNegotis:localStorage.getItem('idClienteNegotis'),
            cuit:this.cuit,
            RazonSocial2:value.razonSocial,
            condicionImpositiva:this.condicionImpositiva,
            ingresosBrutos:this.ingresosBrutos
          };

          this.sucursalServ.crearEditarSucursal(datosSucursal)
          .subscribe(datos => {
            this.post = datos;
          }, error => { console.log(error); loadRef.close(); })

        }
            }, error => { console.log(error); loadRef.close(); })

    }

    this.submitted = true;

  }

  saveDocuments(idCliente: any) {

    this.filesToUpload.forEach(element => {
      let request = new FormData();
      request.append('idClienteNegotis', localStorage.getItem('idClienteNegotis') ?? '');
      request.append('idUser', localStorage.getItem('idUser') ?? '');
      request.append('document', element);

      this.documentoServ.crearEditar(request).subscribe(response => {
        if (response !== false) {
          let requestDocXCli = {
            'idCliente': idCliente,
            'idDocumento': response,
            'idClienteNegotis': localStorage.getItem('idClienteNegotis')
          };
          this.clienteServ.AddDocument(requestDocXCli).subscribe(
            responseDocXCli => { },
            errorDocXCli => { console.log(errorDocXCli); }
          );
        }
      }, error => { console.log(error); });
    });
  }

  saveCliente() {

  }


  fileChanged(value: any) {
    if (value.target.files && value.target.files[0]) {
      let file = value.target.files[0];
      if (!this.filesToUpload.some((x) => x.name === file.name)) {
        //cargar archivo a filesUpload
        this.filesToUpload.push(file);

        //cargar Documento en Lista
        let newDoc = new DocumentoModel();
        newDoc.filename = file.name;
        this.documentos.push(newDoc);
      }
    }
  }

  deleteDocument(value: DocumentoModel) {
    //Eliminar Documento
    const dialogRef = this.dialog.open(EliminarModalComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        if (value.id === '' || value.id === 0 || value.id == null) {
          let index = this.filesToUpload.findIndex((x) => x.name === value.filename);
          if (index !== -1) {
            this.filesToUpload.splice(index, 1);
            console.log(this.filesToUpload);
            this.documentos.splice(this.documentos.indexOf(value), 1);
          }
        } else {
          const loading = this.generalServ.loadingModal();
          let request = { 'id': value.id, 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
          this.documentoServ.eliminar(request).subscribe(
            response => {
              console.log(response);
              if (response === true) {
                this.documentos.splice(this.documentos.indexOf(value), 1);
              }
              loading.close();
            },
            error => {
              loading.close();
            }
          );

        }
      }
    });
  }

  getDocumentUrl(value: DocumentoModel) {
    if (value.id > 0) { return this.documentoServ.getLink(value.id, localStorage.getItem('idClienteNegotis')); }
    else { return ''; }
  }

  downLoadFile(data: any, type: string) {
    let blob = new Blob([data], { type: type });
    let url = window.URL.createObjectURL(blob);
    let pwa = window.open(url);
    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
      alert('Please disable your Pop-up blocker and try again.');
    }
  }

  loadDocuments() {
    if (this.idCliente !== '' || this.idCliente !== 0 || this.idCliente != null) {
      const loading = this.generalServ.loadingModal();
      let request = { 'idCliente': this.idCliente, 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
      this.clienteServ.GetDocumentList(request).subscribe(
        response => {
          let responseAsArray = response as DocumentoModel[];
          this.documentos = [];
          responseAsArray.forEach(element => {
            let documentoItem = new DocumentoModel();
            documentoItem.FromObject(element);
            this.documentos.push(documentoItem);
          });
          loading.close();
        },
        error => {
          loading.close();
        }
      );
    }
  }

}

