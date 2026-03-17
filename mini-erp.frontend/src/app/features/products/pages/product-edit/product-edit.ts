import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductFormComponent } from '../../components/product-form/product-form';
import { ProductPayload } from '../../../../shared/interfaces/product-payload';
import { ProductService } from '../../services/products.service';


@Component({
  selector: 'app-product-edit-page',
  standalone: true,
  imports: [ProductFormComponent],
  templateUrl: './product-edit.html',
  styleUrl: './product-edit.scss'
})
export class ProductEditPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);

  productId = 0;
  initialValue?: ProductPayload;
  isLoading = false;
  errorMessage = '';

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProduct();
  }

  loadProduct(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.productService.getById(this.productId).subscribe({
      next: (product) => {
        this.initialValue = {
          name: product.name,
          price: product.price,
          categoryId: product.categoryId
        };
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'No se pudo cargar el producto.';
        this.isLoading = false;
      }
    });
  }

  onSubmit(payload: ProductPayload): void {
    this.errorMessage = '';

    this.productService.update(this.productId, payload).subscribe({
      next: () => {
        this.router.navigate(['/products']);
      },
      error: () => {
        this.errorMessage = 'No se pudo actualizar el producto.';
      }
    });
  }
}