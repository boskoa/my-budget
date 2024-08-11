import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CurrenciesService {
  url =
    "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json";

  constructor(private http: HttpClient) {}

  getCurrencies(): Observable<Object> {
    return this.http.get<Object>(this.url);
  }
}
