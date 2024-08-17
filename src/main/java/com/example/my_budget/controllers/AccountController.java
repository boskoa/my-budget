package com.example.my_budget.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.my_budget.ResourceNotFoundException;
import com.example.my_budget.entities.Account;
import com.example.my_budget.entities.Transaction;
import com.example.my_budget.repositories.AccountRepository;
import com.example.my_budget.repositories.TransactionRepository;
import com.example.my_budget.types.AccountForm;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class AccountController {
  private AccountRepository accountRepository;
  private TransactionRepository transactionRepository;

  public AccountController(AccountRepository accountRepository, TransactionRepository transactionRepository) {
    this.accountRepository = accountRepository;
    this.transactionRepository = transactionRepository;
  }

  @GetMapping("/api/v1/accounts")
  public ResponseEntity<Iterable<Account>> getAccounts() {
    return new ResponseEntity<>(this.accountRepository.findAll(), HttpStatus.OK);
  }

  @GetMapping("/api/v1/simple")
  public Iterable<Object> getSimpleAccounts() {
    return this.accountRepository.findAllSimple();
  }

  @GetMapping("/api/v1/accounts/{id}")
  public ResponseEntity<Account> getAccountById(@PathVariable("id") long id) {
    Account account = this.accountRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Account with id " + id + " not found"));

    return new ResponseEntity<>(account, HttpStatus.OK);
  }

  @PostMapping("/api/v1/accounts")
  public void addAccount(@RequestBody AccountForm accountForm) {
    Account newAccount = new Account(accountForm.name, accountForm.currency);
    newAccount.changeBalance(accountForm.balance);
    this.accountRepository.save(newAccount);
    if (accountForm.balance > 0) {
      Transaction initialTransaction = new Transaction("Initial transaction", accountForm.balance, accountForm.currency,
          newAccount);
      this.transactionRepository.save(initialTransaction);
    }
  }
}