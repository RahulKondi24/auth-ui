import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,RouterOutlet,RouterLink, RouterLinkActive],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user: any = {};

  constructor(private userService: AuthService) {}

  register() {
    this.user.id=this.user.id=0
    this.userService.register(this.user).subscribe(response => {
      console.log('User registered successfully', response);
    }, error => {
      console.error('Error registering user', error);
    });
  }

}
