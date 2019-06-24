package com.amigoscode.demo.exception;

import org.springframework.http.HttpStatus;

import java.time.ZonedDateTime;

public class ApiException {

    private final String message;
    private final HttpStatus httpStatus;
    private final ZonedDateTime timestamp;

    public ApiException(String message,
                        HttpStatus httpStatus,
                        ZonedDateTime timestamp) {
        this.message = message;
        this.httpStatus = httpStatus;
        this.timestamp = timestamp;
    }

    public String getMessage() {
        return message;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }

    public ZonedDateTime getTimestamp() {
        return timestamp;
    }
}
