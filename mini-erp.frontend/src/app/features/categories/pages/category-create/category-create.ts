import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { CategoryFormComponent } from '../../components/category-form/category-form';
import { CategoriesService } from '../../services/categories.service';
import { CategoryForm } from '../../interfaces/category-form.interface';

@Component({
  selector: 'app-category-create-page',
  standalone: true,
  imports: [CategoryFormComponent],
  templateUrl: './category-create.html',
  styleUrl: './category-create.scss'
})
export class CategoryCreatePage {
  private readonly categoriesService = inject(CategoriesService);
  private readonly router = inject(Router);

  loading = false;
  errorMessage = '';

  onSubmit(payload: CategoryForm): void {
    this.loading = true;
    this.errorMessage = '';

    this.categoriesService.create(payload).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/categories']);
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'No se pudo crear la categoría.';
      }
    });
  }
}