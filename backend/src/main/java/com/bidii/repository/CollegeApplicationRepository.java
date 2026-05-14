package com.bidii.repository;

import com.bidii.entity.CollegeApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface CollegeApplicationRepository extends JpaRepository<CollegeApplication, Long> {
    List<CollegeApplication> findByStudentIdOrderByAppliedAtDesc(Long studentId);
    Optional<CollegeApplication> findByIdAndStudentId(Long id, Long studentId);
}
