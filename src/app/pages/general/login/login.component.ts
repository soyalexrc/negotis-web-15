import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../Service/user.service';
import { GlobalService } from '../../../Service/global.service';
import { Router } from '@angular/router';
import { GeneralService } from '../../../Service/general.service';
import {PropertyService} from '../../../Service/property.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myForm: FormGroup;
  submitted!: boolean;
  postLogin: any;
  showLoginPage!: boolean;
  remember: boolean = true;
  public url: any;
  constructor(private fb: FormBuilder, private userServ: UserService, private global: GlobalService,
    private router: Router, private generalServ: GeneralService, private propertyService: PropertyService, ) {
    this.myForm = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required,])],
      remember: ['', Validators.compose([])],
    });
  }

  ngOnInit() {
    //Verifica sesión y rol
    this.url=this.global.urlWhatsApp;
    if (localStorage.getItem('token') != null) {
      if (localStorage.getItem('superAdmin') == 'true') {
        this.router.navigate(["/superadmin/inicio"], { replaceUrl: true });
      } else {
        this.router.navigate(["/inicio"], { replaceUrl: true });
      }
    } else {
      this.showLoginPage = true;
      localStorage.clear();
      this.router.navigate(["/"]);
    };
  }

  onSubmit(value: any) {
    if (this.myForm.valid) {
      const loadRef = this.generalServ.loadingModal();
      let dataLogin = { 'userName': value.email, 'password': value.password };
      this.userServ.login(dataLogin)
        .subscribe(async data => {
          this.postLogin = data;
          if (this.postLogin.Resultado == true) {
            localStorage.setItem('token', this.postLogin.Token);

            localStorage.setItem('idUser', this.postLogin.IdUser);
            localStorage.setItem('userName', this.postLogin.UserName);
            localStorage.setItem('idClienteNegotis', this.postLogin.IdClienteNegotis);
            localStorage.setItem('mantenerSesion', value.remember);
            localStorage.setItem('sucursalSeleccionada', JSON.stringify(this.postLogin.UsuarioSucursal));
            localStorage.setItem('roles', JSON.stringify(this.postLogin.Roles));
            localStorage.setItem('soporte', this.postLogin.Soporte);

            localStorage.setItem('properties', JSON.stringify(await this.propertyService.getAllProperties().toPromise()));

            if (this.postLogin.SuperAdmin == true) {

              this.router.navigate(["/superadmin/inicio"], { replaceUrl: true });
              localStorage.setItem('RolSuperAdmin', 'true');
              localStorage.setItem('VerSocios', this.postLogin.Socio);
            } else {
              if (this.postLogin.ClienteNegotis == true) {
                localStorage.setItem('RolClienteNegotis', 'true');
              }
              if (this.postLogin.Empleado == true) {
                localStorage.setItem('RolEmpleado', 'true');
              }
              if (this.postLogin.Cliente == true) {
                localStorage.setItem('RolCliente', 'true');
                this.router.navigate(["/cliente/pedido/crear"], { replaceUrl: true });
                loadRef.close();
                return;
              }

              if(value.email == 'lista@potente.com')
              {
                this.router.navigate(["/cliente/articulo/panel"], { replaceUrl: true });
                loadRef.close();
                return;
              }

              this.router.navigate(["/inicio"], { replaceUrl: true });
              localStorage.setItem('RolSuperAdmin', 'false');
            }
          }
          loadRef.close();
        }, error => {
          console.log(error); loadRef.close();
          localStorage.clear();
          this.router.navigate(["/"], { replaceUrl: true });
        });
    }
    this.submitted = true;
  }

}
