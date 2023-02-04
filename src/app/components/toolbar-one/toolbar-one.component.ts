import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../../Service/global.service';

@Component({
  selector: 'toolbar-one',
  templateUrl: './toolbar-one.component.html',
  styleUrls: ['./toolbar-one.component.css']
})
export class ToolbarOneComponent implements OnInit {

  constructor(private router: Router,private global:GlobalService) { }

  ngOnInit() {
  }

  openNav() {
    document.getElementById("mySidenav")!.style.width = "250px";
  }

  closeNav() {
    document.getElementById("mySidenav")!.style.width = "0";
  }

  cerrarSesion(){
    localStorage.clear();
    this.router.navigate(["/"]);
  }

}
