import { Component } from "@angular/core";
import { NewTransactionModalComponent } from "../new-transaction-modal/new-transaction-modal.component";

@Component({
  selector: "app-new-transaction",
  standalone: true,
  imports: [NewTransactionModalComponent],
  templateUrl: "./new-transaction.component.html",
  styleUrl: "./new-transaction.component.css",
})
export class NewTransactionComponent {
  balance: Number = 2000;

  showTransactionModal: Boolean = false;

  openModal() {
    this.showTransactionModal = true;
  }

  closeModal() {
    this.showTransactionModal = false;
  }
}
