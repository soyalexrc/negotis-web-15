import { Component, OnInit } from '@angular/core';
import { CajaService } from '../../../Service/caja.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneralService } from '../../../Service/general.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarOperacionExitosaComponent } from '../../../components/snack-bar-operacion-exitosa/snack-bar-operacion-exitosa.component';
import { KeyValuePair } from 'src/app/models/KeyValuePair';
import { Observable } from 'rxjs';
import { CategoriaGastoService } from 'src/app/Service/categoriagasto.service';
import { startWith, map } from 'rxjs/operators';
import {GastoModel} from './GastoModel';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { DatepickerModalComponent } from '../../../components/datepicker-modal/datepicker-modal.component';
import { Title } from '@angular/platform-browser';
import { UserService } from 'src/app/Service/user.service';
import { GlobalService } from 'src/app/Service/global.service';
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-gastos-crear-editar',
  templateUrl: './gastos-crear-editar.component.html',
  styleUrls: ['./gastos-crear-editar.component.css']
})
export class GastosCrearEditarComponent implements OnInit {


  myForm: FormGroup;
  submitted!: boolean;
  post: any;
  gasto: any;
  descripcion: any;
  idGasto: any = 0;
  gastoById: any;
  monto: any;
  idSucursal: any;
  idCategoriaGasto: any;
  selected: any;
  listaCategoriaGasto: KeyValuePair[] = [];
  filteredOptions: Observable<KeyValuePair[]> | any;
  autocomplete: any;
  fechaGasto: any = this.calendar.getToday().day.toString().padStart(2, '0') + '/' + this.calendar.getToday().month.toString().padStart(2, '0') + '/' + this.calendar.getToday().year.toString().padStart(4, '0');
  turno : any;
  turnos: any;
  turnoCaja : boolean= false;
  idClienteNegotis: any;
  token: any;
  cliente: any;

  constructor(private titleService: Title,private fb: FormBuilder, private cajaServ: CajaService, private router: Router,
    private route: ActivatedRoute, private generalServ: GeneralService, private snackBar: MatSnackBar, private userServ: UserService,
    private calendar: NgbCalendar,private dialog: MatDialog,public globalServ: GlobalService,
    private catGasServ: CategoriaGastoService) {
    titleService.setTitle("Caja");
    this.token = localStorage.getItem('token');
    this.idClienteNegotis = localStorage.getItem('idClienteNegotis');
    this.myForm = fb.group({
      gasto: ['', Validators.compose([Validators.required])],
      monto: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9.,]+$')])],
      descripcion: ['', Validators.compose([])],
      autocomplete: ['', Validators.compose([])],
      idAutocomplete: ['', Validators.compose([])],
      fechaGasto: ['', Validators.compose([])],
      cliente: ['', Validators.compose([])]

    });
    route.params.subscribe(params => { this.idGasto = params['idgasto']; });
    console.log(this.fechaGasto);
          this.token = localStorage.getItem('token');
    this.idClienteNegotis = localStorage.getItem('idClienteNegotis');
    const dataTurno = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
      this.userServ.obtenerTurnos(dataTurno).subscribe((data: any) => {
        this.turnos = data;
      }, (error: any) => { console.log(error);});
      this.userServ.obtenerTurno(dataTurno).subscribe((data: any) => {
        this.turno = data;
      }, (error: any) => { console.log(error);});
    let loadingcatGasServ = this.generalServ.loadingModal();
    catGasServ.listadoCategoriaGastoByIdClienteNegotis({ 'idClienteNegotis': localStorage.getItem('idClienteNegotis') })
      .subscribe(data => {
        let dataArray = data as any[];
        this.listaCategoriaGasto = [];
        for (let index = 0; index < dataArray.length; index++) {
          let newKVP = new KeyValuePair();
          newKVP.key = dataArray[index].Nombre;
          newKVP.value = dataArray[index];
          this.listaCategoriaGasto.push(newKVP);
        }
        this.filteredOptions = this.myForm.get('autocomplete')?.valueChanges
          .pipe(
            startWith(''),
            map(value => this.doFilter(value))
          );
        //Cargamos el modelo si se cargaron las categorias
        this.loadModel();
        loadingcatGasServ.close();
      }, error => { console.log(error); this.generalServ.goToNoEncontrado(); loadingcatGasServ.close(); });

  }
  fechaFunc() {
    this.runDatePicker().subscribe(result => {
      this.fechaGasto = this.getDateAsString(result);
      console.log(this.fechaGasto);
    });
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
    if (this.idGasto != null) {
      let loading = this.generalServ.loadingModal();
      let dataRegion = new GastoModel(this.idGasto, null, localStorage.getItem('idClienteNegotis'), null, null, null, null, null,null, "","");
      this.cajaServ.getGastoById(dataRegion).subscribe(data => {
        this.gastoById = data;
        if (this.gastoById == null) {
          loading.close();
          this.generalServ.goToNoEncontrado();
        }
        this.gasto = this.gastoById.Nombre;
        this.monto = this.gastoById.Monto;
        this.descripcion = this.gastoById.Descripcion;
        this.idSucursal = this.gastoById.IdSucursal;
        if(this.gastoById.CategoriaGasto != null)
        {
          this.fechaGasto = this.formatoFecha();
        }

        this.cliente = this.gastoById.Cliente;
        this.selected = this.listaCategoriaGasto.find(x => x.value.Id == this.gastoById.IdCategoriaGasto);

          this.myForm.get('idAutocomplete')?.setValue(this.selected);
          this.myForm.get('autocomplete')?.setValue(this.selected);


        loading.close();
      }, error => { console.log(error); this.generalServ.goToNoEncontrado(); loading.close(); })
    } else {
      this.idGasto = 0;
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

  formatoFecha() {

      const fechaEntregaTransformed = new Date(Number(this.gastoById.CategoriaGasto.FechaCracion.match(/\d+/)[0] * 1));
      this.myForm.controls['fechaGasto'].setValue(fechaEntregaTransformed.getUTCDate() + '/' + (fechaEntregaTransformed.getUTCMonth() + 1) + '/' + fechaEntregaTransformed.getUTCFullYear());
      return  this.myForm.controls['fechaGasto'].value;
  }

  onSubmit(value: any) {
    if (this.myForm.valid) {
      const loadRef = this.generalServ.loadingModal();
      let idCategoriaGasto = this.selected && this.selected.value && this.selected.value.Id;
      let data = new GastoModel(
        this.idGasto,
        localStorage.getItem('idUser'),
        localStorage.getItem('idClienteNegotis'),
        value.gasto,
        value.descripcion,
        Number(value.monto),
        this.idSucursal,
        idCategoriaGasto,
        this.fechaGasto,
        this.turno,
        this.cliente
      );

      this.cajaServ.crearEditarGasto(data)
        .subscribe(data => {
          this.post = data; loadRef.close();
          if (this.post.Repetido != true) {
            this.router.navigate(["/cliente/gasto/panel"], { replaceUrl: true });
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
  displayWith = (object?: KeyValuePair): string => object ? object.key : '';

  doFilter(object: string): KeyValuePair[] {
    let filterVal = object.toString().toLowerCase();
    //La lista que contiene todos los elementos
    return this.listaCategoriaGasto.filter(option => option.key.toLowerCase().includes(filterVal));
  }
  //#endregion
}
