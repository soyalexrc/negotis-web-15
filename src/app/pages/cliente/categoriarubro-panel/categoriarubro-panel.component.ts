import { Component, OnInit } from '@angular/core';
import { CategotriaRubroService } from '../../../Service/categotria-rubro.service';
import { EliminarModalComponent } from '../../../components/eliminar-modal/eliminar-modal.component';
import { ErrorforaneaModalComponent } from '../../../components/errorforanea-modal/errorforanea-modal.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GeneralService } from '../../../Service/general.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { ArchivoService } from 'src/app/Service/archivo.service';
import { FotoCrearEditarModalComponent } from 'src/app/components/foto-crear-editar-modal/foto-crear-editar-modal.component';

@Component({
  selector: 'app-categoriarubro-panel',
  templateUrl: './categoriarubro-panel.component.html',
  styleUrls: ['./categoriarubro-panel.component.css']
})
export class CategoriarubroPanelComponent implements OnInit {

  catCtrl = new FormControl();
  filteredCat!: Observable<any[]>;

  listadoCatRubr: any;
  listadoCatRubrOriginal: any;
  catRubroFiltro: any;
  estadoFiltro: any = 'true';
  limit: number = 100;
  page: number = 1;
  total: number = 0;

  constructor(private titleService: Title,private catRubrServ: CategotriaRubroService, public dialog: MatDialog, private generalServ: GeneralService, private archivoService: ArchivoService,)
  {
    titleService.setTitle("Stock");
   }

  ngOnInit() {
    const loading = this.generalServ.loadingModal();
    let data = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis'),'Page': this.page };
    this.catRubrServ.listadoCategoriaRubroByIdClienteNegotis(data)
      .subscribe((data: any) => {
        this.listadoCatRubr = data.categorias;
        this.total = data.totalItems;
        this.listadoCatRubrOriginal = data.categorias;
        this.cargarImagenes(this.listadoCatRubrOriginal);
         //nombre
         this.filteredCat = this.catCtrl.valueChanges
         .pipe(
           startWith(''),
           map((item: any) => item ? this._filterCat(item) : this.listadoCatRubrOriginal.slice())
         );
        loading.close();
      }, (error: any) => { console.log(error); loading.close(); });
  }

   //nombre
   private _filterCat(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.listadoCatRubrOriginal.filter((item: any) => item.Nombre.toLowerCase().includes(filterValue.toLowerCase()));
  }


  cargarImagenes(listadoCatRubrOriginal: any[]) {
    listadoCatRubrOriginal.forEach(each => {
      let requestExiste = {
        'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
        'idArticulo':0,
        'idCategoria': each.Id,
        'idRubro': 0
      };

      this.archivoService.existenciaArchivo(requestExiste).subscribe(responseExiste => {
        each.existe = responseExiste;

        if (each.existe) {
          each.imagen = this.archivoService.getArchivoUrl(requestExiste.idClienteNegotis,requestExiste.idArticulo, requestExiste.idCategoria,requestExiste.idRubro);
        }
      });
    });
  }

  delete(value: any) {

    const dialogRef = this.dialog.open(EliminarModalComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        const loadRef = this.generalServ.loadingModal();
        let dataCatRubro = { 'idCategoriaRubro': value.Id, 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
        this.catRubrServ.eliminarCategoriaRubro(dataCatRubro).subscribe((data: any) => {
          if (data == true) {
            let index = 0;
            for (let item of this.listadoCatRubr) {
              if (item.Id == value.Id) {
                this.listadoCatRubr.splice(index, 1)
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
    this.catRubroFiltro = null;
    this.estadoFiltro = null;
    this.listadoCatRubr = this.listadoCatRubrOriginal;
  }

  fotoModal(value: any) {
    const dialogRef = this.dialog.open(FotoCrearEditarModalComponent, {
      width: '750px', data: { idCategoria: value, editar: true },
    });
  }
  buscar() {
    const loading = this.generalServ.loadingModal();
    let data = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis'),'Page': this.page };
    this.catRubrServ.listadoCategoriaRubroByIdClienteNegotis(data)
      .subscribe((data: any) => {
        this.listadoCatRubr = data.categorias;
        this.total = data.totalItems;
        this.listadoCatRubrOriginal = data.categoriasTotales;
        this.filteredCat = this.catCtrl.valueChanges
         .pipe(
           startWith(''),
           map((item: any) => item ? this._filterCat(item) : this.listadoCatRubrOriginal.slice())
         );
         if (this.estadoFiltro == 'true') { this.estadoFiltro = true; }
         if (this.estadoFiltro == 'false') { this.estadoFiltro = false; }
         this.listadoCatRubr = this.listadoCatRubrOriginal;
         if (this.catRubroFiltro != null && this.catRubroFiltro != '') {
           this.listadoCatRubr = this.listadoCatRubr.filter((s: any) => s.Nombre.toUpperCase().includes(this.catRubroFiltro.toUpperCase()));
         }
         this.listadoCatRubr = this.listadoCatRubr.filter((s: any) => s.Activo == this.estadoFiltro);
         loading.close();
      }, (error: any) => { console.log(error); loading.close(); });

  }

  goToPage(n: number): void {
    this.page = n;
    this.buscar();
  }
  onNext(): void {
    this.page++;
    this.buscar();
  }
  onPrev(): void {
    this.page--;
    this.buscar();
  }

}
