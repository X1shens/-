package com.example.demo.controller;

import com.example.demo.service.AlphaService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.*;

@Controller
@RequestMapping("/alpha")
public class AlphaController {
    @Autowired
    private AlphaService alphaService;

    @RequestMapping("/hello")
    @ResponseBody
    public String Hello() {
        return "hello";
    }

    @RequestMapping("/Date")
    @ResponseBody
    public String getDate() {
        return alphaService.find();
    }

    @RequestMapping("/http")
    @ResponseBody
    public void http(HttpServletRequest request, HttpServletResponse response) {
        //获取请求数据
        System.out.println(request.getMethod());
        System.out.println(request.getServletPath());
        //迭代器
        Enumeration<String> enumeration = request.getHeaderNames();
        while (enumeration.hasMoreElements()) {
            String name = enumeration.nextElement();
            String value = request.getHeader(name);
            System.out.println(name + ":" + value);
        }
        System.out.println(request.getParameter("code"));
        //返回响应数据
        response.setContentType("text/html;charset=utf-8");
        try (PrintWriter printWriter = response.getWriter();) {
            printWriter.write("<h1>牛</h1>");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /*
    get请求
    students?current=1&limit=20
    */
    @RequestMapping(path = "/students", method = RequestMethod.GET)
    @ResponseBody
    public String getStudents(
            @RequestParam(name = "current", required = false, defaultValue = "1") int current,
            @RequestParam(name = "limit", required = false, defaultValue = "1") int limit) {
        System.out.println(current);
        System.out.println(limit);
        return "students";
    }

    // /student/{id} @pathvariable("id")
    @RequestMapping(path = "/student/{id}", method = RequestMethod.GET)
    @ResponseBody
    public String getstudent(
            @PathVariable("id") int id) {
        System.out.println(id);
        return "a student";
    }

    //POST
    @RequestMapping(path="/student",method = RequestMethod.POST)
    @ResponseBody
    public String saveStudent(String name,int age){
        System.out.println(name);
        System.out.println(age);
        return "success";
    }

    //响应HTML数据
    @RequestMapping(path="/teacher",method = RequestMethod.GET)
    public ModelAndView getTeacher(){
        ModelAndView mav=new ModelAndView();
        mav.addObject("name","zwx");
        mav.addObject("age",24);
//        mav.addObject("name","zwx2");
//        mav.addObject("age","25");
        mav.setViewName("/demo/view");
        return mav;
    }
    @RequestMapping(path="/school",method = RequestMethod.GET)
    public String getschool(Model model){
        model.addAttribute("name","zwx");
        model.addAttribute("age",24);
        model.addAttribute("salary",9000.00);
        return "/demo/view";
    }

    //响应JSON数据（异步请求
    //JAVA对象->json对象->JS对象
    @RequestMapping(path ="/emp",method = RequestMethod.GET)
    //不加是返回HTML数据
    @ResponseBody
    public List<Map<String,Object>> getemp(){
        List<Map<String,Object>> list=new ArrayList<>();
        Map<String,Object> emp=new HashMap<>();
        emp.put("name","zhanghsan");
        emp.put("age",24);
        emp.put("salary",8000.00);
        list.add(emp);

        emp=new HashMap<>();
        emp.put("name","zwx");
        emp.put("age",24);
        emp.put("salary",9000.00);
        list.add(emp);
        return list;
    }
}


