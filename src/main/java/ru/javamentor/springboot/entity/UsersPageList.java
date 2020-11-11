package ru.javamentor.springboot.entity;

import ru.javamentor.springboot.dto.UserRole;
import ru.javamentor.springboot.model.Role;
import ru.javamentor.springboot.model.User;
import java.util.List;


public class UsersPageList {
    List<UserRole> userRoles;
    List<String> roles ;
    List<Role> rolesCurrentUser;
    User currentUser;

    public List<UserRole> getUserRoles() {
        return userRoles;
    }

    public void setUserRoles(List<UserRole> userRoles) {
        this.userRoles = userRoles;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    public List<Role> getRolesCurrentUser() {
        return rolesCurrentUser;
    }

    public void setRolesCurrentUser(List<Role> rolesCurrentUser) {
        this.rolesCurrentUser = rolesCurrentUser;
    }

    public User getCurrentUser() {
        return currentUser;
    }

    public void setCurrentUser(User currentUser) {
        this.currentUser = currentUser;
    }
}
