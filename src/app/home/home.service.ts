import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../core/auth.service';
import { WorkModel } from './work.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  public getTasks(): Observable<WorkModel[]> {
    let account = this.authService.getAccount();
    return this.http.get(`${environment.apiUrl}/tasks?public_key=${account}`).pipe(
      map((res: any) => {
        return res.map(item => {
          return new WorkModel(item)
        })
      })
    )
  }
}
