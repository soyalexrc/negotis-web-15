import { Component, OnInit } from '@angular/core';
import { RutaService } from '../../../Service/ruta.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneralService } from '../../../Service/general.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarOperacionExitosaComponent } from '../../../components/snack-bar-operacion-exitosa/snack-bar-operacion-exitosa.component';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-ruta-crear-editar',
  templateUrl: './ruta-crear-editar.component.html',
  styleUrls: ['./ruta-crear-editar.component.css']
})
export class RutaCrearEditarComponent implements OnInit {

  myForm: FormGroup;
  submitted!: boolean;
  post: any;
  ruta: any;
  idRuta: any = 0;
  rutaById: any;

  constructor(private titleService: Title,private fb: FormBuilder, private rutaServ: RutaService, private router: Router,
    private route: ActivatedRoute, private generalServ: GeneralService, private snackBar: MatSnackBar) {
    titleService.setTitle("Zonas");
    this.myForm = fb.group({
      ruta: ['', Validators.compose([Validators.required])],
    });
    route.params.subscribe(params => { this.idRuta = params['id']; });
    if (this.idRuta != null) {
      const loading = this.generalServ.loadingModal();
      let dataRuta = { 'id': this.idRuta, 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
      this.rutaServ.getRutaById(dataRuta).subscribe(data => {
        this.rutaById = data;
        if (this.rutaById == null) {
          loading.close();
          this.generalServ.goToNoEncontrado();
        }
        this.ruta = this.rutaById.Nombre;
        loading.close();
      }, error => { console.log(error); this.generalServ.goToNoEncontrado();loading.close(); })
    } else {
      this.idRuta = 0;
    }
  }

  ngOnInit() {
  }

  onSubmit(value: any) {
    if (this.myForm.valid) {
      const loadRef = this.generalServ.loadingModal();
      let data = {
        'id': this.idRuta, 'idUser': localStorage.getItem('idUser'),
        'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
        'nombre': value.ruta
      };
      this.rutaServ.crearEditar(data)
        .subscribe(data => {
          this.post = data; loadRef.close();
          if (this.post.Repetido != true) {
            this.router.navigate(["/cliente/ruta/panel"], { replaceUrl: true });
            this.snackBar.openFromComponent(SnackBarOperacionExitosaComponent, {
              duration: 1000,
            });
          }
        }, error => { console.log(error); loadRef.close(); });
    }
    this.submitted = true;
  }

}
