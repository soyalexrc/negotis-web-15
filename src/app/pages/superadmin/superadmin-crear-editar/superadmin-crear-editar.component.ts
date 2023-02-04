import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../Service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneralService } from '../../../Service/general.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarOperacionExitosaComponent } from '../../../components/snack-bar-operacion-exitosa/snack-bar-operacion-exitosa.component';
import {SuperAdminModel} from './SuperAdminModel';
import * as Constants from 'src/app/util/constants';

@Component({
  selector: 'app-superadmin-crear-editar',
  templateUrl: './superadmin-crear-editar.component.html',
  styleUrls: ['./superadmin-crear-editar.component.css']
})
export class SuperadminCrearEditarComponent implements OnInit {

  myForm: FormGroup;
  submitted!: boolean;
  post: any;
  userName: any;
  nombres: any;
  apellidos: any;
  idUser: any;
  userById: any;
  verSocios: any;
  puedeModificarSocios: any;

  constructor(private fb: FormBuilder, private userServ: UserService, private router: Router,
    private route: ActivatedRoute, private generalServ: GeneralService, private snackBar: MatSnackBar) {
    this.myForm = fb.group({
      userName: ['', Validators.compose([Validators.required, Validators.email])],
      nombres: ['', Validators.compose([Validators.required])],
      apellidos: ['', Validators.compose([Validators.required])],
      verSocios: ['', Validators.compose([Validators.required])],
    });
    route.params.subscribe(params => { this.idUser = params['iduser']; });
    let user = localStorage.getItem('idUser');
    let dataUser = { 'idUser': user };
      this.userServ.getUserById(dataUser).subscribe((data: any) => {
        this.puedeModificarSocios = data.User.VerSocios;
      }, (error: any) => { console.log(error); this.generalServ.goToNoEncontrado();})
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
        this.nombres = this.userById.User.Nombres;
        this.apellidos = this.userById.User.Apellidos;
        this.verSocios = this.userById.User.VerSocios;
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
      let data = new SuperAdminModel(
        value.userName,
        value.nombres,
        value.apellidos,
        true,
        Constants.defaultPassword,
        this.idUser,
        value.verSocios
      );
      this.userServ.crearEditar(data)
        .subscribe(data => {
          this.post = data; loadRef.close();
          if (this.post.Resultado == true) {
            this.router.navigate(["/superadmin/panel"], { replaceUrl: true });
            this.snackBar.openFromComponent(SnackBarOperacionExitosaComponent, {
              duration: 1000,
            });
          }
        },
          error => { console.log(error); loadRef.close(); });
    }
    this.submitted = true;
  }

}
