package com.restaurant.app.repository;

import com.restaurant.app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
//import org.springframework.security.core.userdetails.User;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    public User findUserByEmail(String email);

    public User findUserByAccessToken(String accessToken);

    @Transactional
    public Long deleteUserByUserIndex(Long deleteUserIndex);
}

