import { Component, OnInit } from '@angular/core';
import { AfipService } from '../../../Service/afip.service';
import { GeneralService } from '../../../Service/general.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarOperacionExitosaComponent } from '../../../components/snack-bar-operacion-exitosa/snack-bar-operacion-exitosa.component';
import {AfipModel} from '../../../models/AfipModel';
declare var $: any;

@Component({
  selector: 'app-afip-crear-editar',
  templateUrl: './afip-crear-editar.component.html',
  styleUrls: ['./afip-crear-editar.component.css']
})
export class AfipCrearEditarComponent implements OnInit {

  sinArchivo:any;
  post:any;
  idUser:any;
  sinComprobante!:boolean;
  tipoComprobante:any='';

  constructor(private afipServ:AfipService,private generalServ:GeneralService,
     private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar) {
    route.params.subscribe(params => {
      this.idUser= params['iduser'];
    });
  }

  ngOnInit() {
  }


  saveAfip() {
    const loadRef = this.generalServ.loadingModal();
    var data = new FormData();
    this.post=null;
    var files = $("#filePfx").get(0).files;
    if (files.length > 0) {
      data.append("idClienteNegotis",this.idUser);
      data.append("file",files[0]);
      this.sinArchivo=null;
    }else{
      this.sinArchivo=true;
      loadRef.close();
      return null;
    }
    this.afipServ.crearAfip(data).subscribe(data => {
      this.post = data;
      loadRef.close();
      if(this.post.Resultado==true){
        this.router.navigate(["/superadmin/clientenegotis/afip/panel/"+this.idUser], { replaceUrl: true });
        this.snackBar.openFromComponent(SnackBarOperacionExitosaComponent, {
          duration: 1000,
        });
      }
    }, error => { console.log(error); loadRef.close(); })
  }

}
