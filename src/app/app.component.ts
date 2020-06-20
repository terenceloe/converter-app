import { Component, OnInit } from '@angular/core';
import { CurrencyService } from './currency.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as _ from "lodash";
import { MatTableDataSource } from '@angular/material/table';

export interface TableElement {
  position: number;
  currency: string;
  rate: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'converter-app';

  rate = {};
  rates = [];
  rateKeys = [];

  symbol = {};
  symbols = [];
  symbolKeys = [];

  newForm: FormGroup;

  message;
  
  constructor(private _currencyService: CurrencyService) {}

  ngOnInit() {
    this.newForm = new FormGroup({
      from: new FormControl("", Validators.required),
      to: new FormControl("", Validators.required),
      amount: new FormControl("", Validators.required)
    })

    this._currencyService.getCurrency().subscribe(data => {
      this.rate = data["rates"];
      // console.log(this.rate);
      this.rateKeys = Object.keys(this.rate);
      // console.log(this.rateKeys);
      for (var i = 0; i < this.rateKeys.length; i++) {
        this.rates.push({
          code: this.rateKeys[i],
          text: this.rate[this.rateKeys[i]]
        });
      }
    });

    this._currencyService.getCurrencySymbols().subscribe(data => {
      this.symbol = data["symbols"];
      console.log(this.symbol);
      this.symbolKeys = Object.keys(this.symbol);
      console.log(this.symbolKeys);
      for (var i = 0; i < this.symbolKeys.length; i++) {
        this.symbols.push({
          code: this.symbolKeys[i],
          text: this.symbol[this.symbolKeys[i]]
        });
      }
    })
  }

  convert() {
    let from = this.newForm.controls["from"].value; 
    let to = this.newForm.controls["to"].value;
    let amount = this.newForm.controls["amount"].value;
    let toIndex = _.findIndex(this.rates, rate => {
      return rate.code == to;
    });
    let fromIndex = _.findIndex(this.rates, rate => {
      return rate.code == from;
    });
    let ratio = this.rates[toIndex].text / this.rates[fromIndex].text;
    let cal = ratio * amount;
    this.message =
      amount +
      " " +
      this.rates[fromIndex].code +
      " is equal to " +
      cal +
      " " +
      this.rates[toIndex].code;
  }

  
}
