import { Component, OnInit } from '@angular/core';
import { RegionService } from '../../../Service/region.service';
import { EliminarModalComponent } from '../../../components/eliminar-modal/eliminar-modal.component';
import { ErrorforaneaModalComponent } from '../../../components/errorforanea-modal/errorforanea-modal.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GeneralService } from '../../../Service/general.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-region-panel',
  templateUrl: './region-panel.component.html',
  styleUrls: ['./region-panel.component.css']
})
export class RegionPanelComponent implements OnInit {

  regionCtrl = new FormControl();
  filteredRegion!: Observable<any[]>;

  listadoRegion: any;
  listadoRegionOriginal: any;
  regionFiltro: any;

  constructor(private titleService: Title,private regionServ: RegionService, public dialog: MatDialog, private generalServ: GeneralService)
  {
    titleService.setTitle("Zonas");
   }

  ngOnInit() {
    const loading = this.generalServ.loadingModal();
    let data = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
    this.regionServ.getRegionesByIdClienteNegotis(data)
      .subscribe(data => {
        this.listadoRegion = data;
        this.listadoRegionOriginal = data;
          //nombre
          this.filteredRegion = this.regionCtrl.valueChanges
          .pipe(
            startWith(''),
            map(item => item ? this._filterRegion(item) : this.listadoRegionOriginal.slice())
          );
        loading.close();
      }, error => { console.log(error); loading.close(); })
  }

  //nombre
  private _filterRegion(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.listadoRegionOriginal.filter((item: any) => item.Nombre.toLowerCase().includes(filterValue.toLowerCase()));
  }

  delete(value: any) {

    const dialogRef = this.dialog.open(EliminarModalComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        const loadRef = this.generalServ.loadingModal();
        let dataRegion = { 'idRegion': value.Id, 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
        this.regionServ.eliminar(dataRegion).subscribe(data => {
          if (data == true) {
            let index = 0;
            for (let item of this.listadoRegion) {
              if (item.Id == value.Id) {
                this.listadoRegion.splice(index, 1)
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
    this.regionFiltro = null;
    this.listadoRegion = this.listadoRegionOriginal;
  }

  buscar() {
    this.listadoRegion = this.listadoRegionOriginal;
    this.listadoRegion = this.listadoRegion.filter((s: any) => s.Nombre.toUpperCase().includes(this.regionFiltro.toUpperCase())
    );
  }

}
