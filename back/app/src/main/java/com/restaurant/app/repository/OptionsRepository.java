package com.restaurant.app.repository;

import com.restaurant.app.DTO.OptionsDTO;
import com.restaurant.app.model.Options;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface OptionsRepository extends JpaRepository<Options, Long> {
    List<Options> findAll();

//    @Transactional
//List<Options> findOptionsByRestaurantBusId(Long busId);


    List<Options> findOptionsByRestaurantBusId(Long busId);
//    Long deleteOptionsByRestaurantBusId(Long restaurantOptionIndex);

//    Options findByRestaurantOptionIndex(Long restaurantOptionIndex);


//    @Transactional
//    Options findByRestaurantBusId(Long busId);
//    @Transactional
//    Long deleteByRestaurantBusId(Long busId);


}
