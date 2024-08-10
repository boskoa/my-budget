import { Component } from "@angular/core";

@Component({
  selector: "app-new-transaction",
  standalone: true,
  imports: [],
  templateUrl: "./new-transaction.component.html",
  styleUrl: "./new-transaction.component.css",
})
export class NewTransactionComponent {
  balance: Number = 2000;
}
