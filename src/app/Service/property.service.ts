import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../Service/global.service';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(public http: HttpClient, private global: GlobalService) { }

  getAllProperties() {
    return this.http.get(this.global.urlApi + '/ApiPropiedades/listado/Propiedades/All', {});
  }

}
