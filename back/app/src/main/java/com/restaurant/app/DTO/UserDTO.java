package com.restaurant.app.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {

    private Long userIndex;
    private String email;
    private String username;
    private String roles;
    private String reviewList;
    private String password;

}
