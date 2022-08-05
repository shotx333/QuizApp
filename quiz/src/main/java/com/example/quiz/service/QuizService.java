package com.example.quiz.service;

import com.example.quiz.model.quiz.Category;
import com.example.quiz.model.quiz.Quiz;

import java.util.List;
import java.util.Set;

public interface QuizService {
    Quiz addQuiz(Quiz quiz);

    Quiz updateQuiz(Quiz quiz);

    Quiz getQuiz(Long quizId);

    Set<Quiz> getQuizzes();

    void deleteQuiz(Long quizId);

    List<Quiz> getQuizzesOfCategory(Category category);

    List<Quiz> getActiveQuizzes();

    List<Quiz> getActiveQuizzesOfCategory(Category c);
}
