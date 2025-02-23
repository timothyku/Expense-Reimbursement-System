package com.revature.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;


//We can use a global exception handler to clean up our code
//Would you rather:
//Have a try/catch in every single controller for the exception thrown in service?
//OR... have clean controllers and handle all exception stuff here (Preferred)

@RestControllerAdvice //This lets our handler intercept exceptions thrown in any controller
public class GlobalExceptionHandler {

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgumentException(IllegalArgumentException e){
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());

        //401 == UNAUTHORIZED - good for auth errors
        //we send the message in the exception in the response body (should change based on what went wrong)
    }

    //TODO: add more exception handlers, make some custom exceptions


}
