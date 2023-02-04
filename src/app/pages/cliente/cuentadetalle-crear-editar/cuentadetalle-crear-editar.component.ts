import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneralService } from '../../../Service/general.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarOperacionExitosaComponent } from '../../../components/snack-bar-operacion-exitosa/snack-bar-operacion-exitosa.component';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog, } from '@angular/material/dialog';
import { DatepickerModalComponent } from 'src/app/components/datepicker-modal/datepicker-modal.component';
import { ClienteclienteService } from 'src/app/Service/clientecliente.service';
import { CuentaFinanzaDetalleService } from 'src/app/Service/cuenta-finanza-detalle.service';
import { CuentaDetalleModel } from 'src/app/models/CuentaDetalleModel';
import { ClienteModel } from 'src/app/models/ClienteModel';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { KeyValuePair } from 'src/app/models/KeyValuePair';
import { EstadoChequeService } from 'src/app/Service/estado-cheque.service';
import { EstadoCheque } from 'src/app/models/EstadoCheque';
import {ClienteListadoModel} from '../../../models/ClienteListadoModel';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-cuentadetalle-crear-editar',
  templateUrl: './cuentadetalle-crear-editar.component.html',
  styleUrls: ['./cuentadetalle-crear-editar.component.css']
})
export class CuentadetalleCrearEditarComponent implements OnInit {
  myForm: FormGroup;
  submitted!: boolean;
  post: any;
  roles: any;
  rolClienteNegotis: any;
  idValor: any;
  // request
  request: CuentaDetalleModel;
  pageSize= 20;

  nombreCliente: any;
  options: ClienteModel[] = [];
  filteredOptions: Observable<ClienteModel[]> | any;

  optionsEstado: KeyValuePair[] | any = [];
  filteredOptionsEstado: Observable<KeyValuePair[]> | any;
  selectedOptionEstado: KeyValuePair | any = null;

  fechaIngresoValor: any = '';
  fechaEgresoValor: any = '';
  fechaIngresoEfectivo: any = '';
  fechaEgresoEfectivo: any = '';
  nombreEstado: any;


  constructor(
    private titleService: Title,
    private fb: FormBuilder,
    private clienteServ: ClienteclienteService,
    private cuentaDetalleServ: CuentaFinanzaDetalleService,
    private estadoChequeService: EstadoChequeService,
    private router: Router,
    private route: ActivatedRoute,
    private generalServ: GeneralService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) {
    titleService.setTitle("Finanzas");
    this.roles = JSON.parse(localStorage.getItem('roles') ?? '');
    this.rolClienteNegotis = localStorage.getItem('RolClienteNegotis');

    this.request = new CuentaDetalleModel();
    this.request.idUser = localStorage.getItem('idUser');
    this.request.idClienteNegotis = localStorage.getItem('idClienteNegotis');
    this.request.fechaVencimiento = this.getDateAsString(new Date());

    const fechaValidator = Validators.compose([Validators.required, Validators.pattern('^([0-9]{1,2})/([0-9]{1,2})/([0-9]{4})$')]);
    const numeroValidator = Validators.compose([Validators.required, Validators.pattern('^[-]?([0-9]+)$')]);
    const monedaValidator = Validators.compose([Validators.required, Validators.pattern('^(([-]?[0-9]+)([,.]([0-9]*))?)$'), ]);
    const textoValidator = Validators.compose([Validators.required]);

    this.myForm = fb.group({
      nombreCliente: ['', textoValidator],
      idCliente: ['', textoValidator],
      numero: ['', textoValidator],
      plaza: ['', textoValidator],
      banco: ['', textoValidator],
      cuit: ['', numeroValidator],
      librador: ['', textoValidator],
      cuenta: ['', numeroValidator],
      fechaVencimiento: ['', fechaValidator],
      fechaEmision: ['', fechaValidator],
      importe: ['', monedaValidator],
      demora: ['', numeroValidator],
      resultDeposito: ['', numeroValidator],
      ajusteDeposito: ['', numeroValidator],
      tasa: ['', monedaValidator],
      montoTasa: ['', monedaValidator],
      ajusteTasa: ['', monedaValidator],
      impBancario: ['', monedaValidator],
      montoImpBancario: ['', monedaValidator],
      ajusteImpBancario: ['', monedaValidator],
      retenciones: ['', monedaValidator],
      subtotal: ['', monedaValidator],
      nombreEstado: ['', textoValidator],
      idEstado: ['', textoValidator],
      fechaIngresoValor: ['', Validators.compose([this.ValidarFechaIngresoValor.bind(this)])],
      fechaEgresoValor: ['', Validators.compose([this.ValidarFechaEgresoValor.bind(this)])],
      fechaIngresoEfectivo: ['', Validators.compose([this.ValidarFechaIngresoEfectivo.bind(this)])],
      fechaEgresoEfectivo: ['', Validators.compose([this.ValidarFechaEgresoEfectivo.bind(this)])],
    });

    // Autocompletables valueChanges
    this.filteredOptions = this.myForm.get('nombreCliente')?.valueChanges
      .pipe(
        startWith(''),
        map(value => this.doFilter(value))
      );
    this.filteredOptionsEstado = this.myForm.get('nombreEstado')?.valueChanges
      .pipe(
        startWith(''),
        map(value => this.doFilterEstado(value))
      );
      console.log((this.filteredOptionsEstado));
    route.params.subscribe(params => { this.request.id = params['id']; });

    this.loadAutocompletablesYModel();

  }

