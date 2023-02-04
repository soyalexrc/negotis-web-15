import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneralService } from '../../../Service/general.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarOperacionExitosaComponent } from '../../../components/snack-bar-operacion-exitosa/snack-bar-operacion-exitosa.component';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
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
  selector: 'app-valores-crear-editar',
  templateUrl: './valores-crear-editar.component.html',
  styleUrls: ['./valores-crear-editar.component.css']
})
export class ValoresCrearEditarComponent implements OnInit {

  myForm: FormGroup;
  submitted!: boolean;
  post: any;
  roles: any;
  rolClienteNegotis: any;
  //request
  request: CuentaDetalleModel;
  options!: ClienteModel[];
  filteredOptions: Observable<ClienteModel[]> | any;
  nombreCliente: any;

  nombreEstado: any = '';
  optionsEstado: KeyValuePair[] = [];
  filteredOptionsEstado: Observable<KeyValuePair[]> | any;
  selectedOptionEstado: KeyValuePair | any = null;

  fechaIngresoValor: any = '';
  fechaEgresoValor: any = '';
  fechaIngresoEfectivo: any = '';
  fechaEgresoEfectivo: any = '';
  idValor: any

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
    private calendar: NgbCalendar,
    private dialog: MatDialog) {
    titleService.setTitle("Finanzas");
    this.roles = JSON.parse(localStorage.getItem('roles') ?? '');
    this.rolClienteNegotis = localStorage.getItem('RolClienteNegotis');

    this.request = new CuentaDetalleModel();
    this.request.fechaVencimiento = this.getDateAsString(new Date());

    let fechaValidator = Validators.compose([Validators.required, Validators.pattern('^([0-9]{1,2})/([0-9]{1,2})/([0-9]{4})$')]);
    let nullablefechaValidator = Validators.compose([Validators.pattern('^([0-9]{1,2})/([0-9]{1,2})/([0-9]{4})$')]);
    let numeroValidator = Validators.compose([Validators.required, Validators.pattern('^[-]?([0-9]+)$')]);
    let monedaValidator = Validators.compose([Validators.required, Validators.pattern('^(([-]?[0-9]+)([,.]([0-9]*))?)$')]);
    let textoValidator = Validators.compose([Validators.required]);

    this.myForm = fb.group({
      nombreCliente: ['', textoValidator],
      idCliente: ['', textoValidator],
      librador: ['', textoValidator],
      cuit: ['', numeroValidator],
      fechaVencimiento: ['', fechaValidator],
      fechaEmision: ['', fechaValidator],
      numero: ['', numeroValidator],
      plaza: ['', textoValidator],
      banco: ['', textoValidator],
      cuenta: ['', numeroValidator],
      importe: ['', monedaValidator],
      costo: [0, monedaValidator],
      ganancia: ['', monedaValidator],
      recupero: ['', monedaValidator],
      utilidad: ['', monedaValidator],
      destino: ['', Validators.compose([])],
      vendidoA: ['', Validators.compose([])],

     demora: ['', numeroValidator],
      resultDeposito: ['', numeroValidator],
      ajusteDeposito: ['', numeroValidator],
      tasa: ['', monedaValidator],
      montoTasa: ['', monedaValidator],
      ajusteTasa: ['', monedaValidator],
      impBancario: ['', monedaValidator],
      montoImpBancario: ['', monedaValidator],
      ajusteImpBancario: ['', monedaValidator],

     nombreEstado: ['', textoValidator],
      idEstado: ['', textoValidator],
      fechaIngresoValor: ['', Validators.compose([this.ValidarFechaIngresoValor.bind(this)])],
      fechaEgresoValor: ['', Validators.compose([this.ValidarFechaEgresoValor.bind(this)])],
      fechaIngresoEfectivo: ['', Validators.compose([this.ValidarFechaIngresoEfectivo.bind(this)])],
      fechaEgresoEfectivo: ['', Validators.compose([this.ValidarFechaEgresoEfectivo.bind(this)])],
    });

    route.params.subscribe(params => { this.request.id = params['idvalor']; });

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

    this.loadAutocompletablesYModel();
  }

  ngOnInit() {
  }

  //#region DatePickers
  fechaVencimientoDatePicker = () => this.runDatePicker().subscribe(result => this.request.fechaVencimiento = this.getDateAsString(result));
  fechaEmisionDatePicker = () => this.runDatePicker().subscribe(result => this.request.fechaEmision = this.getDateAsString(result));
  fechaIngresoValorDatePicker = () => this.runDatePicker().subscribe(result => this.fechaIngresoValor = this.getDateAsString(result));
  fechaEgresoValorDatePicker = () => this.runDatePicker().subscribe(result => this.fechaEgresoValor = this.getDateAsString(result));
  fechaIngresoEfectivoDatePicker = () => this.runDatePicker().subscribe(result => this.fechaIngresoEfectivo = this.getDateAsString(result));
  fechaEgresoEfectivoDatePicker = () => this.runDatePicker().subscribe(result => this.fechaEgresoEfectivo = this.getDateAsString(result));
  //#endregion

  //#region Autocomplete
  selectOption = (key: any) => this.request.idCliente = key.Id;
  resetKey = () => this.request.idCliente = null;
  displayWith = (option?: any): string => option ? option.RazonSocial : '';
  doFilter(value: string): ClienteModel[] {
    let filterVal = value.toString().toLowerCase();
    return this.options.filter(option => option.RazonSocial.toLowerCase().includes(filterVal));
  }
  //#endregion

  //#region  AutocompleteEstado
  selectOptionEstado = (item: any) => {
    this.selectedOptionEstado = item;
    this.request.idEstadoVenta = (this.selectedOptionEstado.value as EstadoCheque).id || '';
  }
  resetKeyEstado = () => {
    this.selectedOptionEstado = null;
    this.request.idEstadoVenta = '';
    this.ResetFechas();
  }
  displayWithEstado = (option?: KeyValuePair): string => option ? option.key : 'En Cartera';
  doFilterEstado(value: string): KeyValuePair[] {
    if (value == null) { return this.optionsEstado; }
    let filterVal = value.toString().toLowerCase();
    return this.optionsEstado.filter(option => option.key.toLowerCase().includes(filterVal));
  }

  //#endregion


  //#region Loadings

  processClienteModels(clienteModelRs: any) {
    let autocompleteRSAsArray = clienteModelRs as ClienteModel[];
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
      this.selectedOptionEstado = this.optionsEstado.filter(x => x.value.id === (this.request.idEstadoVenta || -1))[0];
      this.myForm.get('nombreEstado')?.setValue(this.selectedOptionEstado);
      this.ResetFechas();
    }
  }

  processEstadosModel(modelRs: any) {
    modelRs.forEach((item: any) => {
      let estado = new EstadoCheque();
      estado.FromObject(item);
      let option = new KeyValuePair();
      option.key = estado.descripcion;
      option.value = estado;
      this.optionsEstado.push(option);
    });
  }

  loadAutocompletablesYModel() {
    this.options = [];
    const loading = this.generalServ.loadingModal();
    let rq = ClienteListadoModel.getEntity(localStorage.getItem('idClienteNegotis'), 1, 2);

    this.clienteServ.listadoClientesClienteNegotisCompleto(rq).subscribe(
      next => {
        this.processClienteModels(next.listado);
      },
      error => {
        loading.close();
        this.generalServ.goToNoEncontrado();
      },
      () => {
        this.loadEstados();
        loading.close();
      }
    );
  }

  loadEstados() {
    let loading = this.generalServ.loadingModal();
    let rq = null;

    if (this.request.id == 0) {
      rq = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis'), 'modificadoresValor': [-1], 'tiposOperacion': [2, 3] };
    } else {
      rq = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis'), 'tiposOperacion': [2, 3] };
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
      let loading = this.generalServ.loadingModal();
      let rq = { 'id': this.request.id, 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
      this.cuentaDetalleServ.getById(rq).subscribe(
        cuentaDetalleModelRs => {
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
            this.router.navigate(["/cliente/finanzas/valores/panel"], { replaceUrl: true });
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

  //UTILIDADES

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

  //#region AutocalculablesCompra
  calcularDiasDeposito(value: CuentaDetalleModel): number {
    let splited = value.fechaVencimiento.split('/');
    let fechaVenc = new Date(splited[2], splited[1], splited[0]);
    splited = this.fechaIngresoValor.split('/');
    let fechaRec = new Date(splited[2], splited[1], splited[0]);
    let resta = fechaVenc.getTime() - fechaRec.getTime();
    let result = ((resta / (24 * 60 * 60 * 1000)) + value.demoraDeposito * 1 + value.ajusteDeposito * 1) || 0;
    return Math.max(result, 0);
  }
  calcularMontoTasa = (value: CuentaDetalleModel): any => ((value.importe * value.tasa * this.calcularDiasDeposito(value) / 100) + (value.ajusteTasa) * 1).toFixed(2);
  calcularMontoImpuestoBancario = (value: CuentaDetalleModel): any => ((value.importe * value.impBancario / 100) + value.ajusteImpBancario * 1).toFixed(2);
  calcularRetenciones = (value: CuentaDetalleModel): any => (this.calcularMontoTasa(value) * 1 + this.calcularMontoImpuestoBancario(value) * 1).toFixed(2);
  calcularSubtotal = (value: CuentaDetalleModel): any => (value.importe * 1 - this.calcularRetenciones(value) * 1).toFixed(2);
  //#endregion

  //#region AutocalculablesVenta
  calcularDiasDepositoVenta(value: CuentaDetalleModel): number {
    let splited = value.fechaVencimiento.split('/');
    let fechaVenc = new Date(splited[2], splited[1], splited[0]);
    splited = this.fechaEgresoValor.split('/');
    let fechaRec = new Date(splited[2], splited[1], splited[0]);
    let resta = fechaVenc.getTime() - fechaRec.getTime();
    let result = ((resta / (24 * 60 * 60 * 1000)) + value.demoraDepositoVenta * 1 + value.ajusteDepositoVenta * 1) || 0;
    return Math.max(result, 0);
  }
  calcularMontoTasaVenta = (value: CuentaDetalleModel): number => ((value.importe * value.tasaVenta * this.calcularDiasDepositoVenta(value) / 100) + (value.ajusteTasaVenta) * 1) || 0;
  calcularMontoImpuestoBancarioVenta = (value: CuentaDetalleModel): number => ((value.importe * value.impBancarioVenta / 100) + value.ajusteImpBancarioVenta * 1) || 0;
  calcularRetencionesVenta = (value: CuentaDetalleModel): number => (this.calcularMontoTasaVenta(value) * 1 + this.calcularMontoImpuestoBancarioVenta(value) * 1) || 0;
  calcularSubtotalVenta = (value: CuentaDetalleModel): number => (value.importe * 1 - this.calcularRetencionesVenta(value) * 1) || 0;
  //#endregion

  //#region AutocalculablesTotal
  calcularGanancia = (value: CuentaDetalleModel): any => (this.calcularRetenciones(value) * 1).toFixed(2);
  calcularCosto = (value: CuentaDetalleModel): any => (this.calcularRetencionesVenta(value) * 1).toFixed(2);
  //Recupero es lo que se recupera de la venta del valor, debería de ser igual al valor de compra
  calcularRecupero = (value: CuentaDetalleModel): any => (value.importe * 1 - (this.calcularGanancia(value) * 1)).toFixed(2);
  //Utilidad es lo que queda al restar los costos de las ganancias.
  calcularUtilidad = (value: CuentaDetalleModel): any => (this.calcularGanancia(value) * 1 - this.calcularCosto(value) * 1).toFixed(2);
  calcularImporte = (value: CuentaDetalleModel): any => (value.importe).toFixed(2);
  //#endregion

  //#region Fixed
  fixedMontoTasaVenta = (value: CuentaDetalleModel) => (this.calcularMontoTasaVenta(value) * 1).toFixed(2);
  fixedMontoImpuestoBancarioVenta = (value: CuentaDetalleModel) => (this.calcularMontoImpuestoBancarioVenta(value) * 1).toFixed(2);
  fixedRetencionesVenta = (value: CuentaDetalleModel) => (this.calcularRetencionesVenta(value) * 1).toFixed(2);
  fixedRetenciones = (value: CuentaDetalleModel) => (this.calcularRetenciones(value) * 1).toFixed(2);
  fixedSubtotalVenta = (value: CuentaDetalleModel) => (this.calcularSubtotalVenta(value) * 1).toFixed(2);
  //#endregion



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
    let result = false;
    if (value == null) return false;
    let estadoCheque = value.value as EstadoCheque;
    if (estadoCheque.modificadorValor === 1) { return true; }

    return result;
  }

  MostrarFechaIngresoEfectivo(value: KeyValuePair) {
    let result = false;
    if (value == null) return false;
    let estadoCheque = value.value as EstadoCheque;
    if (estadoCheque.modificadorCaja === 1) { return true; }

    return result;
  }

  MostrarFechaEgresoValor(value: KeyValuePair) {
    let result = false;
    if (value == null) return false;
    let estadoCheque = value.value as EstadoCheque;
    if (estadoCheque.modificadorValor === -1) { return true; }

    return result;
  }

  MostrarFechaEgresoEfectivo(value: KeyValuePair) {
    let result = false;
    if (value == null) return false;
    let estadoCheque = value.value as EstadoCheque;
    if (estadoCheque.modificadorCaja === -1) { return true; }

    return result;
  }

  ValidateStringDate(value: string): boolean {
    let splited: any[] = value.split('/');
    let fecha = new Date(splited[2], (splited[1] * 1) - 1, splited[0]);
    return this.getDateAsString(fecha) === value;
  }

  ValidarFechaIngresoValor(value: any) {
    if (this == null) { return null; }
    if (this.selectedOptionEstado != null && this.MostrarFechaIngresoValor(this.selectedOptionEstado)) {
      if (this.ValidateStringDate(this.fechaIngresoValor)) { return null; }//fecha bien formada
    } else {
      if (this.fechaIngresoValor == '' || this.ValidateStringDate(this.fechaIngresoValor)) { return null; }//Nulo o fecha bien formada
    }
    return { text: 'noPasa' };
  }

  ValidarFechaEgresoValor(value: any) {
    if (this == null) { return null; }
    if (this.selectedOptionEstado != null && this.MostrarFechaEgresoValor(this.selectedOptionEstado)) {
      if (this.ValidateStringDate(this.fechaEgresoValor)) { return null; }//fecha bien formada
    } else {
      if (this.fechaEgresoValor == '' || this.ValidateStringDate(this.fechaEgresoValor)) { return null; }//Nulo o fecha bien formada
    }
    return { text: 'noPasa' };
  }

  ValidarFechaIngresoEfectivo(value: any) {
    if (this == null) { return null; }
    if (this.selectedOptionEstado != null && this.MostrarFechaIngresoEfectivo(this.selectedOptionEstado)) {
      if (this.ValidateStringDate(this.fechaIngresoEfectivo)) { return null; }//fecha bien formada
    } else {
      if (this.fechaIngresoEfectivo == '' || this.ValidateStringDate(this.fechaIngresoEfectivo)) { return null; }//Nulo o fecha bien formada
    }
    return { text: 'noPasa' };
  }

  ValidarFechaEgresoEfectivo(value: any) {
    if (this == null) { return null; }
    if (this.selectedOptionEstado != null && this.MostrarFechaEgresoEfectivo(this.selectedOptionEstado)) {
      if (this.ValidateStringDate(this.fechaEgresoEfectivo)) { return null; }//fecha bien formada
    } else {
      if (this.fechaEgresoEfectivo == '' || this.ValidateStringDate(this.fechaEgresoEfectivo)) { return null; }//Nulo o fecha bien formada
    }
    return { text: 'noPasa' };
  }

}
