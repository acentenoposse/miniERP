import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { CategoryForm } from '../../interfaces/category-form.interface';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './category-form.html',
  styleUrl: './category-form.scss'
})
export class CategoryFormComponent implements OnChanges {
  private readonly fb = inject(FormBuilder);

  @Input() initialValue: CategoryForm | null = null;
  @Input() submitText = 'Guardar';
  @Input() loading = false;

  @Output() formSubmit = new EventEmitter<CategoryForm>();

  form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(100)]]
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialValue'] && this.initialValue) {
      this.form.patchValue({
        name: this.initialValue.name
      });
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.formSubmit.emit({
      name: this.form.getRawValue().name?.trim() ?? ''
    });
  }
}