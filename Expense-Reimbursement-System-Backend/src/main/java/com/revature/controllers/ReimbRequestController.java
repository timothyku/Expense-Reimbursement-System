package com.revature.controllers;

import com.revature.models.DTOs.IncomingReimbRequestDTO;
import com.revature.models.ReimbRequest;
import com.revature.services.ReimbRequestService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/requests")
@CrossOrigin(value = "http://localhost:5173", allowCredentials = "true")
public class ReimbRequestController {

    private final ReimbRequestService reimbRequestService;

    @Autowired
    public ReimbRequestController(ReimbRequestService reimbRequestService) {
        this.reimbRequestService = reimbRequestService;
    }

    //A method that inserts a new request into the DB
    @PostMapping
    public ResponseEntity<ReimbRequest> insertRequest(@RequestBody IncomingReimbRequestDTO requestDTO){

        //send the DTO to the service and return the ReimbRequest object that comes back
        return ResponseEntity.accepted().body(reimbRequestService.insertRequest(requestDTO));

    }

    //TODO: get requests by user ID
    @GetMapping("/my-requests")
    public ResponseEntity<List<ReimbRequest>> getMyRequests(HttpSession session){

        int userId = (int) session.getAttribute("userId");

        List<ReimbRequest> myRequests = reimbRequestService.getMyRequests(userId);
        return ResponseEntity.ok(myRequests);
    }

    @GetMapping("/my-pending-requests")
    public ResponseEntity<List<ReimbRequest>> getMyPendingRequests(HttpSession session){

        int userId = (int) session.getAttribute("userId");

        List<ReimbRequest> myPendingRequests = reimbRequestService.getMyPendingRequests(userId, "Pending");
        return ResponseEntity.ok(myPendingRequests);
    }

    @GetMapping("/others-pending-requests")
    public ResponseEntity<List<ReimbRequest>> getOthersPendingRequests(HttpSession session) {

        int userId = (int) session.getAttribute("userId");

        List<ReimbRequest> othersPendingRequests = reimbRequestService.getOthersPendingRequests(userId, "Pending");
        return ResponseEntity.ok(othersPendingRequests);
    }

    @GetMapping("/all-requests")
    public ResponseEntity<List<ReimbRequest>> getAllRequests() {

        List<ReimbRequest> allRequests = reimbRequestService.getAllRequests();
        return ResponseEntity.ok(allRequests);
    }

}
