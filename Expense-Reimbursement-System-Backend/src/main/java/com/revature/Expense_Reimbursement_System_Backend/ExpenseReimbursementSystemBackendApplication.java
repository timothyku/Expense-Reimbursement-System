package com.revature.Expense_Reimbursement_System_Backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@EntityScan("com.revature.models") //Tells Spring to scan this package for DB entities
@ComponentScan("com.revature") //Tells Spring to scan this package for beans
public class ExpenseReimbursementSystemBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(ExpenseReimbursementSystemBackendApplication.class, args);

		System.out.println("Expense Reimbursement System App is running");

	}

}
