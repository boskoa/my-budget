package com.example.my_budget.repositories;

//import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.my_budget.entities.Transaction;

@Repository
public interface TransactionRepository extends CrudRepository<Transaction, Long> {
  /*
   * @Query("select id, description, amount, currency, owner_id from Transaction")
   * Iterable<Object> findAllSimpleTransactions();
   */
}