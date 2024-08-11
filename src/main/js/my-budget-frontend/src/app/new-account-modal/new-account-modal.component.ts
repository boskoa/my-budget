import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { CurrenciesService } from "../currencies.service";

@Component({
  selector: "app-new-account-modal",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./new-account-modal.component.html",
  styleUrl: "./new-account-modal.component.css",
})
export class NewAccountModalComponent implements OnInit {
  @Output()
  closeClicked = new EventEmitter<void>();

  constructor(private currenciesService: CurrenciesService) {}

  currencies: String[] = [];

  handleClose() {
    this.closeClicked.emit();
  }

  ngOnInit(): void {
    this.currenciesService.getCurrencies().subscribe((data) => {
      this.currencies = Object.keys(data);
    });
  }
}
