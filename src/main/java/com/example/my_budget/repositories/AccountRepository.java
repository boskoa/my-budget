package com.example.my_budget.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.my_budget.entities.Account;

@Repository
public interface AccountRepository extends CrudRepository<Account, Long> {
  @Query("select id, name, currency, balance from Account")
  Iterable<Object> findAllSimple();

  Account findByNameIgnoreCase(String name);
}