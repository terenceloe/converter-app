import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { combineLatest, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  constructor(private http: HttpClient) {}

  private accessKey = '9420160af2030efa44b6226c602afa98';
  private baseUrl = 'http://data.fixer.io/api/';
  allSymbols$ = new BehaviorSubject<
    {
      code: string;
      symbol: string;
    }[]
  >(null);

  getAllCurrencySymbols() {
    return this.http
      .get(this.baseUrl + 'symbols?access_key=' + this.accessKey)
      .pipe(
        map(
          (x: {
            success: boolean;
            symbols?: { [key: string]: string };
            error?: {};
          }) => {
            if (!x.success) {
              throw x.error as Error;
            }
            const symbols = Object.values(x.symbols);
            const codes = Object.keys(x.symbols);
            this.allSymbols$.next(
              codes.map((c, i) => {
                return { code: c, symbol: symbols[i] };
              })
            );
            return codes.map((c, i) => {
              return { code: c, symbol: symbols[i] };
            });
          }
        )
      );
  }
  getCurrency() {
    return this.http
      .get(`${this.baseUrl}latest?access_key=${this.accessKey}`)
      .pipe(
        map((x: { success: boolean; rates?: {}; error?: {} }) => {
          if (!x.success) {
            throw x.error as Error;
          }
          return x.rates;
        })
      );
  }

  getAll() {
    return combineLatest([
      this.getCurrency(),
      this.getAllCurrencySymbols(),
    ]).pipe(
      map((x) => {
        const rates = Object.values(x[0]);
        return x[1].map((c, i: number) => {
          return { rate: rates[i], ...c };
        });
      })
    );
  }
}
