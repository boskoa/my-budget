import { Component, DoCheck, Input, OnInit } from "@angular/core";
import { DefaultCurrencyService } from "../default-currency.service";

@Component({
  selector: "app-transaction",
  standalone: true,
  imports: [],
  templateUrl: "./transaction.component.html",
  styleUrl: "./transaction.component.css",
})
export class TransactionComponent implements OnInit, DoCheck {
  @Input() transaction: Transaction | undefined;
  defaultCurrency: string = "";
  exchangeRates: any;
  convertedValue: number = 0;

  constructor(private defaultCurrencyService: DefaultCurrencyService) {}

  ngOnInit(): void {
    this.exchangeRates = this.defaultCurrencyService.getExchangeRates();
    this.defaultCurrency = this.defaultCurrencyService.getDefaultCurrency();
  }

  ngDoCheck() {
    if (
      this.transaction?.currency &&
      this.exchangeRates &&
      this.exchangeRates
    ) {
      this.convertedValue =
        Math.round(
          (this.transaction.amount /
            this.exchangeRates[this.defaultCurrency][
              this.transaction.currency
            ]) *
            100
        ) / 100;
    }
  }
}

export interface Transaction {
  id: number;
  description: string;
  amount: number;
  currency: string;
  account: string;
}
