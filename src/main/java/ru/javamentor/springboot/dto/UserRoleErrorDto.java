package ru.javamentor.springboot.dto;

public class UserRoleErrorDto {
    private UserRole userRole;
    private String error;

    public UserRole getUserRole() {
        return userRole;
    }

    public void setError(String error) {
        this.error = error;
    }

    public void setUserRole(UserRole userRole) {
        this.userRole = userRole;
    }

    public String getError() {
        return error;
    }
}

