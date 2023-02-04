import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-finanzas-panel',
  templateUrl: './finanzas-panel.component.html',
  styleUrls: ['./finanzas-panel.component.css']
})
export class FinanzasPanelComponent implements OnInit {

  roles: any;
  rolClienteNegotis: any;
  rolPrestamos:any = false;

  constructor( private titleService: Title)
  {
    titleService.setTitle("Finanzas");
   }

  ngOnInit() {
    this.roles = JSON.parse(localStorage.getItem('roles') ?? '');
    this.rolClienteNegotis = localStorage.getItem('RolClienteNegotis');
    this.rolPrestamos = (this.roles != null && this.roles.Prestamos);
  }

}
