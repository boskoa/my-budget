package com.example.my_budget;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.my_budget.entities.Account;
import com.example.my_budget.entities.Transaction;

@SpringBootTest
class TransactionTests {

  @Test
  void transactionCreationSucceeds() {
    Account account = new Account("Account 1", "eur");
    Transaction transaction = new Transaction("Transaction 1", 100.00, "eur", account);
    assertAll("name currency",
        () -> assertEquals("Transaction 1", transaction.getDescription()),
        () -> assertEquals(100.00, transaction.getAmount()),
        () -> assertEquals("eur", transaction.getCurrency()),
        () -> assertEquals(account.getName(), transaction.getAccount()));
  }
}
