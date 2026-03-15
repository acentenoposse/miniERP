import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../../../shared/interfaces/category.interface';

@Component({
  selector: 'app-category-list-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-list.html',
  styleUrl: './category-list.scss'
})
export class CategoryListPage implements OnInit {

  private readonly categoriesService = inject(CategoriesService);

  categories: Category[] = [];
  loading = true;

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {

    this.categoriesService.getAll().subscribe({
      next: (data) => {
        this.categories = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });

  }

}