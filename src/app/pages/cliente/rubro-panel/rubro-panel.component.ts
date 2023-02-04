import { Component, OnInit } from '@angular/core';
import { RubroService } from '../../../Service/rubro.service';
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
  selector: 'app-rubro-panel',
  templateUrl: './rubro-panel.component.html',
  styleUrls: ['./rubro-panel.component.css']
})
export class RubroPanelComponent implements OnInit {

  rubroCtrl = new FormControl();
  filteredRubro!: Observable<any[]>;
  catCtrl = new FormControl();
  filteredCat!: Observable<any[]>;

  listadoRubro: any;
  listadoRubroOriginal: any;
  rubroFiltro: any;
  categoriaFiltro: any;
  codigoFiltro: any;
  estadoFiltro: any = 'true';
  limit: number = 100;
  page: number = 1;
  total: number = 0;
  tieneRolImagen: boolean= false;

  constructor(private titleService: Title,private rubroServ: RubroService, private dialog: MatDialog, private generalServ: GeneralService, private archivoService: ArchivoService,)
  {
    titleService.setTitle("Stock");
   }

  ngOnInit() {
    let roles = JSON.parse(localStorage.getItem('roles') ?? '');
    this.tieneRolImagen = (roles != null && roles.ImagenesRubro);
    const loading = this.generalServ.loadingModal();
    let data = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis'),'Page': this.page };
    this.rubroServ.listadoRubroByIdClienteNegotis(data)
      .subscribe((data: any) => {
        this.listadoRubro = data.rubros;
        this.total = data.totalItems;
        this.listadoRubroOriginal = data.rubros;
        if(this.tieneRolImagen)
        {
          this.cargarImagenes(this.listadoRubro);
        }

        console.log(this.listadoRubro);
        //Rubro
        this.filteredRubro = this.rubroCtrl.valueChanges
          .pipe(
            startWith(''),
            map(item => item ? this._filterRubro(item) : this.listadoRubroOriginal.slice())
          );
        //categoria rubro
        this.filteredCat = this.catCtrl.valueChanges
          .pipe(
            startWith(''),
            map(item => item ? this._filterCat(item) : this.listadoRubroOriginal.slice())
          );
        loading.close();
      }, (error: any) => { console.log(error); loading.close(); })
  }

  //Rubro
  private _filterRubro(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.listadoRubroOriginal.filter((item: any) => item.Nombre.toLowerCase().includes(filterValue.toLowerCase()));
  }


  //categoria rubro
  private _filterCat(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.listadoRubroOriginal.filter((item: any) => item.CategoriaRubro.Nombre.toLowerCase().includes(filterValue.toLowerCase()));
  }

  cargarImagenes(listadoRubroOriginal: any[]) {
    listadoRubroOriginal.forEach(each => {
      let requestExiste = {
        'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
        'idArticulo':0,
        'idCategoria': 0,
        'idRubro': each.Id
      };

      this.archivoService.existenciaArchivo(requestExiste).subscribe(responseExiste => {
        each.existe = responseExiste;

        if (each.existe) {
          each.imagen = this.archivoService.getArchivoUrl(requestExiste.idClienteNegotis,requestExiste.idArticulo, requestExiste.idCategoria,requestExiste.idRubro);
        }
      });
    });

  }
  fotoModal(value: any) {
    const dialogRef = this.dialog.open(FotoCrearEditarModalComponent, {
      width: '750px', data: { idRubro: value, editar: true },
    });
  }
  delete(value: any) {

    const dialogRef = this.dialog.open(EliminarModalComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        const loadRef = this.generalServ.loadingModal();
        let dataRubro = { 'idRubro': value.Id, 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
        this.rubroServ.eliminarRubro(dataRubro).subscribe(data => {
          if (data == true) {
            let index = 0;
            for (let item of this.listadoRubro) {
              if (item.Id == value.Id) {
                this.listadoRubro.splice(index, 1)
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
    this.rubroFiltro = null;
    this.categoriaFiltro = null;
    this.codigoFiltro = null;
    this.estadoFiltro = null;
    this.listadoRubro = this.listadoRubroOriginal;
  }

  buscar() {
    const loading = this.generalServ.loadingModal();
    let data = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis'),'Page': this.page };
    this.rubroServ.listadoRubroByIdClienteNegotis(data)
      .subscribe((data: any) => {
        this.listadoRubro = data.rubros;
        this.total = data.totalItems;
        this.listadoRubroOriginal = data.rubrosTotales;
        this.cargarImagenes(this.listadoRubroOriginal);
        this.filteredRubro = this.rubroCtrl.valueChanges
        .pipe(
          startWith(''),
          map(item => item ? this._filterRubro(item) : this.listadoRubroOriginal.slice())

        );
      //categoria rubro
      this.filteredCat = this.catCtrl.valueChanges
        .pipe(
          startWith(''),
          map(item => item ? this._filterCat(item) : this.listadoRubroOriginal.slice())
        );
        if (this.estadoFiltro == 'true') { this.estadoFiltro = true; }
        if (this.estadoFiltro == 'false') { this.estadoFiltro = false; }

        this.listadoRubro = this.listadoRubroOriginal;
        if(this.estadoFiltro == true)
        {
          this.listadoRubro = this.listadoRubro.filter((s: any) => s.Activo != false );
        }
        else
        {
          this.listadoRubro = this.listadoRubro.filter((s: any) => s.Activo != true);
        }
        if (this.rubroFiltro != null && this.rubroFiltro != '') {
          this.listadoRubro = this.listadoRubro.filter((s: any) => s.Nombre.toUpperCase().includes(this.rubroFiltro.toUpperCase())
          );
        }
        if (this.categoriaFiltro != null && this.categoriaFiltro != '') {
          this.listadoRubro = this.listadoRubro.filter((s: any) => s.CategoriaRubro.Nombre.toUpperCase().includes(this.categoriaFiltro.toUpperCase())
          );
        }
        if (this.codigoFiltro != null && this.codigoFiltro != '') {
          this.listadoRubro = this.listadoRubro.filter((s: any) => s.Codigo.toUpperCase().includes(this.codigoFiltro.toUpperCase())
          );
        }



        loading.close();
      }, (error: any) => { console.log(error); loading.close(); })



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
