package com.restaurant.app.repository;

import com.restaurant.app.model.Options;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OptionsRepository extends JpaRepository<Options, Long> {
    List<Options> findAll();

    List<Options> findOptionsByRestaurantBusId(String busId);


}
