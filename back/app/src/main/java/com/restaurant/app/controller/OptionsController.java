package com.restaurant.app.controller;

import com.restaurant.app.DTO.OptionsDTO;
import com.restaurant.app.DTO.ResponseDTO;
import com.restaurant.app.DTO.ReviewDTO;
import com.restaurant.app.model.Options;
import com.restaurant.app.model.Review;
import com.restaurant.app.service.OptionsService;
import com.restaurant.app.service.RestaurantService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/options")
@CrossOrigin("*")
@Slf4j
public class OptionsController {

    @Autowired
    private final OptionsService optionsService;

    private final RestaurantService restaurantService;

    //전체조회
    @GetMapping
    public ResponseEntity<?> findAll() {
        List<Options> options = optionsService.findAll();
        List<OptionsDTO> optionsDTO = options.stream().map(OptionsDTO::new).collect(Collectors.toList());
        return ResponseEntity.ok(optionsDTO);
    }

    //    create
    @PostMapping("/create/{busId}")
    public ResponseEntity<?> save(@PathVariable Long busId, @RequestBody OptionsDTO optionsDTO) {
//
        try {

            List<Options> optionsList = optionsService.save(optionsDTO,busId);
            List<OptionsDTO> optionsDTOs = optionsList.stream().map(OptionsDTO::new).collect(Collectors.toList());

            return ResponseEntity.ok().body(optionsDTOs);

        } catch (Exception e) {
            System.out.println(e.getMessage());
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }

    }

    //read
    //가게 이름으로 조회
    @GetMapping("/findName/{restaurantName}")
    public ResponseEntity<?> findByRestaurant(@RequestBody OptionsDTO optionsDTO, @PathVariable Long busId) {
        return optionsService.findByRestaurant(optionsDTO, busId);
    }

    //update
    @PutMapping("/update/{busId}")
    public ResponseEntity<?> update(@RequestBody OptionsDTO optionsDTO,@PathVariable Long busId) {
        try {

            List<Options> optionsList= optionsService.update(optionsDTO,busId);

            OptionsDTO optionDto = OptionsDTO.builder()
                    .restaurantOptionIndex(optionsDTO.getRestaurantOptionIndex())
                    .iconUrl(optionsDTO.getIconUrl())
                    .isCheck(optionsDTO.getIsCheck())
                    .optionNum(optionsDTO.getOptionNum())
                    .optionOrder(optionsDTO.getOptionOrder())
                    .build();

            return ResponseEntity.ok().body(optionDto);

        } catch (Exception e) {
            System.out.println(e.getMessage());
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

    //delete
    @DeleteMapping("/delete/{busId}")
    public ResponseEntity<?> delete(@PathVariable Long busId){

//        try{
        optionsService.delete(busId);
//            List<Options> optionsList = optionsService.deleteOption()

            return ResponseEntity.ok().body(busId);
//        }
//        catch(Exception e) {
//            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
//            return ResponseEntity.ok().body(responseDTO);
//        }

    }
}
