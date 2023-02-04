import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-producto-panel',
  templateUrl: './producto-panel.component.html',
  styleUrls: ['./producto-panel.component.css']
})
export class ProductoPanelComponent implements OnInit {

  modificarProductosHabilitado: boolean = false;
 visualizarProveedoresHabilitado: boolean = false;
 rolPrecios : boolean= false;

  constructor(private titleService: Title) {
    titleService.setTitle("Stock");
   }

  ngOnInit() {
    var roles = JSON.parse(localStorage.getItem('roles') ?? '');
    let tieneRolCliente = eval(localStorage.getItem('RolClienteNegotis') ?? '') || false;
    this.modificarProductosHabilitado = (roles != null && roles.ModificarProductos) || tieneRolCliente;
    this.visualizarProveedoresHabilitado = (roles != null && roles.Proveedores) || tieneRolCliente;
    this.rolPrecios = (roles != null && roles.Precios) || tieneRolCliente;
  }

}
