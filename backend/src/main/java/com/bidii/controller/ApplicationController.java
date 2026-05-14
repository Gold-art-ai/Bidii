package com.bidii.controller;

import com.bidii.dto.ApplicationRequest;
import com.bidii.dto.ApplicationResponse;
import com.bidii.service.ApplicationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService;

    // ── Helper: extract studentId injected by JwtFilter ──────────────────
    private Long getStudentId(HttpServletRequest request) {
        Object id = request.getAttribute("studentId");
        if (id == null) throw new RuntimeException("Unauthorized");
        return ((Number) id).longValue();
    }

    // GET /api/applications  → list all my applications
    @GetMapping
    public ResponseEntity<List<ApplicationResponse>> getAll(HttpServletRequest request) {
        Long studentId = getStudentId(request);
        return ResponseEntity.ok(applicationService.getAll(studentId));
    }

    // POST /api/applications  → submit a new application
    @PostMapping
    public ResponseEntity<ApplicationResponse> create(
            @Valid @RequestBody ApplicationRequest body,
            HttpServletRequest request) {
        Long studentId = getStudentId(request);
        return ResponseEntity.ok(applicationService.create(studentId, body));
    }

    // PUT /api/applications/{id}  → update an existing application
    @PutMapping("/{id}")
    public ResponseEntity<ApplicationResponse> update(
            @PathVariable Long id,
            @Valid @RequestBody ApplicationRequest body,
            HttpServletRequest request) {
        Long studentId = getStudentId(request);
        return ResponseEntity.ok(applicationService.update(id, studentId, body));
    }

    // DELETE /api/applications/{id}  → delete an application
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> delete(
            @PathVariable Long id,
            HttpServletRequest request) {
        Long studentId = getStudentId(request);
        applicationService.delete(id, studentId);
        return ResponseEntity.ok(Map.of("message", "Application deleted successfully"));
    }

    // Handle service errors
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, String>> handleError(RuntimeException ex) {
        return ResponseEntity.badRequest().body(Map.of("error", ex.getMessage()));
    }
}
