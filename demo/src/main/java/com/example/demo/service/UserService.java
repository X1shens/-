package com.example.demo.service;

import com.example.demo.dao.mapper;
import com.example.demo.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private com.example.demo.dao.mapper mapper;
    public User findUserById(int id){
        return mapper.selectById(id);
    }
}
