import { Component } from "@angular/core";
import { TransactionComponent } from "../transaction/transaction.component";
import { NewTransactionComponent } from "../new-transaction/new-transaction.component";

@Component({
  selector: "app-transactions",
  standalone: true,
  imports: [TransactionComponent, NewTransactionComponent],
  templateUrl: "./transactions.component.html",
  styleUrl: "./transactions.component.css",
})
export class TransactionsComponent {}
