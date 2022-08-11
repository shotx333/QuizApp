import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {
  qId: any;
  quiz: any;
  qTitle: any;
  questions: any = [];
  constructor(
    private _route: ActivatedRoute,
    private _question: QuestionService,
    private _snackbar: MatSnackBar,
    private _quiz: QuizService
  ) { }

  ngOnInit(): void {

    this.qId = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];
    this._question.getQuestionsOfQuiz(this.qId).subscribe({

      next: (data: any) => {
        console.log(data);
        this.questions = data;
      },
      error: (error) => {
        console.log(error);

      }
    })
    console.log(this.qId);
    console.log(this.qTitle);

    this._quiz.getQuiz(this.qId).subscribe({
      next: (data: any) => {
        this.quiz = data;
      }
    })

  }
  deleteQuestion(qid: any) {
    Swal.fire({
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      title: 'Are you sure you want to delete this question?',
    }).then((result => {
      if (result.isConfirmed && this.quiz.active == false) {
        this._question.deleteQuestion(qid).subscribe({
          next: (data) => {
            this._snackbar.open('Question deleted successfully', '', {
              duration: 3000,
            });
            this.questions = this.questions.filter((q: any) => q.quesId != qid);
          },
          error: (error) => {
            this._snackbar.open('Error deleting question', '', {
              duration: 3000,
            });
            console.log(error);

          }

        })
      } else if (result.isConfirmed && this.quiz.active) {
        Swal.fire('Error', 'You cannot delete a question while quiz is published', 'error');
      }

    }))
  }
}
