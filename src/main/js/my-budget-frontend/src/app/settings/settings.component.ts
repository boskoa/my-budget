import { Component, DoCheck, OnInit } from "@angular/core";
import { CurrenciesService } from "../currencies.service";
import { DefaultCurrencyService } from "../default-currency.service";
import { AccountsService } from "../accounts.service";

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
  deleteButtonVisibility: boolean = false;
  deleteResponseVisibility: boolean = false;
  deleteResponseText: string = "";

  constructor(
    private currenciesService: CurrenciesService,
    private defaultCurrencyService: DefaultCurrencyService,
    private accountsService: AccountsService
  ) {}

  onChange(target: any) {
    this.defaultCurrencyService.setDefaultCurrency(target.value);
    window.localStorage.setItem("myBudgetDefaultCurrency", target.value);
  }

  showDeleteButton() {
    this.deleteButtonVisibility = true;
  }

  hideDeleteButton() {
    this.deleteButtonVisibility = false;
    this.deleteResponseVisibility = true;
  }

  handleDelete() {
    this.accountsService.deleteAccounts().subscribe((res) => {
      this.hideDeleteButton();
      if (res.status === 200) {
        this.deleteResponseText = "Data deleted";
      } else {
        this.deleteResponseText = "Deletion failed";
      }
      setTimeout(() => (this.deleteResponseVisibility = false), 3000);
    });
  }

  ngOnInit(): void {
    this.currenciesService.getCurrencies().subscribe((data) => {
      this.currencies = Object.keys(data);
    });

    this.defaultCurrency = this.defaultCurrencyService.getDefaultCurrency();
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
