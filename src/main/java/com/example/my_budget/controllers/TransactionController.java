package com.example.my_budget.controllers;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.my_budget.ResourceNotFoundException;
import com.example.my_budget.entities.Account;
import com.example.my_budget.entities.Transaction;
import com.example.my_budget.repositories.AccountRepository;
import com.example.my_budget.repositories.TransactionRepository;
import com.example.my_budget.types.TransactionForm;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class TransactionController {
  private TransactionRepository transactionRepository;
  private AccountRepository accountRepository;

  public TransactionController(TransactionRepository transactionRepository, AccountRepository accountRepository) {
    this.transactionRepository = transactionRepository;
    this.accountRepository = accountRepository;
  }

  @GetMapping("/api/v1/transactions")
  public ResponseEntity<Iterable<Transaction>> getTransactions(@RequestParam("owner") Optional<String> owner) {
    if (!owner.isPresent()) {
      return new ResponseEntity<>(this.transactionRepository.findAll(), HttpStatus.OK);
    } else {
      Account account = this.accountRepository.findByNameIgnoreCase(owner.get().replaceAll("\"", ""));
      return new ResponseEntity<>(this.transactionRepository.findAllByAccount(account), HttpStatus.OK);
    }
  }

  @GetMapping("/api/v1/transactions/{id}")
  public ResponseEntity<Transaction> getTransactionById(@PathVariable("id") long id) {
    Transaction transaction = this.transactionRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Transaction with id " + id + " not found"));

    return new ResponseEntity<>(transaction, HttpStatus.OK);
  }

  @PostMapping("/api/v1/transactions")
  public ResponseEntity<?> addTransaction(@RequestBody TransactionForm transactionForm) {
    Transaction newTransaction;
    try {
      Account account = accountRepository.findById(transactionForm.ownerId).get();
      newTransaction = new Transaction(transactionForm.description, transactionForm.amount,
          transactionForm.currency,
          account);
      this.transactionRepository.save(newTransaction);
      account.changeBalance(transactionForm.convertedAmount);
      this.accountRepository.save(account);
      return new ResponseEntity<>(newTransaction, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>("Error " + e.getMessage(), HttpStatus.BAD_REQUEST);
    }
  }
}