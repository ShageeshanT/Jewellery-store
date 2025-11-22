"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ProductGrid } from "@/components/jewellery/ProductGrid";
import { FilterPanel, FilterState } from "@/components/jewellery/FilterPanel";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number;
  mainImage: string;
  categoryName?: string;
  inStock?: boolean;
  featured?: boolean;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

interface Metal {
  id: string;
  name: string;
  type: string;
}

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params.category as string;

  const [products, setProducts] = useState<Product[]>([]);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [metals, setMetals] = useState<Metal[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({});
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Fetch categories and metals
  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        const [categoriesRes, metalsRes] = await Promise.all([
          fetch("/api/public/categories"),
          fetch("/api/public/metals"),
        ]);

        const categoriesData = await categoriesRes.json();
        const metalsData = await metalsRes.json();

        const cats = categoriesData.categories || [];
        setCategories(cats);
        setMetals(metalsData.metals || []);

        // Find current category by slug
        const category = cats.find((c: Category) => c.slug === categorySlug);
        if (category) {
          setCurrentCategory(category);
          setFilters({ categoryId: category.id });
        }
      } catch (error) {
        console.error("Error fetching filter data:", error);
      }
    };

    fetchFilterData();
  }, [categorySlug]);

  // Fetch products when filters change
  useEffect(() => {
    if (filters.categoryId) {
      fetchProducts();
    }
  }, [filters, sortBy, sortOrder, page]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        sortBy,
        sortOrder,
        ...(filters.categoryId && { categoryId: filters.categoryId }),
        ...(filters.metalId && { metalId: filters.metalId }),
        ...(filters.minPrice && { minPrice: filters.minPrice.toString() }),
        ...(filters.maxPrice && { maxPrice: filters.maxPrice.toString() }),
        ...(filters.inStock && { inStock: "true" }),
        ...(filters.featured && { featured: "true" }),
      });

      const response = await fetch(`/api/public/products?${params}`);
      const data = await response.json();

      setProducts(data.products || []);
      setTotalPages(data.pagination?.totalPages || 0);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters: FilterState) => {
    // Keep the category filter
    setFilters({ ...newFilters, categoryId: currentCategory?.id });
    setPage(0);
  };

  if (!currentCategory && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
          <Link href="/jewellery">
            <Button>Browse All Jewellery</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Category Hero */}
      {currentCategory && (
        <div
          className="bg-gray-50 border-b bg-cover bg-center"
          style={
            currentCategory.image
              ? { backgroundImage: `url(${currentCategory.image})` }
              : {}
          }
        >
          <div className="bg-white/80 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              {/* Breadcrumb */}
              <nav className="mb-4 text-sm">
                <Link href="/" className="text-gray-500 hover:text-gray-700">
                  Home
                </Link>
                <span className="mx-2 text-gray-400">/</span>
                <Link
                  href="/jewellery"
                  className="text-gray-500 hover:text-gray-700"
                >
                  Jewellery
                </Link>
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-gray-900">{currentCategory.name}</span>
              </nav>

              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {currentCategory.name}
              </h1>
              {currentCategory.description && (
                <p className="text-gray-600 max-w-2xl">
                  {currentCategory.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Sort Bar */}
        <div className="flex justify-between items-center mb-8">
          <p className="text-gray-600">
            {loading ? "Loading..." : `${products.length} products`}
          </p>

          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="createdAt">Newest</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="viewCount">Popular</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Ascending</SelectItem>
                <SelectItem value="desc">Descending</SelectItem>
              </SelectContent>
            </Select>

            {/* Mobile Filter Toggle */}
            <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="outline" size="icon">
                  <SlidersHorizontal className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <FilterPanel
                  categories={[]}
                  metals={metals}
                  onFilterChange={handleFilterChange}
                />
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-4">
              <FilterPanel
                categories={[]}
                metals={metals}
                onFilterChange={handleFilterChange}
              />
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Loading products...</p>
              </div>
            ) : (
              <>
                <ProductGrid
                  products={products}
                  emptyMessage={`No ${currentCategory?.name.toLowerCase()} found`}
                />

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8 flex justify-center gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setPage((p) => Math.max(0, p - 1))}
                      disabled={page === 0}
                    >
                      Previous
                    </Button>
                    <div className="flex items-center gap-2">
                      {Array.from({ length: totalPages }, (_, i) => (
                        <Button
                          key={i}
                          variant={page === i ? "default" : "outline"}
                          onClick={() => setPage(i)}
                          className="w-10"
                        >
                          {i + 1}
                        </Button>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      onClick={() =>
                        setPage((p) => Math.min(totalPages - 1, p + 1))
                      }
                      disabled={page === totalPages - 1}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
