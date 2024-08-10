import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-page-not-found",
  standalone: true,
  imports: [],
  templateUrl: "./page-not-found.component.html",
  styleUrl: "./page-not-found.component.css",
})
export class PageNotFoundComponent {
  path: String;

  constructor(private route: ActivatedRoute) {
    this.path = this.route.snapshot.url[0].path;
  }
}
