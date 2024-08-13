import { Component, Input } from "@angular/core";
import { Transaction } from "../transaction/transaction.component";

@Component({
  selector: "app-account",
  standalone: true,
  imports: [],
  templateUrl: "./account.component.html",
  styleUrl: "./account.component.css",
})
export class AccountComponent {
  @Input() account: Account | undefined;
}

export interface Account {
  id: number;
  name: string;
  currency: string;
  balance: number;
  transactions: Array<Transaction>;
}
