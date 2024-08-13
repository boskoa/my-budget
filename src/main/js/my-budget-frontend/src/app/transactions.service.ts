import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TransactionsService {
  baseUrl = "/api/v1/transactions";

  constructor(private http: HttpClient) {}

  getTransactions(param: string): Observable<Object> {
    return this.http.get<Object>(this.baseUrl + param);
  }
}
