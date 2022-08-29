package com.restaurant.app.model;


import lombok.*;

import javax.persistence.*;
import java.util.*;

@Entity
@Builder
@Getter @Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_index")
    private Long userIndex;

    @Column
    private String email;

    @Column
    private String username;

    @Column
    private String roles;

    @Column
    private String password;

    @OneToMany(fetch = FetchType.EAGER, mappedBy="user")
    private Set<Review> reviewList = new HashSet<>();


    public List<String> getRoleList() {
        if(this.roles.length() > 0) {
            return Arrays.asList(this.roles.split(","));
        }

        return new ArrayList<>();
    }


    public String reviewListToString() {
        return "reviewList = " + reviewList.toString();
    }
}
