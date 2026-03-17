export interface DashboardSummary {
  productsCount: number;
  categoriesCount: number;
  recentProducts: RecentProduct[];
  recentCategories: RecentCategory[];
}

export interface RecentProduct {
  id: number;
  name: string;
  price: number;
  categoryName: string;
}

export interface RecentCategory {
  id: number;
  name: string;
}