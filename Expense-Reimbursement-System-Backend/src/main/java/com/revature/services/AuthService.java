package com.revature.services;

import com.revature.DAOs.UserDAO;
import com.revature.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

//The Service layer is where we put our business logic
//User input validation, Data manipulation/reformatting, User authentication, etc.

@Service //1 of 4 stereotype annotation (make a class a bean)
public class AuthService {

    //Services talk to DAOs, so let's autowire the UserDAO so we can use its method
    private final UserDAO userDAO;

    @Autowired
    public AuthService(UserDAO userDAO) {
        this.userDAO = userDAO;
        //Spring will create an instantiation of this DAO for us
    }

    //This method will take a User object and send it to the DAO
    //It will also return the inserted User to the Controller
    public User registerUser(User user){

        //Input validation

        //We use the save() method to insert data into the DB
        //save() is one of the methods we inherited from JpaRepository
        return userDAO.save(user); //save() returns the data inserted into the DB.
    }
}
