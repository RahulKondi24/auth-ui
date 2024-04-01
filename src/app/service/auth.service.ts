import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, interval, startWith, switchMap,of, throwError } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.baseURL;
  http: HttpClient
  constructor(private _http: HttpClient) {
    this.http=_http;
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/User/register`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/User/login`, credentials);
  }


  getUsers(): Observable<any[]> {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token');

    // Define the headers including the Authorization header with the JWT token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': '*/*'
    });

    // Make the GET request with the headers
    return this.http.get<any[]>(`${this.apiUrl}/api/User/users`, { headers });
  }
  getUserswithUser(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/User`);
  }
  isLoggedIn(): boolean {
    // Implement your logic to check if the user is logged in
    const token = localStorage.getItem('token');
    return !!token;
  }
  checkLoginStatus(): Observable<boolean> {
    // Execute the isLoggedIn() method every two seconds
    return interval(500).pipe(
      startWith(0), // Start with initial value to trigger the first check immediately
      switchMap(async () => this.isLoggedIn()) // Check if the user is logged in
    );
  }
  // Method to get the role from JWT token
  getRoleFromToken(): Observable<string | null> {
    // Retrieve the JWT token from local storage
    const token = localStorage.getItem('token');

    if (token) {
      try {
        // Split the token into its parts
        const parts = token.split('.');

        // Decode the payload part of the token
        const payload = JSON.parse(atob(parts[1]));

        // Extract the role from the decoded payload
        const role: string = payload.role;

        return of(role);
      } catch (error) {
        console.error('Error decoding token', error);
        return throwError('Error decoding token');
      }
    } else {
      // If token is not available, return an observable with null
      return of(null);
    }
  }
}
