package com.example.demo.service;

import com.example.demo.dao.UserMapper;
import com.example.demo.entity.User;
import com.example.demo.util.CommunityUtil;
import com.example.demo.util.MailClient;
import io.micrometer.common.util.StringUtils;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class UserService {
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private MailClient mailClient;

    @Value("${demo.path.domain}")
    private String domain;
    @Value("${server.servlet.context-path}")
    private String contextPath;


    public User findUserById(int id){
        return userMapper.selectById(id);
    }

    public Map<String,Object> register(User user){
        Map<String,Object> map=new HashMap<>();
        //空值判断11
        if(user==null){
            throw new IllegalArgumentException("error!");
        }

        if(StringUtils.isBlank(user.getUsername())){
            map.put("usernameMsg","账号不能为空！");
            return map;
        }
        if(org.apache.commons.lang3.StringUtils.isBlank(user.getPassword())){
            map.put("passwordMsg","密码不能为空！");
            return map;
        }
        if(StringUtils.isBlank(user.getEmail())){
            map.put("EmailMsg","邮箱不能为空！");
            return map;
        }

        //验证账号

        User u=userMapper.selectByName(user.getUsername());
        if(u!=null){
            map.put("usernameMsg","该账号已经存在！");
            return map;
        }
        u=userMapper.selectByName(user.getEmail());
        if(u!=null){
            map.put("EMailMsg","该邮箱已经存在！");
            return map;
        }

        //注册用户
        user.setSalt(CommunityUtil.generateUUID().substring(0,5));
        user.setPassword(CommunityUtil.MD5(user.getPassword()+user.getSalt()));
        user.setType(0);
        user.setActivation_code(CommunityUtil.generateUUID());
        user.setHeaderUrl(String.format("http://images.nowcoder.com/head/%dt.png",new Random().nextInt(1000)));
        user.setCreateTime(new Date());
        userMapper.insertUser(user);

        //激活邮件
        Context context=new Context();
        context.setVariable("email",user.getEmail());
        //http://......activation/101/code
        String url=domain+contextPath+"/activation"+user.getId()+user.getActivation_code();
        context.setVariable("url",url);
//        String content=templateEngine.process("/mail/activation",context);
//        mailClient.sendMail(user.getEmail(),"激活账号",content);
        return map;
    }
}