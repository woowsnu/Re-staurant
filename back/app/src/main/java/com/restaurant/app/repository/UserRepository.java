package com.restaurant.app.repository;

import com.restaurant.app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
//import org.springframework.security.core.userdetails.User;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    public User findByUsername(String username);

    public User findUserByEmail(String email);
}

