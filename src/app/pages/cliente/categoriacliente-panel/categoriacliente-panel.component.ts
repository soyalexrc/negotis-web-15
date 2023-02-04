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
import { CategotriaClienteService } from 'src/app/Service/categoria-cliente.service';

@Component({
  selector: 'app-categoriacliente-panel',
  templateUrl: './categoriacliente-panel.component.html',
  styleUrls: ['./categoriacliente-panel.component.css']
})
export class CategoriaclientePanelComponent implements OnInit {

  catCtrl = new FormControl();
  filteredCat!: Observable<any[]>;

  listadoCatCliente: any;
  listadoCatClienteOriginal: any;
  catClienteFiltro: any;
  estadoFiltro: any = 'true';
  limit: number = 100;
  page: number = 1;
  total: number = 0;

  constructor(private titleService: Title,private catClienteServ: CategotriaClienteService, public dialog: MatDialog, private generalServ: GeneralService, private archivoService: ArchivoService,)
  {
    titleService.setTitle("Clientes");
   }

  ngOnInit() {
    const loading = this.generalServ.loadingModal();
    let data = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis'),'Page': this.page };
    this.catClienteServ.listadoCategoriaClienteByIdClienteNegotis(data)
      .subscribe((data: any) => {
        this.listadoCatCliente = data.categorias;
        this.total = data.totalItems;
        this.listadoCatClienteOriginal = data.categorias;
         //nombre
         this.filteredCat = this.catCtrl.valueChanges
         .pipe(
           startWith(''),
           map(item => item ? this._filterCat(item) : this.listadoCatClienteOriginal.slice())
         );
        loading.close();
      }, (error: any) => { console.log(error); loading.close(); });
  }

   //nombre
   private _filterCat(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.listadoCatClienteOriginal.filter((item: any) => item.Nombre.toLowerCase().includes(filterValue.toLowerCase()));
  }




  delete(value: any) {

    const dialogRef = this.dialog.open(EliminarModalComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        const loadRef = this.generalServ.loadingModal();
        let dataCatRubro = { 'idCategoriaCliente': value.Id, 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
        this.catClienteServ.eliminarCategoriaCliente(dataCatRubro).subscribe(data => {
          if (data == true) {
            let index = 0;
            for (let item of this.listadoCatCliente) {
              if (item.Id == value.Id) {
                this.listadoCatCliente.splice(index, 1)
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
    this.catClienteFiltro = null;
    this.estadoFiltro = null;
    this.listadoCatCliente = this.listadoCatClienteOriginal;
  }


  buscar() {
    const loading = this.generalServ.loadingModal();
    let data = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis'),'Page': this.page };
    this.catClienteServ.listadoCategoriaClienteByIdClienteNegotis(data)
      .subscribe((data: any) => {
        this.listadoCatCliente = data.categorias;
        this.total = data.totalItems;
        this.listadoCatClienteOriginal = data.categoriasTotales;
        this.filteredCat = this.catCtrl.valueChanges
         .pipe(
           startWith(''),
           map(item => item ? this._filterCat(item) : this.listadoCatClienteOriginal.slice())
         );
         if (this.estadoFiltro == 'true') { this.estadoFiltro = true; }
         if (this.estadoFiltro == 'false') { this.estadoFiltro = false; }
         this.listadoCatCliente = this.listadoCatClienteOriginal;
         if (this.catClienteFiltro != null && this.catClienteFiltro != '') {
           this.listadoCatCliente = this.listadoCatCliente.filter((s: any) => s.Nombre.toUpperCase().includes(this.catClienteFiltro.toUpperCase()));
         }
         this.listadoCatCliente = this.listadoCatCliente.filter((s: any) => s.Activo == this.estadoFiltro);
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
