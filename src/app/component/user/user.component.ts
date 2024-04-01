import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // Only import HttpClientModule
import { environment } from '../../../environments/environment';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, HttpClientModule], // Include HttpClientModule in imports
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'] // Use styleUrls instead of styleUrl
})
export class UserComponent implements OnInit {
  users: any[] = [];
  loading: boolean = false;

  constructor(private userService: AuthService) { }

  ngOnInit(): void {
    this.loading = true; // Set loading to true before making the API call
    this.userService.getRoleFromToken().subscribe(role => {
      if (role === 'Admin') {
        this.fetchUsers();
      } else {
        this.fetchUserswithUser();
      }
    });
  }

  fetchUsers(): void {
    // Call your service method to fetch users here
    this.userService.getUsers().subscribe(
      users => {
        this.users = users;
        this.loading = false; // Hide loading spinner after API call completes
      },
      error => {
        console.error('Error fetching users', error);
        this.loading = false; // Hide loading spinner in case of error
      }
    );
  }
  fetchUserswithUser(): void {
    // Call your service method to fetch users here
    this.userService.getUserswithUser().subscribe(users => {
      this.users = users;
      this.loading = false; // Hide loading spinner after API call completes
    }, error => {
      console.error('Error fetching users', error);
      this.loading = false; // Hide loading spinner in case of error
    });
  }
}
