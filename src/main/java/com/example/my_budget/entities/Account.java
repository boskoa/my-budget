package com.example.my_budget.entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Account {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "account_id")
  private long id;
  @Column(name = "name")
  private String name;
  @Column(name = "currency")
  private String currency;
  @Column(name = "balance")
  private double balance;
  @OneToMany(mappedBy = "account", orphanRemoval = true, fetch = FetchType.LAZY)
  private List<Transaction> transactions;

  public Account() {
    this.name = "";
    this.currency = "";
    this.balance = 0;
    this.transactions = null;
  }

  public Account(String name, String currency, double balance) {
    this.name = name;
    this.currency = currency;
    this.balance = balance;
    this.transactions = new ArrayList<>();
  }

  public long getId() {
    return this.id;
  }

  public String getName() {
    return this.name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getCurrency() {
    return this.currency;
  }

  public void setCurrency(String currency) {
    this.currency = currency;
  }

  public double getBalance() {
    return this.balance;
  }

  public void setBalance(double balance) {
    this.balance = balance;
  }

  public void changeBalance(double amount) {
    this.balance += amount;
  }

  public List<Transaction> getTransactions() {
    return this.transactions;
  }

  @Override
  public String toString() {
    return "Account{id=" + this.id +
        ", name=" + this.name +
        ", currency=" + this.currency +
        ", balance=" + this.balance + "}";
  }
}