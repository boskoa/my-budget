import { Component, OnInit, SimpleChanges } from "@angular/core";
import {
  Transaction,
  TransactionComponent,
} from "../transaction/transaction.component";
import { NewTransactionComponent } from "../new-transaction/new-transaction.component";
import { NewAccountModalComponent } from "../new-account-modal/new-account-modal.component";
import { TransactionsService } from "../transactions.service";
import { AccountsService } from "../accounts.service";

@Component({
  selector: "app-transactions",
  standalone: true,
  imports: [
    TransactionComponent,
    NewTransactionComponent,
    NewAccountModalComponent,
  ],
  templateUrl: "./transactions.component.html",
  styleUrl: "./transactions.component.css",
})
export class TransactionsComponent implements OnInit {
  lastSelected: string = "";
  transactions: Array<Transaction> = [];
  accounts: Array<string> = [];

  constructor(
    private transactionsService: TransactionsService,
    private accountsService: AccountsService
  ) {}

  ngOnInit(): void {
    this.transactionsService.getTransactions("").subscribe((data) => {
      this.transactions = Object.values(data);
    });

    this.accountsService.getAccounts().subscribe((data) => {
      for (const value of Object.values(data)) {
        this.accounts.push(value.name);
      }
    });
  }

  onChange = (target: any) => {
    this.transactions = [];
    if (target.value === "reset") {
      this.transactionsService
        .getTransactions(this.lastSelected ? `?owner=${this.lastSelected}` : "")
        .subscribe((data) => {
          for (const value of Object.values(data)) {
            this.transactions.push(value);
          }
        });
    } else if (target.value.length > 0) {
      this.transactionsService
        .getTransactions(`?owner=${target.value}`)
        .subscribe((data) => {
          for (const value of Object.values(data)) {
            this.transactions.push(value);
          }
        });
      this.lastSelected = target.value;
    } else {
      this.transactionsService.getTransactions("").subscribe((data) => {
        for (const value of Object.values(data)) {
          this.transactions.push(value);
        }
      });
      this.lastSelected = target.value;
    }
  };
}
