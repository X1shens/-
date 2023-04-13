package com.example.demo.service;

import com.example.demo.dao.AlphaDao;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

@Service
//容器中多次实例化@Scope("prototype")
public class AlphaService {
    @Autowired
    @Qualifier("alphaMyBatis")
    private AlphaDao alphaDao;


    public AlphaService(){
        System.out.println("new()");
    }

    @PostConstruct
    public void init(){
        System.out.println("Init()");
    }

    @PreDestroy
    public void destroy(){
        System.out.println("Destroy()");
    }
    public String find(){
        return alphaDao.Select();
    }
}