  ngOnInit() {
  }

  // SimpleFunctions

  fechaVencimientoDatePicker = () => this.runDatePicker().subscribe(result => this.request.fechaVencimiento = this.getDateAsString(result));
  fechaEmisionDatePicker = () => this.runDatePicker().subscribe(result => this.request.fechaEmision = this.getDateAsString(result));
  fechaIngresoValorDatePicker = () => this.runDatePicker().subscribe(result => this.fechaIngresoValor = this.getDateAsString(result));
  fechaEgresoValorDatePicker = () => this.runDatePicker().subscribe(result => this.fechaEgresoValor = this.getDateAsString(result));
  fechaIngresoEfectivoDatePicker = () => this.runDatePicker().subscribe(result => this.fechaIngresoEfectivo = this.getDateAsString(result));
  fechaEgresoEfectivoDatePicker = () => this.runDatePicker().subscribe(result => this.fechaEgresoEfectivo = this.getDateAsString(result));
  //#region Autocomplete
  selectOption = (key: any) => {
    this.request.idCliente = key.Id;
  }
  resetKey = () => {
    this.request.idCliente = null;
  }
  displayWith = (option?: any): string => option ? option.RazonSocial : '';
  doFilter(value: string): ClienteModel[] {
    const filterVal = value.toString().toLowerCase();
    return this.options.filter(option => option.RazonSocial.toLowerCase().includes(filterVal));
  }
  //#endregion

  //#region  AutocompleteEstado
  selectOptionEstado = (item: any) => {
    this.selectedOptionEstado = item;
    this.request.idEstadoCompra = (this.selectedOptionEstado.value as EstadoCheque).id || '';
  }
  resetKeyEstado = () => {
    this.selectedOptionEstado = null;
    this.request.idEstadoCompra = '';
    this.ResetFechas();
  }
  displayWithEstado = (option?: KeyValuePair): string => option ? option.key : '';
  doFilterEstado(value: string): KeyValuePair[] {
    const filterVal = value.toString().toLowerCase();
    return this.optionsEstado.filter((option: any) => option.key.toLowerCase().includes(filterVal));
  }

  //#endregion

  getSucursalVendedor = (value: any) => this.request.idSucursal = value.Sucursal.Id;

  onSubmit(value: any) {
    console.log(this.myForm);
    if (this.myForm.valid) {
      const loadRef = this.generalServ.loadingModal();
      this.setFechas();
      this.cuentaDetalleServ.crearEditar(this.request)
        .subscribe(data => {
          this.post = data;
          loadRef.close();
          if (this.post.Repetido !== true) {
            this.router.navigate(['/cliente/finanzas/cuentadetalle/panel'], { replaceUrl: true });
            this.snackBar.openFromComponent(SnackBarOperacionExitosaComponent, {
              duration: 1000,
            });
          }
        }, error => {
          console.log(error);
          loadRef.close();
        });
    }
    this.submitted = true;
  }

  // =====UTILIDADES=====

  //#region Date
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
  //#endregion

  //#region Loadings

  processClienteModels(clienteModelRs: any) {
    const autocompleteRSAsArray = clienteModelRs as ClienteModel[];
    for (let index = 0; index < autocompleteRSAsArray.length; index++) {
      this.options.push(new ClienteModel(clienteModelRs[index]));
    }
  }

  processCuentaDetalleModel(valorById: any) {
    if (valorById == null) {
      this.generalServ.goToNoEncontrado();
    }
    this.request = valorById as CuentaDetalleModel;
    if (this.request.id > 0) {
      this.myForm.get('nombreCliente')?.setValue(this.options.filter(x => x.Id === this.request.idCliente)[0]);
      this.selectedOptionEstado = this.optionsEstado.filter((x: any) => x.value.id === this.request.idEstadoCompra)[0];
      this.myForm.get('nombreEstado')?.setValue(this.selectedOptionEstado);
      this.ResetFechas();
    }
  }

