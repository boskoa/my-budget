import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CurrenciesService } from "../currencies.service";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { AccountsService } from "../accounts.service";

@Component({
  selector: "app-new-account-modal",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./new-account-modal.component.html",
  styleUrl: "./new-account-modal.component.css",
})
export class NewAccountModalComponent implements OnInit {
  @Input()
  resetAccounts!: (target: any) => void;
  @Output()
  closeClicked = new EventEmitter<void>();

  newAccountForm = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(2)]),
    currency: new FormControl("", [Validators.required]),
    amount: new FormControl(0, [Validators.max(1000000)]),
  });

  currencies: String[] = [];

  constructor(
    private currenciesService: CurrenciesService,
    private accountsService: AccountsService
  ) {}

  handleClose() {
    this.closeClicked.emit();
  }

  onSubmit() {
    const error = document.getElementById("error");
    let accountData: AccountData;

    if (error) {
      error.classList.remove("openError");
    }

    if (this.newAccountForm.value.name && this.newAccountForm.value.currency) {
      accountData = {
        name: this.newAccountForm.value.name,
        currency: this.newAccountForm.value.currency,
        balance: Number(this.newAccountForm.value.amount),
      };
      this.accountsService.createAccount(accountData).subscribe((res) => {
        if (res.status === 200) {
          if (error) {
            error.classList.remove("openError");
          }
          this.resetAccounts({ value: "reset" });
          this.handleClose();
        } else {
          if (error) {
            error.innerText = "Transaction failed";
            error.classList.add("openError");
          }
        }
      });
    } else if (
      this.newAccountForm.invalid &&
      (this.newAccountForm.dirty || this.newAccountForm.touched)
    ) {
      if (error) {
        error.innerText =
          "Check form inputs. All data must be entered. Name must have at least 2 characters. Balance must be between 0.01 and 1,000,000.00";
        error.classList.add("openError");
      }
    } else {
      if (error) {
        error.innerText = "Missing input data";
        error.classList.add("openError");
      }
    }
  }

  ngOnInit(): void {
    this.currenciesService.getCurrencies().subscribe((data) => {
      this.currencies = Object.keys(data);
    });
  }
}

export interface AccountData {
  name: string;
  currency: string;
  balance: number;
}
