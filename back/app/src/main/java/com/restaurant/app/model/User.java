package com.restaurant.app.model;


import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
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
    private String nickname;
    @Column
    private String roles;

    @Column
    private String password;

    @OneToMany(fetch = FetchType.LAZY, mappedBy="user", cascade = CascadeType.ALL)
    private Set<Review> reviewList = new HashSet<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy="followingUser",cascade = CascadeType.ALL)
    private Set<Follow> followingList = new HashSet<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy="followedUser",cascade = CascadeType.ALL)
    private Set<Follow> followerList = new HashSet<>();

    @CreatedDate
    private LocalDateTime createDate;

    public List<String> getRoleList() {
        if(this.roles.length() > 0) {
            return Arrays.asList(this.roles.split(","));
        }

        return new ArrayList<>();
    }

    public String reviewListToString() {
        return reviewList.toString();
    }
}
