"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/jewellery/ProductGrid";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight, Heart, Share2 } from "lucide-react";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  compareAtPrice?: number;
  sku?: string;
  inStock: boolean;
  stockQuantity?: number;
  images: string[];
  mainImage: string;
  tags?: string[];
  metalWeight?: number;
  customizable?: boolean;
  dimensions?: {
    length?: number;
    width?: number;
    height?: number;
    unit?: string;
  };
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Metal {
  id: string;
  name: string;
  purity?: string;
  color?: string;
}

interface Gem {
  id: string;
  name: string;
  color?: string;
  clarity?: string;
  cut?: string;
}

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [metal, setMetal] = useState<Metal | null>(null);
  const [gems, setGems] = useState<Gem[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/public/products/${productId}`);
      const data = await response.json();

      if (data.product) {
        setProduct(data.product);
        setCategory(data.category);
        setMetal(data.metal);
        setGems(data.gems || []);
        setRelatedProducts(data.relatedProducts || []);
      } else {
        toast.error("Product not found");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    if (navigator.share && product) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Link href="/jewellery">
            <Button>Browse All Jewellery</Button>
          </Link>
        </div>
      </div>
    );
  }

  const allImages = product.images.length > 0 ? product.images : [product.mainImage];
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPercentage = hasDiscount
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <Link href="/" className="text-gray-500 hover:text-gray-700">
            Home
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/jewellery" className="text-gray-500 hover:text-gray-700">
            Jewellery
          </Link>
          {category && (
            <>
              <span className="mx-2 text-gray-400">/</span>
              <Link
                href={`/jewellery/${category.slug}`}
                className="text-gray-500 hover:text-gray-700"
              >
                {category.name}
              </Link>
            </>
          )}
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        {/* Product Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div>
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden">
              <Image
                src={allImages[currentImageIndex] || "/images/placeholder-product.jpg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />

              {/* Navigation Arrows */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setCurrentImageIndex((i) =>
                        i === 0 ? allImages.length - 1 : i - 1
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={() =>
                      setCurrentImageIndex((i) =>
                        i === allImages.length - 1 ? 0 : i + 1
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {hasDiscount && (
                  <Badge className="bg-red-600">-{discountPercentage}%</Badge>
                )}
                {!product.inStock && <Badge className="bg-gray-600">OUT OF STOCK</Badge>}
              </div>
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative aspect-square bg-gray-100 rounded-lg overflow-hidden ${
                      currentImageIndex === index ? "ring-2 ring-black" : ""
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            {category && (
              <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                {category.name}
              </p>
            )}

            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

            {product.sku && (
              <p className="text-sm text-gray-500 mb-4">SKU: {product.sku}</p>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-gray-900">
                LKR {product.price.toLocaleString()}
              </span>
              {hasDiscount && (
                <span className="text-xl text-gray-500 line-through">
                  LKR {product.compareAtPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {product.inStock ? (
                <p className="text-green-600 font-medium">
                  ✓ In Stock
                  {product.stockQuantity && product.stockQuantity < 5 && (
                    <span className="text-orange-600 ml-2">
                      (Only {product.stockQuantity} left)
                    </span>
                  )}
                </p>
              ) : (
                <p className="text-red-600 font-medium">Out of Stock</p>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <div className="mb-6">
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 mb-8">
              <Button size="lg" className="flex-1" disabled={!product.inStock}>
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </Button>
              <Button variant="outline" size="lg" onClick={handleShare}>
                <Share2 className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg">
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            {/* Details Tabs */}
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4 mt-4">
                {metal && (
                  <div>
                    <h3 className="font-semibold mb-2">Metal</h3>
                    <p className="text-gray-700">
                      {metal.name}
                      {metal.purity && ` (${metal.purity})`}
                      {metal.color && ` - ${metal.color}`}
                    </p>
                  </div>
                )}

                {product.metalWeight && (
                  <div>
                    <h3 className="font-semibold mb-2">Weight</h3>
                    <p className="text-gray-700">{product.metalWeight}g</p>
                  </div>
                )}

                {gems.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Gemstones</h3>
                    <ul className="space-y-1">
                      {gems.map((gem) => (
                        <li key={gem.id} className="text-gray-700">
                          {gem.name}
                          {gem.color && ` - ${gem.color}`}
                          {gem.clarity && ` (${gem.clarity})`}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {product.customizable && (
                  <div>
                    <h3 className="font-semibold mb-2">Customization</h3>
                    <p className="text-gray-700">
                      This piece can be customized to your preferences.{" "}
                      <Link
                        href="/custom-design"
                        className="text-blue-600 hover:underline"
                      >
                        Request Custom Design
                      </Link>
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="specifications" className="space-y-4 mt-4">
                {product.dimensions && (
                  <div>
                    <h3 className="font-semibold mb-2">Dimensions</h3>
                    <p className="text-gray-700">
                      {product.dimensions.length && `L: ${product.dimensions.length}${product.dimensions.unit || "mm"}`}
                      {product.dimensions.width && ` × W: ${product.dimensions.width}${product.dimensions.unit || "mm"}`}
                      {product.dimensions.height && ` × H: ${product.dimensions.height}${product.dimensions.unit || "mm"}`}
                    </p>
                  </div>
                )}

                {product.tags && product.tags.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
            <ProductGrid products={relatedProducts} />
          </div>
        )}
      </div>
    </div>
  );
}
