import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private login: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.navigeteByRole();
  }

  navigeteByRole(){
    if(this.login.getUserRole() == 'ADMIN'){
this.router.navigate(['admin'])
    }else if(this.login.getUserRole() == 'NORMAL'){
      this.router.navigate(['user-dashboard/0'])
    }
  }

}
