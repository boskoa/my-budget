import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AccountsService {
  baseUrl = "/api/v1/accounts";

  constructor(private http: HttpClient) {}

  getAccounts(): Observable<Object> {
    return this.http.get<Object>(this.baseUrl);
  }
}
