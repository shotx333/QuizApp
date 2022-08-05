import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes: any = [
  ];

  constructor(private _quiz: QuizService) { }

  ngOnInit(): void {

    this._quiz.quizzes().subscribe({
      next: (data: any) => {
        this.quizzes = data;
        console.log(this.quizzes);

      },
      error: (error) => {
        console.log(error);
        Swal.fire("Error", "Error in fetching quizzes", "error");
      }

    });

  }

  deleteQuiz(qId: any) {
    Swal.fire({
      icon: 'info',
      title: 'Are you sure?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this._quiz.deleteQuiz(qId).subscribe({
          next: (data) => {
            this.quizzes = this.quizzes.filter((quiz: { qId: any; }) => quiz.qId != qId);
            Swal.fire('Success', 'Quiz deleted successfully', 'success');
          },
          error: (error) => {
            Swal.fire('Error', 'Error in deleting quiz', 'error');
          }
        });
      }
    });
  }
}
