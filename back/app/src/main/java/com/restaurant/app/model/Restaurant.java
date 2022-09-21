package com.restaurant.app.model;

import com.restaurant.app.DTO.*;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Builder
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Restaurant implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="restaurant_index")
    private Long restaurantIndex; //레스토랑 프로필 id

    @Column(name="bus_id")
    private String busId;

    @Column(name="restaurant_name")
    private String restaurantName;

    @Column(name="restaurantCategory")
    private String restaurantCategory;

    @Column(name="x")
    private Float x;

    @Column(name="y")
    private Float y;

    @Column(name="full_address")
    private String fullAddress;

    @Column(name="full_road_address")
    private String fullRoadAddress;

    @Column(name="si_code")
    private String siCode;

    @Column(name="gu_code")
    private String guCode;

    @Column(name="dong_code")
    private String dongCode;

    @Column(name="tell_number")
    private String tellNumber;

    @Column(name="description",columnDefinition = "TEXT")
    private String description;

    @Column(name="business_hour_info",columnDefinition = "TEXT")
    private String businessHourInfo;

    @Column(name="sns_url")
    private String snsUrl;

    @Column(name="avgRating")
    private Float avgRating;

    @Column(name="authorCount")
    private Long authorCount;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "restaurant",cascade = CascadeType.ALL)
    private Set<Options> optionsList    = new HashSet<>();

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "restaurant",cascade = CascadeType.ALL)
    private Set<Menus> menusList = new HashSet<>();

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "restaurant", cascade = CascadeType.ALL)
    private Set<Review> reviewList = new HashSet();

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "restaurant", cascade = CascadeType.ALL)
    private Set<VotedKeywords> keywordsList = new HashSet();

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "restaurant", cascade = CascadeType.ALL)
    private Set<RestaurantLike> restaurantLikeList = new HashSet();

    public List<MenusDTO> menusList(Set<Menus> menusList){

        List<MenusDTO> menusDTOList = menusList.stream().map(MenusDTO::new).collect((Collectors.toList()));

        return  menusDTOList;
    }

    public List<OptionsDTO> optionsList(Set<Options> optionsList){

        List<OptionsDTO> optionsDTOList = optionsList.stream().map(OptionsDTO::new).collect((Collectors.toList()));

        return  optionsDTOList;
    }

    public List<ReviewDTO> reviewList(Set<Review> reviewList){

        List<ReviewDTO> reviewDTOList = reviewList.stream().map(ReviewDTO::new).collect((Collectors.toList()));

        return reviewDTOList;
    }

    public List<VotedKeywordsDTO> keywordsList(Set<VotedKeywords> keywordsList){

        List<VotedKeywordsDTO> keywordsDTOList = keywordsList.stream().map(VotedKeywordsDTO::new).collect((Collectors.toList()));

        return keywordsDTOList;
    }



    public List<RestaurantLikeDTO> restaurantLikeList(Set<RestaurantLike> restaurantLikeList){

        List<RestaurantLikeDTO> restaurantLikeDTOList = restaurantLikeList.stream().map(RestaurantLikeDTO::new).collect((Collectors.toList()));

        return restaurantLikeDTOList;
    }



}
