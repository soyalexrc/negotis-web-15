import { Component, OnInit } from '@angular/core';
import { RegionService } from '../../../Service/region.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneralService } from '../../../Service/general.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarOperacionExitosaComponent } from '../../../components/snack-bar-operacion-exitosa/snack-bar-operacion-exitosa.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-region-crear-editar',
  templateUrl: './region-crear-editar.component.html',
  styleUrls: ['./region-crear-editar.component.css']
})
export class RegionCrearEditarComponent implements OnInit {

  myForm: FormGroup;
  submitted!: boolean;
  post: any;
  region: any;
  idRegion: any = 0;
  regionById: any;

  constructor(private titleService: Title,private fb: FormBuilder, private regionServ: RegionService, private router: Router,
    private route: ActivatedRoute, private generalServ: GeneralService, private snackBar: MatSnackBar) {
      titleService.setTitle("Zonas");
    this.myForm = fb.group({
      region: ['', Validators.compose([Validators.required])],
    });
    route.params.subscribe(params => { this.idRegion = params['idregion']; });
    if (this.idRegion != null) {
      const loading = this.generalServ.loadingModal();
      let dataRegion = { 'idRegion': this.idRegion, 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
      this.regionServ.getRegionById(dataRegion).subscribe(data => {
        this.regionById = data;
        if (this.regionById == null) {
          loading.close();
          this.generalServ.goToNoEncontrado();
        }
        this.region = this.regionById.Nombre;
        loading.close();
      }, error => { console.log(error); this.generalServ.goToNoEncontrado();loading.close(); })
    } else {
      this.idRegion = 0;
    }
  }

  ngOnInit() {
  }

  onSubmit(value: any) {
    if (this.myForm.valid) {
      const loadRef = this.generalServ.loadingModal();
      let data = {
        'idRegion': this.idRegion, 'idUser': localStorage.getItem('idUser'),
        'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
        'region': value.region
      };
      this.regionServ.crearEditar(data)
        .subscribe(data => {
          this.post = data; loadRef.close();
          if (this.post.Repetido != true) {
            this.router.navigate(["/cliente/region/panel"], { replaceUrl: true });
            this.snackBar.openFromComponent(SnackBarOperacionExitosaComponent, {
              duration: 1000,
            });
          }
        }, error => { console.log(error); loadRef.close(); });
    }
    this.submitted = true;
  }

}
