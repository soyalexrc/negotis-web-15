import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-caja-configuracion',
  templateUrl: './caja-configuracion.component.html',
  styleUrls: ['./caja-configuracion.component.css']
})
export class CajaConfiguracionComponent implements OnInit {

  roles: any;
  rolClienteNegotis: any;

  constructor(private titleService: Title)
  {
    titleService.setTitle("Caja");
   }

  ngOnInit() {
    this.roles = JSON.parse(localStorage.getItem('roles') ?? '');
    this.rolClienteNegotis = localStorage.getItem('RolClienteNegotis');
  }
}
