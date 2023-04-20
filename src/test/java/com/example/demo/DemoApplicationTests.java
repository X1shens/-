package com.example.demo;

import com.example.demo.dao.AlphaDao;
import com.example.demo.dao.AlphaDaoHibernatelmpl;
import com.example.demo.service.AlphaService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.SimpleDateFormat;
import java.util.Date;

@SpringBootTest
@ContextConfiguration(classes = DemoApplication.class)
public class DemoApplicationTests implements ApplicationContextAware {
	private ApplicationContext applicationContext;
	@Test
	public void contextLoads() {
		System.out.println(applicationContext);
		AlphaDao alphaDao=applicationContext.getBean(AlphaDao.class);
		System.out.println(alphaDao.Select());
	}
	@Test
	public void test(){
		AlphaService alphaService=applicationContext.getBean(AlphaService.class);
		System.out.println(alphaService);
	}
	@Test
	public void testBeanConfig(){
		SimpleDateFormat simpleDateFormat=applicationContext.getBean(SimpleDateFormat.class);
		System.out.println(simpleDateFormat.format(new Date()));
	}

/*容器注入*/
	@Autowired
	@Qualifier("alphaHibernate")
	private AlphaDao alphaDao;
	@Autowired
	private SimpleDateFormat simpleDateFormat;
	@Test
	public void testDI(){
		System.out.println(alphaDao);
		System.out.println(simpleDateFormat);
	}





	@Override
	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
		this.applicationContext=applicationContext;
	}
}
