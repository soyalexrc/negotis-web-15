import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { NgbDateStruct, NgbCalendar, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {TranslationWidth} from "@angular/common";

const I18N_VALUES: any = {
  'es': {
    weekdays: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'],
    months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  }
};

@Injectable()
export class I18n {
  language = 'es';
}

@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {

  date: any;

  constructor(private _i18n: I18n) {
    super();
  }

  getWeekdayShortName(weekday: number): string {
    return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
  }
  getMonthShortName(month: number): string {
    return I18N_VALUES[this._i18n.language].months[month - 1];
  }
  getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }

  getWeekdayLabel(weekday: number, width?: TranslationWidth): string {
    return "";
  }
}

@Component({
  selector: 'app-datepicker-modal',
  templateUrl: './datepicker-modal.component.html',
  styleUrls: ['./datepicker-modal.component.css'],
  providers: [I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }]
})
export class DatepickerModalComponent implements OnInit {

  model!: NgbDateStruct;
  fechaHoy!: NgbDateStruct;
  validacionFechaNull!: any;
  validacionFechaPasada!: any;
  permitirFechaPasada!: any;

  constructor(public dialogRef: MatDialogRef<DatepickerModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private calendar: NgbCalendar) {
    if (this.data != null) {
      if (this.data.permitirFechaPasada != null) {
        this.permitirFechaPasada = this.data.permitirFechaPasada;
      }
    }
  }

  ngOnInit() {

  }

  seleccionar() {
    this.validacionFechaPasada = null;
    this.validacionFechaNull = null;
    if (this.model != null) {
      this.fechaHoy = this.calendar.getToday();
      let hoy = new Date(this.fechaHoy.year + '/' + this.fechaHoy.month + '/' + this.fechaHoy.day);
      let fechaSeleccionada = new Date(this.model.year + '/' + this.model.month + '/' + this.model.day);
      if (this.permitirFechaPasada != true) {
        if (fechaSeleccionada >= hoy) {
          this.dialogRef.close(this.model);
        } else {
          this.validacionFechaPasada = true;
        }
      } else {
        this.dialogRef.close(this.model);
      }
    } else {
      this.validacionFechaNull = true;
    }

  }

  close() {
    this.dialogRef.close();
  }

}
