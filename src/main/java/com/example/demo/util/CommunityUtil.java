package com.example.demo.util;

import io.micrometer.common.util.StringUtils;
import org.springframework.util.DigestUtils;

import java.nio.charset.StandardCharsets;
import java.util.UUID;

public class CommunityUtil {
    //随机生成字符串
    public static String generateUUID(){
        return UUID.randomUUID().toString().replaceAll("-","");
    }


    //MD5加密(只能加密)
    //xxxx+random字符串
    public static String MD5(String key){
        if(StringUtils.isBlank(key)){
            return null;
        }
        return DigestUtils.md5DigestAsHex(key.getBytes(StandardCharsets.UTF_8));
    }
}
