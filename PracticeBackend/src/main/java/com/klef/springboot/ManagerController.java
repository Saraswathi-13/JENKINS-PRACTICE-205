package com.klef.springboot;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/managerapi")
@CrossOrigin(origins = "*")
public class ManagerController {

    @Autowired
    private ManagerService managerService;
    
    @GetMapping("/")
    public String home() 
    {
        return "Jenkins Full Stack Deployment Demo";
    }
    

    @PostMapping("/add")
    public ResponseEntity<Manager> addManager(@RequestBody Manager manager) {
        Manager savedManager = managerService.addManager(manager);
        return new ResponseEntity<>(savedManager, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Manager>> getAllManagers() {
        List<Manager>managers = managerService.getAllManagers();
        return new ResponseEntity<>(managers, HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getManagerById(@PathVariable int id) {
    	Manager manager = managerService.getManagerById(id);
        if (manager != null) {
            return new ResponseEntity<>(manager, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Manager with ID " + id + " not found.", HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateManager(@RequestBody Manager manager) {
    	Manager existing = managerService.getManagerById(manager.getId());
        if (existing != null) {
        	Manager updatedManager = managerService.updateManager(manager);
            return new ResponseEntity<>(updatedManager, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cannot update. Manager with ID " + manager.getId() + " not found.", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteManager(@PathVariable int id) {
    	Manager existing = managerService.getManagerById(id);
        if (existing != null) {
            managerService.deleteManagerById(id);
            return new ResponseEntity<>("Manager with ID " + id + " deleted successfully.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cannot delete. Manager with ID " + id + " not found.", HttpStatus.NOT_FOUND);
        }
    }
}
