import { Component, OnInit } from '@angular/core';
import { ZonaService } from '../../../Service/zona.service';
import { EliminarModalComponent } from '../../../components/eliminar-modal/eliminar-modal.component';
import { ErrorforaneaModalComponent } from '../../../components/errorforanea-modal/errorforanea-modal.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GeneralService } from '../../../Service/general.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-zona-panel',
  templateUrl: './zona-panel.component.html',
  styleUrls: ['./zona-panel.component.css']
})
export class ZonaPanelComponent implements OnInit {

  zonaCtrl = new FormControl();
  filteredZona!: Observable<any[]>;

  listadoZonas: any;
  listadoZonasOriginal: any;
  zonaFiltro: any;

  constructor(private titleService: Title,private zonaServ: ZonaService, public dialog: MatDialog, private generalServ: GeneralService)
  {
    titleService.setTitle("Zonas");
   }

  ngOnInit() {
    const loading = this.generalServ.loadingModal();
    let data = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
    this.zonaServ.listadoZonasByIdClienteNegotis(data)
      .subscribe(data => {
        this.listadoZonas = data;
        this.listadoZonasOriginal = data;
        //nombre
        this.filteredZona = this.zonaCtrl.valueChanges
          .pipe(
            startWith(''),
            map(item => item ? this._filterZona(item) : this.listadoZonasOriginal.slice())
          );
        loading.close();
      }, error => { console.log(error); loading.close(); })
  }

   //nombre
   private _filterZona(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.listadoZonasOriginal.filter((item: any) => item.Nombre.toLowerCase().includes(filterValue.toLowerCase()));
  }

  delete(value: any) {

    const dialogRef = this.dialog.open(EliminarModalComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        const loadRef = this.generalServ.loadingModal();
        let dataZona = { 'idZona': value.Id, 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
        this.zonaServ.deleteZona(dataZona).subscribe(data => {
          if (data == true) {
            let index = 0;
            for (let item of this.listadoZonas) {
              if (item.Id == value.Id) {
                this.listadoZonas.splice(index, 1)
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
    this.zonaFiltro = null;
    this.listadoZonas = this.listadoZonasOriginal;
  }

  buscar() {
    this.listadoZonas = this.listadoZonasOriginal;
    this.listadoZonas = this.listadoZonas.filter((s: any) => s.Nombre.toUpperCase().includes(this.zonaFiltro.toUpperCase().toUpperCase())
    );
  }

}
