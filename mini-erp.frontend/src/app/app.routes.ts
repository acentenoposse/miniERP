import { Routes } from '@angular/router';
import { AdminLayout } from './core/layout/admin-layout/admin-layout';
import { LoginPage } from './features/auth/pages/login/login';
import { DashboardPage } from './features/dashboard/pages/dashboard/dashboard';
import { ProductListPage } from './features/products/pages/product-list/product-list';
import { CategoryListPage } from './features/categories/pages/category-list/category-list';
import { CategoryCreatePage } from './features/categories/pages/category-create/category-create';
import { CategoryEditPage } from './features/categories/pages/category-edit/category-edit';
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
        component: DashboardPage
      },
      {
        path: 'products',
        component: ProductListPage
      },
      {
        path: 'categories',
        component: CategoryListPage
      },
      {
        path: 'categories/new',
        component: CategoryCreatePage
      },
      {
        path: 'categories/edit/:id',
        component: CategoryEditPage
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