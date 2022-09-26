package com.restaurant.app.model;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Follow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long followIndex;

    @ManyToOne(fetch = FetchType.EAGER, targetEntity = User.class)
    @JoinColumn(name="following_user_index")
    private User followingUser;

    @ManyToOne(fetch = FetchType.EAGER, targetEntity = User.class)
    @JoinColumn(name="follwed_user_index")
    private User followedUser;

    @Column(name="removed")
    private Integer removed;

    @CreatedDate
    private LocalDateTime createDate;

    public Follow(User followingUser, User followedUser, Integer removed) {
        this.followingUser = followingUser;
        this.followedUser = followedUser;
        this.removed = removed;
        this.createDate = LocalDateTime.now();
    }
}
