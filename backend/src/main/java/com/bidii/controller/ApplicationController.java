package com.bidii.controller;

import com.bidii.dto.ApplicationRequest;
import com.bidii.dto.ApplicationResponse;
import com.bidii.service.ApplicationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    private Long getStudentId(HttpServletRequest request) {
        Object id = request.getAttribute("studentId");
        if (id == null) throw new RuntimeException("Unauthorized");
        return ((Number) id).longValue();
    }

    @GetMapping
    public ResponseEntity<List<ApplicationResponse>> getAll(HttpServletRequest request) {
        return ResponseEntity.ok(applicationService.getAll(getStudentId(request)));
    }

    @PostMapping
    public ResponseEntity<ApplicationResponse> create(
            @Valid @RequestBody ApplicationRequest body,
            HttpServletRequest request) {
        return ResponseEntity.ok(applicationService.create(getStudentId(request), body));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApplicationResponse> update(
            @PathVariable Long id,
            @Valid @RequestBody ApplicationRequest body,
            HttpServletRequest request) {
        return ResponseEntity.ok(applicationService.update(id, getStudentId(request), body));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> delete(
            @PathVariable Long id,
            HttpServletRequest request) {
        applicationService.delete(id, getStudentId(request));
        return ResponseEntity.ok(Map.of("message", "Application deleted successfully"));
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, String>> handleError(RuntimeException ex) {
        return ResponseEntity.badRequest().body(Map.of("error", ex.getMessage()));
    }
}
