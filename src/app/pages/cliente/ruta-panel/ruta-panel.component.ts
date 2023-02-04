import { Component, OnInit } from '@angular/core';
import { RutaService } from '../../../Service/ruta.service';
import { EliminarModalComponent } from '../../../components/eliminar-modal/eliminar-modal.component';
import { ErrorforaneaModalComponent } from '../../../components/errorforanea-modal/errorforanea-modal.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GeneralService } from '../../../Service/general.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-ruta-panel',
  templateUrl: './ruta-panel.component.html',
  styleUrls: ['./ruta-panel.component.css']
})
export class RutaPanelComponent implements OnInit {

  rutaCtrl = new FormControl();
  filteredRuta!: Observable<any[]>;

  listadoRuta: any;
  listadoRutaOriginal: any;
  rutaFiltro: any;

  constructor(private titleService: Title,private rutaServ: RutaService, public dialog: MatDialog, private generalServ: GeneralService)
  {
    titleService.setTitle("Zonas");
   }

  ngOnInit() {
    const loading = this.generalServ.loadingModal();
    let data = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
    this.rutaServ.getRutasByIdClienteNegotis(data)
      .subscribe(data => {
        this.listadoRuta = data;
        this.listadoRutaOriginal = data;
          //nombre
          this.filteredRuta = this.rutaCtrl.valueChanges
          .pipe(
            startWith(''),
            map(item => item ? this._filterRuta(item) : this.listadoRutaOriginal.slice())
          );
        loading.close();
      }, error => { console.log(error); loading.close(); })
  }

  //nombre
  private _filterRuta(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.listadoRutaOriginal.filter((item: any) => item.Nombre.toLowerCase().includes(filterValue.toLowerCase()));
  }

  delete(value: any) {

    const dialogRef = this.dialog.open(EliminarModalComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        const loadRef = this.generalServ.loadingModal();
        let dataRuta = { 'id': value.Id, 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
        this.rutaServ.eliminar(dataRuta).subscribe(data => {
          if (data == true) {
            let index = 0;
            for (let item of this.listadoRuta) {
              if (item.Id == value.Id) {
                this.listadoRuta.splice(index, 1)
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
    this.rutaFiltro = null;
    this.listadoRuta = this.listadoRutaOriginal;
  }

  buscar() {
    this.listadoRuta = this.listadoRutaOriginal;
    this.listadoRuta = this.listadoRuta.filter((s: any) => s.Nombre.toUpperCase().includes(this.rutaFiltro.toUpperCase())
    );
  }

}
