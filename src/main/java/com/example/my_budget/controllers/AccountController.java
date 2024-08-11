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
import com.example.my_budget.repositories.AccountRepository;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class AccountController {
  private AccountRepository accountRepository;

  public AccountController(AccountRepository accountRepository) {
    this.accountRepository = accountRepository;
  }

  @GetMapping("/accounts")
  public ResponseEntity<Iterable<Account>> getAccounts() {
    return new ResponseEntity<>(this.accountRepository.findAll(), HttpStatus.OK);
  }

  @GetMapping("/simple")
  public Iterable<Object> getSimpleAccounts() {
    return this.accountRepository.findAllSimple();
  }

  /*
   * @GetMapping("/accounts")
   * public List<Account> getAccounts() {
   * return (List<Account>) this.accountRepository.findAll();
   * }
   */

  @GetMapping("/accounts/{id}")
  public ResponseEntity<Account> getAccountById(@PathVariable("id") long id) {
    Account account = this.accountRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Account with id " + id + " not found"));

    return new ResponseEntity<>(account, HttpStatus.OK);
  }

  @PostMapping("/accounts")
  public void addAccount(@RequestBody Account account) {
    this.accountRepository.save(account);
  }
}