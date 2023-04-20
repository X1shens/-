package com.example.demo.dao;

import org.springframework.stereotype.Repository;

@Repository("alphaHibernate")
public class AlphaDaoHibernatelmpl implements AlphaDao{
    @Override
    public String Select() {
        return "Hibernate";
    }
}
