package com.example.quiz.helper;

public class UserFoundException extends Exception {
    public UserFoundException() {
        super("User with this Username already exists");
    }

    public UserFoundException(String message) {
        super(message);
    }
}

