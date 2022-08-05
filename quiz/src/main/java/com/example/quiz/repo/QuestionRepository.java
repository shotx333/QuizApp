package com.example.quiz.repo;

import com.example.quiz.model.quiz.Question;
import com.example.quiz.model.quiz.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface QuestionRepository extends JpaRepository<Question, Long> {

    Set<Question> findByQuiz(Quiz quiz);
}
