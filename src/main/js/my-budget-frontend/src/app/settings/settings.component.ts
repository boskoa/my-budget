import { Component, DoCheck, OnInit } from "@angular/core";
import { CurrenciesService } from "../currencies.service";
import { DefaultCurrencyService } from "../default-currency.service";

@Component({
  selector: "app-settings",
  standalone: true,
  imports: [],
  templateUrl: "./settings.component.html",
  styleUrl: "./settings.component.css",
})
export class SettingsComponent implements OnInit, DoCheck {
  currencies: string[] = [];
  defaultCurrency: string = "eur";
  exchangeRatesDate = "";

  constructor(
    private currenciesService: CurrenciesService,
    private defaultCurrencyService: DefaultCurrencyService
  ) {}

  ngOnInit(): void {
    this.currenciesService.getCurrencies().subscribe((data) => {
      this.currencies = Object.keys(data);
    });

    this.defaultCurrency = this.defaultCurrencyService.getDefaultCurrency();
  }

  onChange(target: any) {
    this.defaultCurrencyService.setDefaultCurrency(target.value);
    window.localStorage.setItem("myBudgetDefaultCurrency", target.value);
  }

  ngDoCheck() {
    const exchangeRates: any = this.defaultCurrencyService.getExchangeRates();
    if (exchangeRates.date) {
      this.exchangeRatesDate = new Intl.DateTimeFormat("sr-RS").format(
        new Date(exchangeRates.date)
      );
    }
  }
}
