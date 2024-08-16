import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DefaultCurrencyService {
  private defaultCurrency: string = "";
  private exchangeRates = {};

  getDefaultCurrency(): string {
    return this.defaultCurrency;
  }

  setDefaultCurrency(currency: string): void {
    this.defaultCurrency = currency.toLowerCase();
    this.setExchangeRates(currency);
  }

  getExchangeRates() {
    this.getCurrencyRates(this.defaultCurrency);
    return this.exchangeRates;
  }

  setExchangeRates(currency: string): void {
    this.http
      .get<Object>(
        `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency.toLowerCase()}.json`
      )
      .subscribe((data) => {
        this.exchangeRates = data;
      });
  }

  getCurrencyRates(currency: string): Observable<Object> {
    return this.http.get<Object>(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency.toLowerCase()}.json`
    );
  }

  constructor(private http: HttpClient) {}
}
