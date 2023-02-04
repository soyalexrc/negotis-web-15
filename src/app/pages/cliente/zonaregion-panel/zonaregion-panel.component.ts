import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-zonaregion-panel',
  templateUrl: './zonaregion-panel.component.html',
  styleUrls: ['./zonaregion-panel.component.css']
})
export class ZonaregionPanelComponent implements OnInit {

  constructor(private titleService: Title) 
  {
    titleService.setTitle("Zonas");
   }

  ngOnInit() {
  }

}
