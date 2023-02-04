import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../Service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RolService } from '../../../Service/rol.service';
import { GlobalService } from '../../../Service/global.service';
import { SucursalService } from '../../../Service/sucursal.service';
import { GeneralService } from '../../../Service/general.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarOperacionExitosaComponent } from '../../../components/snack-bar-operacion-exitosa/snack-bar-operacion-exitosa.component';
import { ClienteclienteService } from 'src/app/Service/clientecliente.service';
import {EmpleadoCrearModel} from './EmpleadoCrearModel';
import * as Constants from 'src/app/util/constants';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-empleado-crear-editar',
  templateUrl: './empleado-crear-editar.component.html',
  styleUrls: ['./empleado-crear-editar.component.css']
})
export class EmpleadoCrearEditarComponent implements OnInit {

  myForm: FormGroup;
  submitted!: boolean;
  postUser: any;
  userName: any;
  nombres: any;
  apellidos: any;
  rolList: any;
  sucursalList: any;
  clienteList: any;
  idUsuarioRol: any = 0;
  idSucursalSelected: any[] = [];
  idUser: any;
  empleadoById: any;
  telefono: any;
  objetivo: any;
  porcentajeComision: any;
  idRol: any;
  sucursalesGuardadas: any;
  index: any = 0;
  cuil: any;

  cliente = '';
  limit = 20;
  page = 1;
  total = 0;
  busquedaCliente = '';
  idCliente: any;

