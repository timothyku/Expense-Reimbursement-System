package com.revature.services;

import com.revature.DAOs.ReimbRequestDAO;
import com.revature.DAOs.UserDAO;
import com.revature.models.DTOs.IncomingReimbRequestDTO;
import com.revature.models.DTOs.LoginDTO;
import com.revature.models.ReimbRequest;
import com.revature.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReimbRequestService {

    //Autowire the UserDAO and reimbRequestDAO
    private final UserDAO userDAO;
    private final ReimbRequestDAO reimbRequestDAO;

    @Autowired
    public ReimbRequestService(UserDAO userDAO, ReimbRequestDAO reimbRequestDAO) {
        this.userDAO = userDAO;
        this.reimbRequestDAO = reimbRequestDAO;
    }

    //Insert a new request into DB (get user by ID and make a request object with it)
    public ReimbRequest insertRequest(IncomingReimbRequestDTO requestDTO){

        //TODO: input validation

        //Skeleton ReimbRequest object first
            //0 for id since the DB will handle that
            //null for the User since we need to get it first
        ReimbRequest newRequest = new ReimbRequest(
            0,
            requestDTO.getDescription(),
            requestDTO.getAmount(),
            requestDTO.getStatus(),
            null
        );

        //We need to use the userID from the DTO to get a User from the DB
        //findById() returns an Optional
        Optional<User> user = userDAO.findById(requestDTO.getUserId());

        //If the user doesn't exist it will be empty. Let's check for that
        if(user.isEmpty()){
            //TODO: throw an exception

        } else {
            newRequest.setUser(user.get());
            //get() is how we extract data from an optional
        }

        //save the new game to the DB, and return it to the controller
        return reimbRequestDAO.save(newRequest);
    }

    //TODO: get requests by user ID
    public List<ReimbRequest> getMyRequests(int userId){

        return reimbRequestDAO.findByUser_UserId(userId);
    }


}
