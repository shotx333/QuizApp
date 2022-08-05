package com.example.quiz.service;

import com.example.quiz.model.User;
import com.example.quiz.model.UserRole;

import java.util.Set;

public interface UserService {

    User createUser(User user, Set<UserRole> userRoles) throws Exception;


    User getUser(String username);

    void deleteUser(Long userId);
}
