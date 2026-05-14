package com.bidii.service;

import com.bidii.dto.ApplicationRequest;
import com.bidii.dto.ApplicationResponse;
import com.bidii.entity.CollegeApplication;
import com.bidii.entity.CollegeApplication.ApplicationStatus;
import com.bidii.entity.Student;
import com.bidii.repository.CollegeApplicationRepository;
import com.bidii.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ApplicationService {

    private final CollegeApplicationRepository applicationRepository;
    private final StudentRepository studentRepository;

    // ── GET all applications for a student ──────────────────────────────
    public List<ApplicationResponse> getAll(Long studentId) {
        return applicationRepository.findByStudentIdOrderByAppliedAtDesc(studentId)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    // ── CREATE a new application ─────────────────────────────────────────
    public ApplicationResponse create(Long studentId, ApplicationRequest request) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        CollegeApplication application = CollegeApplication.builder()
                .collegeName(request.getCollegeName())
                .program(request.getProgram())
                .status(request.getStatus() != null ? request.getStatus() : ApplicationStatus.PENDING)
                .notes(request.getNotes())
                .student(student)
                .build();

        return toResponse(applicationRepository.save(application));
    }

    // ── UPDATE an existing application ───────────────────────────────────
    public ApplicationResponse update(Long id, Long studentId, ApplicationRequest request) {
        CollegeApplication application = applicationRepository.findByIdAndStudentId(id, studentId)
                .orElseThrow(() -> new RuntimeException("Application not found or access denied"));

        application.setCollegeName(request.getCollegeName());
        application.setProgram(request.getProgram());
        if (request.getStatus() != null) {
            application.setStatus(request.getStatus());
        }
        application.setNotes(request.getNotes());

        return toResponse(applicationRepository.save(application));
    }

    // ── DELETE an application ────────────────────────────────────────────
    public void delete(Long id, Long studentId) {
        CollegeApplication application = applicationRepository.findByIdAndStudentId(id, studentId)
                .orElseThrow(() -> new RuntimeException("Application not found or access denied"));

        applicationRepository.delete(application);
    }

    // ── Map entity → DTO ─────────────────────────────────────────────────
    private ApplicationResponse toResponse(CollegeApplication app) {
        return ApplicationResponse.builder()
                .id(app.getId())
                .collegeName(app.getCollegeName())
                .program(app.getProgram())
                .status(app.getStatus())
                .notes(app.getNotes())
                .appliedAt(app.getAppliedAt())
                .updatedAt(app.getUpdatedAt())
                .build();
    }
}
