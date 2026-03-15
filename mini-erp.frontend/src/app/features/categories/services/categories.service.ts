import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_CONFIG } from '../../../core/config/api.config';
import { Category } from '../../../shared/interfaces/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private readonly http = inject(HttpClient);

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(
      `${API_CONFIG.baseUrl}/categories`
    );
  }
}