  processEstadosModel(modelRs: any) {
    modelRs.forEach((item: any) => {
      const estado = new EstadoCheque();
      estado.FromObject(item);
      const option = new KeyValuePair();
      option.key = estado.descripcion;
      option.value = estado;
      this.optionsEstado.push(option);
    });
  }

  loadAutocompletablesYModel() {
    const loading = this.generalServ.loadingModal();
    const rq = ClienteListadoModel.getEntity(localStorage.getItem('idClienteNegotis'), 1, this.pageSize);

    this.clienteServ.listadoClientesClienteNegotis(rq).subscribe(
      (clienteModelsRs: any) => {
        this.options = [];
        this.processClienteModels(clienteModelsRs.listado);

        if (clienteModelsRs.Total > (clienteModelsRs.PageSize * clienteModelsRs.Page)) {
          this.loadMoreClientAutocomplete(clienteModelsRs,()=>{this.loadEstados(); loading.close();});
        }
        else
        {
          this.loadEstados();
         loading.close();
        }
      },
      (error: any) => {
        loading.close();
        this.generalServ.goToNoEncontrado();
      }
    );
  }

  loadEstados() {
    const loading = this.generalServ.loadingModal();
    let rq = null;

    if (this.request.id == 0) {
      rq = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis'), 'modificadoresValor': [1], 'tiposOperacion': [1, 3] };
    } else {
      rq = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis'), 'tiposOperacion': [1, 3] };
    }
    this.estadoChequeService.listarValoresPorFiltro(rq).subscribe(
      modelRs => {
        this.processEstadosModel(modelRs);
        this.loadCuentaDetalle();
        loading.close();
      },
      error => {
        loading.close();
        this.generalServ.goToNoEncontrado();
      }
    );
  }

