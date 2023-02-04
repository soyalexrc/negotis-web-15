import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { DatepickerModalComponent } from '../../../components/datepicker-modal/datepicker-modal.component';
import { GeneralService } from '../../../Service/general.service';
import { ArticuloService } from 'src/app/Service/articulo.service';
import { CategotriaRubroService } from 'src/app/Service/categotria-rubro.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/Service/global.service';
import { map, startWith } from 'rxjs/operators';
import { MensajeseleccionarsucursalModalComponent } from 'src/app/components/mensajeseleccionarsucursal-modal/mensajeseleccionarsucursal-modal.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-vencimiento-stock-panel',
  templateUrl: './vencimiento-stock-panel.component.html',
  styleUrls: ['./vencimiento-stock-panel.component.css']
})
export class VencimientoStockPanelComponent implements OnInit {

  verProveedorHabilitado: boolean = false;
  visualizarIDEstadoHabilitado: boolean = false;
  visualizarCantidadXPackHabilitado: boolean = false;
  total: number = 0;
  VencidosLista: any;
  sucursalServ: any;
  sucSelecPost: any;
  mostrarModalSeleccion!: boolean;
  @Output() GetSucursalEmit: EventEmitter<any>;
  constructor(
    private titleService: Title,
    private calendar: NgbCalendar,
    private dialog: MatDialog,
    private generalServ: GeneralService,
    private route: ActivatedRoute,
    private articuloServ: ArticuloService,
    private globalService: GlobalService,
    private categoriaServ: CategotriaRubroService
  ) {
    titleService.setTitle("Reportes");
    this.GetSucursalEmit = new EventEmitter();
  }

  ngOnInit() {
    var roles = JSON.parse(localStorage.getItem('roles') ?? '');
    var sucursalSeleccionada = JSON.parse(localStorage.getItem('sucursalSeleccionada') ?? '');
    let tieneRolCliente = eval(localStorage.getItem('RolClienteNegotis') ?? '') || false;
    this.verProveedorHabilitado = (roles != null && roles.VisualizarStockProveedor) || tieneRolCliente;
    this.visualizarCantidadXPackHabilitado = (roles != null && roles.VisualizarCantXPack) || tieneRolCliente;
    this.visualizarIDEstadoHabilitado= (roles != null && roles.VisualizarIDEstado) || tieneRolCliente;
    if (sucursalSeleccionada == null) {
      let dataUser = { 'idUser': localStorage.getItem('idUser') };
      this.sucursalServ.sucursalSeleccionadaByUsuario(dataUser)
        .subscribe((data: any) => {
          this.sucSelecPost = data;
          this.GetSucursalEmit.emit(this.sucSelecPost);
          if (sucursalSeleccionada == null && this.mostrarModalSeleccion == true) {
            const dialogRef = this.dialog.open(MensajeseleccionarsucursalModalComponent, {
              width: '450px', hasBackdrop: false
            });
          }
        })
    } else {
      this.GetSucursalEmit.emit(sucursalSeleccionada);
      this.sucSelecPost = sucursalSeleccionada;
    }
  }
  buscar(){

    const loadRef = this.generalServ.loadingModal();
    const dataFiltro = {
      'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
      'idSucursal': this.sucSelecPost.IdSucursal,
    };
    this.articuloServ.getListVencimiento(dataFiltro).subscribe((data: any) => {
      this.VencidosLista = data.articulos;
      this.total = data.total;
      this.formatoFecha();
      loadRef.close();
  }, (error: any) => { console.log(error); loadRef.close(); });
}
formatoFecha() {
  for (const item of this.VencidosLista) {
    const VencimientoTransformed = new Date(item.Vencimiento.match(/\d+/)[0] * 1);
    item.Vencimiento = VencimientoTransformed.getUTCFullYear() + '/' + (VencimientoTransformed.getUTCMonth() + 1) + '/' + VencimientoTransformed.getUTCDate();
  }
}
}
