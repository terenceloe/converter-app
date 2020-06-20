import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class CurrencyService {
    constructor(private http: HttpClient) {}

    endpoint = "convert";
    access_key = "9420160af2030efa44b6226c602afa98";
    private baseUrl: string = "http://data.fixer.io/api/";


    getCurrencySymbols() {
        return this.http.get(
            this.baseUrl + "symbols?access_key=" + this.access_key
        );
    }

    getCurrency() {
        return this.http.get(this.baseUrl + "latest?access_key=" + this.access_key);
    }
}