import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AccountData } from "./new-account-modal/new-account-modal.component";

@Injectable({
  providedIn: "root",
})
export class AccountsService {
  baseUrl = "/api/v1/accounts";

  constructor(private http: HttpClient) {}

  getAccounts(): Observable<Object> {
    return this.http.get<Object>(this.baseUrl);
  }

  createAccount(accountData: AccountData) {
    return this.http.post(this.baseUrl, accountData, {
      observe: "response",
    });
  }

  deleteAccounts() {
    return this.http.delete<Object>(this.baseUrl, {
      observe: "response",
    });
  }
}
