import { Routes } from "@angular/router";
import { AccountsComponent } from "./accounts/accounts.component";
import { TransactionsComponent } from "./transactions/transactions.component";
import { NotFoundError } from "rxjs";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { SettingsComponent } from "./settings/settings.component";

export const routes: Routes = [
  {
    path: "accounts",
    title: "My Budget - Accounts",
    component: AccountsComponent,
  },
  {
    path: "transactions",
    title: "My Budget - Transactions",
    component: TransactionsComponent,
  },
  {
    path: "settings",
    title: "My Budget - Settings",
    component: SettingsComponent,
  },
  {
    path: "**",
    title: "My Budget - Page not found",
    component: PageNotFoundComponent,
  },
];