  constructor(private titleService: Title,private fb: FormBuilder, private userServ: UserService, private router: Router,
    private rolServ: RolService, private globalServ: GlobalService, private sucursalServ: SucursalService,
    private clienteService: ClienteclienteService,
    private route: ActivatedRoute, private generalServ: GeneralService, private snackBar: MatSnackBar) {
    titleService.setTitle("Usuarios");
    this.myForm = fb.group({
      userName: ['', Validators.compose([Validators.required, Validators.email])],
      nombres: ['', Validators.compose([])],
      apellidos: ['', Validators.compose([])],
      idRol: ['', Validators.compose([Validators.required])],
      telefono: ['', Validators.compose([])],
      porcentajeComision: ['', Validators.compose([Validators.pattern('^[0-9.,]+$')])],
      cuil: ['', Validators.compose([Validators.pattern('^[0-9]+$')])],
      cliente: ['', Validators.compose([])],
      objetivo: ['', Validators.compose([])]
    });
    route.params.subscribe(params => { this.idUser = params['idempleado']; });
    if (this.idUser != null) {
      const loading = this.generalServ.loadingModal();
      let dataUser = { 'idUser': this.idUser, 'idClienteNegotis': localStorage.getItem('idClienteNegotis'), 'empleado': true };
      this.userServ.getUserById(dataUser).subscribe(async (data: any) => {
        this.empleadoById = data;
        if (this.empleadoById.User == null) {
          loading.close();
          this.generalServ.goToNoEncontrado();
        }
        this.userName = this.empleadoById.User.UserName;
        this.nombres = this.empleadoById.User.Nombres;
        this.apellidos = this.empleadoById.User.Apellidos;
        this.idRol = this.empleadoById.Rol.Id;

        this.sucursalesGuardadas = this.empleadoById.Sucursal;
        this.porcentajeComision = this.empleadoById.User.PorcentajeComision;
        this.cuil = this.empleadoById.User.CUIL;
        this.telefono = this.empleadoById.User.Telefono;
        this.objetivo = this.empleadoById.User.Objetivo;
        loading.close();

        if (this.empleadoById.User.IdCliente !== null) {
          const dataCliente: any =  { 'idCliente': this.empleadoById.User.IdCliente, 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
          const cliente: any = await this.clienteService.clientesById(dataCliente).toPromise();
          this.idCliente = cliente.Id;
          this.cliente = cliente.RazonSocial;
        }

      }, (error: any) => { console.log(error); this.generalServ.goToNoEncontrado(); loading.close(); })
    } else {
      this.idUser = null;
    }

  }

  ngOnInit() {
    //roles
    const loadingRol = this.generalServ.loadingModal();
    let dataOne = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
    this.rolServ
      .GetListRolByClienteNegotis(dataOne).subscribe(data => {
        this.rolList = data
        loadingRol.close();
      }, error => { console.log(error); loadingRol.close(); });
    //sucursales
    const loadingSuc = this.generalServ.loadingModal();
    let dataTwo = { 'idUser': localStorage.getItem('idClienteNegotis'), 'idCliente': 0 };
    this.sucursalServ.getSucursalesByUsuario(dataTwo)
      .subscribe(dataSuc => {

        this.sucursalList = dataSuc;
        let listadoSucCliente = this.sucursalList.ListSucursal;


        if (this.idUser == null) {
          try {
            // seleccionamos la primera sucursal
            this.selectSucursal(this.sucursalList.ListSucursal[0].Id);
          } catch (e) {
            console.log(e);
          }
        }

        loadingSuc.close();
        let data3 = { 'idUser': this.idUser };
        const loadingUsuSuc = this.generalServ.loadingModal();
        this.sucursalServ.getUsuarioSucursalesByUser(data3)
          .subscribe(data => {
            this.sucursalesGuardadas = data;
            let index = 0;
            for (let item of listadoSucCliente) {
              for (let item2 of this.sucursalesGuardadas) {
                if (item.Id == item2.Sucursal.Id) {
                  item.seleccionar = true;
                  this.idSucursalSelected.push(item.Id);
                }
              }
              index++;
            }
            loadingUsuSuc.close();
          }, error => { console.log(error); loadingUsuSuc.close(); })
      }, error => { console.log(error); loadingSuc.close(); });
  }

  onSubmit(value: any) {
    if (this.myForm.valid && this.idSucursalSelected.length != 0) {
      const loadRef = this.generalServ.loadingModal();
      let dataUser = new EmpleadoCrearModel(
        this.idUser,
        this.porcentajeComision,
        value.userName,
        value.nombres,
        value.apellidos,
        Constants.defaultPassword,
        localStorage.getItem('idClienteNegotis'),
        true,
        this.idSucursalSelected,
        Number(value.idRol),
        value.cuil,
        value.telefono,
        this.idCliente,
        this.objetivo
      );
      this.userServ.crearEditar(dataUser)
        .subscribe(data => {
          this.postUser = data; loadRef.close();
          if (this.postUser.Resultado == true) {
            this.router.navigate(["/cliente/empleado/panel"], { replaceUrl: true });
            this.snackBar.openFromComponent(SnackBarOperacionExitosaComponent, {
              duration: 1000,
            });
          }
        },
          error => { console.log(error); loadRef.close(); });
    }
    this.submitted = true;
  }

  selectSucursal(value: any) {
    this.idSucursalSelected.push(value);
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
      }
      index++;
    }

    for (let item of this.sucursalList.ListSucursal) {
      if (item.Id == value) {
        item.seleccionar = null;
      }
    }

  }

  public filtrarCliente() {
    if (this.cliente.toString().length > 4) {

      if (this.cliente.toString().length  >= this.busquedaCliente.toString().length) {
        const loadRef = this.generalServ.loadingModalBuscar();
        let data = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis'), 'textoBusqueda': this.cliente, 'page': this.page, 'pageSize': this.limit };
        this.clienteService.busquedaClientesClienteNegotisPaginado(data).subscribe(resp => {
          this.clienteList = resp;

          loadRef.close();
        });
      }
    }
    this.busquedaCliente = this.cliente;
  }

  resetCliente() {
    this.idCliente = null;
  }

  getCliente(item: any) {
    this.idCliente = item.Id;
    this.cliente = item.RazonSocial;
  }
}
