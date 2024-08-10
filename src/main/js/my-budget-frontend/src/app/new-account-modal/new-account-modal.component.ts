import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Component, EventEmitter, inject, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-new-account-modal",
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: "./new-account-modal.component.html",
  styleUrl: "./new-account-modal.component.css",
})
export class NewAccountModalComponent implements OnInit {
  @Output()
  closeClicked = new EventEmitter<void>();

  httpClient = inject(HttpClient);
  currencies: String[] = [];

  handleClose() {
    this.closeClicked.emit();
  }

  ngOnInit(): void {
    this.fetchCurrencies();
  }

  fetchCurrencies() {
    this.httpClient
      .get(
        "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json"
      )
      .subscribe((data) => {
        console.log(data);
        this.currencies = Object.keys(data);
      });
  }
}
