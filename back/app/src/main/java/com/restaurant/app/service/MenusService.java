package com.restaurant.app.service;

import com.restaurant.app.model.Menus;
import com.restaurant.app.repository.MenusRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Required;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class MenusService {

    private final MenusRepository menusRepository;

    public List<Menus> findAll(){
        return menusRepository.findAll();
    }
}
