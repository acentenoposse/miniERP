import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProductFormComponent } from '../../components/product-form/product-form';
import { ProductPayload } from '../../../../shared/interfaces/product-payload';
import { ProductService } from '../../services/products.service';


@Component({
  selector: 'app-product-create-page',
  standalone: true,
  imports: [ProductFormComponent],
  templateUrl: './product-create.html',
  styleUrl: './product-create.scss'
})
export class ProductCreatePage {
  private productService = inject(ProductService);
  private router = inject(Router);

  errorMessage = '';

  onSubmit(payload: ProductPayload): void {
    this.errorMessage = '';

    this.productService.create(payload).subscribe({
      next: () => {
        this.router.navigate(['/products']);
      },
      error: () => {
        this.errorMessage = 'No se pudo crear el producto.';
      }
    });
  }
}