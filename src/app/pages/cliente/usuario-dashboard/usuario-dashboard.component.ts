import { Component, OnInit } from '@angular/core';
import { ArchivoEmpresaPortadaService } from 'src/app/Service/archivo-empresa-portada.service';
import { GlobalService } from 'src/app/Service/global.service';
import { ImageType } from 'src/app/components/foto-crear-editar-modal/image-type';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-usuario-dashboard',
  templateUrl: './usuario-dashboard.component.html',
  styleUrls: ['./usuario-dashboard.component.css']
})
export class UsuarioDashboardComponent implements OnInit {

  public hasPortraitImageHorizontal : boolean = false;
  public hasPortraitImageVertical : boolean = false;
  public portraitImageVertical : any;
  public portraitImageHorizontal : any;
  public url: any;
  constructor(private titleService: Title,private archivoEmpresaPortadaService: ArchivoEmpresaPortadaService, private globalService: GlobalService) 
  {
    titleService.setTitle("Usuario");
   }

  ngOnInit() {
    let idClienteNegotis = localStorage.getItem('idClienteNegotis');
    let token = localStorage.getItem('token');

    let requestHorizontal = {
      idClienteNegotis : idClienteNegotis,
      imageType : ImageType.Horizontal
    };
    this.url=this.globalService.urlWhatsApp;
    this.archivoEmpresaPortadaService.existe(requestHorizontal).subscribe(response => {
      if (response){
        this.hasPortraitImageHorizontal = true;
        this.portraitImageHorizontal = this.globalService.urlApi +
                          '/ApiArchivoEmpresaPortada/Get?idClienteNegotis=' + idClienteNegotis +
                          '&imageType=' + ImageType.Horizontal +
                          '&token=' + token +
                          '&time=' + new Date();
      }
    });

    let requestVertical = {
      idClienteNegotis : idClienteNegotis,
      imageType : ImageType.Vertical
    };

    this.archivoEmpresaPortadaService.existe(requestVertical).subscribe(response => {
      if (response){
        this.hasPortraitImageVertical = true;

        this.portraitImageVertical = this.globalService.urlApi +
                          '/ApiArchivoEmpresaPortada/Get?idClienteNegotis=' + idClienteNegotis +
                          '&imageType=' + ImageType.Vertical +
                          '&token=' + token +
                          '&time=' + new Date();
      }
    });

    if (!this.hasPortraitImageHorizontal){
      this.portraitImageHorizontal = '../../../../assets/negotis-fondo.jpeg';
    }

    if (!this.hasPortraitImageVertical){
      this.portraitImageVertical = '../../../../assets/negotis-fondo-vertical.PNG';
    }
  }

}
