import { Component, OnInit } from '@angular/core';
import { ComisionService } from '../../../Service/comision.service';
import { DatepickerModalComponent } from '../../../components/datepicker-modal/datepicker-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { EstadocomisionModalComponent } from '../../../components/estadocomision-modal/estadocomision-modal.component';
import { GeneralService } from '../../../Service/general.service';
import PropertyUtil, {TiposPropiedad} from '../../../util/property.util';
import {ComisionModel} from './ComisionModel';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-comision-panel',
  templateUrl: './comision-panel.component.html',
  styleUrls: ['./comision-panel.component.css']
})
export class ComisionPanelComponent implements OnInit {

  empleadoCtrl = new FormControl();
  filteredEmpleado!: Observable<any[]>;

  comisionList: any;
  fechaDesde: any;
  fechaHasta: any;
  empleado: any;
  idEmpleado: any;
  estadoComision: any = null;
  estadosComision = PropertyUtil.getPropertiesByType(TiposPropiedad.ESTADO_COMISION);
  infoInicial: any;
  comision: any = 0;
  sumaTotalComision: any = 0;
  mostrarTotal!: any;
  estComSleccionados: any = '';
  ids: any[] = [];
  fechaDesdeFormat: any;
  fechaHastaFormat: any;

  constructor(private comisionServ: ComisionService, private titleService: Title, private dialog: MatDialog,
    private calendar: NgbCalendar, private generalServ: GeneralService) {
      titleService.setTitle("Usuarios");
    this.fechaInicio();
    this.buscar();
  }

  fechaInicio() {
    let fechaHoy = this.calendar.getToday();
    this.fechaDesde = fechaHoy.day + '/' + fechaHoy.month + '/' + fechaHoy.year;
    this.fechaHasta = fechaHoy.day + '/' + fechaHoy.month + '/' + fechaHoy.year;
  }

  ngOnInit() {
    const loading = this.generalServ.loadingModal();
    let dataInfoInicial = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
    this.comisionServ.getInfoInicial(dataInfoInicial)
      .subscribe(data => {
        this.infoInicial = data;
        this.filteredEmpleado = this.empleadoCtrl.valueChanges
          .pipe(
            startWith(''),
            map(item => item ? this._filterVendedor(item) : this.infoInicial.Empleados.slice())
          );
        loading.close();
      }, error => { console.log(error); loading.close(); });
  }

  private _filterVendedor(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.infoInicial.Empleados.filter((item: any) => item.Nombres.toLowerCase().includes(filterValue.toLowerCase()) || item.Apellidos.toLowerCase().includes(filterValue.toLowerCase()));
  }

  getFechaDesde() {
    const dialogRef = this.dialog.open(DatepickerModalComponent, {
      width: '350px', data: { permitirFechaPasada: true },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.fechaDesde = result.day + '/' + result.month + '/' + result.year;
      }
    });
  }

  getFechaHasta() {
    const dialogRef = this.dialog.open(DatepickerModalComponent, {
      width: '350px', data: { permitirFechaPasada: true },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.fechaHasta = result.day + '/' + result.month + '/' + result.year;
      }
    });
  }

  resetEmpleado() {
    this.idEmpleado = null;
    this.comision = 0;
  }

  getEmpelado(value: any) {
    this.comision = Number(value.PorcentajeComision);
    this.idEmpleado = value.Id;
  }
  // getFecha.getUTCDate() + '/' + (getFecha.getUTCMonth() + 1) + '/' + getFecha.getUTCFullYear();
  buscar() {
    const loadRef = this.generalServ.loadingModal();
    this.fechaDesdeFormat=this.fechaDesde.split("/").reverse().join("/");
    this.fechaHastaFormat = this.fechaHasta.split("/").reverse().join("/");
    let dataComision = new ComisionModel(
      localStorage.getItem('idClienteNegotis'),
      this.idEmpleado,
      this.fechaDesdeFormat,
      this.fechaHastaFormat,
      this.estadoComision
    );

    this.comisionServ.getListComisiones(dataComision)
      .subscribe(data => {
        this.comisionList = data;
        this.estComSleccionados = '';
        this.sumaTotalComision = 0;
        this.mostrarTotal = null;
        for (let item of this.comisionList) {
          item.checked = null;
        }
        this.formatoFecha();
        loadRef.close();
      }, error => { console.log(error); loadRef.close(); });
  }

  limpiar() {
    this.fechaDesde = null;
    this.fechaHasta = null;
    this.idEmpleado = null;
    this.empleado = null;
    this.estadoComision = '';
    this.comision = 0;
    this.fechaInicio();
    this.buscar();
  }

  formatoFecha() {
    for (let item of this.comisionList) {
      let getFecha = new Date(Number(item.FechaCracion.replace('/Date(', '').replace(')/', '')));
      item.FechaCracion = getFecha.getUTCDate() + '/' + (getFecha.getUTCMonth() + 1) + '/' + getFecha.getUTCFullYear();
    }
  }

  cambiarEstado(value: any) {

    const dialogRef = this.dialog.open(EstadocomisionModalComponent, {
      width: '450px',
      data: { item: value }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        if (result.resultado == true) {
          const loadRef = this.generalServ.loadingModal();
          value.CodigoEstadoComision = result.nuevoEstado;
          this.ids.push(value.Id);
          let dataPedido = { 'idsPedido': this.ids, 'nuevoEstado': result.nuevoEstado, 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
          this.comisionServ.nuevoEstado(dataPedido).subscribe(data => { data; this.ids = []; loadRef.close(); }, error => { console.log(error); loadRef.close(); });
        }
      }
    });
  }

  check(value: any, event: any) {
    if (event.target.checked == true) {
      this.sumaTotalComision = this.sumaTotalComision + value.ComisionTotal;
      value.checked = true;
    } else {
      this.sumaTotalComision = this.sumaTotalComision - value.ComisionTotal
      value.checked = false;
    }
    let count = 0;
    for (let item of this.comisionList) {
      if (item.checked == true) {
        count++;
      }
    }
    if (count > 0) {
      this.mostrarTotal = true;
    } else { this.mostrarTotal = null; }
  }

  checkAll() {
    for (let item of this.comisionList) {
      if (item.checked != true) {
        item.checked = true;
        this.sumaTotalComision = this.sumaTotalComision + item.ComisionTotal
      }
      if (item.checked == true) {
        this.mostrarTotal = true;
      }
    }
  }

  saveSeleccionados() {
    const loadRef = this.generalServ.loadingModal();
    for (let item of this.comisionList) {
      if (item.checked == true) {
        this.ids.push(item.Id);
        item.EstadoComision = this.estComSleccionados;
      }
    }
    let dataPedido = { 'idsPedido': this.ids, 'nuevoEstado': this.estComSleccionados, 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
    this.comisionServ.nuevoEstado(dataPedido).subscribe(data => { data; this.ids = []; loadRef.close(); }, error => { console.log(error); loadRef.close(); });
  }

}
