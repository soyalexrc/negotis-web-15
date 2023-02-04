import { Component, OnInit } from '@angular/core';
import { CajaService } from '../../../Service/caja.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneralService } from '../../../Service/general.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarOperacionExitosaComponent } from '../../../components/snack-bar-operacion-exitosa/snack-bar-operacion-exitosa.component';
import { KeyValuePair } from 'src/app/models/KeyValuePair';
import { Observable } from 'rxjs';
import { CategoriaGastoService } from 'src/app/Service/categoriagasto.service';
import { startWith, map } from 'rxjs/operators';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { DatepickerModalComponent } from '../../../components/datepicker-modal/datepicker-modal.component';
import { Title } from '@angular/platform-browser';
import   { UserService } from 'src/app/Service/user.service';
import { GlobalService } from 'src/app/Service/global.service';
import { PrestamoModel } from './PrestamoModel';
import { ClienteModel } from 'src/app/models/ClienteModel';
import { ClienteclienteService } from 'src/app/Service/clientecliente.service';

@Component({
  selector: 'app-prestamos-crear-editar',
  templateUrl: './prestamos-crear-editar.component.html',
  styleUrls: ['./prestamos-crear-editar.component.css']
})
export class PrestamosCrearEditarComponent implements OnInit {


  myForm: FormGroup;
  submitted!: boolean;
  post: any;
  prestamo: any;
  descripcion: any;
  idPrestamo: any = 0;
  prestamoById: any;
  monto: any = 0;
  idSucursal: any;
  selected: any;
  nombreCliente: any;
  clienteCtrl = new FormControl();
  filteredCliente!: Observable<any[]>;
  idCliente:any;
  cliente = '';
  infoGeneral: any;
  busquedaCliente = '';
  autocomplete: any;
  fechaPrestamo: any = this.calendar.getToday().day.toString().padStart(2, '0') + '/' + this.calendar.getToday().month.toString().padStart(2, '0') + '/' + this.calendar.getToday().year.toString().padStart(4, '0');
  turno : any;
  turnos: any;
  turnoCaja : boolean= false;
  idClienteNegotis: any;
  token: any;
  clienteNombre: any;
  interes!: number;
  restoApagar:any;
  cuotas: any;
  cantCuotas!: number;

