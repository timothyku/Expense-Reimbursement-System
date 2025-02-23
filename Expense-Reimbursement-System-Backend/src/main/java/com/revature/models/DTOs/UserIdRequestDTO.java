package com.revature.models.DTOs;

public class UserIdRequestDTO {
    private int userId;

    public UserIdRequestDTO() {
    }

    public UserIdRequestDTO(int userId) {
        this.userId = userId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}
