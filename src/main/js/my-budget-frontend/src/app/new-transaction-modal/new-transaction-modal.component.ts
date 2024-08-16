import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { AccountsService } from "../accounts.service";
import { Account } from "../account/account.component";
import { CurrenciesService } from "../currencies.service";
import { TransactionsService } from "../transactions.service";
import { DefaultCurrencyService } from "../default-currency.service";

@Component({
  selector: "app-new-transaction-modal",
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: "./new-transaction-modal.component.html",
  styleUrl: "./new-transaction-modal.component.css",
})
export class NewTransactionModalComponent implements OnInit {
  @Input()
  resetTransactions!: (target: any) => void;
  @Input()
  resetAccounts!: ((target: any) => void) | any;
  @Input()
  calculateTotal!: () => void;
  @Output()
  closeClicked = new EventEmitter<void>();

  newTransactionForm = new FormGroup({
    description: new FormControl("", [
      Validators.required,
      Validators.minLength(2),
    ]),
    type: new FormControl("", [Validators.required]),
    account: new FormControl("", [Validators.required]),
    amount: new FormControl(0, [
      Validators.required,
      Validators.min(0.01),
      Validators.max(1000000),
    ]),
    currency: new FormControl("", [Validators.required]),
  });

  accounts: Array<Account> = [];
  currencies: string[] = [];

  constructor(
    private accountsService: AccountsService,
    private currenciesService: CurrenciesService,
    private transactionsService: TransactionsService,
    private defaultCurrencyService: DefaultCurrencyService
  ) {}

  handleClose() {
    this.closeClicked.emit();
  }

  onSubmit() {
    const error = document.getElementById("error");
    let transactionData: TransactionData;

    if (error) {
      error.classList.remove("openError");
    }

    if (
      this.newTransactionForm.value.description &&
      this.newTransactionForm.value.amount &&
      this.newTransactionForm.value.currency &&
      this.newTransactionForm.value.account &&
      this.newTransactionForm.value.type
    ) {
      transactionData = {
        description: this.newTransactionForm.value.description,
        amount:
          Number(this.newTransactionForm.value.type) *
          this.newTransactionForm.value.amount,
        convertedAmount: 1,
        currency: this.newTransactionForm.value.currency,
        ownerId: this.newTransactionForm.value.account,
      };

      const accountCurrency: string | undefined = this.accounts.find(
        (a: Account) => a.id == Number(this.newTransactionForm.value.account)
      )?.currency;

      this.defaultCurrencyService
        .getCurrencyRates(this.newTransactionForm.value.currency)
        .subscribe((rates: any) => {
          if (accountCurrency && this.newTransactionForm.value.amount) {
            transactionData.convertedAmount =
              Number(this.newTransactionForm.value.type) *
              this.newTransactionForm.value.amount *
              rates[transactionData.currency][accountCurrency];
          }
          this.transactionsService
            .createTransaction(transactionData)
            .subscribe((res) => {
              if (res.status === 200) {
                if (error) {
                  error.classList.remove("openError");
                }
                if (this.resetTransactions) {
                  this.resetTransactions({ value: "reset" });
                }
                if (this.resetAccounts) {
                  this.resetAccounts();
                }
                this.handleClose();
                this.calculateTotal();
              } else {
                if (error) {
                  error.innerText = "Transaction failed";
                  error.classList.add("openError");
                }
              }
            });
        });
    } else if (
      this.newTransactionForm.invalid &&
      (this.newTransactionForm.dirty || this.newTransactionForm.touched)
    ) {
      if (error) {
        error.innerText =
          "Check form inputs. All data must be entered. Description must have at least 2 characters. Amount must be between 0.01 and 1,000,000.00";
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
    this.accountsService.getAccounts().subscribe((data) => {
      for (const value of Object.values(data)) {
        this.accounts.push(value);
      }
    });

    this.currenciesService.getCurrencies().subscribe((data) => {
      this.currencies = Object.keys(data);
    });
  }
}

export interface TransactionData {
  description: string;
  amount: number;
  convertedAmount: number;
  currency: string;
  ownerId: string;
}
