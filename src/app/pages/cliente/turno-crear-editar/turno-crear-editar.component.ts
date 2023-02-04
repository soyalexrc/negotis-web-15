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
  selector: 'app-turno-crear-editar',
  templateUrl: './turno-crear-editar.component.html',
  styleUrls: ['./turno-crear-editar.component.css']
})
export class TurnoCrearEditarComponent implements OnInit {


  myForm: FormGroup;
  submitted!: boolean;
  post: any;
  idTurno: any = 0;
  nombre: any;
  turnoById: any;

  constructor(private titleService: Title,private fb: FormBuilder, private userServ: UserService, private router: Router,
    private route: ActivatedRoute, private generalServ: GeneralService, private snackBar: MatSnackBar,
    private categRubro:CategotriaRubroService) {
    titleService.setTitle("Usuario");
    this.myForm = fb.group({
      nombre: ['', Validators.compose([Validators.required])]

    });
    route.params.subscribe(params => { this.idTurno = params['idturno']; });
    if (this.idTurno != null) {
      const loading = this.generalServ.loadingModal();
       let dataTurno = { 'idTurno': this.idTurno, 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
        this.userServ.obtenerTurno(dataTurno).subscribe((data: any) => {
        this.turnoById   = data;
        if (this.turnoById == null) {
         loading.close();
          this.generalServ.goToNoEncontrado();
        }
       this.nombre = this.turnoById.Nombre;
       loading.close();
      }, (error: any) => { console.log(error); this.generalServ.goToNoEncontrado();loading.close(); })
    } else {
      this.idTurno = 0;
    }
  }

  ngOnInit() {}

  onSubmit(value: any) {
    if (this.myForm.valid) {
      const loadRef = this.generalServ.loadingModal();
     let data = {
         'idUser' : localStorage.getItem('idUser'),
        'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
        'idTurno' : this.idTurno,
        'nombre' : this.nombre
     }
      this.userServ.crearEditarTurno(data)
        .subscribe(data => {
          this.post = data; loadRef.close();
          if (this.post.RepetidoNombre != true && this.post.RepetidoCodigo != true) {
            this.router.navigate(["cliente/usuario/turno/panel"], { replaceUrl: true });
            this.snackBar.openFromComponent(SnackBarOperacionExitosaComponent, {
              duration: 1000,
            });
          }
        }, error => { console.log(error); loadRef.close(); });
    }
    this.submitted = true;
  }

}
