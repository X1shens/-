package com.example.demo;

import com.example.demo.util.MailClient;
import jakarta.annotation.Resource;
import jakarta.mail.MessagingException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@SpringBootTest
@ContextConfiguration(classes = DemoApplication.class)
public class MailTests {
    @Autowired
    private MailClient mailClient;
    @Resource
    private  TemplateEngine templateEngine;
    @Test
    public void TestTextMail(){
            mailClient.sendMail("1136396273@qq.com","Test","welcome.");

    }
    @Test
    public void testHtmlMail(){
        Context context=new Context();
        context.setVariable("username","sunday");
        String content=templateEngine.process("/mail/demo",context);
        System.out.println(content);
        mailClient.sendMail("1136396273@qq.com","HTML",content);
    }

}
