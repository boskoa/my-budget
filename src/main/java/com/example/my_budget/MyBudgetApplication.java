package com.example.my_budget;

import java.util.Collections;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.web.servlet.error.ErrorViewResolver;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.ModelAndView;

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

	@Bean
	public ErrorViewResolver customErrorViewResolver() {
		final ModelAndView redirectToIndexHtml = new ModelAndView("forward:/index.html", Collections.emptyMap(),
				HttpStatus.OK);
		return (request, status, model) -> status == HttpStatus.NOT_FOUND ? redirectToIndexHtml : null;
	}
}