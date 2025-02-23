package com.revature.services;

import com.revature.DAOs.UserDAO;
import com.revature.models.DTOs.OutgoingUserDTO;
import com.revature.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    private final UserDAO userDAO;

    @Autowired
    public UserService(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    public List<OutgoingUserDTO> getAllUsers(){

        List<User> returnedUsers = userDAO.findAll();

        //Convert the users into a list of UserDTOs
        List<OutgoingUserDTO> userDTOs = new ArrayList<>();

        //Loop through the users, convert them, and add to the DTO list
        for(User u : returnedUsers){
            userDTOs.add(new OutgoingUserDTO(u));
        }

        return userDTOs;
    }

    public void deleteUserById(int userId){
        if (!userDAO.existsById(userId)) {
            throw new RuntimeException("User not found");
        }
        userDAO.deleteById(userId);
    }

}
