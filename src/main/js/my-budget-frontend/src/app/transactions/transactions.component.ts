import { Component, OnInit } from "@angular/core";
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
  constructor(
    private transactionsService: TransactionsService,
    private accountsService: AccountsService
  ) {}

  transactions: Array<Transaction> = [];
  accounts: Array<string> = [];

  ngOnInit(): void {
    this.transactionsService.getTransactions("").subscribe((data) => {
      for (const value of Object.values(data)) {
        this.transactions.push(value);
      }
    });

    this.accountsService.getAccounts().subscribe((data) => {
      for (const value of Object.values(data)) {
        this.accounts.push(value.name);
      }
    });
  }

  onChange(target: any) {
    this.transactions = [];
    if (target.value.length > 0) {
      this.transactionsService
        .getTransactions(`?owner=${target.value}`)
        .subscribe((data) => {
          for (const value of Object.values(data)) {
            this.transactions.push(value);
          }
        });
    } else {
      this.transactionsService.getTransactions("").subscribe((data) => {
        for (const value of Object.values(data)) {
          this.transactions.push(value);
        }
      });
    }
  }
}
