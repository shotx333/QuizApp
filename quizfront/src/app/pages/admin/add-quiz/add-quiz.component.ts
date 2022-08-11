import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {


  categories: any = [

  ];

  quizData = {
    title: '',
    description: '',
    maxMarks: 100,
    numberOfQuestions: 1,
    active: false,
    category: {
      cid: ''

    },
  };


  constructor(private _cat: CategoryService, private _snack: MatSnackBar, private _quiz: QuizService) { }

  ngOnInit(): void {

    this._cat.categories().subscribe({
      next: (data: any) => {
        this.categories = data;
        console.log(this.categories);

      },
      error: (error: any) => {
        console.log(error);
        Swal.fire("Error", "Error in loadin data from server", "error");
      }
    }
    );
  }

  addQuiz() {
    if (this.quizData.title.trim() == '' || this.quizData.title == null) {
      this._snack.open("Title is required", "", { duration: 3000 });
      return;
    }

    if (this.quizData.maxMarks <1) {
      this._snack.open(" Minimum value of Max Marks should be 1", "", { duration: 3000 });
      return;
    }

    if (this.quizData.category.cid == "") {
      this._snack.open("Category is required", "", { duration: 3000 });
      return;
    }
    if(this.quizData.numberOfQuestions < 1){
      this._snack.open("Minimum value of Number of questions should be 1", "", { duration: 3000 });
      return;
    }


    this._quiz.addQuiz(this.quizData).subscribe({
      next: (data: any) => {

        Swal.fire("Success", "Quiz added successfully", "success");
        this.quizData = {
          title: '',
          description: '',
          maxMarks: 100,
          numberOfQuestions: 1,
          active: true,
          category: {
            cid: ''

          },
        };
      },
      error: (error: any) => {
        Swal.fire("Error", "Error in adding quiz", "error");
      }
    }
    );

  }
}
