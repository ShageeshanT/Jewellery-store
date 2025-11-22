"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Metal {
  id: string;
  name: string;
  type: string;
}

interface FilterPanelProps {
  categories?: Category[];
  metals?: Metal[];
  onFilterChange: (filters: FilterState) => void;
  className?: string;
}

export interface FilterState {
  categoryId?: string;
  metalId?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  featured?: boolean;
}

export function FilterPanel({
  categories = [],
  metals = [],
  onFilterChange,
  className
}: FilterPanelProps) {
  const [filters, setFilters] = useState<FilterState>({});
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);

  const updateFilter = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    if (value === undefined || value === "" || value === false) {
      delete newFilters[key];
    }
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
    setPriceRange([0, 500000]);
    onFilterChange({});
  };

  const hasActiveFilters = Object.keys(filters).length > 0;

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Filters</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-sm"
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div className="border-t pt-4">
          <h4 className="font-medium mb-3">Category</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category.id}`}
                  checked={filters.categoryId === category.id}
                  onCheckedChange={(checked) => {
                    updateFilter("categoryId", checked ? category.id : undefined);
                  }}
                />
                <Label
                  htmlFor={`category-${category.id}`}
                  className="text-sm cursor-pointer"
                >
                  {category.name}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Price Range */}
      <div className="border-t pt-4">
        <h4 className="font-medium mb-3">Price Range</h4>
        <div className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={(value) => {
              setPriceRange(value as [number, number]);
            }}
            onValueCommit={(value) => {
              const [min, max] = value as [number, number];
              updateFilter("minPrice", min);
              updateFilter("maxPrice", max);
            }}
            max={500000}
            step={5000}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>LKR {priceRange[0].toLocaleString()}</span>
            <span>LKR {priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Metals */}
      {metals.length > 0 && (
        <div className="border-t pt-4">
          <h4 className="font-medium mb-3">Metal Type</h4>
          <div className="space-y-2">
            {metals.map((metal) => (
              <div key={metal.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`metal-${metal.id}`}
                  checked={filters.metalId === metal.id}
                  onCheckedChange={(checked) => {
                    updateFilter("metalId", checked ? metal.id : undefined);
                  }}
                />
                <Label
                  htmlFor={`metal-${metal.id}`}
                  className="text-sm cursor-pointer"
                >
                  {metal.name}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Availability */}
      <div className="border-t pt-4">
        <h4 className="font-medium mb-3">Availability</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="in-stock"
              checked={filters.inStock === true}
              onCheckedChange={(checked) => {
                updateFilter("inStock", checked ? true : undefined);
              }}
            />
            <Label htmlFor="in-stock" className="text-sm cursor-pointer">
              In Stock Only
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="featured"
              checked={filters.featured === true}
              onCheckedChange={(checked) => {
                updateFilter("featured", checked ? true : undefined);
              }}
            />
            <Label htmlFor="featured" className="text-sm cursor-pointer">
              Featured Items
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
}
