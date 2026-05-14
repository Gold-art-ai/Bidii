package com.bidii.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "students")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<CollegeApplication> applications;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    // ── Constructors ──────────────────────────────────────────────────────
    public Student() {}

    private Student(Builder b) {
        this.name = b.name;
        this.email = b.email;
        this.password = b.password;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private String name, email, password;
        public Builder name(String v)     { name = v;     return this; }
        public Builder email(String v)    { email = v;    return this; }
        public Builder password(String v) { password = v; return this; }
        public Student build()            { return new Student(this); }
    }

    // ── Getters & Setters ─────────────────────────────────────────────────
    public Long getId()                        { return id; }
    public String getName()                    { return name; }
    public void setName(String name)           { this.name = name; }
    public String getEmail()                   { return email; }
    public void setEmail(String email)         { this.email = email; }
    public String getPassword()                { return password; }
    public void setPassword(String password)   { this.password = password; }
    public LocalDateTime getCreatedAt()        { return createdAt; }
    public List<CollegeApplication> getApplications() { return applications; }
}
