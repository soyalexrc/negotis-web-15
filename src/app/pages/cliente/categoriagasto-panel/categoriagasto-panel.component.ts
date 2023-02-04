import { Component, OnInit } from '@angular/core';
import { EliminarModalComponent } from '../../../components/eliminar-modal/eliminar-modal.component';
import { ErrorforaneaModalComponent } from '../../../components/errorforanea-modal/errorforanea-modal.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GeneralService } from '../../../Service/general.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CategoriaGastoService } from 'src/app/Service/categoriagasto.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-categoriagasto-panel',
  templateUrl: './categoriagasto-panel.component.html',
  styleUrls: ['./categoriagasto-panel.component.css']
})
export class CategoriagastoPanelComponent implements OnInit {

  catCtrl = new FormControl();
  filteredCat!: Observable<any[]>;

  listadoGasto: any;
  listadoCatRubrOriginal: any;
  filtroNombre: any = '';

  constructor(private titleService: Title,private catRubrServ: CategoriaGastoService, public dialog: MatDialog, private generalServ: GeneralService)
  {
    titleService.setTitle("Caja");
   }

  ngOnInit() {
    this.buscar();
  }

  delete(value: any) {

    const dialogRef = this.dialog.open(EliminarModalComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        const loadRef = this.generalServ.loadingModal();
        let dataCatRubro = { 'id': value.Id, 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
        this.catRubrServ.eliminarCategoriaGasto(dataCatRubro).subscribe((data: any) => {
          if (data == true) {
            let index = 0;
            for (let item of this.listadoGasto) {
              if (item.Id == value.Id) {
                this.listadoGasto.splice(index, 1)
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
        }, (error: any) => { console.log(error); loadRef.close(); })
      }
    });
  }

  limpiar() {
    this.filtroNombre = '';
  }

  buscar() {
    const loading = this.generalServ.loadingModal();
    let data = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
    this.catRubrServ.listadoCategoriaGastoByIdClienteNegotis(data)
      .subscribe((data: any) => {
        console.log(data);
        this.listadoGasto = data;
        this.listadoCatRubrOriginal = data;
        //nombre
        this.listadoGasto = this.listadoGasto.filter((x: any) => x.Nombre.includes(this.filtroNombre));
        loading.close();
      }, (error: any) => { console.log(error); loading.close(); });
  }

  //nombre
  private _filterCat(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.listadoCatRubrOriginal.filter((item: any) => item.Nombre.toLowerCase().includes(filterValue.toLowerCase()));
  }

}
