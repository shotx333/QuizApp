import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  categories: any;
  constructor(
    private _cat: CategoryService,
    private _snack: MatSnackBar
  ) { }

  ngOnInit(): void {

    this._cat.categories().subscribe({
      next: (data: any) => {
        this.categories = data;
      },
      error: (error: any) => {
        this._snack.open("Error in loading categories form server", '', { duration: 3000 });
      }
    });
  }

}
