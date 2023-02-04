import { Component, OnInit } from '@angular/core';
import { EliminarModalComponent } from '../../../components/eliminar-modal/eliminar-modal.component';
import { ErrorforaneaModalComponent } from '../../../components/errorforanea-modal/errorforanea-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { DatepickerModalComponent } from '../../../components/datepicker-modal/datepicker-modal.component';
import { GeneralService } from '../../../Service/general.service';
import { ClienteclienteService } from 'src/app/Service/clientecliente.service';
import { CuentaFinanzaDetalleService } from 'src/app/Service/cuenta-finanza-detalle.service';
import { ClienteModel } from 'src/app/models/ClienteModel';
import { CuentaDetalleModel } from 'src/app/models/CuentaDetalleModel';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { EstadoChequeService } from 'src/app/Service/estado-cheque.service';
import { EstadoCheque } from 'src/app/models/EstadoCheque';
import { KeyValuePair } from 'src/app/models/KeyValuePair';
import { Selectable } from 'src/app/models/Selectable';
import { FinanzasSetEstadoMasivoComponent } from 'src/app/components/finanzas-set-estado-masivo/finanzas-set-estado-masivo.component';
import { FinanzasSetEstadoMasivoModel } from 'src/app/models/FinanzasSetEstadoMasivoModel';
import {ClienteListadoModel} from '../../../models/ClienteListadoModel';
import {CuentaFinanzaDetalleListadoValoresModel} from '../../../models/CuentaFinanzaDetalleListadoValoresModel';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-cuentadetalle-panel',
  templateUrl: './cuentadetalle-panel.component.html',
  styleUrls: ['./cuentadetalle-panel.component.css']
})
export class CuentadetallePanelComponent implements OnInit {

  fechaDesde: any = this.getDateAsString(this.calendar.getToday());
  fechaHasta: any = this.getDateAsString(this.calendar.getToday());
  submittedFechaDesde: any;
  submittedFechaHasta: any;
  totalGastos: number = 0;
  pageSize = 20;

  fechaDesdeFormat: any;
  fechaHastaFormat: any;
  idCliente: any;

  roles: any;
  rolClienteNegotis: any;
  sucursal: any;
  nombreCliente: any;
  options: ClienteModel[] = [];
  filteredOptions!: Observable<ClienteModel[]>;
  listado: Selectable<CuentaDetalleModel>[] = [];
  textControl = new FormControl();

  fechaVencimientoDesde: any = "";
  fechaVencimientoHasta: any = "";
  vendidoA: any = '';

  optionsEstado: KeyValuePair[] = [];
  filteredOptionsEstado!: Observable<KeyValuePair[]>;
  selectedOptionEstado: KeyValuePair | any = null;
  textControlEstado = new FormControl();

  // campos total
  hayResultados: any = false;
  cliente: any = '';
  montoDeuda: any = 0;

  isAllSelected: boolean = false;


  constructor(
    private titleService: Title,
    private cuentaServ: CuentaFinanzaDetalleService,
    private estadoChequeService: EstadoChequeService,
    public dialog: MatDialog,
    private calendar: NgbCalendar,
    private clienteServ: ClienteclienteService,
    private generalServ: GeneralService) {
      titleService.setTitle("Finanzas");
  }

