package com.revature.models.DTOs;

//Make a cleaner request body when inserting a new request

//We don't want to insert an entire user object to insert a request
//What is the request has like 10 objects it depends on? that's gonna be ugly JSON

//SOLUTION: just pass in the User's ID instead of the whoel object
//Side note: we will also leave out requestId since the DB handles it.

public class IncomingReimbRequestDTO {

    private String description;
    private float amount;
    private String status;
    private int userId;

    //boilerplate--------

    public IncomingReimbRequestDTO() {
    }

    public IncomingReimbRequestDTO(float amount, String description, String status, int userId) {
        this.amount = amount;
        this.description = description;
        this.status = status;
        this.userId = userId;
    }

    public float getAmount() {
        return amount;
    }

    public void setAmount(float amount) {
        this.amount = amount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "IncomingReimbRequestDTO{" +
                "amount=" + amount +
                ", description='" + description + '\'' +
                ", status='" + status + '\'' +
                ", userId=" + userId +
                '}';
    }
}
