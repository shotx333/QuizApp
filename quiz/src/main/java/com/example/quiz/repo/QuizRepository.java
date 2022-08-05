package com.example.quiz.repo;

import com.example.quiz.model.quiz.Category;
import com.example.quiz.model.quiz.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuizRepository extends JpaRepository<Quiz, Long> {
    List<Quiz> findByCategory(Category category);

    List<Quiz> findByActive(Boolean b);

    List<Quiz> findByCategoryAndActive(Category c, Boolean b);
}
