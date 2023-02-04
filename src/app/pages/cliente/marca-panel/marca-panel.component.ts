import { Component, OnInit } from '@angular/core';
import { MarcaService } from '../../../Service/marca.service';
import { EliminarModalComponent } from '../../../components/eliminar-modal/eliminar-modal.component';
import { ErrorforaneaModalComponent } from '../../../components/errorforanea-modal/errorforanea-modal.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GeneralService } from '../../../Service/general.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-marca-panel',
  templateUrl: './marca-panel.component.html',
  styleUrls: ['./marca-panel.component.css']
})
export class MarcaPanelComponent implements OnInit {

  nombreCtrl = new FormControl();
  filteredNombre!: Observable<any[]>;

  listadoMarcas: any;
  listadoMarcasOriginal: any;
  marcaFiltro: any;
  estadoFiltro: any = 'true';

  constructor( private titleService: Title,private marcaServ: MarcaService, public dialog: MatDialog, private generalServ: GeneralService)
  {
    titleService.setTitle("Stock");
   }

  ngOnInit() {
    const loading = this.generalServ.loadingModal();
    let data = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
    this.marcaServ.listadoMarcaByIdClienteNegotis(data)
      .subscribe(data => {
        this.listadoMarcas = data;
        this.listadoMarcasOriginal = data;
        //nombre
        this.filteredNombre = this.nombreCtrl.valueChanges
          .pipe(
            startWith(''),
            map(item => item ? this._filterNombre(item) : this.listadoMarcasOriginal.slice())
          );
        loading.close();
      }, error => { console.log(error); loading.close(); })
  }

  //nombre
  private _filterNombre(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.listadoMarcasOriginal.filter((item: any) => item.Nombre.toLowerCase().includes(filterValue.toLowerCase()));
  }

  delete(value: any) {

    const dialogRef = this.dialog.open(EliminarModalComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        const loadRef = this.generalServ.loadingModal();
        let dataMarca = { 'idMarca': value.Id, 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
        this.marcaServ.eliminarMarca(dataMarca).subscribe(data => {
          if (data == true) {
            let index = 0;
            for (let item of this.listadoMarcas) {
              if (item.Id == value.Id) {
                this.listadoMarcas.splice(index, 1)
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
    if (this.estadoFiltro == 'true') { this.estadoFiltro = true; }
    if (this.estadoFiltro == 'false') { this.estadoFiltro = false; }
    this.marcaFiltro = null;
    this.listadoMarcas = this.listadoMarcasOriginal;
  }

  buscar() {
    this.listadoMarcas = this.listadoMarcasOriginal;
    if (this.marcaFiltro != null && this.marcaFiltro != '') {
      this.listadoMarcas = this.listadoMarcas.filter((s: any) => s.Nombre.toUpperCase().includes(this.marcaFiltro.toUpperCase()));
    }
    this.listadoMarcas = this.listadoMarcas.filter((s: any) => s.Activo == this.estadoFiltro);
  }

}
