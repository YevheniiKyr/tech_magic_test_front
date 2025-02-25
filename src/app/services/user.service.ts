import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5000/users';

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  deleteUser(id: any): Observable<any[]> {
    return this.http.delete<any[]>(`${this.apiUrl}/${id}`);
  }

  updateUser(updatedUser: any): Observable<any[]> {
    return this.http.put<any[]>(`${this.apiUrl}/${updatedUser._id}`, updatedUser);
  }
}

