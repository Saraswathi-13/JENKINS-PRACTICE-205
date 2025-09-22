package com.klef.springboot;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.klef.springboot.Manager;

@Repository
public interface ManagerRepository extends JpaRepository<Manager, Integer> 
{
    Manager findByEmail(String email);
    Manager findByContact(String contact);
}
