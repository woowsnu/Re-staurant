package com.restaurant.app.repository;

import com.restaurant.app.DTO.UserDTO;
import com.restaurant.app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.security.core.userdetails.User;

public interface UserRepository extends JpaRepository<User,Long> {

<<<<<<< HEAD
    public User findByUsername(String username);
=======
//    public User findByUserIndex(Long userIndex);

    public User findUserByAccessToken(String accessToken);

    @Transactional
    public Long deleteUserByUserIndex(Long deleteUserIndex);

    public  User findUserByEmail(String email);


>>>>>>> b48e3904361b2f450f0a8d0191fec223963c7e33
}
