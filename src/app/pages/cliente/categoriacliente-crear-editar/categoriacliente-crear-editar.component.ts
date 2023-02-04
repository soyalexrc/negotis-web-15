import { Component, OnInit } from '@angular/core';
import { CategotriaRubroService } from '../../../Service/categotria-rubro.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneralService } from '../../../Service/general.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarOperacionExitosaComponent } from '../../../components/snack-bar-operacion-exitosa/snack-bar-operacion-exitosa.component';
import {CategoriaClienteModel} from './CategoriaClienteModel';
import { Title } from '@angular/platform-browser';
import { CategotriaClienteService } from 'src/app/Service/categoria-cliente.service';

@Component({
  selector: 'app-categoriacliente-crear-editar',
  templateUrl: './categoriacliente-crear-editar.component.html',
  styleUrls: ['./categoriacliente-crear-editar.component.css']
})
export class CategoriaclienteCrearEditarComponent implements OnInit {

  myForm: FormGroup;
  submitted!: boolean;
  post: any;
  categoriaCliente: any;
  idCategoriaCliente: any = 0;
  activo: any;
  catClienteById: any;
  eliminar :boolean=false;

  constructor(private titleService: Title,private fb: FormBuilder, private catClienteServ: CategotriaClienteService, private router: Router,
    private route: ActivatedRoute, private generalServ: GeneralService, private snackBar: MatSnackBar) {
      titleService.setTitle("Cliente");
    this.myForm = fb.group({
      categoriaCliente: ['', Validators.compose([Validators.required])],
      activo: ['', Validators.compose([Validators.required])],
      eliminar: ['', Validators.compose([Validators.required])],
    });
    route.params.subscribe(params => { this.idCategoriaCliente = params['idcatcliente']; });
    if (this.idCategoriaCliente != null) {
      const loading = this.generalServ.loadingModal();
      let dataCatCliente = { 'idCategoriaCliente': this.idCategoriaCliente, 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
      this.catClienteServ.getCategoriaClienteById(dataCatCliente).subscribe(data => {
        this.catClienteById = data;
        if (this.catClienteById == null) {
          loading.close();
          this.generalServ.goToNoEncontrado();
        }
        this.categoriaCliente = this.catClienteById.Nombre;
        this.activo = this.catClienteById.Activo;
        this.eliminar = this.catClienteById.Eliminar;
        loading.close();
      }, error => { console.log(error); this.generalServ.goToNoEncontrado();loading.close(); })
    } else {
      this.idCategoriaCliente = 0;
    }
  }

  ngOnInit() {
  }

  onSubmit(value: any) {
    if (this.myForm.valid) {
      const loadRef = this.generalServ.loadingModal();
      let data = new CategoriaClienteModel(
        this.idCategoriaCliente,
        localStorage.getItem('idUser'),
        localStorage.getItem('idClienteNegotis'),
        value.categoriaCliente,
        value.activo,
        value.eliminar
      );

      this.catClienteServ.crearEditarCategoriaCliente(data)
        .subscribe(data => {
          this.post = data; loadRef.close();
          if (this.post.Repetido != true) {
            this.router.navigate(["/cliente/categoriacliente/panel"], { replaceUrl: true });
            this.snackBar.openFromComponent(SnackBarOperacionExitosaComponent, {
              duration: 1000,
            });
          }
        }, error => { console.log(error); loadRef.close(); });
    }
    this.submitted = true;
  }

}
