import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../Service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneralService } from '../../../Service/general.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarOperacionExitosaComponent } from '../../../components/snack-bar-operacion-exitosa/snack-bar-operacion-exitosa.component';
import { DatepickerModalComponent } from '../../../components/datepicker-modal/datepicker-modal.component';
import { FotoCrearEditarModalComponent } from 'src/app/components/foto-crear-editar-modal/foto-crear-editar-modal.component';
import { ImageType } from 'src/app/components/foto-crear-editar-modal/image-type';
import {UsuarioModel} from './UsuarioModel';
import * as Constants from 'src/app/util/constants';
import {ClienteclienteService} from '../../../Service/clientecliente.service';

@Component({
  selector: 'app-clientenegotis-crear-editar',
  templateUrl: './clientenegotis-crear-editar.component.html',
  styleUrls: ['./clientenegotis-crear-editar.component.css']
})
export class ClientenegotisCrearEditarComponent implements OnInit {

  public idUser: any;
  public idClienteNegotis : any;

  myForm: FormGroup;
  submitted!: boolean;
  post: any;
  userName: any;
  razonSocial: any;
  nombreFantasia: any;
  userById: any;
  cuit: any;
  testingUser: any;
  ingresoBruto: any;
  inicioActividad: any;
  condicionImpositiva: any;
  baseUrl:any;
  account:any;
  email: any;
  telefono: any;
  panelQuery: any = '';
  userEcommerce: any;
  gastronomico:any = null;

  constructor(
    private fb: FormBuilder,
    private userServ: UserService,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private generalServ: GeneralService,
    private snackBar: MatSnackBar,
    private clienteServ: ClienteclienteService,

  ) {
    this.myForm = fb.group({
      userName: ['', Validators.compose([Validators.required, Validators.email])],
      razonSocial: ['', Validators.compose([Validators.required])],
      nombreFantasia: ['', Validators.compose([Validators.required])],
      cuit: ['', Validators.compose([Validators.pattern('^[0-9]+$')])],
      testingUser: ['', Validators.compose([])],
      ingresoBruto: ['', Validators.compose([])],
      inicioActividad: ['', Validators.compose([])],
      condicionImpositiva: ['', Validators.compose([])],
      baseUrl:['', Validators.compose([])],
      account:['', Validators.compose([])],
      userEcommerce:['', Validators.compose([])],
      email:['', Validators.compose([])],
      telefono:['', Validators.compose([])],
      gastronomico:['', Validators.compose([])],
    });
    route.params.subscribe(params => { this.idUser = params['iduser']; });
    route.params.subscribe(params => { this.idClienteNegotis = params['idclientenegotis']; });
    if (this.route.snapshot.queryParams['panelQuery'] != null) {
      this.panelQuery = this.route.snapshot.queryParams['panelQuery'];
    }
    if (this.idUser != null) {
      const loading = this.generalServ.loadingModal();
      let dataUser = { 'idUser': this.idUser };
      this.userServ.getUserById(dataUser).subscribe((data: any) => {
        this.userById = data;
        if (this.userById.User == null) {
          loading.close();
          this.generalServ.goToNoEncontrado();
        }

        this.userName = this.userById.User.UserName;
        this.razonSocial = this.userById.User.RazonSocial;
        this.nombreFantasia = this.userById.User.NombreFantasia;
        this.cuit = this.userById.User.CUIT;
        this.testingUser= this.userById.User.Testing;
        this.ingresoBruto= this.userById.User.IngresoBruto;
        this.inicioActividad= this.userById.User.InicioActividad;
        this.condicionImpositiva= this.userById.User.CondicionImpositiva;
        this.baseUrl = this.userById.User.BaseUrl;
        this.telefono = this.userById.User.Telefono;
        this.gastronomico = this.userById.User.Gastronomico;
        this.email = this.userById.User.Email;
        this.userEcommerce = this.userById.User.Ecommerce;

        loading.close();
      }, (error: any) => { console.log(error); this.generalServ.goToNoEncontrado();loading.close(); })
    } else {
      this.idUser = null;
    }
  }

  ngOnInit() {
  }


  onSubmit(value: any) {
    if (this.myForm.valid) {
      const loadRef = this.generalServ.loadingModal();
      if(value.testingUser == false){value.testingUser =null;}
      let dataUser = new UsuarioModel(
        value.userName,
        value.razonSocial,
        value.nombreFantasia,
        true,
        Constants.defaultPassword,
        this.idUser,
        value.cuit,
        true,
        value.testingUser,
        value.ingresoBruto,
        value.inicioActividad,
        value.condicionImpositiva,
        value.userEcommerce,
        this.baseUrl,
        this.telefono,
        this.email,
        this.gastronomico
      );
      this.userServ.crearEditar(dataUser)
        .subscribe(data => {
          this.post = data; loadRef.close();
          if (this.post.Resultado == true) {
            this.router.navigate(["/superadmin/clientenegotis/panel"], { replaceUrl: true , queryParams: { filter: this.panelQuery}});
            this.snackBar.openFromComponent(SnackBarOperacionExitosaComponent, {
              duration: 1000,
            });
          }
        });
/*           const dataFiltro = {
            'idClienteNegotis':this.userById.User.IdClienteNegotis,
            'BaseUrl': this.baseUrl,
            'Account': this.account,
            'Password': " ",
            'Activo': value.userEcommerce
            }
            this.clienteServ.crearEditarEcommerce(dataFiltro).subscribe(datos => {

      }, error => { console.log(error); loadRef.close(); }) */
    }
    this.submitted = true;
  }

  fechaIniAct() {
    const dialogRef = this.dialog.open(DatepickerModalComponent, {
      width: '350px', data: { permitirFechaPasada: true },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.inicioActividad = result.day + '/' + result.month + '/' + result.year;
      }
    });
  }

  cleanIniAct(){
    this.inicioActividad=null;
  }

  imagenPortadaHorizontalModal() {
    this.imagenPortadaModal(ImageType.Horizontal);
  }

  imagenPortadaVerticalModal() {
    this.imagenPortadaModal(ImageType.Vertical);
  }

  imagenPortadaModal(imageType: ImageType){
    const dialogRef = this.dialog.open(FotoCrearEditarModalComponent, {
      width: '750px', data: { editar: true, idClienteNegotisSeleccionado: this.idUser, imageType: imageType  },
    });
  }

}

