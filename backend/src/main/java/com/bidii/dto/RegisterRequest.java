package com.bidii.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Email;

public class RegisterRequest {

    @NotBlank(message = "Name is required")
    private String name;

    @Email(message = "Valid email is required")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    public String getName()              { return name; }
    public void setName(String v)        { this.name = v; }
    public String getEmail()             { return email; }
    public void setEmail(String v)       { this.email = v; }
    public String getPassword()          { return password; }
    public void setPassword(String v)    { this.password = v; }
}
