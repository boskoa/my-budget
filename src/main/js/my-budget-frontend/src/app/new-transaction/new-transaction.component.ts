import { Component, Input, OnInit } from "@angular/core";
import { NewTransactionModalComponent } from "../new-transaction-modal/new-transaction-modal.component";
import { Account } from "../account/account.component";
import { AccountsService } from "../accounts.service";
import { DefaultCurrencyService } from "../default-currency.service";

@Component({
  selector: "app-new-transaction",
  standalone: true,
  imports: [NewTransactionModalComponent],
  templateUrl: "./new-transaction.component.html",
  styleUrl: "./new-transaction.component.css",
})
export class NewTransactionComponent implements OnInit {
  @Input()
  resetTransactions!: ((target: any) => void) | any;
  @Input()
  resetAccounts!: ((target: any) => void) | any;
  total: string = "";
  accounts: Array<Account> = [];
  defaultCurrency: string = "";

  showTransactionModal: Boolean = false;

  openModal() {
    this.showTransactionModal = true;
  }

  closeModal() {
    this.showTransactionModal = false;
  }

  calculateTotal = () => {
    this.accountsService.getAccounts().subscribe((data) => {
      this.accounts = Object.values(data);
      this.total = new Intl.NumberFormat("sr-SR", {
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(this.accounts.reduce((p, c) => (p += c.balance), 0));
    });
  };

  ngOnInit(): void {
    this.calculateTotal();
    this.defaultCurrency = this.defaultCurrencyService.getDefaultCurrency();
  }

  constructor(
    private accountsService: AccountsService,
    private defaultCurrencyService: DefaultCurrencyService
  ) {}
}
