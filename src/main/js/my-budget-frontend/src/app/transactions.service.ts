import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Transaction } from "./transaction/transaction.component";
import { TransactionData } from "./new-transaction-modal/new-transaction-modal.component";

@Injectable({
  providedIn: "root",
})
export class TransactionsService {
  baseUrl = "/api/v1/transactions";

  constructor(private http: HttpClient) {}

  getTransactions(param: string): Observable<Object> {
    return this.http.get<Object>(this.baseUrl + param);
  }

  createTransaction(transactionData: TransactionData) {
    return this.http.post(this.baseUrl, transactionData, {
      observe: "response",
    });
  }
}
