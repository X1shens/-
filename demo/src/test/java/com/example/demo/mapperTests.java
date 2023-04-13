package com.example.demo;

import com.example.demo.dao.DiscussPostMapper;
import com.example.demo.dao.mapper;
import com.example.demo.entity.DiscussPost;
import com.example.demo.entity.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;

import java.util.Date;
import java.util.List;

@SpringBootTest
@ContextConfiguration(classes = DemoApplication.class)
public class mapperTests {
    @Autowired
    private mapper mapper;
    @Autowired
    private DiscussPostMapper discussPostMapper;
    @Test
    public void testSelectUser(){
        User user=mapper.selectByName("zwx");
        System.out.println(user);
    }
    @Test
    public void insertUser(){
        User user=new User();
        user.setUsername("test");
        user.setPassword("123456");
        user.setSalt("abc");
        user.setEmail("123@qq.com");
        user.setCreateTime(new Date());
        int rows=mapper.insertUser(user);
        System.out.println(rows);
        System.out.println(user.getId());

    }
    @Test
    public void updateUser(){
        int rows=mapper.updatePassword(1,"123");
        System.out.println(rows);
    }

    @Test
    public void selectPosts(){
        List<DiscussPost> list=discussPostMapper.selectDiscussPosts(1,0,3);
        for(DiscussPost post:list){
            System.out.println(post);
        }
        int rows=discussPostMapper.selectDiscussPostRows(1);
        System.out.println(rows);
    }
}
