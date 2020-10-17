import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { User } from '../models/user';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiURL = environment.apiURL;

  constructor(private http: HttpClient) { }

  // Error Handler for api requests.
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiURL).pipe(catchError(this.handleError));
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiURL, user).pipe(catchError(this.handleError));
  }

  editUser(user: User): Observable<User> {
    return this.http.patch<User>(this.apiURL, user).pipe(catchError(this.handleError));
  }

  generateEmail(name: string): Observable<string> {
    let endpointURL = this.apiURL + "/generateEmail/" + name;
    return this.http.get<string>(endpointURL, {responseType: 'text' as 'json'}).pipe(catchError(this.handleError));
  }
}
