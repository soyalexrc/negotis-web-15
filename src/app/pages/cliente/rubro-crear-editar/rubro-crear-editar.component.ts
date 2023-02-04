import { Component, OnInit } from '@angular/core';
import { RubroService } from '../../../Service/rubro.service';
import { CategotriaRubroService } from '../../../Service/categotria-rubro.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneralService } from '../../../Service/general.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarOperacionExitosaComponent } from '../../../components/snack-bar-operacion-exitosa/snack-bar-operacion-exitosa.component';
import {RubroModel} from './RubroModel';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-rubro-crear-editar',
  templateUrl: './rubro-crear-editar.component.html',
  styleUrls: ['./rubro-crear-editar.component.css']
})
export class RubroCrearEditarComponent implements OnInit {


  myForm: FormGroup;
  submitted!: boolean;
  post: any;
  rubro: any;
  idRubro: any = 0;
  categoria: any;
  codigo: any;
  listadoCatRub: any;
  rubroById: any;
  activo: any;
  eliminar :boolean=false;

  constructor(private titleService: Title,private fb: FormBuilder, private rubroServ: RubroService, private router: Router,
    private route: ActivatedRoute, private generalServ: GeneralService, private snackBar: MatSnackBar,
    private categRubro:CategotriaRubroService) {
    titleService.setTitle("Stock");
    this.myForm = fb.group({
      rubro: ['', Validators.compose([Validators.required])],
      categoria: ['', Validators.compose([Validators.required])],
      codigo: ['', Validators.compose([])],
      activo: ['', Validators.compose([Validators.required])],
      eliminar: ['', Validators.compose([Validators.required])],
    });
    route.params.subscribe(params => { this.idRubro = params['idrubro']; });
    if (this.idRubro != null) {
      const loading = this.generalServ.loadingModal();
      let dataRubro = { 'idRubro': this.idRubro, 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
      this.rubroServ.getRubroById(dataRubro).subscribe(data => {
        this.rubroById = data;
        if (this.rubroById == null) {
          loading.close();
          this.generalServ.goToNoEncontrado();
        }
        this.rubro = this.rubroById.Nombre;
        this.categoria = this.rubroById.IdCategoriaRubro;
        this.codigo = this.rubroById.Codigo;
        if(this.rubroById.Activo == null || this.rubroById.Activo == undefined)
        {
          this.activo = true;
        }
        else
        {
          this.activo = this.rubroById.Activo;
        }

        if(this.rubroById.Eliminar == null || this.rubroById.Eliminar == undefined)
        {
          this.eliminar = false;
        }
        else
        {
          this.eliminar = this.rubroById.Eliminar;
        }

        loading.close();
      }, error => { console.log(error); this.generalServ.goToNoEncontrado();loading.close(); })
    } else {
      this.idRubro = 0;
    }
  }

  ngOnInit() {
    const loading = this.generalServ.loadingModal();
    let data = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis'),'Page': 1 };
    this.categRubro.listadoCategoriaRubroByIdClienteNegotis(data)
      .subscribe((data: any) => { this.listadoCatRub = data.categoriasTotales;loading.close(); }, (error: any) => { console.log(error); loading.close(); })
  }

  onSubmit(value: any) {
    if (this.myForm.valid) {
      const loadRef = this.generalServ.loadingModal();
      let data = new RubroModel(
        this.idRubro,
        localStorage.getItem('idUser'),
        localStorage.getItem('idClienteNegotis'),
        value.rubro,
        Number(value.categoria),
        value.codigo,
        value.activo,
        value.eliminar
      );
      this.rubroServ.crearEditarRubro(data)
        .subscribe(data => {
          this.post = data; loadRef.close();
          if (this.post.RepetidoNombre != true && this.post.RepetidoCodigo != true) {
            this.router.navigate(["/cliente/rubro/panel"], { replaceUrl: true });
            this.snackBar.openFromComponent(SnackBarOperacionExitosaComponent, {
              duration: 1000,
            });
          }
        }, error => { console.log(error); loadRef.close(); });
    }
    this.submitted = true;
  }

}
