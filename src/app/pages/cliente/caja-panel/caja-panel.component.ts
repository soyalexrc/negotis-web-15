import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-caja-panel',
  templateUrl: './caja-panel.component.html',
  styleUrls: ['./caja-panel.component.css']
})
export class CajaPanelComponent implements OnInit {

  roles: any;
  rolClienteNegotis: any;


  constructor(private titleService: Title) {
    titleService.setTitle("Caja");
   }

  ngOnInit() {
    this.roles = JSON.parse(localStorage.getItem('roles') ?? '');
    this.rolClienteNegotis = localStorage.getItem('RolClienteNegotis');
  }
}
