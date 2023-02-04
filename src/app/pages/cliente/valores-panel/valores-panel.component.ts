import { Component, OnInit } from '@angular/core';
import { EliminarModalComponent } from '../../../components/eliminar-modal/eliminar-modal.component';
import { ErrorforaneaModalComponent } from '../../../components/errorforanea-modal/errorforanea-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { DatepickerModalComponent } from '../../../components/datepicker-modal/datepicker-modal.component';
import { GeneralService } from '../../../Service/general.service';
import { CuentaFinanzaDetalleService } from 'src/app/Service/cuenta-finanza-detalle.service';
import { ClienteclienteService } from 'src/app/Service/clientecliente.service';
import { ClienteModel } from 'src/app/models/ClienteModel';
import { CuentaDetalleModel } from 'src/app/models/CuentaDetalleModel';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { KeyValuePair } from 'src/app/models/KeyValuePair';
import { EstadoChequeService } from 'src/app/Service/estado-cheque.service';
import { EstadoCheque } from 'src/app/models/EstadoCheque';
import { Selectable } from 'src/app/models/Selectable';
import {ClienteListadoModel} from '../../../models/ClienteListadoModel';
import {CuentaFinanzaDetalleListadoValoresModel} from '../../../models/CuentaFinanzaDetalleListadoValoresModel';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-valores-panel',
  templateUrl: './valores-panel.component.html',
  styleUrls: ['./valores-panel.component.css']
})
export class ValoresPanelComponent implements OnInit {

  fechaDesde: any = this.calendar.getToday().day.toString().padStart(2, '0') + '/' + this.calendar.getToday().month.toString().padStart(2, '0') + '/' + this.calendar.getToday().year.toString().padStart(4, '0');
  fechaHasta: any = this.calendar.getToday().day.toString().padStart(2, '0') + '/' + this.calendar.getToday().month.toString().padStart(2, '0') + '/' + this.calendar.getToday().year.toString().padStart(4, '0');
  fechaVencimientoDesde: any = "";
  fechaVencimientoHasta: any = "";
  submittedFechaDesde: any;
  submittedFechaHasta: any;
  vendidoA: any = '';
  totalGastos: number = 0;

  fechaDesdeFormat: any;
  fechaHastaFormat: any;
  idCliente: any;

  roles: any;
  rolClienteNegotis: any;
  sucursal: any;
  nombreCliente: any;
  options: ClienteModel[] = [];
  filteredOptions: Observable<ClienteModel[]>;
  listado: Selectable<CuentaDetalleModel>[] = [];
  textControl = new FormControl();

  optionsEstado: KeyValuePair[] = [];
  filteredOptionsEstado: Observable<KeyValuePair[]> | any;
  selectedOptionEstado: KeyValuePair | any = null;
  textControlEstado = new FormControl();
  nombreEstado = '';
  isAllSelected: boolean = false;

