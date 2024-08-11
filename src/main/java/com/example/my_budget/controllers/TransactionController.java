package com.example.my_budget.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.my_budget.entities.Transaction;
import com.example.my_budget.repositories.TransactionRepository;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class TransactionController {
  private TransactionRepository transactionRepository;

  public TransactionController(TransactionRepository transactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  @GetMapping("/transactions")
  public ResponseEntity<Iterable<Transaction>> getTransactions() {
    return new ResponseEntity<>(this.transactionRepository.findAll(), HttpStatus.OK);
  }

  @PostMapping("/transactions")
  public void addTransaction(@RequestBody Transaction transaction) {
    this.transactionRepository.save(transaction);
  }
}