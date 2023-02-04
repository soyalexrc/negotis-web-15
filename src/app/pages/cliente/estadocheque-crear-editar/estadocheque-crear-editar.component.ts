import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClienteclienteService } from 'src/app/Service/clientecliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneralService } from 'src/app/Service/general.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EstadoCheque } from 'src/app/models/EstadoCheque';
import { KeyValuePair } from 'src/app/models/KeyValuePair';
import { Observable } from 'rxjs';
import { EstadoChequeService } from 'src/app/Service/estado-cheque.service';
import { SnackBarOperacionExitosaComponent } from 'src/app/components/snack-bar-operacion-exitosa/snack-bar-operacion-exitosa.component';
import { Title } from '@angular/platform-browser';
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-estadocheque-crear-editar',
  templateUrl: './estadocheque-crear-editar.component.html',
  styleUrls: ['./estadocheque-crear-editar.component.css']
})
export class EstadochequeCrearEditarComponent implements OnInit {

  roles: any;
  rolClienteNegotis: any;
  myForm: FormGroup;
  submitted!: boolean;
  post: any;
  model: EstadoCheque;
  strNingunMovimiento = 'Ningun Movimiento';
  strIngreso = 'Ingreso';
  strEgreso = 'Egreso';
  strCompra = 'Compra';
  strVenta = 'Venta';
  strCompraVenta = 'Compra/Venta';
  idSucursal = '';

  constructor(
    private titleService: Title,
    private fb: FormBuilder,
    private estadoChequeService: EstadoChequeService,
    private router: Router,
    private route: ActivatedRoute,
    private generalServ: GeneralService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    titleService.setTitle("Finanzas");
    this.roles = JSON.parse(localStorage.getItem('roles') ?? '');
    this.rolClienteNegotis = localStorage.getItem('RolClienteNegotis');

    this.model = new EstadoCheque();
    this.model.idClienteNegotis = localStorage.getItem('idClienteNegotis');

    let textoValidator = Validators.compose([Validators.required]);

    this.myForm = fb.group({
      descripcion: ['', textoValidator],
      modificadorValor: ['', textoValidator],
      modificadorCaja: ['', textoValidator],
      tipoOperacion: ['', textoValidator]
    });

    this.myForm.get('modificadorValor')?.valueChanges.subscribe(x => this.model.modificadorValor = x);
    this.myForm.get('modificadorCaja')?.valueChanges.subscribe(x => this.model.modificadorCaja = x);
    this.myForm.get('tipoOperacion')?.valueChanges.subscribe(x => this.model.tipoOperacion = x);

    route.params.subscribe(params => { this.model.id = params['id']; });

    this.loadModel();
  }

  getSucursalVendedor = (value: any) => this.idSucursal = value.Sucursal.Id;


  ngOnInit() { }

  loadModel() {
    if (this.model.id > 0) {
      const loadRef = this.generalServ.loadingModal();
      let request = {
        id: this.model.id,
        idClienteNegotis: localStorage.getItem('idClienteNegotis')
      }
      this.estadoChequeService.getById(request)
        .subscribe(data => {
          this.post = data;
          loadRef.close();
          this.model = new EstadoCheque();
          this.model.FromObject(data);
        }, error => {
          console.log(error);
          loadRef.close();
        });
    }

  }

  onSubmit(value: any) {
    if (this.myForm.valid) {
      const loadRef = this.generalServ.loadingModal();
      this.estadoChequeService.crearEditar(this.model)
        .subscribe(data => {
          this.post = data;
          loadRef.close();
          if (this.post === true) {
            this.router.navigate(['/cliente/finanzas/estadocheque/panel'], { replaceUrl: true });
            this.snackBar.openFromComponent(SnackBarOperacionExitosaComponent, {
              duration: 1000,
            });
          }
        }, error => {
          console.log(error);
          loadRef.close();
        });
    }
  }

}

