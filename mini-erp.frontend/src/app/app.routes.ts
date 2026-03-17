import { Routes } from '@angular/router';
import { AdminLayout } from './core/layout/admin-layout/admin-layout';
import { LoginPage } from './features/auth/pages/login/login';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: '',
    component: AdminLayout,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/pages/dashboard/dashboard').then(m => m.DashboardPage)
      },
      {
        path: 'products',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/products/pages/product-list/product-list').then(m => m.ProductListPage)
          },
          {
            path: 'new',
            loadComponent: () =>
              import('./features/products/pages/product-create/product-create').then(m => m.ProductCreatePage)
          },
          {
            path: 'edit/:id',
            loadComponent: () =>
              import('./features/products/pages/product-edit/product-edit').then(m => m.ProductEditPage)
          }
        ]
      },
      {
        path: 'categories',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/categories/pages/category-list/category-list').then(m => m.CategoryListPage)
          },
          {
            path: 'new',
            loadComponent: () =>
              import('./features/categories/pages/category-create/category-create').then(m => m.CategoryCreatePage)
          },
          {
            path: 'edit/:id',
            loadComponent: () =>
              import('./features/categories/pages/category-edit/category-edit').then(m => m.CategoryEditPage)
          }
        ]
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
