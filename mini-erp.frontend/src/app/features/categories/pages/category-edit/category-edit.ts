import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CategoryFormComponent } from '../../components/category-form/category-form';
import { CategoriesService } from '../../services/categories.service';
import { CategoryForm } from '../../interfaces/category-form.interface';

@Component({
  selector: 'app-category-edit-page',
  standalone: true,
  imports: [CategoryFormComponent],
  templateUrl: './category-edit.html',
  styleUrl: './category-edit.scss'
})
export class CategoryEditPage implements OnInit {
  private readonly categoriesService = inject(CategoriesService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  categoryId = 0;
  initialValue: CategoryForm | null = null;
  loading = false;
  pageLoading = true;
  errorMessage = '';

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.router.navigate(['/categories']);
      return;
    }

    this.categoryId = id;

    this.categoriesService.getById(id).subscribe({
      next: (category) => {
        this.initialValue = {
          name: category.name
        };
        this.pageLoading = false;
      },
      error: () => {
        this.pageLoading = false;
        this.errorMessage = 'No se pudo cargar la categoría.';
      }
    });
  }

  onSubmit(payload: CategoryForm): void {
    this.loading = true;
    this.errorMessage = '';

    this.categoriesService.update(this.categoryId, payload).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/categories']);
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'No se pudo actualizar la categoría.';
      }
    });
  }
}