import { Component, Input, OnInit } from "@angular/core";
import { Transaction } from "../transaction/transaction.component";
import { DefaultCurrencyService } from "../default-currency.service";

@Component({
  selector: "app-account",
  standalone: true,
  imports: [],
  templateUrl: "./account.component.html",
  styleUrl: "./account.component.css",
})
export class AccountComponent implements OnInit {
  @Input() account: Account | undefined;
  @Input() balance!: number;
  defaultCurrency: string = "";
  exchangeRates: any;
  convertedValue: string = "";
  formattedBalance: string = "";

  constructor(private defaultCurrencyService: DefaultCurrencyService) {}

  ngOnInit(): void {
    this.exchangeRates = this.defaultCurrencyService.getExchangeRates();
    this.defaultCurrency = this.defaultCurrencyService.getDefaultCurrency();
    if (this.account?.currency && this.exchangeRates) {
      const formatter = new Intl.NumberFormat("sr-SR", {
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      this.convertedValue = formatter.format(
        this.account.balance /
          this.exchangeRates[this.defaultCurrency][this.account.currency]
      );
      this.formattedBalance = formatter.format(this.account.balance);
    }
  }
}

export interface Account {
  id: number;
  name: string;
  currency: string;
  balance: number;
  transactions: Array<Transaction>;
}
