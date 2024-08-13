package com.example.my_budget;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.example.my_budget.entities.Account;
import com.example.my_budget.entities.Transaction;
import com.example.my_budget.repositories.AccountRepository;
import com.example.my_budget.repositories.TransactionRepository;

@SpringBootApplication
public class MyBudgetApplication {

	public static void main(String[] args) {
		SpringApplication.run(MyBudgetApplication.class, args);
	}

	@Bean
	CommandLineRunner init(AccountRepository accountRepository, TransactionRepository transactionRepository) {
		return (args) -> {
			Account account1 = new Account("Metan", "EUR");
			accountRepository.save(account1);
			Account account2 = new Account("Etan", "USD");
			accountRepository.save(account2);
			Account account3 = new Account("Propan", "EUR");
			accountRepository.save(account3);
			Transaction transaction1 = new Transaction("Lunch", 100, "eur", account1);
			transactionRepository.save(transaction1);

			accountRepository.findAll().forEach((account) -> {
				System.out.println(account);
			});
		};
	}
}
