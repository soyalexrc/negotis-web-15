import { Component, OnInit } from '@angular/core';
import { ListaPreciosService } from '../../../Service/lista-precios.service';
import { EliminarModalComponent } from '../../../components/eliminar-modal/eliminar-modal.component';
import { ErrorforaneaModalComponent } from '../../../components/errorforanea-modal/errorforanea-modal.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GeneralService } from '../../../Service/general.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-listaprecios-panel',
  templateUrl: './listaprecios-panel.component.html',
  styleUrls: ['./listaprecios-panel.component.css']
})
export class ListapreciosPanelComponent implements OnInit {

  nombreCtrl = new FormControl();
  filteredNombre!: Observable<any[]>;

  listadoPrecios: any;
  listadoPreciosOriginal: any;
  nombreFiltro: any;
  estadoFiltro: any = 'true';

  constructor(private titleService: Title,private listPrecServ: ListaPreciosService, public dialog: MatDialog,
    private generalServ: GeneralService)
    {
      titleService.setTitle("Stock");
     }

  ngOnInit() {
    const loading = this.generalServ.loadingModal();
    let dataUser = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
    this.listPrecServ.ListaPreciosByIdClienteNegotis(dataUser)
      .subscribe(data => {
        this.listadoPrecios = data;
        this.listadoPreciosOriginal = data;
          //nombre
          this.filteredNombre = this.nombreCtrl.valueChanges
          .pipe(
            startWith(''),
            map(item => item ? this._filterNombre(item) : this.listadoPreciosOriginal.slice())
          );
        loading.close();
      }, error => { console.log(error); loading.close(); })
  }

  //nombre
  private _filterNombre(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.listadoPreciosOriginal.filter((item: any) => item.Nombre.toLowerCase().includes(filterValue.toLowerCase()));
  }


  delete(value: any) {

    const dialogRef = this.dialog.open(EliminarModalComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        const loadRef = this.generalServ.loadingModal();
        let dataListPrecios = { 'idListaPrecios': value.Id, 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
        this.listPrecServ.eliminarListaPrecios(dataListPrecios).subscribe(data => {
          if (data == true) {
            let index = 0;
            for (let item of this.listadoPrecios) {
              if (item.Id == value.Id) {
                this.listadoPrecios.splice(index, 1)
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
    this.estadoFiltro = 'true';
    this.nombreFiltro = null;
    this.listadoPrecios = this.listadoPreciosOriginal;
  }

  buscar() {
    this.listadoPrecios = this.listadoPreciosOriginal;
    this.listadoPrecios = this.listadoPrecios.filter((s: any) => String(s.Activo) == this.estadoFiltro);
    if (this.nombreFiltro != null && this.nombreFiltro != '') {
      this.listadoPrecios = this.listadoPrecios.filter((s: any) => s.Nombre.toUpperCase().includes(this.nombreFiltro.toUpperCase()));
    }
  }

}