  constructor(private titleService: Title,private fb: FormBuilder, private cajaServ: CajaService, private router: Router,
    private route: ActivatedRoute, private generalServ: GeneralService, private snackBar: MatSnackBar, private userServ: UserService,
    private calendar: NgbCalendar,private dialog: MatDialog,private globalServ: GlobalService,private clienteServ: ClienteclienteService,
    private catGasServ: CategoriaGastoService) {
    titleService.setTitle("Caja");
    this.token = localStorage.getItem('token');
    this.idClienteNegotis = localStorage.getItem('idClienteNegotis');
    this.myForm = fb.group({
      monto: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9.,]+$')])],
      cantCuotas: ['', Validators.compose([])],
      autocomplete: ['', Validators.compose([])],
      idAutocomplete: ['', Validators.compose([])],
      fechaPrestamo: ['', Validators.compose([])],
      nombreCliente: ['', Validators.compose([])],
      idCliente: ['', Validators.compose([])],
      interes: ['', Validators.compose([])],
      cuotas: ['', Validators.compose([])],
      restoApagar: ['', Validators.compose([])],
    });
    route.params.subscribe(params => { this.idPrestamo = params['idprestamo']; });
    if(this.idPrestamo == null)
    {
      this.idPrestamo = 0;
    }
    this.token = localStorage.getItem('token');
    this.idClienteNegotis = localStorage.getItem('idClienteNegotis');
    if(this.idPrestamo != null && this.idPrestamo != 0)
    {
      this.loadModel();
    }

  }

  private _filterCliente(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.infoGeneral.filter((item: any) => item.RazonSocial.toLowerCase().includes(filterValue.toLowerCase()));
  }

  public filtrarCliente() {
    if (this.cliente.toString().length > 4) {
      if (this.cliente.toString().length >= this.busquedaCliente.toString().length) {
        const loadRef = this.generalServ.loadingModalBuscar();
        let data = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis'), 'textoBusqueda': this.cliente, 'page': 1, 'pageSize': 20 };
        this.clienteServ.busquedaClientesClienteNegotisPaginado(data).subscribe(resp => {
          loadRef.close();
          this.infoGeneral = resp;
          this.filteredCliente = this.clienteCtrl.valueChanges
            .pipe(
              startWith(''),
              map(item => item ? this._filterCliente(item) : this.infoGeneral.slice())
            );

          loadRef.close();
        });
      }
    }
    this.busquedaCliente = this.cliente;
  }

  fechaFunc() {
    this.runDatePicker().subscribe(result => {
      this.fechaPrestamo = this.getDateAsString(result);
      console.log(this.fechaPrestamo);
    });
  }

  getCliente(value: any) {
    this.idCliente = value.Id;
  }

  runDatePicker() {
    const dialogRef = this.dialog.open(DatepickerModalComponent, {
      width: '350px', data: { permitirFechaPasada: true },
    });
    return dialogRef.afterClosed();
  }

  getDateAsString(result: any): string {
    if (result != null) {
      if (result instanceof NgbDate) {
        return result.day.toString().padStart(2, '0') + '/' + result.month.toString().padStart(2, '0') + '/' + result.year.toString().padStart(4, '0');
      } else if (result instanceof Date) {
        return result.getDate().toString().padStart(2, '0') + '/' + (result.getMonth() + 1).toString().padStart(2, '0') + '/' + result.getFullYear().toString().padStart(4, '0');
      } else if ('day' in result && 'month' in result && 'year' in result) {
        return result.day.toString().padStart(2, '0') + '/' + result.month.toString().padStart(2, '0') + '/' + result.year.toString().padStart(4, '0');
      }
    }
    return '';
  }

  loadModel() {
    if (this.idPrestamo != null) {
      let loading = this.generalServ.loadingModal();
      const dataPrestamo = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis'), 'idPrestamo':this.idPrestamo };
      this.cajaServ.getPrestamoById(dataPrestamo).subscribe(data => {
        this.prestamoById = data;
        if (this.prestamoById == null) {
          loading.close();
          this.generalServ.goToNoEncontrado();
        }
        this.cantCuotas = this.prestamoById.CantidadCuotas;
        this.monto = this.prestamoById.Monto;
        this.cuotas = this.prestamoById.Cuotas;
        this.interes = this.prestamoById.Interes;
        this.idSucursal = this.prestamoById.IdSucursal;
        this.restoApagar = this.prestamoById.RestoAPagar;
        this.clienteNombre = this.prestamoById.Cliente.RazonSocial;


        //this.selected = this.listaCategoriaGasto.find(x => x.value.Id == this.gastoById.IdCategoriaGasto);

          this.myForm.get('idAutocomplete')?.setValue(this.selected);
          this.myForm.get('autocomplete')?.setValue(this.selected);


        loading.close();
      }, error => { console.log(error); this.generalServ.goToNoEncontrado(); loading.close(); })
    } else {
      this.idPrestamo = 0;
    }
  }

  ngOnInit() {
    const roles = JSON.parse(localStorage.getItem('roles') ?? '');
    const soporte = eval(localStorage.getItem('soporte') ?? '') || false;
    this.turnoCaja = (roles != null && roles.TurnosCaja) || soporte;
  }

  getSucursalVendedor(value: any) {
    this.idSucursal = value.Sucursal.Id;
  }

  onChangeCuotas() {


    if(this.cantCuotas != 0 && this.interes !=0 && this.monto != 0)
    {
        this.cuotas =  (this.monto/this.cantCuotas + ((this.monto * this.interes) /100));
        this.cuotas = this.cuotas.toFixed(2);
    }

  }

  onChangeInteres() {

    if(this.cantCuotas != 0 && this.interes !=0 && this.monto != 0)
    {
      this.cuotas =  (this.monto/this.cantCuotas + ((this.monto * this.interes) /100));
        this.cuotas = this.cuotas.toFixed(2);
    }
}

  formatoFecha() {

      const fechaEntregaTransformed = new Date(Number(this.prestamoById.CategoriaGasto.FechaCracion.match(/\d+/)[0] * 1));
      this.myForm.controls['fechaGasto'].setValue(fechaEntregaTransformed.getUTCDate() + '/' + (fechaEntregaTransformed.getUTCMonth() + 1) + '/' + fechaEntregaTransformed.getUTCFullYear());
      return  this.myForm.controls['fechaGasto'].value;
  }

  onSubmit(value: any) {
    if (this.myForm.valid) {
      const loadRef = this.generalServ.loadingModal();
      let data = new PrestamoModel(
        this.idPrestamo,
        localStorage.getItem('idClienteNegotis'),
        Number(value.monto),
        this.idSucursal,
        this.fechaPrestamo,
        this.idCliente,
        this.interes,
        this.cantCuotas,
        Number(this.cuotas)
      );

      this.cajaServ.crearEditarPrestamo(data)
        .subscribe(data => {
          this.post = data; loadRef.close();
          if (this.post.Repetido != true) {
            this.router.navigate(["/cliente/prestamos/panel"], { replaceUrl: true });
            this.snackBar.openFromComponent(SnackBarOperacionExitosaComponent, {
              duration: 1000,
            });
          }
        }, error => { console.log(error); loadRef.close(); });
    }
    this.submitted = true;
  }

  //#region Autocomplete
  selectOption = (object: any) => {
    this.selected = object;
    this.myForm.get('idAutocomplete')?.setValue(this.selected);
  }
  resetKey = () => {
    this.selected = null;
    this.myForm.get('idAutocomplete')?.setValue(this.selected);
  }

  resetCliente = () => {}
  displayWith = (object?: KeyValuePair): string => object ? object.key : '';

/*   doFilter(object: string): KeyValuePair[] {
    let filterVal = object.toString().toLowerCase();
    //La lista que contiene todos los elementos
    return this.listaCategoriaGasto.filter(option => option.key.toLowerCase().includes(filterVal));
  } */
  //#endregion
}
