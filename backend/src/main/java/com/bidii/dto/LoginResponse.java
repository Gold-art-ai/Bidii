package com.bidii.dto;

public class LoginResponse {
    private String token;
    private String name;
    private String email;
    private Long studentId;

    public LoginResponse() {}

    private LoginResponse(Builder builder) {
        this.token = builder.token;
        this.name = builder.name;
        this.email = builder.email;
        this.studentId = builder.studentId;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private String token;
        private String name;
        private String email;
        private Long studentId;

        public Builder token(String token) {
            this.token = token;
            return this;
        }

        public Builder name(String name) {
            this.name = name;
            return this;
        }

        public Builder email(String email) {
            this.email = email;
            return this;
        }

        public Builder studentId(Long studentId) {
            this.studentId = studentId;
            return this;
        }

        public LoginResponse build() {
            return new LoginResponse(this);
        }
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }
}
