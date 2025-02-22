package com.revature.controllers;

import com.revature.models.DTOs.IncomingReimbRequestDTO;
import com.revature.models.ReimbRequest;
import com.revature.services.ReimbRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/requests")
@CrossOrigin
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

}
