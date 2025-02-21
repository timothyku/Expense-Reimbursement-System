package com.revature.models.DTOs;

import com.revature.models.User;

public class OutgoingUserDTO {

    private int userId;
    private String firstname;
    private String lastname;
    private String username;
    private String role;

    //boilerplate ------------------

    public OutgoingUserDTO() {
    }

    public OutgoingUserDTO(int userId, String firstname, String lastname, String username, String role) {
        this.userId = userId;
        this.firstname = firstname;
        this.lastname = lastname;
        this.username = username;
        this.role = role;
    }

    public OutgoingUserDTO(User u){
        this.userId = u.getUserId();
        this.firstname = u.getFirstname();
        this.lastname = u.getLastname();
        this.username = u.getUsername();
        this.role = u.getRole();
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "OutgoingUserDTO{" +
                "userId=" + userId +
                ", firstname='" + firstname + '\'' +
                ", lastname='" + lastname + '\'' +
                ", username='" + username + '\'' +
                ", role='" + role + '\'' +
                '}';
    }
}
