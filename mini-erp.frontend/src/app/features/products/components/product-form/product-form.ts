import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriesService } from '../../../categories/services/categories.service';
import { ProductPayload } from '../../../../shared/interfaces/product-payload';
import { Category } from '../../../../shared/interfaces/category.interface';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss'
})
export class ProductFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private categoryService = inject(CategoriesService);

  @Input() initialValue?: ProductPayload;
  @Output() formSubmit = new EventEmitter<ProductPayload>();

  categories: Category[] = [];
  isLoadingCategories = false;
  errorMessage = '';

  form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    price: [null as number | null, [Validators.required, Validators.min(0.01)]],
    categoryId: [null as number | null, [Validators.required]]
  });

  ngOnInit(): void {
    this.loadCategories();

    if (this.initialValue) {
      this.form.patchValue({
        name: this.initialValue.name,
        price: this.initialValue.price,
        categoryId: this.initialValue.categoryId
      });
    }
  }

  loadCategories(): void {
    this.isLoadingCategories = true;
    this.errorMessage = '';

    this.categoryService.getAll().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.isLoadingCategories = false;
      },
      error: () => {
        this.errorMessage = 'No se pudieron cargar las categorías.';
        this.isLoadingCategories = false;
      }
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();

    this.formSubmit.emit({
      name: raw.name ?? '',
      price: Number(raw.price),
      categoryId: Number(raw.categoryId)
    });
  }

  get nameControl() {
    return this.form.controls.name;
  }

  get priceControl() {
    return this.form.controls.price;
  }

  get categoryIdControl() {
    return this.form.controls.categoryId;
  }
}