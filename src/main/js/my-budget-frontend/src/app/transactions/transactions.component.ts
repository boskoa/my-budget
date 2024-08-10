import { Component } from "@angular/core";
import { TransactionComponent } from "../transaction/transaction.component";
import { NewTransactionComponent } from "../new-transaction/new-transaction.component";
import { NewAccountModalComponent } from "../new-account-modal/new-account-modal.component";

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
export class TransactionsComponent {}
