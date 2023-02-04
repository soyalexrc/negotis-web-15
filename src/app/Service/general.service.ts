import { Injectable } from '@angular/core';
import { LoadingModalComponent } from '../components/loading-modal/loading-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {SearchModalComponent} from '../components/search-modal/search-modal.component';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private dialog: MatDialog, private router: Router) { }

  loadingModal(): any {
    return this.dialog.open(LoadingModalComponent, {
      width: '450px', hasBackdrop: true, disableClose: true
    });
  }

  loadingModalBuscar(): any {
    return this.dialog.open(SearchModalComponent, {
      width: '450px', hasBackdrop: true, disableClose: true
    });
  }

  goToNoEncontrado() {
    this.router.navigate(["/item/noencontrado"], { replaceUrl: true });
  }

}
