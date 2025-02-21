package com.revature.Expense_Reimbursement_System_Backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan("com.revature.models") //Tells Spring to scan this package for DB entities
@ComponentScan("com.revature") //Tells Spring to scan this package for beans
@EnableJpaRepositories("com.revature.DAOs") //Enables JPA repositories in our DAOs package
public class ExpenseReimbursementSystemBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(ExpenseReimbursementSystemBackendApplication.class, args);

		System.out.println("Expense Reimbursement System App is running");

	}

}
