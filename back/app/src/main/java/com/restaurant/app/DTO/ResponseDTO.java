package com.restaurant.app.DTO;


import lombok.*;

@Builder
@ToString
@Getter @Setter
public class ResponseDTO<T> {

    private String error;

    private int result;
}
