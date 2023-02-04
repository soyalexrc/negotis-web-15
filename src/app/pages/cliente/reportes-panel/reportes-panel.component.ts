import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-reportes-panel',
  templateUrl: './reportes-panel.component.html',
  styleUrls: ['./reportes-panel.component.css']
})
export class ReportesPanelComponent implements OnInit {
  roles: any;
  tieneRolClienteNegotis: any;
  modificarProductosHabilitado: boolean = false;
  produccionHabilitado: boolean = false;
  tieneRolVencimiento: boolean = false;
  tieneRolVenderConStock: boolean = false;
  tieneRolLibros: boolean = false;
  constructor(private titleService: Title,)
  {
    titleService.setTitle("Reportes");
   }

  ngOnInit() {
    this.roles = JSON.parse(localStorage.getItem('roles') ?? '');
     this.tieneRolClienteNegotis = eval(localStorage.getItem('RolClienteNegotis') ?? '') || false;
    const soporte = eval(localStorage.getItem('soporte') ?? '') || false;
     this.tieneRolVenderConStock = (this.roles != null && this.roles.VenderConStock ) || this.tieneRolClienteNegotis || soporte;
    this.modificarProductosHabilitado = (this.roles != null && this.roles.ModificarProductos) || this.tieneRolClienteNegotis || soporte;
    this.tieneRolVencimiento = (this.roles != null && this.roles.VisualizarReporteVencimiento) || this.tieneRolClienteNegotis|| soporte;
    this.produccionHabilitado =  (this.roles != null && this.roles.Produccion) || soporte;
    this.tieneRolLibros =  (this.roles != null && this.roles.VisualizarLibros) || soporte;
  }

}
