package com.revature.controllers;

import com.revature.aspects.ManagerOnly;
import com.revature.models.DTOs.OutgoingUserDTO;
import com.revature.models.DTOs.UserIdRequestDTO;
import com.revature.models.DTOs.UserRoleUpdateDTO;
import com.revature.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(value = "http://localhost:5173", allowCredentials = "true")
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    @ManagerOnly //only managers can use this method, thanks to our custom annotation
    public ResponseEntity<List<OutgoingUserDTO>> getAllUsers(){

        return ResponseEntity.ok(userService.getAllUsers());

    }

    @PostMapping("/delete")
    @ManagerOnly
    public ResponseEntity<String> deleteUser(@RequestBody UserIdRequestDTO request){
        int userId = request.getUserId();
        userService.deleteUserById(userId);
        return ResponseEntity.ok("User deleted successfully");
    }

    @PostMapping("/update-role")
    @ManagerOnly
    public ResponseEntity<String> updateUserRole(@RequestBody UserRoleUpdateDTO userRoleUpdateDTO) {
        //System.out.println("Received UseriD: " + userRoleUpdateDTO.getUserId());
        //System.out.println("Received Role: " + userRoleUpdateDTO.getNewRole());

        userService.updateUserRole(userRoleUpdateDTO.getUserId(), userRoleUpdateDTO.getNewRole());
        return ResponseEntity.ok("User role updated successfully.");
    }

}
