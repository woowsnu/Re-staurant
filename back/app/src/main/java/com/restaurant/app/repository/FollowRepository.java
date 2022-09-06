package com.restaurant.app.repository;

import com.restaurant.app.model.Follow;
import com.restaurant.app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface FollowRepository extends JpaRepository<Follow,Long> {

    public Follow findFollowByFollowingUserAndFollowedUser(User followingUser,User followedUser);

    @Transactional
    public void deleteByFollowIndex(Long followIndex);
}
