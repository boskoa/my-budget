package com.example.my_budget;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.my_budget.entities.Account;

@SpringBootTest
class AccountTests {

  @Test
  void accountCreationSucceeds() {
    Account account = new Account("Account 1", "eur");
    assertAll("name currency",
        () -> assertEquals("Account 1", account.getName()),
        () -> assertEquals("eur", account.getCurrency()));
  }
}
