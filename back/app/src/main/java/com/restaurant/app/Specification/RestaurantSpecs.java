package com.restaurant.app.Specification;

import com.restaurant.app.model.Restaurant;
import org.springframework.data.jpa.domain.Specification;

public class RestaurantSpecs {
    public static Specification<Restaurant> withRestaurantName(String restaurantName){
        return (Specification<Restaurant>) ((root, query, builder) ->
                builder.equal(root.get("restaurantName"),restaurantName)
        );
    }

    public static Specification<Restaurant> withLargeCategory(String largeCategory){
        return (Specification<Restaurant>) ((root, query, builder) ->
                builder.equal(root.get("largeCategory"),largeCategory)
        );
    }
    public static Specification<Restaurant> withMidCategory(String midCategory){
        return (Specification<Restaurant>) ((root, query, builder) ->
                builder.equal(root.get("midCategory"),midCategory)
        );
    }
}