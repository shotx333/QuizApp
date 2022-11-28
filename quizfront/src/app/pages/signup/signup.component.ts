import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserService, private _snack: MatSnackBar) { }

  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  }
  ngOnInit(): void {
  }

  formSubmit() {

    console.log(this.user);

    if (this.user.username == '' || this.user.password == null) {
      this._snack.open("Userame is required", '', { duration: 3000 });
      return;
    }



    this.userService.addUser(this.user).subscribe({
      next: (data: any) => {
        console.log(data);

        Swal.fire('Success', 'User registered successfully', 'success');
      },
      error: (error) => {
        console.log(error)
        this._snack.open("Something went wrong", '', { duration: 3000 });
      }
    })
  }
  clear() {
    this.user.username = '';
    this.user.password = '';
    this.user.firstName = '';
    this.user.lastName = '';
    this.user.email = '';
    this.user.phone = '';
  }
}
