package com.example.quiz.service.impl;

import com.example.quiz.helper.UserFoundException;
import com.example.quiz.model.User;
import com.example.quiz.model.UserRole;
import com.example.quiz.repo.RoleRepository;
import com.example.quiz.repo.UserRepository;
import com.example.quiz.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class UserServiceImpl implements UserService {


    //    UserDetails

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private static final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);

    public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }


    @Override
    public User createUser(User user, Set<UserRole> userRoles) throws UserFoundException {
        User local = this.userRepository.findByUsername(user.getUsername());
        if (local != null) {
            LOGGER.error("User already exists");
            throw new UserFoundException();
        } else {

            for (UserRole ur : userRoles) {
                roleRepository.save(ur.getRole());
            }

            user.getUserRoles().addAll(userRoles);
            local = this.userRepository.save(user);
        }
        return local;
    }

    @Override
    public User getUser(String username) {
        return this.userRepository.findByUsername(username);
    }

    @Override
    public void deleteUser(Long userId) {
        this.userRepository.deleteById(userId);
    }
}
