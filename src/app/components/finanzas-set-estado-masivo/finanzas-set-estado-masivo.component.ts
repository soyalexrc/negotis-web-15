import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FinanzasSetEstadoMasivoModel } from 'src/app/models/FinanzasSetEstadoMasivoModel';
import { KeyValuePair } from 'src/app/models/KeyValuePair';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { EstadoChequeService } from 'src/app/Service/estado-cheque.service';
import { GeneralService } from 'src/app/Service/general.service';
import { EstadoCheque } from 'src/app/models/EstadoCheque';

@Component({
  selector: 'app-finanzas-set-estado-masivo',
  templateUrl: './finanzas-set-estado-masivo.component.html',
  styleUrls: ['./finanzas-set-estado-masivo.component.css']
})
export class FinanzasSetEstadoMasivoComponent implements OnInit {

  request: FinanzasSetEstadoMasivoModel;

  optionsEstado: KeyValuePair[] = [];
  filteredOptionsEstado: Observable<KeyValuePair[]> | any = null;
  selectedOptionEstado: KeyValuePair | any = null;
  textControlEstado = new FormControl();
  isOk = false;
  submited = false;

  constructor(public dialogRef: MatDialogRef<FinanzasSetEstadoMasivoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FinanzasSetEstadoMasivoModel,
    private estadoChequeService: EstadoChequeService,
    private generalServ: GeneralService,
    private dialog: MatDialog) {
    this.request = data;
    this.loadEstados();
  }

  ngOnInit() {
  }

  cerrar() {
    this.submited = true;
    if (this.selectedOptionEstado != null) {
      this.isOk = true;
      this.dialogRef.close(this.selectedOptionEstado);
    }
  }

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

  processEstadosModel(modelRs: any) {
    modelRs.forEach((item: any) => {
      let estado = new EstadoCheque();
      estado.FromObject(item);
      if (this.request.statusFilter(estado)) {
        let option = new KeyValuePair();
        option.key = estado.descripcion;
        option.value = estado;
        this.optionsEstado.push(option);
      }
    });
    this.filteredOptionsEstado = this.textControlEstado.valueChanges
      .pipe(
        startWith(''),
        map(value => this.doFilterEstado(value))
      );
  }
  //#endregion

}
