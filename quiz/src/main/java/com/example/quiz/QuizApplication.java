package com.example.quiz;

import com.example.quiz.helper.UserFoundException;
import com.example.quiz.model.Role;
import com.example.quiz.model.User;
import com.example.quiz.model.UserRole;
import com.example.quiz.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class QuizApplication {


    private final UserService userService;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public QuizApplication(UserService userService, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userService = userService;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }


    public static void main(String[] args) {
        SpringApplication.run(QuizApplication.class, args);
    }

//    @Override
//    public void run(String... args) throws Exception {
//
//        try {
//            System.out.println("starting code");
//
//            User user = new User();
//
//            user.setFirstName("shota");
//            user.setLastName("berelidze");
//            user.setUsername("shotx");
//            user.setPassword(this.bCryptPasswordEncoder.encode("abc"));
//            user.setEmail("shotx@gmail.com");
//            user.setProfile("default.png");
//
//            Role role1 = new Role();
//            role1.setRoleId(44L);
//            role1.setRoleName("ADMIN");
//
//            Set<UserRole> userRoleSet = new HashSet<>();
//            UserRole userRole = new UserRole();
//
//            userRole.setRole(role1);
//
//            userRole.setUser(user);
//            userRoleSet.add(userRole);
//
//
//            User user1 = this.userService.createUser(user, userRoleSet);
//
//            System.out.println(user1.getUsername());
//        } catch (UserFoundException e) {
//            e.printStackTrace();
//        }
//    }
}
