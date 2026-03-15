import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { API_CONFIG } from '../config/api.config';
import { TokenService } from './token.service';
import { LoginRequest, LoginResponse } from '../../shared/interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly tokenService = inject(TokenService);

  login(payload: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${API_CONFIG.baseUrl}/auth/login`, payload)
      .pipe(
        tap((response) => {
          this.tokenService.setToken(response.token);
        })
      );
  }

  logout(): void {
    this.tokenService.removeToken();
  }

  isAuthenticated(): boolean {
    return this.tokenService.hasToken();
  }
}