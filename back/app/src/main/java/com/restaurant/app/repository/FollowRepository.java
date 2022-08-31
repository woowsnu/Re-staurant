package com.restaurant.app.repository;

import com.restaurant.app.model.Follow;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FollowRepository extends JpaRepository<Follow,Long> {

}
