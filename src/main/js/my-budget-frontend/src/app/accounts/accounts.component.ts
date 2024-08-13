import { Component, OnInit } from "@angular/core";
import { NewTransactionComponent } from "../new-transaction/new-transaction.component";
import { Account, AccountComponent } from "../account/account.component";
import { NewAccountModalComponent } from "../new-account-modal/new-account-modal.component";
import { AccountsService } from "../accounts.service";

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
export class AccountsComponent implements OnInit {
  constructor(private accountsService: AccountsService) {}

  accounts: Array<Account> = [];
  showAccountModal: Boolean = false;

  openModal() {
    this.showAccountModal = true;
  }

  closeModal() {
    this.showAccountModal = false;
  }

  ngOnInit(): void {
    this.accountsService.getAccounts().subscribe((data) => {
      for (const value of Object.values(data)) {
        this.accounts.push(value);
      }
    });
  }
}
