import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, defer, from, of, throwError } from 'rxjs';
import { catchError, flatMap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(
    protected router: Router, 
    public authService: AuthService,
    public http: HttpClient
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!new RegExp(environment.apiUrl).test(req.url) || req.url.match(/auth/)) {
      return next.handle(req);
    }

    return this.authService.authenticate().pipe(
      map(token => {
        let address = localStorage.getItem('openvino.address');
        let expire = localStorage.getItem('openvino.expire');
        let role = localStorage.getItem('openvino.role');
        let integrity = localStorage.getItem('openvino.integrity');
        return this.buildRequest(req, address, expire, integrity, role, token)
      }),
      flatMap(req => next.handle(req))
    )
  }

  private buildRequest(req: HttpRequest<any>, address: string, expire: string, integrity: string, role: string, token: string): HttpRequest<any> {
    return req.clone({
      setHeaders: {
          'Authorization': token,
          'X-API-Key': `${address}$${expire}$${integrity}$${role}`
      }
    })
  }
}
