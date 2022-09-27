package com.restaurant.app.controller;

import com.restaurant.app.DTO.ResponseDTO;
import com.restaurant.app.DTO.RestaurantLikeDTO;
import com.restaurant.app.model.RestaurantLike;
import com.restaurant.app.model.User;
import com.restaurant.app.service.RestaurantLikeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/restaurantlike")
@CrossOrigin("*")
@Slf4j
public class RestaurantLikeController {
    @Autowired
    private final RestaurantLikeService restaurantLikeService;

    // 북마크 생성
    @PostMapping("/auth/createLike")
    public ResponseEntity<?> save(@AuthenticationPrincipal User authedUser,@RequestBody RestaurantLikeDTO restaurantLikeDTO) {

        try {

            restaurantLikeService.save(authedUser,restaurantLikeDTO);
            ResponseDTO responseDTO = ResponseDTO.builder().result(1).build();
            return ResponseEntity.ok().body(responseDTO);

        } catch (Exception e) {
            System.out.println(e.getMessage());
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }

    }



    //북마크 조회
    @GetMapping("/{email}/auth/findUserView")
    public ResponseEntity<?> findUserView(@AuthenticationPrincipal User authedUser,@PathVariable String email){
        try{
            List<RestaurantLike> restaurantLikeList = restaurantLikeService.findByEmail(authedUser,email);

            List<RestaurantLikeDTO> restaurantLikeDTOS = restaurantLikeList.stream().map(RestaurantLikeDTO::new).collect((Collectors.toList()));


            return ResponseEntity.ok().body(restaurantLikeDTOS);
        }
        catch(Exception e) {
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

    //북마크 조회

    @GetMapping("/auth/findUserView")
    public ResponseEntity<?>findAll() {
        List<RestaurantLike> restaurantLikes = restaurantLikeService.findAll();
        List<RestaurantLikeDTO> restaurantLikeDTO = restaurantLikes.stream().map(RestaurantLikeDTO::new).collect(Collectors.toList());
        return ResponseEntity.ok(restaurantLikeDTO);
    }

    //북마크 조회

    @DeleteMapping("/auth/deleteLike/{likeIndex}")
    public ResponseEntity<?> deleteLike(@AuthenticationPrincipal User authedUser,
                                        @PathVariable Long likeIndex) {

        try{
            restaurantLikeService.delete(authedUser,likeIndex);

            return ResponseEntity.ok().body(0);
        }
        catch(Exception e) {
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity.ok().body(responseDTO);
        }
    }

}
