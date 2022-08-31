package com.restaurant.app.service;

import com.restaurant.app.model.User;
import com.restaurant.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User findByUsername(String username) {
        if(userRepository.findByUsername(username) == null) {
            throw new RuntimeException("invalid username");
        }
        return userRepository.findByUsername(username);
    }

    public User findUserByEmail(String userEmail) {
        if(userRepository.findUserByEmail(userEmail) == null) {
            throw new RuntimeException("invalid userEmail");
        }
        return userRepository.findUserByEmail(userEmail);
    }

    public User save(User user) {
        return userRepository.save(user);
    }
}
