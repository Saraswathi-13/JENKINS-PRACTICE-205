package com.klef.springboot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.SpringApplication.Running;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PracticeBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(PracticeBackendApplication.class, args);
		System.out.println("Backend is Running");
	}

}
