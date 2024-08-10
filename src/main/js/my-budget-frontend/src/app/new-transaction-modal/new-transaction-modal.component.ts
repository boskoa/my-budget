import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-new-transaction-modal",
  standalone: true,
  imports: [],
  templateUrl: "./new-transaction-modal.component.html",
  styleUrl: "./new-transaction-modal.component.css",
})
export class NewTransactionModalComponent implements OnInit {
  @Output()
  closeClicked = new EventEmitter<void>();

  handleClose() {
    this.closeClicked.emit();
  }

  accounts = ["First", "Second", "Third"];
  ngOnInit(): void {}
}
