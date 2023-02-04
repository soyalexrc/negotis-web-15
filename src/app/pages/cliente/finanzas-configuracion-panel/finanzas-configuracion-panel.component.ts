import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-finanzas-configuracion-panel',
  templateUrl: './finanzas-configuracion-panel.component.html',
  styleUrls: ['./finanzas-configuracion-panel.component.css']
})
export class FinanzasConfiguracionPanelComponent implements OnInit {
  roles: any;
  rolClienteNegotis: any;

  constructor(private titleService: Title) {
    titleService.setTitle("Finanzas");
   }

  ngOnInit() {
    this.roles = JSON.parse(localStorage.getItem('roles') ?? '');
    this.rolClienteNegotis = localStorage.getItem('RolClienteNegotis');
  }

}
