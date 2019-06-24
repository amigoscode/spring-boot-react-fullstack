package com.amigoscode.demo.student;

import java.time.LocalDate;
import java.util.UUID;

public class StudentCourse {

    private final UUID studentId;
    private final UUID courseId;
    private final String name;
    private final String description;
    private final String department;
    private final String teacherName;
    private final LocalDate startDate;
    private final LocalDate endDate;
    private final Integer grade;

    public StudentCourse(UUID studentId,
                         UUID courseId,
                         String name,
                         String description,
                         String department,
                         String teacherName,
                         LocalDate startDate,
                         LocalDate endDate,
                         Integer grade) {
        this.studentId = studentId;
        this.courseId = courseId;
        this.name = name;
        this.description = description;
        this.department = department;
        this.teacherName = teacherName;
        this.startDate = startDate;
        this.endDate = endDate;
        this.grade = grade;
    }

    public UUID getStudentId() {
        return studentId;
    }

    public UUID getCourseId() {
        return courseId;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public String getDepartment() {
        return department;
    }

    public String getTeacherName() {
        return teacherName;
    }


    public LocalDate getStartDate() {
        return startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public Integer getGrade() {
        return grade;
    }
}
