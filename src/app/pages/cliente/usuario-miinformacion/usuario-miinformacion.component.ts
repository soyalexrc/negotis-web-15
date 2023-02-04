import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../Service/user.service';
import { GeneralService } from '../../../Service/general.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-usuario-miinformacion',
  templateUrl: './usuario-miinformacion.component.html',
  styleUrls: ['./usuario-miinformacion.component.css']
})
export class UsuarioMiinformacionComponent implements OnInit {

  userInfo: any;

  constructor(private titleService: Title,private userServ: UserService, private generalServ: GeneralService)
  {
    titleService.setTitle("Usuario");
   }

  ngOnInit() {
    const loading = this.generalServ.loadingModal();
    let dataUser = { 'idUser': localStorage.getItem('idUser') };
    this.userServ.getUserById(dataUser).subscribe((data: any) => {
      this.userInfo = data;
      loading.close();
    }, (error: any) => { console.log(error); loading.close(); })
  }

}
