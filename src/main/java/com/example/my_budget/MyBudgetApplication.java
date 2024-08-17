package com.example.my_budget;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

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
			boolean dbIsEmpty = true;
			dbIsEmpty = accountRepository.count() == 0;

			if (dbIsEmpty) {
				System.out.println("Initializing DB");
				XmlParser parser = new XmlParser(accountRepository, transactionRepository);
				parser.parse();
			}

			accountRepository.findAll().forEach((account) -> {
				System.out.println(account);
			});
		};
	}
}
