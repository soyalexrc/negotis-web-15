import { Component, OnInit } from '@angular/core';
import { SucursalService } from '../../../Service/sucursal.service';
import { GeneralService } from '../../../Service/general.service';
import { GlobalService } from '../../../Service/global.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sucursal-seleccionar',
  templateUrl: './sucursal-seleccionar.component.html',
  styleUrls: ['./sucursal-seleccionar.component.css']
})
export class SucursalSeleccionarComponent implements OnInit {

  listSucUsu: any;
  SucSeleccionada: any;
  post: any;

  constructor(private titleService: Title,private sucursalServ: SucursalService, private generalServ: GeneralService,
    private globalServ: GlobalService)
    {
      titleService.setTitle("Usuario");
     }

  ngOnInit() {
    const loading = this.generalServ.loadingModal();
    let dataUser = { 'idUser': localStorage.getItem('idUser') };
    this.sucursalServ.getUsuarioSucursalesByUser(dataUser)
      .subscribe(data => {
        this.listSucUsu = data;
        this.SucSeleccionada = this.listSucUsu.filter((s: any) => s.Seleccionada == true)
        loading.close();
      }, error => { console.log(error); loading.close(); })
  }

  seleccionar(value: any) {
    const loadRef = this.generalServ.loadingModal();
    let dataUser = { 'idUsuarioSucursal': value.Id, 'idUser': localStorage.getItem('idUser') };
    this.sucursalServ.seleccionarSucursal(dataUser)
      .subscribe(data => {
        if (data == true) {
          this.post = value;
          localStorage.setItem('sucursalSeleccionada', JSON.stringify(value));
        }
        loadRef.close();
      }, error => { console.log(error); loadRef.close(); }
      )
  }

}
