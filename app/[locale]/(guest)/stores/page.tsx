"use client";

import { useState, useEffect } from "react";
import { StoreCard } from "@/components/store/StoreCard";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface Branch {
  id: string;
  name: string;
  code: string;
  address: {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
  telephone?: string;
  email?: string;
  whatsapp?: string;
  hours?: any;
  coordinates?: {
    latitude?: number;
    longitude?: number;
  };
  services?: string[];
  image?: string;
  isFlagship?: boolean;
}

export default function StoresPage() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [filteredBranches, setFilteredBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    fetchBranches();
  }, []);

  useEffect(() => {
    filterBranches();
  }, [branches, searchQuery, selectedCity]);

  const fetchBranches = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/public/branches");
      const data = await response.json();

      const branchesData = data.branches || [];
      setBranches(branchesData);

      // Extract unique cities
      const uniqueCities = Array.from(
        new Set(
          branchesData
            .map((b: Branch) => b.address.city)
            .filter(Boolean)
        )
      ) as string[];
      setCities(uniqueCities);

    } catch (error) {
      console.error("Error fetching branches:", error);
      setBranches([]);
    } finally {
      setLoading(false);
    }
  };

  const filterBranches = () => {
    let filtered = [...branches];

    // Filter by city
    if (selectedCity !== "all") {
      filtered = filtered.filter(
        (branch) => branch.address.city === selectedCity
      );
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (branch) =>
          branch.name.toLowerCase().includes(query) ||
          branch.code.toLowerCase().includes(query) ||
          branch.address.city?.toLowerCase().includes(query) ||
          branch.address.street?.toLowerCase().includes(query)
      );
    }

    setFilteredBranches(filtered);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            OUR STORES
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Visit us at any of our locations across Sri Lanka. Our expert staff
            are ready to help you find the perfect piece or assist with your
            custom design needs.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search stores by name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* City Filter */}
          {cities.length > 0 && (
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Results Count */}
        <p className="text-gray-600 mb-6">
          {loading
            ? "Loading stores..."
            : `Showing ${filteredBranches.length} ${
                filteredBranches.length === 1 ? "store" : "stores"
              }`}
        </p>

        {/* Stores Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading stores...</p>
          </div>
        ) : filteredBranches.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No stores found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBranches.map((branch) => (
              <StoreCard key={branch.id} branch={branch} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
