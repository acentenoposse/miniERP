import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../../../shared/interfaces/category.interface';

@Component({
  selector: 'app-category-list-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './category-list.html',
  styleUrl: './category-list.scss'
})
export class CategoryListPage implements OnInit {
  private readonly categoriesService = inject(CategoriesService);

  categories: Category[] = [];
  loading = true;
  deletingId: number | null = null;
  errorMessage = '';

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.loading = true;
    this.errorMessage = '';

    this.categoriesService.getAll().subscribe({
      next: (data) => {
        this.categories = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'No se pudieron cargar las categorías.';
      }
    });
  }

  deleteCategory(category: Category): void {
    const confirmed = window.confirm(`¿Eliminar la categoría "${category.name}"?`);

    if (!confirmed) {
      return;
    }

    this.deletingId = category.id;
    this.errorMessage = '';

    this.categoriesService.delete(category.id).subscribe({
      next: () => {
        this.categories = this.categories.filter((c) => c.id !== category.id);
        this.deletingId = null;
      },
      error: () => {
        this.deletingId = null;
        this.errorMessage = 'No se pudo eliminar la categoría.';
      }
    });
  }
}