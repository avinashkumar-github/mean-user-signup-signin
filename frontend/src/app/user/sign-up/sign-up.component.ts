import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../../user.service';
import { User } from './../../user.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [UserService],
})
export class SignUpComponent implements OnInit {
  emailRejex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  user: User = {
    name: '',
    email: '',
    password: '',
  };
  message: any = '';
  submitted = false;

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  createUser(data: any): void {
    if (data.form.status == 'INVALID') return;

    this.userService.create(data.value).subscribe(
      (response) => {
        this.message = response;
        this.submitted = true;
        this.router.navigate(['/signup']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
