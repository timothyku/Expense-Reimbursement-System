package com.revature.models;

import jakarta.persistence.*;
import org.springframework.stereotype.Component;

@Component //1 of 4 stereotype annotations (make a class a bean - managed by the Spring Container (IOC container))
@Entity //This makes the class a DB entity (means make a new table in the DB)
@Table(name = "users") //Specifies the name of the table in the DB
// keeping the name convention: SQL is "users", Java class is "User"
public class User {

    @Id //This annotation makes this field the PK in the DB table
    @GeneratedValue(strategy = GenerationType.IDENTITY) //This annotation makes the PK auto-increment
    private int userId;

    //We don't need to specify @Column unless we want to define a name, or constraints

    @Column(nullable = false) //so now every User needs a username
    private String userName;
    private String password;
    private String role;

    //boilerplate ----------------
    public User() {
    }

    public User(int userId, String userName, String password, String role) {
        this.userId = userId;
        this.userName = userName;
        this.password = password;
        this.role = role;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", userName='" + userName + '\'' +
                ", password='" + password + '\'' +
                ", role='" + role + '\'' +
                '}';
    }
}
