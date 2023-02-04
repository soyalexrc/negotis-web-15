import { Component, OnInit } from '@angular/core';
import { RubroService } from '../../../Service/rubro.service';
import { CategotriaRubroService } from '../../../Service/categotria-rubro.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneralService } from '../../../Service/general.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog } from '@angular/material/dialog';
import { SnackBarOperacionExitosaComponent } from '../../../components/snack-bar-operacion-exitosa/snack-bar-operacion-exitosa.component';
import { UserService } from 'src/app/Service/user.service';
import { EliminarModalComponent } from 'src/app/components/eliminar-modal/eliminar-modal.component';
import { ErrorforaneaModalComponent } from 'src/app/components/errorforanea-modal/errorforanea-modal.component';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-tarjeta-panel',
  templateUrl: './tarjeta-panel.component.html',
  styleUrls: ['./tarjeta-panel.component.css']
})
export class TarjetaPanelComponent implements OnInit {


  myForm: FormGroup;
  submitted!: boolean;
  post: any;
  rubro: any;
  idTarjeta: any = 0;
  porcentaje: any;
  nombre: any;
  tipoTarjeta: any="";
  rubroById: any;


  constructor(private titleService: Title,private fb: FormBuilder, private userServ: UserService,public dialog: MatDialog, private router: Router,
    private route: ActivatedRoute, private generalServ: GeneralService, private snackBar: MatSnackBar,
    private categRubro:CategotriaRubroService) {
    titleService.setTitle("Usuario");
    this.myForm = fb.group({
      'nombre': ['', Validators.compose([Validators.required])],
      'porcentaje': ['', Validators.compose([])],
      'tipoTarjeta': ['', Validators.compose([])],

    });
    //route.params.subscribe(params => { this.idTarjeta = params['idtarjeta']; });
    //if (this.idTarjeta != null) {
    //  const loading = this.generalServ.loadingModal();
   //   let dataRubro = { 'idTarjeta': this.idTarjeta, 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
   //   this.rubroServ.getRubroById(dataRubro).subscribe(data => {
   //     this.rubroById = data;
    //    if (this.rubroById == null) {
    //      loading.close();
      //    this.generalServ.goToNoEncontrado();
    //    }
   //     this.rubro = this.rubroById.Nombre;
   //     this.categoria = this.rubroById.IdCategoriaRubro;
    //    this.codigo = this.rubroById.Codigo;
    //    loading.close();
    //  }, error => { console.log(error); this.generalServ.goToNoEncontrado();loading.close(); })
    //} else {
  //    this.idRubro = 0;
  //  }
  }

  ngOnInit() {



      const loadRef = this.generalServ.loadingModal();
     let data = {
         'idUser' : localStorage.getItem('idUser'),
        'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
        'token' : localStorage.getItem("token")
     }
      this.userServ.obtenerTodasTarjetas(data)
        .subscribe((data: any) => {
          this.post = data; loadRef.close();

        }, (error: any) => { console.log(error); loadRef.close(); });

    this.submitted = true;
  }

  delete(value: any) {

    const dialogRef = this.dialog.open(EliminarModalComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        const loadRef = this.generalServ.loadingModal();
        let dataCatRubro = {  'idClienteNegotis': localStorage.getItem('idClienteNegotis'),'idUser':localStorage.getItem('idUser') ,'idTarjeta': value.Id};
        this.userServ.eliminarTarjeta(dataCatRubro).subscribe(data => {
          if (data == true) {
            let index = 0;
            for (let item of this.post) {
              if (item.Id == value.Id) {
                this.post.splice(index, 1)
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

}
