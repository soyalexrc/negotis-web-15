import { Component, OnInit } from '@angular/core';
import { ListaPreciosService } from '../../../Service/lista-precios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneralService } from '../../../Service/general.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarOperacionExitosaComponent } from '../../../components/snack-bar-operacion-exitosa/snack-bar-operacion-exitosa.component';
import {ListaPreciosModel} from './ListaPreciosModel';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-listaprecios-crear-editar',
  templateUrl: './listaprecios-crear-editar.component.html',
  styleUrls: ['./listaprecios-crear-editar.component.css']
})
export class ListapreciosCrearEditarComponent implements OnInit {

  myForm: FormGroup;
  submitted!: boolean;
  post: any;
  listaPrecios: any;
  idListaPrecios: any = 0;
  activo: any;
  listPreciosById: any;
  porcentajeAumento: any;

  constructor(private titleService: Title,private fb: FormBuilder, private listPrecServ: ListaPreciosService, private router: Router,
    private route: ActivatedRoute, private generalServ: GeneralService, private snackBar: MatSnackBar) {
      titleService.setTitle("Stock");
    this.myForm = fb.group({
      listaPrecios: ['', Validators.compose([Validators.required])],
      activo: ['', Validators.compose([Validators.required])],
      porcentajeAumento: ['', Validators.compose([Validators.required])],
    });
    route.params.subscribe(params => { this.idListaPrecios = params['idlistaprecios']; });
    if (this.idListaPrecios != null) {
      const loading = this.generalServ.loadingModal();
      let dataList = { 'idListaPrecios': this.idListaPrecios, 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
      this.listPrecServ.ListaPreciosById(dataList).subscribe(data => {
        this.listPreciosById = data;
        if (this.listPreciosById == null) {
          loading.close();
          this.generalServ.goToNoEncontrado();
        }
        this.listaPrecios = this.listPreciosById.Nombre;
        this.activo = this.listPreciosById.Activo;
        this.porcentajeAumento = this.listPreciosById.PorcentajeAumento;
        loading.close();
      }, error => { console.log(error); this.generalServ.goToNoEncontrado();loading.close(); })
    } else {
      this.idListaPrecios = 0;
    }
  }

  ngOnInit() {
  }

  onSubmit(value: any) {
    if (this.myForm.valid) {
      const loadRef = this.generalServ.loadingModal();
      let data = new ListaPreciosModel(
        this.idListaPrecios,
        localStorage.getItem('idUser'),
        localStorage.getItem('idClienteNegotis'),
        value.porcentajeAumento,
        value.listaPrecios,
        value.activo
      );

      this.listPrecServ.crearEditarListaPrecios(data)
        .subscribe(data => {
          this.post = data; loadRef.close();
          if (this.post.Repetido != true) {
            this.router.navigate(["/cliente/listaprecios/panel"], { replaceUrl: true });
            this.snackBar.openFromComponent(SnackBarOperacionExitosaComponent, {
              duration: 1000,
            });
          }
        }, error => { console.log(error); loadRef.close(); });
    }
    this.submitted = true;
  }

}
