package com.restaurant.app.controller;

import com.restaurant.app.model.User;
import com.restaurant.app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {


    @Autowired
    private final UserRepository userRepository;

    @GetMapping("/")
    public List<User> getUserInfo() {
        return userRepository.findAll();
    }
}
