import { Component, Input, OnInit } from "@angular/core";
import { DefaultCurrencyService } from "../default-currency.service";

@Component({
  selector: "app-transaction",
  standalone: true,
  imports: [],
  templateUrl: "./transaction.component.html",
  styleUrl: "./transaction.component.css",
})
export class TransactionComponent implements OnInit {
  @Input() transaction: Transaction | undefined;
  defaultCurrency: string = "";
  exchangeRates: any;
  convertedValue: string = "";

  constructor(private defaultCurrencyService: DefaultCurrencyService) {}

  ngOnInit(): void {
    this.exchangeRates = this.defaultCurrencyService.getExchangeRates();
    this.defaultCurrency = this.defaultCurrencyService.getDefaultCurrency();
    if (this.transaction?.currency && this.exchangeRates) {
      this.convertedValue = new Intl.NumberFormat("sr-SR", {
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(
        this.transaction.amount /
          this.exchangeRates[this.defaultCurrency][this.transaction.currency]
      );
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
