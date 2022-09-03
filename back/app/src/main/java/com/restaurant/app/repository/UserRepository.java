package com.restaurant.app.repository;

import com.restaurant.app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.security.core.userdetails.User;

public interface UserRepository extends JpaRepository<User,Long> {

    public User findByUsername(String username);
}
