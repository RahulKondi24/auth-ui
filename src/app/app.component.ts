import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './component/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule,RouterLink, RouterLinkActive,CommonModule,NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  loggedInUserName: string="";
  title = 'auth-ui';

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Retrieve user name from local storage
    this.loggedInUserName = localStorage.getItem('loggedInUserName')!;
  }
  logout(): void {
    // Clear local storage
    localStorage.removeItem('loggedInUserName');
    localStorage.removeItem('token');
    // Navigate to login page
    this.router.navigate(['/login']);
  }
  isLoggedIn(): boolean {
    // Check if the authentication token exists in local storage
    const token = localStorage.getItem('token');
    
    // If token exists and is not expired, consider the user as logged in
    return !!token;
  }

}
