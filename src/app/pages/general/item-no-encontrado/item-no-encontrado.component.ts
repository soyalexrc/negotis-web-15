import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-no-encontrado',
  templateUrl: './item-no-encontrado.component.html',
  styleUrls: ['./item-no-encontrado.component.css']
})
export class ItemNoEncontradoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  goBack(){
    window.history.back();
  }

}
