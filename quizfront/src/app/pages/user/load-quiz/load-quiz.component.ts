import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {
  catId: any;
  quizzes: any;
  constructor(
    private _route: ActivatedRoute,
    private _quiz: QuizService
  ) { }

  ngOnInit(): void {


    this._route.params.subscribe((params) => {
      this.catId = params['catId'];

      if (this.catId == 0) {
        console.log('Load all the quiz');
        this._quiz.getActiveQuizzes().subscribe({
          next: (data: any) => {
            this.quizzes = data;
            console.log(this.quizzes);

          },
          error: (error: any) => {
            console.log(error);
            alert("Error in loading all quizzes")

          }

        })

      } else {
        console.log("Load specifiq quiz");
        this._quiz.getActiveQuizzesOfCategory(this.catId).subscribe({

          next: (data: any) => {
            this.quizzes = data;

          },
          error: (error: any) => {
            alert("error in loading quiz data")
          }
        })
      }
    });

  }

}
