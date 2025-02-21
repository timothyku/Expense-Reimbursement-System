package com.revature.controllers;

import com.revature.models.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//For authentication - account registration and login functionality
@RestController //Make a class a bean and send JSON responses
@RequestMapping("/auth") //Requests ending in /auth will go to this controller
public class AuthController {

    //Insert a new user (POST request)
    @PostMapping("/register") //Requests ending in /auth/register will invoke this method
    public ResponseEntity<?> registerUser(@RequestBody User user){

        //Send the User data to the service (which will send it to the DAO)

        //Get the returned user object and send it back in the response

        return ResponseEntity.ok(user);

    }
}
