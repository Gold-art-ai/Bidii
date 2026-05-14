package com.bidii.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "college_applications")
public class CollegeApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "college_name", nullable = false)
    private String collegeName;

    @Column(nullable = false)
    private String program;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ApplicationStatus status;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(name = "applied_at")
    private LocalDateTime appliedAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @PrePersist
    protected void onCreate() {
        appliedAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (status == null) status = ApplicationStatus.PENDING;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public enum ApplicationStatus {
        PENDING, ACCEPTED, REJECTED, WITHDRAWN
    }

    // ── Constructors ──────────────────────────────────────────────────────
    public CollegeApplication() {}

    private CollegeApplication(Builder b) {
        this.collegeName = b.collegeName;
        this.program     = b.program;
        this.status      = b.status;
        this.notes       = b.notes;
        this.student     = b.student;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private String collegeName, program, notes;
        private ApplicationStatus status;
        private Student student;
        public Builder collegeName(String v)      { collegeName = v; return this; }
        public Builder program(String v)          { program = v;     return this; }
        public Builder status(ApplicationStatus v){ status = v;      return this; }
        public Builder notes(String v)            { notes = v;       return this; }
        public Builder student(Student v)         { student = v;     return this; }
        public CollegeApplication build()         { return new CollegeApplication(this); }
    }

    // ── Getters & Setters ─────────────────────────────────────────────────
    public Long getId()                               { return id; }
    public String getCollegeName()                    { return collegeName; }
    public void setCollegeName(String v)              { this.collegeName = v; }
    public String getProgram()                        { return program; }
    public void setProgram(String v)                  { this.program = v; }
    public ApplicationStatus getStatus()              { return status; }
    public void setStatus(ApplicationStatus v)        { this.status = v; }
    public String getNotes()                          { return notes; }
    public void setNotes(String v)                    { this.notes = v; }
    public LocalDateTime getAppliedAt()               { return appliedAt; }
    public LocalDateTime getUpdatedAt()               { return updatedAt; }
    public Student getStudent()                       { return student; }
    public void setStudent(Student v)                 { this.student = v; }
}