  loadCuentaDetalle() {
    if (this.request.id > 0) {
      const loading = this.generalServ.loadingModal();
      const rq = { 'id': this.request.id, 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
      this.cuentaDetalleServ.getById(rq).subscribe(
        cuentaDetalleModelRs => {
          console.log(this.options);
          this.processCuentaDetalleModel(cuentaDetalleModelRs);
          loading.close();
        },
        error => {
          loading.close();
          this.generalServ.goToNoEncontrado();
        }
      );
    }
  }

  loadMoreClientAutocomplete(clienteModelRs: any, OnComplete: Function) {

    const rq = new ClienteListadoModel(
      localStorage.getItem('idClienteNegotis'),
      clienteModelRs.Page + 1,
      clienteModelRs.PageSize,
      clienteModelRs.razonSocial,
      clienteModelRs.Fantasia,
      clienteModelRs.Zona,
      null,
      clienteModelRs.CUIT,
      null,
      null,
      null,
      null,
      null
    );
    this.clienteServ.listadoClientesClienteNegotis(rq).subscribe(
      (clienteModelRs: any) => {
        this.processClienteModels(clienteModelRs.listado);

        if (clienteModelRs.Total > (clienteModelRs.PageSize * clienteModelRs.Page)) {
          this.loadMoreClientAutocomplete(clienteModelRs, OnComplete);
        }
        else{
          OnComplete();
        }
      },
      (error: any) => {
        this.generalServ.goToNoEncontrado();
      }
    );
  }
  //#endregion

  //#region Autocalculables
  calcularMontoTasa = (value: CuentaDetalleModel): number => ((value.importe * value.tasa * this.calcularDiasDeposito(value) / 100) + (value.ajusteTasa) * 1) || 0;
  calcularMontoImpuestoBancario = (value: CuentaDetalleModel): number => ((value.importe * value.impBancario / 100) + value.ajusteImpBancario * 1) || 0;
  calcularRetenciones = (value: CuentaDetalleModel): number => (this.calcularMontoTasa(value) * 1 + this.calcularMontoImpuestoBancario(value) * 1) || 0;
  calcularSubtotal = (value: CuentaDetalleModel): number => (value.importe * 1 - this.calcularRetenciones(value) * 1) || 0;
  //#endregion

  //#region Fixed
  fixedTasa = (value: CuentaDetalleModel) => (value.tasa).toFixed(2);
  fixedMontoTasa = (value: CuentaDetalleModel) => (this.calcularMontoTasa(value)).toFixed(2);
  fixedImpuestoBancario = (value: CuentaDetalleModel) => (value.impBancario).toFixed(2);
  fixedMontoImpuestoBancario = (value: CuentaDetalleModel) => (this.calcularMontoImpuestoBancario(value)).toFixed(2);
  fixedRetencion = (value: CuentaDetalleModel) => (this.calcularRetenciones(value)).toFixed(2);
  fixedSubtotal = (value: CuentaDetalleModel) => (this.calcularSubtotal(value)).toFixed(2);
  //#endregion

  calcularDiasDeposito(value: CuentaDetalleModel): number {
    let splited = value.fechaVencimiento.split('/');
    const fechaVenc = new Date(splited[2], splited[1], splited[0]);
    splited = this.fechaIngresoValor.split('/');
    const fechaRec = new Date(splited[2], splited[1], splited[0]);
    const resta = fechaVenc.getTime() - fechaRec.getTime();
    const result = ((resta / (24 * 60 * 60 * 1000)) + value.demoraDeposito * 1 + value.ajusteDeposito * 1) || 0;
    return Math.max(result, 0);
  }

  ResetFechas() {
    this.fechaIngresoValor = this.request.fechaIngresoValor;
    this.fechaEgresoValor = this.request.fechaEgresoValor;
    this.fechaIngresoEfectivo = this.request.fechaIngresoEfectivo;
    this.fechaEgresoEfectivo = this.request.fechaEgresoEfectivo;
  }

  setFechas() {
    this.request.fechaIngresoValor = this.fechaIngresoValor;
    this.request.fechaEgresoValor = this.fechaEgresoValor;
    this.request.fechaIngresoEfectivo = this.fechaIngresoEfectivo;
    this.request.fechaEgresoEfectivo = this.fechaEgresoEfectivo;
  }

  MostrarFechaIngresoValor(value: KeyValuePair) {
    const result = false;
    if (value == null) { return false; }
    const estadoCheque = value.value as EstadoCheque;
    if (estadoCheque.modificadorValor === 1) { return true; }

    return result;
  }

  MostrarFechaIngresoEfectivo(value: KeyValuePair) {
    const result = false;
    if (value == null) { return false; }
    const estadoCheque = value.value as EstadoCheque;
    if (estadoCheque.modificadorCaja === 1) { return true; }

    return result;
  }

  MostrarFechaEgresoValor(value: KeyValuePair) {
    const result = false;
    if (value == null) { return false; }
    const estadoCheque = value.value as EstadoCheque;
    if (estadoCheque.modificadorValor === -1) { return true; }

    return result;
  }

  MostrarFechaEgresoEfectivo(value: KeyValuePair) {
    const result = false;
    if (value == null) { return false; }
    const estadoCheque = value.value as EstadoCheque;
    if (estadoCheque.modificadorCaja === -1) { return true; }

    return result;
  }

  ValidateStringDate(value: string): boolean {
    const splited: any[] = value.split('/');
    const fecha = new Date(splited[2], (splited[1] * 1) - 1, splited[0]);
    return this.getDateAsString(fecha) === value;
  }

  ValidarFechaIngresoValor(value: any) {
    if (this == null) { return null; }
    if (this.selectedOptionEstado != null && this.MostrarFechaIngresoValor(this.selectedOptionEstado)) {
      if (this.ValidateStringDate(this.fechaIngresoValor)) { return null; }// fecha bien formada
    } else {
      if (this.fechaIngresoValor == '' || this.ValidateStringDate(this.fechaIngresoValor)) { return null; }// Nulo o fecha bien formada
    }
    return { text: 'noPasa' };
  }

  ValidarFechaEgresoValor(value: any) {
    if (this == null) { return null; }
    if (this.selectedOptionEstado != null && this.MostrarFechaEgresoValor(this.selectedOptionEstado)) {
      if (this.ValidateStringDate(this.fechaEgresoValor)) { return null; }// fecha bien formada
    } else {
      if (this.fechaEgresoValor == '' || this.ValidateStringDate(this.fechaEgresoValor)) { return null; }// Nulo o fecha bien formada
    }
    return { text: 'noPasa' };
  }

  ValidarFechaIngresoEfectivo(value: any) {
    if (this == null) { return null; }
    if (this.selectedOptionEstado != null && this.MostrarFechaIngresoEfectivo(this.selectedOptionEstado)) {
      if (this.ValidateStringDate(this.fechaIngresoEfectivo)) { return null; }// fecha bien formada
    } else {
      if (this.fechaIngresoEfectivo == '' || this.ValidateStringDate(this.fechaIngresoEfectivo)) { return null; }// Nulo o fecha bien formada
    }
    return { text: 'noPasa' };
  }

  ValidarFechaEgresoEfectivo(value: any) {
    if (this == null) { return null; }
    if (this.selectedOptionEstado != null && this.MostrarFechaEgresoEfectivo(this.selectedOptionEstado)) {
      if (this.ValidateStringDate(this.fechaEgresoEfectivo)) { return null; }// fecha bien formada
    } else {
      if (this.fechaEgresoEfectivo == '' || this.ValidateStringDate(this.fechaEgresoEfectivo)) { return null; }// Nulo o fecha bien formada
    }
    return { text: 'noPasa' };
  }

}

