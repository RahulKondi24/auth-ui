import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterOutlet,RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnDestroy {

    isLoggedIn: boolean=false;
    loggedInUserName: string="";
    private loginStatusSubscription: Subscription;
  
    constructor(private authService: AuthService,private router : Router) {
      // Subscribe to the login status
      this.loginStatusSubscription = this.authService.checkLoginStatus().subscribe(
        isLoggedIn => {
          this.isLoggedIn = isLoggedIn;
          if (isLoggedIn) {
            // If logged in, get the username from local storage
            this.loggedInUserName = localStorage.getItem('loggedInUserName')!;
          } else {
            // If not logged in, clear the username
            this.loggedInUserName = "";
          }
        }
      );
    }
  
    ngOnDestroy(): void {
      // Unsubscribe from the login status subscription to avoid memory leaks
      this.loginStatusSubscription.unsubscribe();
    }
  
    logout(): void {
      // Implement your logout logic here
      // For example:
      // Clear local storage items
      localStorage.removeItem('token');
      localStorage.removeItem('loggedInUserName');
      this.router.navigate(['/login']);
      // Redirect to login page or perform any other actions
      this.isLoggedIn = false;
    }
  
}
