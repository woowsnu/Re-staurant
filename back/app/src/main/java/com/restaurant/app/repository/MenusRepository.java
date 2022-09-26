package com.restaurant.app.repository;


import com.restaurant.app.model.Menus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MenusRepository extends JpaRepository<Menus, Long> {

    List<Menus> findAll();
}
