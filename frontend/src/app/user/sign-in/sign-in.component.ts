import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from './../../user.model';
import { UserService } from './../../user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  constructor(
    private userService: UserService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {}

  model: User = {
    email: '',
    password: '',
  };

  errorStatus = false;
  errorMessage = '';

  ngOnInit(): void {
    if (this.userService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onLogin(data: NgForm): void {
    if (data.form.status == 'INVALID') {
      this.errorStatus = true;
      this.errorMessage = 'Error submitting form';
      return;
    }

    this.userService.authenticate(data.value).subscribe(
      (response: any) => {
        this.userService.setToken(response['token']);
        console.log(response['token']);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        this.errorStatus = true;
        this.errorMessage = error.message;
      }
    );
  }
}
