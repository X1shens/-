package com.example.demo;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;

@SpringBootTest
@ContextConfiguration(classes = DemoApplication.class)
public class LoggerTests {
    private static final Logger logge= LoggerFactory.getLogger(LoggerTests.class);
    @Test
    public void testLogger(){
        System.out.println(logge.getName());
        logge.debug("debug log");
        logge.info("info log");
        logge.warn("warn log");
        logge.error("error log");

    }
}
