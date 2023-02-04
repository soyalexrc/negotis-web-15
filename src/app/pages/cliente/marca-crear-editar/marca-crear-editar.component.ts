import { Component, OnInit } from '@angular/core';
import { MarcaService } from '../../../Service/marca.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneralService } from '../../../Service/general.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarOperacionExitosaComponent } from '../../../components/snack-bar-operacion-exitosa/snack-bar-operacion-exitosa.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-marca-crear-editar',
  templateUrl: './marca-crear-editar.component.html',
  styleUrls: ['./marca-crear-editar.component.css']
})
export class MarcaCrearEditarComponent implements OnInit {

  myForm: FormGroup;
  submitted!: boolean;
  post: any;
  marca: any;
  idMarca: any = 0;
  marcaById: any;
  activo: any;
  eliminar :boolean=false;

  constructor(private titleService: Title,private fb: FormBuilder, private marcaServ: MarcaService, private router: Router,
    private route: ActivatedRoute, private generalServ: GeneralService, private snackBar: MatSnackBar) {
      titleService.setTitle("Stock");
    this.myForm = fb.group({
      marca: ['', Validators.compose([Validators.required])],
      activo: ['', Validators.compose([Validators.required])],
      eliminar: ['', Validators.compose([Validators.required])],
    });
    route.params.subscribe(params => { this.idMarca = params['idmarca']; });
    if (this.idMarca != null) {
      const loading = this.generalServ.loadingModal();
      let dataMarca = { 'idMarca': this.idMarca, 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
      this.marcaServ.getMarcaById(dataMarca).subscribe(data => {
        this.marcaById = data;
        if (this.marcaById == null) {
          loading.close();
          this.generalServ.goToNoEncontrado();
        }
        this.marca = this.marcaById.Nombre;
        this.activo = this.marcaById.Activo;
        this.eliminar = this.marcaById.Eliminar;
        loading.close();
      }, error => { console.log(error); this.generalServ.goToNoEncontrado();loading.close(); })
    } else {
      this.idMarca = 0;
    }
  }

  ngOnInit() {
  }

  onSubmit(value: any) {
    if (this.myForm.valid) {
      const loadRef = this.generalServ.loadingModal();
      let data = {
        'idMarca': this.idMarca, 'idUser': localStorage.getItem('idUser'),
        'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
        'marca': value.marca,
        'activo': value.activo,
        'eliminar' : value.eliminar
      };
      this.marcaServ.crearEditarMarca(data)
        .subscribe(data => {
          this.post = data; loadRef.close();
          if (this.post.Repetido != true) {
            this.router.navigate(["/cliente/marca/panel"], { replaceUrl: true });
            this.snackBar.openFromComponent(SnackBarOperacionExitosaComponent, {
              duration: 1000,
            });
          }
        }, error => { console.log(error); loadRef.close(); });
    }
    this.submitted = true;
  }

}
