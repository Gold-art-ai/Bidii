package com.bidii.dto;

import com.bidii.entity.CollegeApplication.ApplicationStatus;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ApplicationRequest {

    @NotBlank(message = "College name is required")
    private String collegeName;

    @NotBlank(message = "Program is required")
    private String program;

    private ApplicationStatus status;

    private String notes;
}