  constructor(
    private titleService: Title,
    private cuentaServ: CuentaFinanzaDetalleService,
    public dialog: MatDialog,
    private calendar: NgbCalendar,
    private clienteServ: ClienteclienteService,
    private estadoChequeService: EstadoChequeService,
    private generalServ: GeneralService) {
    titleService.setTitle("Finanzas");
    this.filteredOptions = this.textControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this.doFilter(value))
      );
  }

  ngOnInit() {
  }

  getSucursalVendedor(value: any) {
    this.roles = JSON.parse(localStorage.getItem('roles') ?? '');
    this.rolClienteNegotis = localStorage.getItem('RolClienteNegotis');

    this.sucursal = value.Sucursal;
    this.loadAutocomplete();
    this.buscar();
  }

  delete(value: any) {

    const dialogRef = this.dialog.open(EliminarModalComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        const loadRef = this.generalServ.loadingModal();
        let dataRegion = { 'id': value.id, 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
        this.cuentaServ.eliminar(dataRegion).subscribe(data => {
          if (data == true) {
            let index = 0;
            for (let item of this.listado) {
              if (item.item.id == value.id) {
                this.listado.splice(index, 1);
                break;
              }
              index++;
            }
          } else {
            this.dialog.open(ErrorforaneaModalComponent, {
              width: '450px'
            });
          }
          loadRef.close();
        }, error => { console.log(error); loadRef.close(); });
      }
    });
  }

  limpiar() {
    this.fechaDesde = this.calendar.getToday().day.toString().padStart(2, '0') + '/' + this.calendar.getToday().month.toString().padStart(2, '0') + '/' + this.calendar.getToday().year.toString().padStart(4, '0');
    this.fechaHasta = this.calendar.getToday().day.toString().padStart(2, '0') + '/' + this.calendar.getToday().month.toString().padStart(2, '0') + '/' + this.calendar.getToday().year.toString().padStart(4, '0');
    this.fechaVencimientoDesde = "";
    this.fechaVencimientoHasta = "";
    this.idCliente = '';
    this.nombreCliente = '';
    this.selectedOptionEstado = null;
    this.nombreEstado = '';
    this.vendidoA = '';
    this.buscar();
  }

  buscar() {
    const loadRef = this.generalServ.loadingModal();
    let data = new CuentaFinanzaDetalleListadoValoresModel(
      localStorage.getItem('idClienteNegotis'),
      this.fechaDesde,
      this.fechaHasta,
      this.idCliente,
      this.GetIdSelected(this.selectedOptionEstado),
      this.fechaVencimientoDesde,
      this.fechaVencimientoHasta,
      this.vendidoA,
    );

    this.cuentaServ.listarValoresPorFiltro(data)
      .subscribe(data => {
        let preListado = data as CuentaDetalleModel[];
        this.listado = preListado.map(x => {

          let selectable = new Selectable<CuentaDetalleModel>();
          selectable.selected = false;
          selectable.canSelect = x.fechaEgresoEfectivo == null || x.fechaEgresoEfectivo === '';
          selectable.item = x;
          return selectable;
        });
        loadRef.close();
      }, error => { console.log(error); loadRef.close(); });
  }

  GetIdSelected(value: KeyValuePair): any {
    if (value == null) { return null; }
    return value.value.id;
  }

  //#region DatePickers
  fechaDesdeFunc = () => this.runDatePicker().subscribe(result => this.fechaDesde = this.getDateAsString(result));
  fechaHastaFunc = () => this.runDatePicker().subscribe(result => this.fechaHasta = this.getDateAsString(result));
  fechaVencimientoDesdeFunc = () => this.runDatePicker().subscribe(result => this.fechaVencimientoDesde = this.getDateAsString(result));
  fechaVencimientoHastaFunc = () => this.runDatePicker().subscribe(result => this.fechaVencimientoHasta = this.getDateAsString(result));
  //#endregion

  //#region Autocomplete
  selectOption = (key: any) => this.idCliente = key.Id;
  resetKey = () => this.idCliente = null;
  displayWith = (option?: any): string => option ? option.RazonSocial : '';
  doFilter(value: string): ClienteModel[] {
    let filterVal = value.toLowerCase();
    return this.options.filter(option => option.RazonSocial.toLowerCase().includes(filterVal));
  }
  //#endregion

  //#region  AutocompleteEstado
  selectOptionEstado = (item: any) => {
    this.selectedOptionEstado = item;
  }
  resetKeyEstado = () => {
    this.selectedOptionEstado = null;
  }
  displayWithEstado = (option?: KeyValuePair): string => option ? option.key : '';
  doFilterEstado(value: string): KeyValuePair[] {
    let filterVal = value.toString().toLowerCase();
    return this.optionsEstado.filter(option => option.key.toLowerCase().includes(filterVal));
  }
  //#endregion

  //#region Loadings
  loadAutocomplete() {
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
    let rq = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis'), 'tipoModificacionValor': [1] };

    this.estadoChequeService.listarValoresPorFiltro(rq).subscribe(
      modelRs => {
        this.processEstadosModel(modelRs);
        loading.close();
      },
      error => {
        loading.close();
        this.generalServ.goToNoEncontrado();
      }
    );
  }

  processClienteModels(clienteModelRs: any) {
    let autocompleteRSAsArray = clienteModelRs as ClienteModel[];
    for (let index = 0; index < autocompleteRSAsArray.length; index++) {
      this.options.push(new ClienteModel(clienteModelRs[index]));
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
    this.filteredOptionsEstado = this.textControlEstado.valueChanges
      .pipe(
        startWith(''),
        map(value => this.doFilterEstado(value))
      );
  }
  //#endregion

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

  //#region CalculablesCompra
  calcularDiasDeposito(value: CuentaDetalleModel): number {
    let splited = value.fechaVencimiento.split('/');
    let fechaVenc = new Date(splited[2], splited[1], splited[0]);
    splited = value.fechaIngresoValor.split('/');
    let fechaRec = new Date(splited[2], splited[1], splited[0]);
    let resta = fechaVenc.getTime() - fechaRec.getTime();
    let result = ((resta / (24 * 60 * 60 * 1000)) + value.demoraDeposito * 1 + value.ajusteDeposito * 1) || 0;
    return Math.max(result, 0);
  }
  calcularMontoTasa = (value: CuentaDetalleModel): any => ((value.importe * value.tasa * this.calcularDiasDeposito(value) / 100) + (value.ajusteTasa) * 1).toFixed(2);
  calcularMontoImpuestoBancario = (value: CuentaDetalleModel): any => ((value.importe * value.impBancario / 100) + value.ajusteImpBancario * 1).toFixed(2);
  calcularGanancia = (value: CuentaDetalleModel): any => (this.calcularMontoTasa(value) * 1 + this.calcularMontoImpuestoBancario(value) * 1).toFixed(2);
  calcularSubtotal = (value: CuentaDetalleModel): any => (value.importe * 1 - this.calcularGanancia(value) * 1).toFixed(2);
  calcularRecupero = (value: CuentaDetalleModel): any => (value.importe * 1 - (this.calcularGanancia(value) * 1)).toFixed(2);
  calcularUtilidad = (value: CuentaDetalleModel): any => (this.calcularGanancia(value) * 1 - this.calcularRetencionesVenta(value) * 1).toFixed(2);
  calcularImporte = (value: CuentaDetalleModel): any => (value.importe).toFixed(2);
  //#endregion

  //#region AutocalculablesVenta
  calcularDiasDepositoVenta(value: CuentaDetalleModel): number {
    let splited = value.fechaVencimiento.split('/');
    let fechaVenc = new Date(splited[2], splited[1], splited[0]);
    splited = value.fechaEgresoValor.split('/');
    let fechaRec = new Date(splited[2], splited[1], splited[0]);
    let resta = fechaVenc.getTime() - fechaRec.getTime();
    let result = ((resta / (24 * 60 * 60 * 1000)) + value.demoraDepositoVenta * 1 + value.ajusteDepositoVenta * 1) || 0;
    return Math.max(result, 0);
  }
  calcularMontoTasaVenta = (value: CuentaDetalleModel): number => ((value.importe * value.tasaVenta * this.calcularDiasDepositoVenta(value) / 100) + (value.ajusteTasaVenta) * 1) || 0;
  calcularMontoImpuestoBancarioVenta = (value: CuentaDetalleModel): number => ((value.importe * value.impBancarioVenta / 100) + value.ajusteImpBancarioVenta * 1) || 0;
  calcularRetencionesVenta = (value: CuentaDetalleModel): number => (this.calcularMontoTasaVenta(value) * 1 + this.calcularMontoImpuestoBancarioVenta(value) * 1) || 0;
  calcularSubtotalVenta = (value: CuentaDetalleModel): number => (value.importe * 1 - this.calcularRetencionesVenta(value) * 1) || 0;
  fixedRetencionesVenta = (value: CuentaDetalleModel) => (this.calcularRetencionesVenta(value) * 1).toFixed(2);
  //#endregion

  //#region GetById

  getClienteNombre(idCliente: any) {
    let selected: any = this.options.find((x) => x.Id === idCliente);
    if ('RazonSocial' in selected) {
      return selected.RazonSocial;
    } else {
      return idCliente;
    }
  }

  getEstado(idEstado: any): EstadoCheque {
    let partialResult = this.optionsEstado.find((x) => x.value.id === idEstado);
    return partialResult == null ? null : partialResult.value;
  }

  getEstadoNombre(idEstado: any) {
    let selected = this.getEstado(idEstado);
    if (selected != null) {
      return selected.descripcion;
    } else {
      return 'En Cartera';
    }
  }

  //#endregion

  //#region selectionFunctions
  selectAll() {
    this.listado.filter(x => x.canSelect).forEach(element => {
      element.selected = this.isAllSelected;
    });
  }
  //#endregion
}
