import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {
  public Editor = ClassicEditor;
  quesId = 0;
  qTitle: any;
  question: any = { content: '', option1: '', option2: '', option3: '', option4: '', answer: '' };

  constructor(
    private _route: ActivatedRoute,
    private _question: QuestionService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.quesId = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];
    this._question.getQuestion(this.quesId).subscribe({
      next: (data: any) => {
        this.question = data;
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  public updateQuestion() {
    this._question.updateQuestion(this.question).subscribe({
      next: (data: any) => {
        Swal.fire({ title: 'Success', text: 'Question updated successfully', icon: 'success' });
        this._router.navigate(['/admin/quizzes']);
      },
      error: (error: any) => {
        Swal.fire({ title: 'Error', text: 'Error in updating question', icon: 'error' });
      }
    })
  }

}
