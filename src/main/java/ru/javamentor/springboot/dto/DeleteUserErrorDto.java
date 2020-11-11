package ru.javamentor.springboot.dto;

public class DeleteUserErrorDto {
    private Boolean success;
    private String error;

    public void setError(String error) {
        this.error = error;
    }

    public String getError() {
        return error;
    }

    public Boolean getSuccess() {
        return success;
    }

    public void setSuccess(Boolean success) {
        this.success = success;
    }
}
