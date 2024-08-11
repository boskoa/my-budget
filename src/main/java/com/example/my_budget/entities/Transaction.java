package com.example.my_budget.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Transaction {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "transaction_id")
  private long id;
  @Column(name = "description")
  private String description;
  @Column(name = "amount")
  private double amount;
  @Column(name = "currency")
  private String currency;
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "owner_id", referencedColumnName = "account_id")
  private Account account;

  public Transaction() {
    this.description = "";
    this.amount = 0;
    this.currency = "";
    this.account = null;
  }

  public Transaction(String description, double amount, String currency, Account account) {
    this.description = description;
    this.amount = amount;
    this.currency = currency;
    this.account = account;
  }

  public long getId() {
    return this.id;
  }

  public String getDescription() {
    return this.description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public double getAmount() {
    return this.amount;
  }

  public void setAmount(double amount) {
    this.amount = amount;
  }

  public String getCurrency() {
    return this.currency;
  }

  public void setCurrency(String currency) {
    this.currency = currency;
  }

  public String getAccount() {
    return this.account.getName();
  }

  public void setAccount(Account account) {
    this.account = account;
  }

  @Override
  public String toString() {
    return "Transaction{id=" + this.id +
        ", description=" + this.description +
        ", amount=" + this.amount +
        ", currency=" + this.currency +
        ", {" + this.account.getName() +
        "}}";
  }
}
