import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  userDetails: any = {};
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(
      (response: any) => {
        this.userDetails = response['user'];
      },
      (error) => {}
    );
  }

  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(['/signin']);
  }
}
