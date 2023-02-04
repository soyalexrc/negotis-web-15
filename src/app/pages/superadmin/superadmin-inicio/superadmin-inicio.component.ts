import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-superadmin-inicio',
  templateUrl: './superadmin-inicio.component.html',
  styleUrls: ['./superadmin-inicio.component.css']
})
export class SuperadminInicioComponent implements OnInit {
  verSocios:any;
  constructor() {
    
   }

  ngOnInit() {
    this.verSocios = localStorage.getItem('VerSocios');
  }

}
