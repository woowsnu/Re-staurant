package com.restaurant.app.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Follow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="follow_index")
    private Long followIndex;

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = User.class)
    @JoinColumn
    private User followingUser;

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = User.class)
    @JoinColumn
    private User followedUser;


    public Follow(User followingUser, User followedUser) {
        this.followingUser = followingUser;
        this.followedUser = followedUser;
    }
}
