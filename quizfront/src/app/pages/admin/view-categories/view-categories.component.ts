import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  categories: any = []

  constructor(private _category: CategoryService) { }

  ngOnInit(): void {

    this._category.categories().subscribe({
      next: (data: any) => {
        this.categories = data;
        console.log(this.categories);
      },
      error: (error) => {
        console.log(error);
        Swal.fire("Error", "Error in loading data", "error");

      }
    });

  }

  deleteCategory(cid: any) {
    Swal.fire({
      icon: 'info',
      title: 'Are you sure?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this._category.deleteCategory(cid).subscribe({
          next: (data) => {
            this.categories = this.categories.filter((category: { cid: any; }) => category.cid != cid);
            Swal.fire('Success', 'Category deleted successfully', 'success');
          },
          error: (error) => {
            Swal.fire('Error', 'You cannot delete Category which has 1 or more quiz', 'error');
          }
        });
      }
    });


  }

}