  ngOnInit() {

    this.filteredOptions = this.textControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this.doFilter(value))
      );
  }

  getSucursalVendedor(value: any) {
    this.roles = JSON.parse(localStorage.getItem('roles') ?? '');
    this.rolClienteNegotis = localStorage.getItem('RolClienteNegotis');

    this.sucursal = value.Sucursal;
    this.loadAutocomplete();
    this.buscar();
  }

  delete(value: CuentaDetalleModel) {

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
        }, error => { console.log(error); loadRef.close(); })
      }
    });
  }

  limpiar() {
    this.fechaDesde = this.getDateAsString(this.calendar.getToday());
    this.fechaHasta = this.getDateAsString(this.calendar.getToday());
    this.idCliente = '';
    this.nombreCliente = '';
    this.buscar();
  }

  buscar() {
    this.isAllSelected = false;

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
        this.hayResultados = false;
        let preListado = data as CuentaDetalleModel[];
        this.listado = preListado.map(x => {

          let selectable = new Selectable<CuentaDetalleModel>();
          selectable.selected = false;
          selectable.canSelect = x.fechaEgresoEfectivo == null || x.fechaEgresoEfectivo === '';
          selectable.item = x;
          return selectable;
        });
        let grouped = Array.from(new Set(this.listado.map(x => x.item.idCliente)));
        if (grouped.length == 1) {
          this.cliente = this.getClienteNombre(grouped[0]);
          this.montoDeuda = this.listado.filter(x => {
            return x.item.fechaEgresoEfectivo == null || x.item.fechaEgresoEfectivo == '';
          }).reduce((a, b) => a + (this.calcularSubtotal(b.item)) * 1, 0);
          this.hayResultados = true;
        }

        loadRef.close();
      }, error => { console.log(error); loadRef.close(); });
  }

  GetIdSelected(value: KeyValuePair): any {
    if (value == null) return null;
    return value.value.id;
  }

  //#region DatePickers
  fechaDesdeFunc = () => this.runDatePicker().subscribe(result => this.fechaDesde = this.getDateAsString(result));
  fechaHastaFunc = () => this.runDatePicker().subscribe(result => this.fechaHasta = this.getDateAsString(result));
  //#endregion

  //#region Autocomplete
  selectOption = (key: any) => this.idCliente = key.Id;
  resetKey = () => this.idCliente = null;
  displayWith = (option?: any): string => option ? option.RazonSocial : '';
  doFilter(value: string): ClienteModel[] {
    if (value == null || value === '') {
      return this.options;
    }
    let filterVal = value.toString().toLowerCase();
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
    const loading = this.generalServ.loadingModal();
    let rq = ClienteListadoModel.getEntity(localStorage.getItem('idClienteNegotis'), 1, this.pageSize);
    this.clienteServ.listadoClientesClienteNegotis(rq).subscribe(
      (clienteModelRs: any) => {
        console.log(clienteModelRs);
        this.options = [];
        this.processClienteModels(clienteModelRs.listado);

        if (clienteModelRs.Total > (clienteModelRs.PageSize * clienteModelRs.Page)) {
          this.loadMoreClientAutocomplete(clienteModelRs,()=>{this.loadEstados(); loading.close();});
        }
        else{
          loading.close();
        }

      },
      (error: any) => {
        loading.close();
        this.generalServ.goToNoEncontrado();
      }
    )
  }

  loadMoreClientAutocomplete(clienteModelRs: any , OnComplete: Function) {
    let rq = new ClienteListadoModel(
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
    )
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

  //#region Calculables
  calcularMontoTasa = (value: CuentaDetalleModel): number => (value.importe * value.tasa * this.calcularDiasDeposito(value) / 100) + (value.ajusteTasa) * 1;
  calcularMontoImpuestoBancario = (value: CuentaDetalleModel): number => (value.importe * value.impBancario / 100) + value.ajusteImpBancario * 1;
  calcularRetenciones = (value: CuentaDetalleModel): number => this.calcularMontoTasa(value) * 1 + this.calcularMontoImpuestoBancario(value) * 1;
  calcularSubtotal = (value: CuentaDetalleModel): number => value.importe * 1 - this.calcularRetenciones(value) * 1;
  calcularValores(): string {
    if (this.hayResultados) {
      let monto = this.listado.reduce((a, b) => a + (b.item.importe * 1), 0);
      return (monto * 1).toFixed(2);
    } else {
      return (0).toFixed(2);
    }
  }
  calcularRetencionesTotales(): string {
    if (this.hayResultados) {
      let monto = this.listado.reduce((a, b) => a + (this.calcularRetenciones(b.item) * 1), 0);
      return (monto * 1).toFixed(2);
    } else {
      return (0).toFixed(2);
    }
  }
  calcularImpagos(): string {
    if (this.hayResultados) {
      let monto = this.listado.filter(x => !this.isPaid(x.item)).reduce((a, b) => a + (this.calcularSubtotal(b.item) * 1), 0);
      return (monto * 1).toFixed(2);
    } else {
      return (0).toFixed(2);
    }
  }
  calcularPagos(): string {
    if (this.hayResultados) {
      let monto = this.listado.filter(x => this.isPaid(x.item)).reduce((a, b) => a + (this.calcularSubtotal(b.item) * 1), 0);
      return (monto * 1).toFixed(2);
    } else {
      return (0).toFixed(2);
    }
  }
  //#endregion

  //#region Fixed
  fixedTasa = (value: CuentaDetalleModel) => (value.tasa).toFixed(2);
  fixedMontoTasa = (value: CuentaDetalleModel) => (this.calcularMontoTasa(value)).toFixed(2);
  fixedImpuestoBancario = (value: CuentaDetalleModel) => (value.impBancario).toFixed(2);
  fixedMontoImpuestoBancario = (value: CuentaDetalleModel) => (this.calcularMontoImpuestoBancario(value)).toFixed(2);
  fixedRetencion = (value: CuentaDetalleModel) => (this.calcularRetenciones(value)).toFixed(2);
  fixedSubtotal = (value: CuentaDetalleModel) => (this.calcularSubtotal(value)).toFixed(2);
  //#endregion

  isPaid(value: CuentaDetalleModel): boolean {
    if (value.fechaEgresoEfectivo == null || value.fechaEgresoEfectivo == "") {
      return false;
    }
    let strFechaPago = value.fechaEgresoEfectivo.split('/');
    let fechaPago = new NgbDate(strFechaPago[2] * 1, strFechaPago[1] * 1, strFechaPago[0] * 1);
    let fechaToday = this.calendar.getToday();
    return !fechaPago.after(fechaToday);
  }
  calcularDiasDeposito(value: CuentaDetalleModel): number {
    let splited = value.fechaVencimiento.split('/');
    let fechaVenc = new Date(splited[2], splited[1], splited[0]);
    splited = value.fechaIngresoValor.split('/');
    let fechaRec = new Date(splited[2], splited[1], splited[0]);
    let resta = fechaVenc.getTime() - fechaRec.getTime();
    let result = ((resta / (24 * 60 * 60 * 1000)) + value.demoraDeposito * 1 + value.ajusteDeposito * 1) || 0;
    return Math.max(result, 0);
  }

  getClienteNombre(idCliente: any) {
    let selected = this.options.find((x) => x.Id === idCliente);
    if (selected != null) {
      if ('RazonSocial' in selected) {
        return selected.RazonSocial;
      }
    }
    return idCliente;
  }

  getEstadoNombre(idEstado: any) {
    let selected = this.optionsEstado.find((x) => x.value.id === idEstado);
    if (selected != null) {
      if ('descripcion' in selected.value) {
        return selected.value.descripcion;
      }
    }
    return idEstado;
  }

  //#region selectionFunctions
  selectAll() {
    this.listado.filter(x => x.canSelect).forEach(element => {
      element.selected = this.isAllSelected;
    });
  }

  ProcessSelectedItems() {
    const request = new FinanzasSetEstadoMasivoModel();
    request.titulo = 'Pago de valores.';
    request.contenido = '<b>ATENCION</b><br/>Esta a punto de realizar una operacion de <b>Pago</b> de ' + this.getSelectedCount() + ' valor/es por un total de $' + this.getSelectedAmount().toFixed(2) + '.';
    request.statusFilter = x => x.modificadorCaja === -1;//que salga efectivo
    request.idClienteNegotis = '';
    request.idSucursal = this.sucursal.Id;
    const dialogRef = this.dialog.open(FinanzasSetEstadoMasivoComponent, {
      data: request
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        if (this.listado == null
          || this.listado.length === 0) {
          this.buscar();
          return;
        }

        const resultEstado = new EstadoCheque();
        resultEstado.FromObject(result.value);

        const selectedItems = this.listado.filter(x => x.canSelect && x.selected).map(x => x.item);

        selectedItems.forEach(item => {
          item.idEstadoCompra = resultEstado.id;
          item.fechaEgresoEfectivo = this.getDateAsString(this.calendar.getToday());
        });

        const loadRef = this.generalServ.loadingModal();
        this.cuentaServ.EditarLote(selectedItems)
          .subscribe(result => {
            this.buscar();
            loadRef.close();
          }, error => { console.log(error); });
      }
    });
  }

  getSelectableCount(): Number {
    if (this.listado == null) { return 0; }
    if (this.listado.length === 0) { return 0; }

    return this.listado.reduce((a, b) => {
      if (b.canSelect) {
        a += 1;
      }
      return a;
    }, 0);
  }

  getSelectedCount(): Number {
    if (this.listado == null) { return 0; }
    if (this.listado.length === 0) { return 0; }

    return this.listado.reduce((a, b) => {
      if (b.selected) {
        a += 1;
      }
      return a;
    }, 0);
  }

  getSelectedAmount(): Number {
    if (this.listado == null) { return 0; }
    if (this.listado.length === 0) { return 0; }

    return this.listado.reduce((a, b) => {
      if (b.selected) {
        a += (this.calcularSubtotal(b.item) * 1);
      }
      return a;
    }, 0);
  }
  //#endregion

  AreItemsToPay(): Boolean {
    if (this.listado == null) { return false; }
    if (this.listado.length === 0) { return false; }

    return this.listado.some(x => x.selected);
  }
}



