package com.example.my_budget;

import java.io.File;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.example.my_budget.entities.Account;
import com.example.my_budget.entities.Transaction;
import com.example.my_budget.repositories.AccountRepository;
import com.example.my_budget.repositories.TransactionRepository;

public class XmlParser {
  private AccountRepository accountRepository;
  private TransactionRepository transactionRepository;

  public XmlParser(AccountRepository accountRepository, TransactionRepository transactionRepository) {
    this.accountRepository = accountRepository;
    this.transactionRepository = transactionRepository;
  }

  public void parse() {
    try {
      File inputFile = new File("my_budget_data.xml");

      DocumentBuilderFactory documentBuilderFactory = DocumentBuilderFactory.newInstance();
      DocumentBuilder documentBuilder = documentBuilderFactory.newDocumentBuilder();
      Document xmlDocument = documentBuilder.parse(inputFile);

      NodeList accountsList = xmlDocument.getElementsByTagName("Account");
      int accountsLength = accountsList.getLength();

      for (int i = 0; i < accountsLength; i++) {
        Node accountNode = accountsList.item(i);

        if (accountNode.getNodeType() == Node.ELEMENT_NODE) {
          Element accountElement = (Element) accountNode;
          String name = accountElement.getAttribute("name");
          String currency = accountElement.getAttribute("currency").toLowerCase();
          Account account = new Account(name, currency);
          this.accountRepository.save(account);

          double balance = Double.valueOf(accountElement.getElementsByTagName("Balance").item(0).getTextContent());

          NodeList transactionsList = accountElement.getElementsByTagName("Transaction");
          int transactionsLength = transactionsList.getLength();

          for (int j = 0; j < transactionsLength; j++) {
            Node transactionNode = transactionsList.item(j);
            String description = "";
            double amount = 0;

            if (transactionNode.getNodeType() == Node.ELEMENT_NODE) {
              Element transactionElement = (Element) transactionNode;
              description = transactionElement.getElementsByTagName("Description").item(0).getTextContent();
              amount = Double.valueOf(transactionElement.getElementsByTagName("Amount").item(0).getTextContent());
              balance -= amount;
            }

            Transaction transaction = new Transaction(description, amount, currency, account);
            transactionRepository.save(transaction);
          }

          if (balance > 0) {
            account.changeBalance(balance);
            this.accountRepository.save(account);
            Transaction initialTransaction = new Transaction("Initial transaction", balance,
                currency,
                account);
            this.transactionRepository.save(initialTransaction);
          }
        }
      }
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}
