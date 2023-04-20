package com.example.demo.dao;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;

@Repository("alphaMyBatis")

public class AlphaDaoMyBatisimpl implements AlphaDao{

    @Override
    public String Select() {
        return "MyBatis";
    }
}
