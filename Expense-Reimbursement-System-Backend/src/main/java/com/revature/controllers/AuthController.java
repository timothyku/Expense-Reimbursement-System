package com.revature.controllers;

import com.revature.models.DTOs.LoginDTO;
import com.revature.models.DTOs.OutgoingUserDTO;
import com.revature.models.User;
import com.revature.services.AuthService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//For authentication - account registration and login functionality
@RestController //Make a class a bean and send JSON responses
@RequestMapping("/auth") //Requests ending in /auth will go to this controller
@CrossOrigin(value = "http://localhost:5173", allowCredentials = "true") //This annotation allows requests from anywhere (e.g. our React app)
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    //Insert a new user (POST request)
    @PostMapping("/register") //Requests ending in /auth/register will invoke this method
    public ResponseEntity<OutgoingUserDTO> registerUser(@RequestBody User user){

        //Send the User data to the service (which will send it to the DAO)
        OutgoingUserDTO returnedUser = authService.registerUser(user);

        //Send the inserted User back to the client in a response
        return ResponseEntity.ok(returnedUser);
    }

    @PostMapping("/login")
    public ResponseEntity<OutgoingUserDTO> login(@RequestBody LoginDTO loginDTO, HttpSession session){

        //Note: we have an HttpSession coming in through parameters, implicitly included in every HTTP request
        //Login is where we set it up

        //Try to login (send the loginDTO to the service)
        OutgoingUserDTO loggedInUser = authService.login(loginDTO);
        //If anything goes wrong, the service throws an exception and our global Exception handler takes over

        //If we get here, the login was successful - we can build up the User's session
        session.setAttribute("userId", loggedInUser.getUserId());
        session.setAttribute("username", loggedInUser.getUsername());
        session.setAttribute("role", loggedInUser.getRole());

        //It's really easy to access these values with getAttribute()!
        System.out.println("User " + session.getAttribute("username") + " has logged in!");

        //Set session timeout to 24 hours
        //session.setMaxInactiveInterval(24 * 60 * 60);

        /*WHY store all this info in a Session?

          -It lets us store user info that can be used for checks throughout the app
            -check that user is logged in (session != null)
            -check that a user's role is appropriate (role.equals("manager")
            -personalize the app (user the user's name in HTTP responses to use them in the UI etc.)
            -simplify our URLs
                -e.g. use the stored userID in "findSomethingByUserId" methods instead of sending it in the PATH
                -This cleans up our URLs and secures them a bit more too.
        */

        //Return the User info to the Client
        return ResponseEntity.ok(loggedInUser);

    }
}
