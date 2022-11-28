import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private _quiz: QuizService, private _cat: CategoryService, private _router: Router, private _question: QuestionService) { }

  qId = 0;
  quiz: any;
  categories: any;
  questions: any = [];
  ngOnInit(): void {



    this.qId = this._route.snapshot.params['qid'];
    this._quiz.getQuiz(this.qId).subscribe(
      {
        next: (data: any) => {
          this.quiz = data;
        },
        error: (error: any) => {
          console.log(error);
        }

      }
    );

    this._cat.categories().subscribe({

      next: (data: any) => {
        this.categories = data;

      },
      error: (error: any) => {
        alert('error in loading categories');
      }
    });

    this._question.getQuestionsOfQuiz(this.qId).subscribe({
      next: (data: any) => {
        this.questions = data;
      },
      error: (error: any) => {
        console.log(error);

      }
    })
  }

  public updateData() {


    if (this.quiz.active == true && this.quiz.numberOfQuestions != this.questions.length) {
      Swal.fire('Error', 'Number of questions does not match', 'error');
      console.log(this.questions.length);

      return;
    }
    if (this.quiz.numberOfQuestions < 1) {
      Swal.fire('Error', 'Number of questions should be greater than 0', 'error');
      return;
    }
    this._quiz.updateQuiz(this.quiz).subscribe({
      next: (data: any) => {
        Swal.fire("Updated Successfully", "Quiz updated", "success").then((e) => {
          this._router.navigate(['/admin/quizzes']);
        });
      },
      error: (error: any) => {
        Swal.fire('Error', 'error in updating quiz', 'error');
        console.log(error);

      }
    })
  }
}
