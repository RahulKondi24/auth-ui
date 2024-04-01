import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterOutlet,RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  credentials: any = {};

  constructor(private userService: AuthService, private router: Router) {}

  login() {
    this.userService.login(this.credentials).subscribe(
      (response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('loggedInUserName', response.user);
        this.router.navigate(['/users']);
        console.log('Login successful');
        // Handle successful login, e.g., redirect to dashboard
      },
      (error) => {
        console.error('Error logging in', error);
      }
    );
  }
}
