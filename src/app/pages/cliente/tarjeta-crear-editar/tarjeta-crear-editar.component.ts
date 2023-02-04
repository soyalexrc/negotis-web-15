import { Component, OnInit } from '@angular/core';
import { RubroService } from '../../../Service/rubro.service';
import { CategotriaRubroService } from '../../../Service/categotria-rubro.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneralService } from '../../../Service/general.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarOperacionExitosaComponent } from '../../../components/snack-bar-operacion-exitosa/snack-bar-operacion-exitosa.component';
import { UserService } from 'src/app/Service/user.service';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-tarjeta-crear-editar',
  templateUrl: './tarjeta-crear-editar.component.html',
  styleUrls: ['./tarjeta-crear-editar.component.css']
})
export class TarjetaCrearEditarComponent implements OnInit {


  myForm: FormGroup;
  submitted!: boolean;
  post: any;
  rubro: any;
  idTarjeta: any = 0;
  porcentaje: any;
  nombre: any;
  tipoTarjeta: any="";
  tarjetaById: any;

  constructor(private titleService: Title,private fb: FormBuilder, private userServ: UserService, private router: Router,
    private route: ActivatedRoute, private generalServ: GeneralService, private snackBar: MatSnackBar,
    private categRubro:CategotriaRubroService) {
    titleService.setTitle("Usuario");
    this.myForm = fb.group({
      nombre: ['', Validators.compose([Validators.required])],
      porcentaje: ['', Validators.compose([])],
      tipoTarjeta: ['', Validators.compose([])],
    });
    route.params.subscribe(params => { this.idTarjeta = params['idtarjeta']; });
    if (this.idTarjeta != null) {
      const loading = this.generalServ.loadingModal();
       let dataTarjeta = { 'idTarjeta': this.idTarjeta, 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
        this.userServ.obtenerTarjeta(dataTarjeta).subscribe((data: any) => {
        this.tarjetaById   = data;
        if (this.tarjetaById == null) {
         loading.close();
          this.generalServ.goToNoEncontrado();
        }
       this.nombre = this.tarjetaById.Nombre;
        this.tipoTarjeta = this.tarjetaById.TipoTarjeta;
       this.porcentaje = this.tarjetaById.Porcentaje;
       loading.close();
      }, (error: any) => { console.log(error); this.generalServ.goToNoEncontrado();loading.close(); })
    } else {
      this.idTarjeta = 0;
    }
  }

  ngOnInit() {}

  onSubmit(value: any) {
    if (this.myForm.valid) {
      const loadRef = this.generalServ.loadingModal();
     let data = {
         'idUser' : localStorage.getItem('idUser'),
        'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
        'idTarjeta' : this.idTarjeta,
        'nombre' : this.nombre,
        'tipoTarjeta' : this.tipoTarjeta,
        'porcentaje' : this.porcentaje
     }
      this.userServ.crearEditarTarjeta(data)
        .subscribe(data => {
          this.post = data; loadRef.close();
          if (this.post.RepetidoNombre != true && this.post.RepetidoCodigo != true) {
            this.router.navigate(["cliente/usuario/tarjeta/panel"], { replaceUrl: true });
            this.snackBar.openFromComponent(SnackBarOperacionExitosaComponent, {
              duration: 1000,
            });
          }
        }, error => { console.log(error); loadRef.close(); });
    }
    this.submitted = true;
  }

}
