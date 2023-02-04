import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ZonaService } from '../../../Service/zona.service';
import { GeneralService } from '../../../Service/general.service';
import { RegionService } from '../../../Service/region.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarOperacionExitosaComponent } from '../../../components/snack-bar-operacion-exitosa/snack-bar-operacion-exitosa.component';
import { ZonaModel } from 'src/app/models/ZonaModel';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-zona-crear-editar',
  templateUrl: './zona-crear-editar.component.html',
  styleUrls: ['./zona-crear-editar.component.css']
})

export class ZonaCrearEditarComponent implements OnInit {

  myForm: FormGroup;
  submitted!: boolean;
  Zona: ZonaModel;
  idZona: any;


  constructor(private titleService: Title,private fb: FormBuilder, private zonaServ: ZonaService, private router: Router,
    private route: ActivatedRoute, private generalServ: GeneralService, private regionServ: RegionService,
    private snackBar: MatSnackBar) {
    titleService.setTitle("Zonas");
    this.myForm = fb.group({
      zona: ['', Validators.compose([Validators.required])],
      idRegion: ['', Validators.compose([Validators.required])],
      detalle: ['', Validators.compose([])],
    });
    this.Zona= new ZonaModel();
    route.params.subscribe(params => { this.Zona.idZona = params['idzona']; });
    if (this.Zona.idZona != null) {
      const loading = this.generalServ.loadingModal();
      let dataZona = { 'idZona': this.Zona.idZona, 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
      this.zonaServ.getZonaById(dataZona).subscribe(data => {
        this.Zona.zonaById = data;
        if (this.Zona.zonaById == null) {
          loading.close();
          this.generalServ.goToNoEncontrado();
        }
        this.Zona.zona = this.Zona.zonaById.Nombre;
        this.Zona.idRegion = this.Zona.zonaById.IdRegion;
        this.Zona.detalle =this.Zona.zonaById.Detalle;
        loading.close();
      }, error => { console.log(error); this.generalServ.goToNoEncontrado(); loading.close();})
    } else {
      this.Zona.idZona = 0;
    }
  }

  ngOnInit() {
    const loading = this.generalServ.loadingModal();
    let data = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
    this.regionServ.getRegionesByIdClienteNegotis(data)
      .subscribe(data => { this.Zona.listadoRegion = data;loading.close(); }, error => { console.log(error); loading.close(); })
  }

  onSubmit(value: any) {
    if (this.myForm.valid) {
      const loadRef = this.generalServ.loadingModal();
      let data = {
        'idZona': this.Zona.idZona, 'idUser': localStorage.getItem('idUser'),
        'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
        'zona': value.zona, 'idRegion': value.idRegion,'detalle':value.detalle
      };
      this.zonaServ.crearEditar(data)
        .subscribe(data => {
          this.Zona.post = data; loadRef.close();
          if (this.Zona.post.Repetido != true) {
            this.router.navigate(["/cliente/zona/panel"], { replaceUrl: true });
            this.snackBar.openFromComponent(SnackBarOperacionExitosaComponent, {
              duration: 1000,
            });
          }
        }, error => { console.log(error); loadRef.close(); });
    }
    this.submitted = true;
  }

}
