package com.restaurant.app.repository;

import com.restaurant.app.model.Follow;
import com.restaurant.app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FollowRepository extends JpaRepository<Follow,Long> {

    public Follow findFollowByFollowingUserAndFollowedUser(User followingUser,User followedUser);

}
