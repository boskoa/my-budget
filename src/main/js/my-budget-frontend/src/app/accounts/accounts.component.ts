import { Component } from "@angular/core";
import { NewTransactionComponent } from "../new-transaction/new-transaction.component";
import { AccountComponent } from "../account/account.component";
import { NewAccountModalComponent } from "../new-account-modal/new-account-modal.component";

@Component({
  selector: "app-accounts",
  standalone: true,
  imports: [
    NewTransactionComponent,
    AccountComponent,
    NewAccountModalComponent,
  ],
  templateUrl: "./accounts.component.html",
  styleUrl: "./accounts.component.css",
})
export class AccountsComponent {
  showModal: Boolean = false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
