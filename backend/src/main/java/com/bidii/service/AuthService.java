package com.bidii.service;

import com.bidii.dto.LoginRequest;
import com.bidii.dto.LoginResponse;
import com.bidii.dto.RegisterRequest;
import com.bidii.entity.Student;
import com.bidii.repository.StudentRepository;
import com.bidii.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final StudentRepository studentRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(StudentRepository studentRepository,
                       PasswordEncoder passwordEncoder,
                       JwtUtil jwtUtil) {
        this.studentRepository = studentRepository;
        this.passwordEncoder   = passwordEncoder;
        this.jwtUtil           = jwtUtil;
    }

    public LoginResponse register(RegisterRequest request) {
        if (studentRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered: " + request.getEmail());
        }
        Student student = Student.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();

        Student saved = studentRepository.save(student);
        String token  = jwtUtil.generateToken(saved.getEmail(), saved.getId());

        return LoginResponse.builder()
                .token(token)
                .name(saved.getName())
                .email(saved.getEmail())
                .studentId(saved.getId())
                .build();
    }

    public LoginResponse login(LoginRequest request) {
        Student student = studentRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), student.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }
        String token = jwtUtil.generateToken(student.getEmail(), student.getId());

        return LoginResponse.builder()
                .token(token)
                .name(student.getName())
                .email(student.getEmail())
                .studentId(student.getId())
                .build();
    }
}
