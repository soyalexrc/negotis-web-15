import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProveedorService } from '../../../Service/proveedor.service';
import { GlobalService } from '../../../Service/global.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneralService } from '../../../Service/general.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarOperacionExitosaComponent } from '../../../components/snack-bar-operacion-exitosa/snack-bar-operacion-exitosa.component';
import { ProveedorCrearEditarModel } from './proveedor-crear-editar-model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-proveedor-crear-editar',
  templateUrl: './proveedor-crear-editar.component.html',
  styleUrls: ['./proveedor-crear-editar.component.css']
})
export class ProveedorCrearEditarComponent implements OnInit {

  myForm: FormGroup;
  submitted!: boolean;
  nombreRol: any;
  id: number = 0;
  model!: ProveedorCrearEditarModel;

  constructor(
      private titleService: Title,
      private fb: FormBuilder,
      private router: Router,
      private proveedorService: ProveedorService,
      private globalServ: GlobalService,
      private route: ActivatedRoute,
      private generalServ: GeneralService,
      private snackBar: MatSnackBar) {
        titleService.setTitle("Stock");
        this.myForm = fb.group({
          'nombre': ['', Validators.compose([Validators.required])],
          'apellido': ['', Validators.compose([])],
          'cuit': ['', Validators.compose([Validators.pattern('^[0-9.,]+$')])],
          'telefono': ['', Validators.compose([])],
          'provincia': ['', Validators.compose([])],
          'localidad': ['', Validators.compose([])],
          'direccion': ['', Validators.compose([])],
          'razonsocial': ['', Validators.compose([Validators.required])],
          'numerocuenta': ['', Validators.compose([Validators.pattern('^[0-9.,]+$')])],
          'empresa': ['', Validators.compose([])],
          'email': ['', Validators.compose([])],
          'detalle': ['', Validators.compose([])],
          'tasa': ['', Validators.compose([])],
          'retencion': ['', Validators.compose([])],
          'percepcion': ['', Validators.compose([])]

        });
    route.params.subscribe(params => { this.id = params['id']; });
    if (this.id != null) {
      const loading = this.generalServ.loadingModal();

      this.proveedorService.get(this.id).subscribe(data => {
        this.model = data as ProveedorCrearEditarModel;
        if (this.model == null) {
          loading.close();
          this.generalServ.goToNoEncontrado();
        }

        loading.close();
      }, error => { console.log(error); this.generalServ.goToNoEncontrado(); loading.close(); })
    } else {
      this.id = 0;
      this.model = new ProveedorCrearEditarModel();
    }
  }

  ngOnInit() {
  }

  onSubmit(value: any) {
    if (this.myForm.valid) {
      const loadRef = this.generalServ.loadingModal();
      this.model.IdClienteNegotis = localStorage.getItem('idClienteNegotis');

      if (this.model.Id == null){
        this.proveedorService.crear(this.model).subscribe(data => {
          loadRef.close();

          if (data){
              this.router.navigate(["/cliente/proveedor/panel"], { replaceUrl: true });
              this.snackBar.openFromComponent(SnackBarOperacionExitosaComponent, {
                duration: 1000,
              });
          }
        }, error => { console.log(error); loadRef.close(); })
      }
      else{
        this.proveedorService.editar(this.model).subscribe(data => {
          loadRef.close();

          if (data){
              this.router.navigate(["/cliente/proveedor/panel"], { replaceUrl: true });
              this.snackBar.openFromComponent(SnackBarOperacionExitosaComponent, {
                duration: 1000,
              });
          }
        }, error => { console.log(error); loadRef.close(); })
      }
    }
    this.submitted = true;
  }

}
