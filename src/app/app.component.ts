import { Component, OnInit } from '@angular/core';
import { CurrencyService } from './currency.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { MatTableDataSource } from '@angular/material/table';
import { catchError } from 'rxjs/operators';

export interface TableElement {
  position: number;
  currency: string;
  rate: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'converter-app';

  newForm: FormGroup;
  error;
  data;

  message;
  currSymbols$ = this.currencyService.allSymbols$;

  constructor(private currencyService: CurrencyService) {
    this.newForm = new FormGroup({
      from: new FormControl('', Validators.required),
      to: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.currencyService
      .getAllCurrencySymbols()
      .pipe(catchError((err) => (this.error = err)))
      .subscribe();
    this.currencyService.getAll().subscribe((res) => {
      this.data = res;
      console.log(this.data);
    });
  }

  convert(value) {
    console.log(value);
    this.currencyService.getCurrency().subscribe((res) => {
      console.log(res);
    });

    // let from = this.newForm.controls['from'].value;
    // let to = this.newForm.controls['to'].value;
    // let amount = this.newForm.controls['amount'].value;
    // let toIndex = _.findIndex(this.rates, (rate) => {
    //   return rate.code == to;
    // });
    // let fromIndex = _.findIndex(this.rates, (rate) => {
    //   return rate.code == from;
    // });
    // let ratio = this.rates[toIndex].text / this.rates[fromIndex].text;
    // let cal = ratio * amount;
    // this.message =
    //   amount +
    //   ' ' +
    //   this.rates[fromIndex].code +
    //   ' is equal to ' +
    //   cal +
    //   ' ' +
    //   this.rates[toIndex].code;
  }
}
