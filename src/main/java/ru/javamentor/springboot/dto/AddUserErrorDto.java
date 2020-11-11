package ru.javamentor.springboot.dto;

public class AddUserErrorDto {
    private Boolean Success;
    private String error;

    public AddUserErrorDto(Boolean success, String error) {
        Success = success;
        this.error = error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public String getError() {
        return error;
    }

    public Boolean getSuccess() {
        return Success;
    }

    public void setSuccess(Boolean success) {
        Success = success;
    }
}
