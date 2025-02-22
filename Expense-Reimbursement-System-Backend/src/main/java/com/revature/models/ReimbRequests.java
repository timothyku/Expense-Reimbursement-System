package com.revature.models;

import jakarta.persistence.*;
import org.springframework.stereotype.Component;

@Component
@Entity
@Table(name = "reimb_reqs")
public class ReimbRequests {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reimbId;

    private String description;
    private float amount;
    private String status;

    /* FK connection to the users table PK
    *
    * -cascade: defines how changes to User records will affect the reimb_reqs record
    *   -casecade.ALL = any change to User will be reflected in dependent records
    *
    * -fetch: defines when the data gets loaded
    *   -FetchType.EAGER = dependencies are loaded when the app starts
    *   -FetchType.LAZY = dependencies are loaded on an as-needed basic
    *
    * -What's a dependency? In this case, Reimbursement Requests has a FK to User
    *   -User is a dependency of Reimbursement Requests
    *   -When we fetch a Reimb requests, the DB fetches the appropriate user
    *
    * -JoinColumn: this is how we reference the PK of the users table
    * */
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "userId")
    private User user;

    //boilerplate -----------
    public ReimbRequests() {
    }

    public ReimbRequests(int reimbId, String description, float amount, String status, User user) {
        this.reimbId = reimbId;
        this.description = description;
        this.amount = amount;
        this.status = status;
        this.user = user;
    }

    public int getReimbId() {
        return reimbId;
    }

    public void setReimbId(int reimbId) {
        this.reimbId = reimbId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public float getAmount() {
        return amount;
    }

    public void setAmount(float amount) {
        this.amount = amount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "ReimbRequests{" +
                "reimbId=" + reimbId +
                ", description='" + description + '\'' +
                ", amount=" + amount +
                ", status='" + status + '\'' +
                ", user=" + user +
                '}';
    }
}
