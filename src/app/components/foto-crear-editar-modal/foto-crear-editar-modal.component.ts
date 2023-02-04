import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ArchivoService } from '../../Service/archivo.service';
import { GlobalService } from '../../Service/global.service';
import { GeneralService } from '../../Service/general.service';
import { EliminarModalComponent } from '../../components/eliminar-modal/eliminar-modal.component';
import { ArchivoEmpresaPortadaService } from 'src/app/Service/archivo-empresa-portada.service';
import { ImageType } from './image-type';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-foto-crear-editar-modal',
  templateUrl: './foto-crear-editar-modal.component.html',
  styleUrls: ['./foto-crear-editar-modal.component.css']
})
export class FotoCrearEditarModalComponent implements OnInit {

  public imageSourceUri! : string;

  submitted!: boolean;
  newPhotoEmpresa: any;
  post: any;
  idClienteNegotis: any;
  idClienteNegotisSeleccionado: any;
  imageType: ImageType;
  token: any;
  time: any;
  delete!: boolean;
  postExist: any;
  soloImagenes!: any;
  idArticulo: any = 0;
  idCategoria: any = 0;
  idRubro: any = 0;
  editar: any;

  constructor(
    private dialogRef: MatDialogRef<FotoCrearEditarModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private archivoServ: ArchivoService,
    private archivoEmpresaPortadaService: ArchivoEmpresaPortadaService,
    private globalServ: GlobalService,
    private generalServ: GeneralService,
    public dialog: MatDialog
  ) {
    this.idClienteNegotis = localStorage.getItem('idClienteNegotis');
    this.token = localStorage.getItem('token');
    this.time = new Date();
    if(data.idArticulo != null)
    {
      this.idArticulo = data.idArticulo;
    }
    if(data.idCategoria != null)
    {
      this.idCategoria = data.idCategoria;
    }
    if(data.idRubro != null)
    {
      this.idRubro = data.idRubro;
    }
    this.editar = data.editar;
    this.idClienteNegotisSeleccionado = data.idClienteNegotisSeleccionado;
    this.imageType = data.imageType;

    if (this.idClienteNegotisSeleccionado){
      this.archivoEmpresaPortadaService.existe({
        idClienteNegotis: this.idClienteNegotisSeleccionado,
        imageType: this.imageType
      }).subscribe(data => {
        this.postExist = data;
        this.imageSourceUri = this.globalServ.urlApi +
                          '/ApiArchivoEmpresaPortada/Get?idClienteNegotis=' + this.idClienteNegotisSeleccionado +
                          '&imageType=' + this.imageType +
                          '&token=' + this.token +
                          '&time=' + this.time;
      });
    }
    else if(this.idCategoria != 0)
    {
      let dataExist = { 'idClienteNegotis': this.idClienteNegotis, 'idCategoria': this.idCategoria };
      this.archivoServ.existenciaArchivo(dataExist).subscribe(data => {
        this.postExist = data;
        if (this.postExist){
          this.imageSourceUri = this.globalServ.urlApi +
                          '/ApiArchivo/GetArchivo?idClienteNegotis=' + this.idClienteNegotis +
                          '&idArticulo=' + this.idArticulo +
                          '&idCategoria=' + this.idCategoria +
                          '&idRubro=' + this.idRubro +
                          '&token=' + this.token +
                          '&time=' + this.time;
        }
      });
    }
    else if(this.idRubro != 0)
    {
      let dataExist = { 'idClienteNegotis': this.idClienteNegotis, 'idRubro': this.idRubro };
      this.archivoServ.existenciaArchivo(dataExist).subscribe(data => {
        this.postExist = data;
        if (this.postExist){
          this.imageSourceUri = this.globalServ.urlApi +
                          '/ApiArchivo/GetArchivo?idClienteNegotis=' + this.idClienteNegotis +
                          '&idArticulo=' + this.idArticulo +
                          '&idCategoria=' + this.idCategoria +
                          '&idRubro=' + this.idRubro +
                          '&token=' + this.token +
                          '&time=' + this.time;
        }
      });
    }
    else{
      let dataExist = { 'idClienteNegotis': this.idClienteNegotis, 'idArticulo': this.idArticulo };
      this.archivoServ.existenciaArchivo(dataExist).subscribe(data => {
        this.postExist = data;
        if (this.postExist){
          this.imageSourceUri = this.globalServ.urlApi +
                          '/ApiArchivo/GetArchivo?idClienteNegotis=' + this.idClienteNegotis +
                          '&idArticulo=' + this.idArticulo +
                          '&idCategoria=' + this.idCategoria +
                          '&idRubro=' + this.idRubro +
                          '&token=' + this.token +
                          '&time=' + this.time;
        }
      });
    }
  }

