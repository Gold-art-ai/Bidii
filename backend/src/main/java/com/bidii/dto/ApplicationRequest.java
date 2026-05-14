package com.bidii.dto;

import com.bidii.entity.CollegeApplication.ApplicationStatus;
import jakarta.validation.constraints.NotBlank;

public class ApplicationRequest {

    @NotBlank(message = "College name is required")
    private String collegeName;

    @NotBlank(message = "Program is required")
    private String program;

    private ApplicationStatus status;

    private String notes;

    // ── Getters & Setters ─────────────────────────────────────────────────
    public String getCollegeName()              { return collegeName; }
    public void setCollegeName(String v)        { this.collegeName = v; }
    public String getProgram()                  { return program; }
    public void setProgram(String v)            { this.program = v; }
    public ApplicationStatus getStatus()        { return status; }
    public void setStatus(ApplicationStatus v)  { this.status = v; }
    public String getNotes()                    { return notes; }
    public void setNotes(String v)              { this.notes = v; }
}
