import { Component, OnInit } from "@angular/core";
import { CurrenciesService } from "../currencies.service";

@Component({
  selector: "app-settings",
  standalone: true,
  imports: [],
  templateUrl: "./settings.component.html",
  styleUrl: "./settings.component.css",
})
export class SettingsComponent implements OnInit {
  currencies: String[] = [];

  constructor(private currenciesService: CurrenciesService) {}

  ngOnInit(): void {
    this.currenciesService.getCurrencies().subscribe((data) => {
      this.currencies = Object.keys(data);
    });
  }
}
