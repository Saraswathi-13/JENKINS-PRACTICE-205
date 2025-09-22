package com.klef.springboot;

import java.util.List;
import com.klef.springboot.ManagerService;

public interface ManagerService {
    Manager addManager(Manager manager);
    List<Manager> getAllManagers();
    Manager getManagerById(int id);
    Manager updateManager(Manager manager);
    void deleteManagerById(int id);
}
