import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { PrestamosPanelComponent } from 'src/app/pages/cliente/prestamos-panel/prestamos-panel.component';
import { PrestamosGuard } from 'src/app/guard/prestamos.guard';
import { PrestamosCrearEditarComponent } from 'src/app/pages/cliente/prestamos-crear-editar/prestamos-crear-editar.component';
import { PrestamosService } from 'src/app/Service/prestamos.service';

const routes: Routes = [
  { path: '', component: PrestamosPanelComponent },
  // ******************General***************************************************
  { path: 'panel', canActivate: [PrestamosGuard], component: PrestamosPanelComponent },
  { path: 'crear', canActivate: [PrestamosGuard], component: PrestamosCrearEditarComponent },
  { path: 'editar/:idprestamo', canActivate: [PrestamosGuard], component: PrestamosCrearEditarComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [
    PrestamosGuard,
    PrestamosService,
  ]
})
export class PrestamosRoutingModule { }
