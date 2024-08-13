import { Component, OnInit } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { DefaultCurrencyService } from "./default-currency.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent implements OnInit {
  title = "My Budget";

  constructor(private defaultCurrencyService: DefaultCurrencyService) {}

  ngOnInit(): void {
    const storedCurrency = window.localStorage.getItem(
      "myBudgetDefaultCurrency"
    );
    if (storedCurrency) {
      this.defaultCurrencyService.setDefaultCurrency(storedCurrency);
    } else {
      this.defaultCurrencyService.setDefaultCurrency("eur");
    }
  }
}
