import { Component, OnInit, HostListener } from '@angular/core';
import { UserService } from './Service/user.service';
import { GlobalService } from './Service/global.service';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  validNavigation = 0;
  getInfoGral: any;

  constructor(private userServ: UserService, private globalServ: GlobalService, private router: Router) {
    router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd | any) => {
        console.log('prev:', event.url);
        localStorage.setItem('urlPrevia', event.url)
        localStorage.setItem('urlPreviaAfterRedirects', event.urlAfterRedirects);
      });
  }

  ngOnInit(): void {
    //Verifica si la sesión ya esta iniciada
    this.userServ.validarToken(localStorage.getItem('token'))
      .subscribe(data => {
        if (data != true) {
          localStorage.clear();
          this.router.navigate(["/"], { replaceUrl: true });
        } else {
          let dataRol = { 'idUser': localStorage.getItem('idUser') };
          this.userServ.getInfoUserOtros(dataRol).subscribe(data => {
            this.getInfoGral = data;
            localStorage.setItem('roles', JSON.stringify(this.getInfoGral.Roles));
            localStorage.setItem('userName', JSON.stringify(this.getInfoGral.UserName));
          })
          if (localStorage.getItem('RolSuperAdmin') == 'true') {
            if (this.router.url == '/') {
              this.router.navigate(['/superadmin/inicio'], { replaceUrl: true });
            } else {
              this.router.navigate([this.router.url], { replaceUrl: true });
            }
          } else if (localStorage.getItem('urlPrevia') == localStorage.getItem('urlAfterRedirects')){
            this.router.navigate([localStorage.getItem('urlPrevia') ? localStorage.getItem('urlPrevia') : this.router.url], { replaceUrl: true });
          }
        };
      }, error => {
        console.log(error);
        localStorage.clear();
        this.router.navigate(["/"], { replaceUrl: true });
      });
    const self = this;
    self.registerDOMEvents();
  }

  registerDOMEvents() {
    const self = this;
    window.addEventListener('unload', () => {
      if (self.validNavigation === 0) {
        if (localStorage.getItem('mantenerSesion') != 'true') {
          localStorage.clear();
        }
      }
    });
    document.addEventListener('keydown', (e) => {
      const key = e.which || e.keyCode;
      if (key === 116) {
        self.validNavigation = 1;
      }
    });
  }

}