  ngOnInit() {

  }

  readUrlFile(event: any) {
    this.submitted = false;
    this.soloImagenes = null;
    if (event.target.files && event.target.files[0]) {
      if (!event.target.files[0].type.includes('image')) {
        this.soloImagenes = true;
        this.newPhotoEmpresa = null;
        return null;
      }
      var reader = new FileReader();

      reader.onload = (event: any) => {
        this.newPhotoEmpresa = event.target.result;
      }

      reader.readAsDataURL(event.target.files[0]);
    }

  }

  cleanPhoto() {
    this.newPhotoEmpresa = null;
  }

  savePhoto() {
    const loadRef = this.generalServ.loadingModal();
    var data = new FormData();
    var files = $("#fileEmpresa").get(0).files;
    if (files.length > 0) {
      if (this.idClienteNegotisSeleccionado){
        data.append("idClienteNegotis", this.idClienteNegotisSeleccionado);
        data.append("imageType", this.imageType.toString());
      }
      else if(this.idCategoria != 0)
      {
        data.append("idClienteNegotis", this.idClienteNegotis);
        data.append("idArticulo", this.idArticulo);
        data.append("idCategoria", this.idCategoria);
        data.append("idRubro", this.idRubro);
        data.append("idUser", localStorage.getItem('idUser') ?? '');
      }
      else if (this.idRubro != 0)
      {
        data.append("idClienteNegotis", this.idClienteNegotis);
        data.append("idArticulo", this.idArticulo);
        data.append("idCategoria", this.idCategoria);
        data.append("idRubro", this.idRubro);
        data.append("idUser", localStorage.getItem('idUser') ?? '');
      }
      else{
        data.append("idClienteNegotis", this.idClienteNegotis);
        data.append("idArticulo", this.idArticulo);
        data.append("idCategoria", this.idCategoria);
        data.append("idRubro", this.idRubro);
        data.append("idUser", localStorage.getItem('idUser') ?? '');
      }

      data.append("fotoEmpresa", files[0]);
      console.log(data);
    }

    if (this.idClienteNegotisSeleccionado){
      this.archivoEmpresaPortadaService.guardar(data).subscribe(data => {
        this.post = data;
        loadRef.close();
      }, error => { console.log(error); loadRef.close(); })
    }
    else{
      this.archivoServ.saveArchivo(data).subscribe(data => {
        this.post = data;
        loadRef.close();
      }, error => { console.log(error); loadRef.close(); })
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  aceptar() {
    this.dialogRef.close();
  }

  deletePhoto() {
    const deleteModal = this.dialog.open(EliminarModalComponent, {
      width: '450px'
    });

    deleteModal.afterClosed().subscribe(result => {
      if (result == true) {
        const loadRef = this.generalServ.loadingModal();

        if (this.idClienteNegotisSeleccionado){
          this.archivoEmpresaPortadaService.borrar({
            idClienteNegotis: this.idClienteNegotisSeleccionado,
            imageType: this.imageType
          }).subscribe(data => {
              if (data == true) {
                this.delete = true;
                this.postExist = false;
                loadRef.close();
              }
            }, error => { console.log(error); loadRef.close(); })
        }
        else{
          let data = { 'idClienteNegotis': this.idClienteNegotis, 'idArticulo': this.idArticulo,'idCategoria': this.idCategoria,'idRubro': this.idRubro }
          this.archivoServ.deleteArchivo(data)
            .subscribe(data => {
              if (data == true) {
                this.delete = true;
                this.postExist = false;
                loadRef.close();
              }
            }, error => { console.log(error); loadRef.close(); })
        }
      }
    });
  }
}
