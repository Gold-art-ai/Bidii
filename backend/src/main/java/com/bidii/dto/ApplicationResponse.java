package com.bidii.dto;

import com.bidii.entity.CollegeApplication.ApplicationStatus;

public class ApplicationResponse {
    private Long id;
    private String collegeName;
    private String program;
    private ApplicationStatus status;
    private String notes;
    private java.time.LocalDateTime appliedAt;
    private java.time.LocalDateTime updatedAt;

    public ApplicationResponse() {}

    private ApplicationResponse(Builder b) {
        this.id = b.id; this.collegeName = b.collegeName; this.program = b.program;
        this.status = b.status; this.notes = b.notes;
        this.appliedAt = b.appliedAt; this.updatedAt = b.updatedAt;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id; private String collegeName, program, notes;
        private ApplicationStatus status;
        private java.time.LocalDateTime appliedAt, updatedAt;
        public Builder id(Long v)                      { id = v;           return this; }
        public Builder collegeName(String v)           { collegeName = v;  return this; }
        public Builder program(String v)               { program = v;      return this; }
        public Builder status(ApplicationStatus v)     { status = v;       return this; }
        public Builder notes(String v)                 { notes = v;        return this; }
        public Builder appliedAt(java.time.LocalDateTime v) { appliedAt = v; return this; }
        public Builder updatedAt(java.time.LocalDateTime v) { updatedAt = v; return this; }
        public ApplicationResponse build()             { return new ApplicationResponse(this); }
    }

    public Long getId()             { return id; }
    public String getCollegeName()  { return collegeName; }
    public String getProgram()      { return program; }
    public ApplicationStatus getStatus() { return status; }
    public String getNotes()        { return notes; }
    public java.time.LocalDateTime getAppliedAt() { return appliedAt; }
    public java.time.LocalDateTime getUpdatedAt() { return updatedAt; }
}
