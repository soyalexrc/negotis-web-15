import { Component, OnInit } from '@angular/core';
import { CategotriaRubroService } from '../../../Service/categotria-rubro.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneralService } from '../../../Service/general.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarOperacionExitosaComponent } from '../../../components/snack-bar-operacion-exitosa/snack-bar-operacion-exitosa.component';
import { CategoriaGastoService } from 'src/app/Service/categoriagasto.service';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-categoriagasto-crear-editar',
  templateUrl: './categoriagasto-crear-editar.component.html',
  styleUrls: ['./categoriagasto-crear-editar.component.css']
})
export class CategoriagastoCrearEditarComponent implements OnInit {


  myForm: FormGroup;
  submitted!: boolean;
  post: any;
  categoria: any;
  id: any = 0;
  model: any;

  constructor(private titleService: Title,private fb: FormBuilder, private categoriaGasto: CategoriaGastoService, private router: Router,
    private route: ActivatedRoute, private generalServ: GeneralService, private snackBar: MatSnackBar) {
    titleService.setTitle("Caja");
    this.myForm = fb.group({
      categoria: ['', Validators.compose([Validators.required])],
    });
    route.params.subscribe(params => { this.id = params['id']; });
    if (this.id != null) {
      const loading = this.generalServ.loadingModal();
      let dataCatRub = { 'id': this.id, 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
      this.categoriaGasto.getById(dataCatRub).subscribe(data => {
        this.model = data;
        if (this.model == null) {
          loading.close();
          this.generalServ.goToNoEncontrado();
        }
        this.categoria = this.model.Nombre;
        loading.close();
      }, error => { console.log(error); this.generalServ.goToNoEncontrado();loading.close(); })
    } else {
      this.id = 0;
    }
  }

  ngOnInit() {
  }

  onSubmit(value: any) {
    if (this.myForm.valid) {
      const loadRef = this.generalServ.loadingModal();
      let data = {
        'id': this.id,
        'idUser': localStorage.getItem('idUser'),
        'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
        'nombre': value.categoria
      };
      this.categoriaGasto.crearEditar(data)
        .subscribe(data => {
          this.post = data; loadRef.close();
          if (this.post.Repetido != true) {
            this.router.navigate(['/cliente/categoria/gasto/panel'], { replaceUrl: true });
            this.snackBar.openFromComponent(SnackBarOperacionExitosaComponent, {
              duration: 1000,
            });
          }
        }, error => { console.log(error); loadRef.close(); });
    }
    this.submitted = true;
  }

}
