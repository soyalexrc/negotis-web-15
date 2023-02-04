import { Component, OnInit } from '@angular/core';
import { CategotriaRubroService } from '../../../Service/categotria-rubro.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneralService } from '../../../Service/general.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarOperacionExitosaComponent } from '../../../components/snack-bar-operacion-exitosa/snack-bar-operacion-exitosa.component';
import {CategoriaRubroModel} from './CategoriaRubroModel';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-categoriarubro-crear-editar',
  templateUrl: './categoriarubro-crear-editar.component.html',
  styleUrls: ['./categoriarubro-crear-editar.component.css']
})
export class CategoriarubroCrearEditarComponent implements OnInit {

  myForm: FormGroup;
  submitted!: boolean;
  post: any;
  categoriaRubro: any;
  idCategoriaRubro: any = 0;
  activo: any;
  imagenVisible:boolean=true;
  catRubById: any;
  eliminar :boolean=false;

  constructor(private titleService: Title,private fb: FormBuilder, private catRubrServ: CategotriaRubroService, private router: Router,
    private route: ActivatedRoute, private generalServ: GeneralService, private snackBar: MatSnackBar) {
      titleService.setTitle("Stock");
    this.myForm = fb.group({
      categoriaRubro: ['', Validators.compose([Validators.required])],
      activo: ['', Validators.compose([Validators.required])],
      eliminar: ['', Validators.compose([Validators.required])],
      imagenVisible: ['', Validators.compose([])],
    });
    route.params.subscribe(params => { this.idCategoriaRubro = params['idcatrubro']; });
    if (this.idCategoriaRubro != null) {
      const loading = this.generalServ.loadingModal();
      let dataCatRub = { 'idCategoriaRubro': this.idCategoriaRubro, 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
      this.catRubrServ.getCategoriaRubroById(dataCatRub).subscribe(data => {
        this.catRubById = data;
        if (this.catRubById == null) {
          loading.close();
          this.generalServ.goToNoEncontrado();
        }
        this.categoriaRubro = this.catRubById.Nombre;
        this.activo = this.catRubById.Activo;
        this.eliminar = this.catRubById.Eliminar;
        this.imagenVisible = this.catRubById.ImagenVisible;
        loading.close();
      }, error => { console.log(error); this.generalServ.goToNoEncontrado();loading.close(); })
    } else {
      this.idCategoriaRubro = 0;
    }
  }

  ngOnInit() {
  }

  onSubmit(value: any) {
    if (this.myForm.valid) {
      const loadRef = this.generalServ.loadingModal();
      let data = new CategoriaRubroModel(
        this.idCategoriaRubro,
        localStorage.getItem('idUser'),
        localStorage.getItem('idClienteNegotis'),
        value.categoriaRubro,
        value.activo,
        value.eliminar,
        value.imagenVisible
      );

      this.catRubrServ.crearEditarCategoriaRubro(data)
        .subscribe(data => {
          this.post = data; loadRef.close();
          if (this.post.Repetido != true) {
            this.router.navigate(["/cliente/categoria/rubro/panel"], { replaceUrl: true });
            this.snackBar.openFromComponent(SnackBarOperacionExitosaComponent, {
              duration: 1000,
            });
          }
        }, error => { console.log(error); loadRef.close(); });
    }
    this.submitted = true;
  }

}
