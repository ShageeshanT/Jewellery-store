import mongoose from "mongoose";
import Category from "../models/category";
import Metal from "../models/metal";
import Gem from "../models/gem";
import Product from "../models/product";
import Branch from "../models/branch";
import Review from "../models/review";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/jewellery-store";

// Sample data
const categories = [
  {
    id: "cat-rings",
    name: "Rings",
    slug: "rings",
    description: "Exquisite rings for every occasion",
    displayOrder: 1,
    isActive: true,
  },
  {
    id: "cat-necklaces",
    name: "Necklaces",
    slug: "necklaces",
    description: "Elegant necklaces to complement your style",
    displayOrder: 2,
    isActive: true,
  },
  {
    id: "cat-earrings",
    name: "Earrings",
    slug: "earrings",
    description: "Beautiful earrings for any look",
    displayOrder: 3,
    isActive: true,
  },
  {
    id: "cat-bracelets",
    name: "Bracelets",
    slug: "bracelets",
    description: "Stunning bracelets and bangles",
    displayOrder: 4,
    isActive: true,
  },
  {
    id: "cat-bridal",
    name: "Bridal Collection",
    slug: "bridal",
    description: "Special pieces for your special day",
    displayOrder: 5,
    isActive: true,
  },
];

const metals = [
  {
    id: "metal-18k-gold",
    name: "18K Gold",
    slug: "18k-gold",
    purity: "75%",
    color: "Yellow",
    pricePerGram: 15000,
    isActive: true,
  },
  {
    id: "metal-22k-gold",
    name: "22K Gold",
    slug: "22k-gold",
    purity: "91.6%",
    color: "Yellow",
    pricePerGram: 18000,
    isActive: true,
  },
  {
    id: "metal-platinum",
    name: "Platinum",
    slug: "platinum",
    purity: "95%",
    color: "White",
    pricePerGram: 25000,
    isActive: true,
  },
  {
    id: "metal-white-gold",
    name: "White Gold",
    slug: "white-gold",
    purity: "75%",
    color: "White",
    pricePerGram: 16000,
    isActive: true,
  },
  {
    id: "metal-rose-gold",
    name: "Rose Gold",
    slug: "rose-gold",
    purity: "75%",
    color: "Rose",
    pricePerGram: 15500,
    isActive: true,
  },
];

const gems = [
  {
    id: "gem-diamond",
    name: "Diamond",
    slug: "diamond",
    color: "Clear",
    clarity: "VS1",
    cut: "Brilliant",
    caratWeight: 1,
    pricePerCarat: 500000,
    isActive: true,
  },
  {
    id: "gem-ruby",
    name: "Ruby",
    slug: "ruby",
    color: "Red",
    clarity: "VS",
    cut: "Oval",
    caratWeight: 1,
    pricePerCarat: 200000,
    isActive: true,
  },
  {
    id: "gem-sapphire",
    name: "Sapphire",
    slug: "sapphire",
    color: "Blue",
    clarity: "VS",
    cut: "Oval",
    caratWeight: 1,
    pricePerCarat: 150000,
    isActive: true,
  },
  {
    id: "gem-emerald",
    name: "Emerald",
    slug: "emerald",
    color: "Green",
    clarity: "VS",
    cut: "Emerald",
    caratWeight: 1,
    pricePerCarat: 180000,
    isActive: true,
  },
];

const products = [
  // Rings
  {
    id: "prod-diamond-solitaire",
    name: "Classic Diamond Solitaire Ring",
    slug: "classic-diamond-solitaire-ring",
    description: "A timeless diamond solitaire ring featuring a brilliant-cut diamond set in 18K white gold. Perfect for engagements or special occasions.",
    price: 245000,
    compareAtPrice: 280000,
    categoryId: "cat-rings",
    metalId: "metal-white-gold",
    gemIds: ["gem-diamond"],
    mainImage: "/images/rings-ribbon.jpg",
    images: ["/images/rings-ribbon.jpg"],
    sku: "RING-DS-001",
    inStock: true,
    stockQuantity: 5,
    featured: true,
    customizable: true,
    metalWeight: 3.5,
    tags: ["engagement", "diamond", "solitaire"],
    isActive: true,
  },
  {
    id: "prod-ruby-band",
    name: "Ruby Eternity Band",
    slug: "ruby-eternity-band",
    description: "Elegant eternity band featuring oval-cut rubies set in 18K yellow gold. A symbol of eternal love.",
    price: 189000,
    categoryId: "cat-rings",
    metalId: "metal-18k-gold",
    gemIds: ["gem-ruby"],
    mainImage: "/images/model-wire-hoop.jpg",
    images: ["/images/model-wire-hoop.jpg"],
    sku: "RING-RB-002",
    inStock: true,
    stockQuantity: 3,
    featured: true,
    metalWeight: 4.2,
    tags: ["ruby", "eternity", "wedding"],
    isActive: true,
  },
  {
    id: "prod-sapphire-cluster",
    name: "Sapphire Cluster Ring",
    slug: "sapphire-cluster-ring",
    description: "Stunning cluster ring with blue sapphires surrounded by diamonds in white gold setting.",
    price: 156000,
    categoryId: "cat-rings",
    metalId: "metal-white-gold",
    gemIds: ["gem-sapphire", "gem-diamond"],
    mainImage: "/images/rings-ribbon.jpg",
    images: ["/images/rings-ribbon.jpg"],
    sku: "RING-SC-003",
    inStock: true,
    stockQuantity: 7,
    metalWeight: 3.8,
    tags: ["sapphire", "cluster", "cocktail"],
    isActive: true,
  },

  // Necklaces
  {
    id: "prod-diamond-necklace",
    name: "Diamond Tennis Necklace",
    slug: "diamond-tennis-necklace",
    description: "Luxurious tennis necklace featuring brilliant-cut diamonds set in 18K white gold. A statement of elegance.",
    price: 425000,
    compareAtPrice: 480000,
    categoryId: "cat-necklaces",
    metalId: "metal-white-gold",
    gemIds: ["gem-diamond"],
    mainImage: "/images/diamond-necklace-gold-cloth.jpg",
    images: ["/images/diamond-necklace-gold-cloth.jpg"],
    sku: "NECK-DT-001",
    inStock: true,
    stockQuantity: 2,
    featured: true,
    customizable: true,
    metalWeight: 12.5,
    tags: ["diamond", "tennis", "luxury"],
    isActive: true,
  },
  {
    id: "prod-layered-necklace",
    name: "Layered Gold Necklace",
    slug: "layered-gold-necklace",
    description: "Modern layered necklace in 22K yellow gold. Perfect for everyday elegance.",
    price: 165000,
    categoryId: "cat-necklaces",
    metalId: "metal-22k-gold",
    mainImage: "/images/layered-necklace.jpg",
    images: ["/images/layered-necklace.jpg"],
    sku: "NECK-LG-002",
    inStock: true,
    stockQuantity: 8,
    featured: true,
    metalWeight: 8.3,
    tags: ["gold", "layered", "modern"],
    isActive: true,
  },
  {
    id: "prod-emerald-pendant",
    name: "Emerald Pendant Necklace",
    slug: "emerald-pendant-necklace",
    description: "Elegant pendant necklace featuring an emerald-cut emerald with diamond accents.",
    price: 215000,
    categoryId: "cat-necklaces",
    metalId: "metal-18k-gold",
    gemIds: ["gem-emerald", "gem-diamond"],
    mainImage: "/images/diamond-necklace-gold-cloth.jpg",
    images: ["/images/diamond-necklace-gold-cloth.jpg"],
    sku: "NECK-EP-003",
    inStock: true,
    stockQuantity: 4,
    metalWeight: 6.7,
    tags: ["emerald", "pendant", "classic"],
    isActive: true,
  },

  // Earrings
  {
    id: "prod-diamond-studs",
    name: "Diamond Stud Earrings",
    slug: "diamond-stud-earrings",
    description: "Classic diamond stud earrings in 18K white gold. Timeless elegance for every occasion.",
    price: 187000,
    categoryId: "cat-earrings",
    metalId: "metal-white-gold",
    gemIds: ["gem-diamond"],
    mainImage: "/images/model-small-earrings.jpg",
    images: ["/images/model-small-earrings.jpg"],
    sku: "EAR-DS-001",
    inStock: true,
    stockQuantity: 12,
    featured: true,
    metalWeight: 2.1,
    tags: ["diamond", "studs", "classic"],
    isActive: true,
  },
  {
    id: "prod-hoop-earrings",
    name: "Designer Gold Hoops",
    slug: "designer-gold-hoops",
    description: "Contemporary hoop earrings in 18K rose gold with intricate detailing.",
    price: 95000,
    categoryId: "cat-earrings",
    metalId: "metal-rose-gold",
    mainImage: "/images/model-wire-hoop.jpg",
    images: ["/images/model-wire-hoop.jpg"],
    sku: "EAR-DH-002",
    inStock: true,
    stockQuantity: 15,
    featured: true,
    metalWeight: 5.2,
    tags: ["gold", "hoops", "designer"],
    isActive: true,
  },
  {
    id: "prod-ruby-drops",
    name: "Ruby Drop Earrings",
    slug: "ruby-drop-earrings",
    description: "Elegant drop earrings featuring rubies and diamonds in white gold.",
    price: 167000,
    categoryId: "cat-earrings",
    metalId: "metal-white-gold",
    gemIds: ["gem-ruby", "gem-diamond"],
    mainImage: "/images/model-small-earrings.jpg",
    images: ["/images/model-small-earrings.jpg"],
    sku: "EAR-RD-003",
    inStock: true,
    stockQuantity: 6,
    metalWeight: 3.9,
    tags: ["ruby", "drops", "evening"],
    isActive: true,
  },

  // Bracelets
  {
    id: "prod-tennis-bracelet",
    name: "Diamond Tennis Bracelet",
    slug: "diamond-tennis-bracelet",
    description: "Classic tennis bracelet with brilliant-cut diamonds in 18K white gold.",
    price: 315000,
    categoryId: "cat-bracelets",
    metalId: "metal-white-gold",
    gemIds: ["gem-diamond"],
    mainImage: "/images/rings-ribbon.jpg",
    images: ["/images/rings-ribbon.jpg"],
    sku: "BRAC-DT-001",
    inStock: true,
    stockQuantity: 4,
    featured: true,
    customizable: true,
    metalWeight: 9.5,
    tags: ["diamond", "tennis", "classic"],
    isActive: true,
  },
  {
    id: "prod-gold-bangle",
    name: "22K Gold Bangle Set",
    slug: "22k-gold-bangle-set",
    description: "Traditional bangle set in 22K yellow gold with intricate patterns.",
    price: 285000,
    categoryId: "cat-bracelets",
    metalId: "metal-22k-gold",
    mainImage: "/images/layered-necklace.jpg",
    images: ["/images/layered-necklace.jpg"],
    sku: "BRAC-GB-002",
    inStock: true,
    stockQuantity: 5,
    metalWeight: 15.8,
    tags: ["gold", "bangles", "traditional"],
    isActive: true,
  },

  // Bridal Collection
  {
    id: "prod-bridal-set",
    name: "Complete Bridal Jewellery Set",
    slug: "complete-bridal-jewellery-set",
    description: "Comprehensive bridal set including necklace, earrings, bracelet, and ring. All pieces feature diamonds and are crafted in 18K white gold.",
    price: 895000,
    compareAtPrice: 1050000,
    categoryId: "cat-bridal",
    metalId: "metal-white-gold",
    gemIds: ["gem-diamond"],
    mainImage: "/images/diamond-necklace-gold-cloth.jpg",
    images: ["/images/diamond-necklace-gold-cloth.jpg"],
    sku: "BRID-SET-001",
    inStock: true,
    stockQuantity: 2,
    featured: true,
    customizable: true,
    metalWeight: 45.0,
    tags: ["bridal", "diamond", "set", "wedding"],
    isActive: true,
  },
];

const branches = [
  {
    id: "branch-colombo",
    name: "Colombo Flagship Store",
    slug: "colombo-flagship",
    address: {
      street: "123 Galle Road",
      city: "Colombo",
      province: "Western",
      postalCode: "00300",
      country: "Sri Lanka",
    },
    contactNumber: "+94 11 234 5678",
    email: "colombo@jewellerystore.lk",
    whatsappNumber: "+94 77 123 4567",
    operatingHours: {
      weekdays: "9:00 AM - 7:00 PM",
      weekends: "10:00 AM - 6:00 PM",
    },
    coordinates: {
      latitude: 6.9271,
      longitude: 79.8612,
    },
    servicesOffered: ["Custom Design", "Repairs", "Consultations", "Appraisals"],
    isActive: true,
  },
  {
    id: "branch-kandy",
    name: "Kandy Showroom",
    slug: "kandy-showroom",
    address: {
      street: "45 Peradeniya Road",
      city: "Kandy",
      province: "Central",
      postalCode: "20000",
      country: "Sri Lanka",
    },
    contactNumber: "+94 81 234 5678",
    email: "kandy@jewellerystore.lk",
    whatsappNumber: "+94 77 234 5678",
    operatingHours: {
      weekdays: "9:30 AM - 6:30 PM",
      weekends: "10:00 AM - 5:00 PM",
    },
    coordinates: {
      latitude: 7.2906,
      longitude: 80.6337,
    },
    servicesOffered: ["Custom Design", "Repairs", "Consultations"],
    isActive: true,
  },
  {
    id: "branch-galle",
    name: "Galle Branch",
    slug: "galle-branch",
    address: {
      street: "78 Main Street",
      city: "Galle",
      province: "Southern",
      postalCode: "80000",
      country: "Sri Lanka",
    },
    contactNumber: "+94 91 234 5678",
    email: "galle@jewellerystore.lk",
    whatsappNumber: "+94 77 345 6789",
    operatingHours: {
      weekdays: "9:00 AM - 6:00 PM",
      weekends: "10:00 AM - 5:00 PM",
    },
    coordinates: {
      latitude: 6.0535,
      longitude: 80.2210,
    },
    servicesOffered: ["Repairs", "Consultations"],
    isActive: true,
  },
];

const reviews = [
  {
    id: "rev-001",
    customerName: "Priya Fernando",
    rating: 5,
    reviewText: "Absolutely stunning jewellery! The craftsmanship is exceptional. I purchased a diamond necklace and it exceeded all my expectations. The staff was very helpful and professional.",
    productId: "prod-diamond-necklace",
    status: "approved",
    featured: true,
    verifiedPurchase: true,
  },
  {
    id: "rev-002",
    customerName: "Anil Perera",
    rating: 5,
    reviewText: "I bought a diamond ring for my wife's birthday and she absolutely loves it! The quality is outstanding and the price was very reasonable. Highly recommend!",
    productId: "prod-diamond-solitaire",
    status: "approved",
    featured: true,
    verifiedPurchase: true,
  },
  {
    id: "rev-003",
    customerName: "Sarah Silva",
    rating: 5,
    reviewText: "The bridal set is magnificent! Every piece is beautifully crafted. The team helped me customize it to match my wedding theme. Thank you for making my special day even more memorable!",
    productId: "prod-bridal-set",
    status: "approved",
    featured: true,
    verifiedPurchase: true,
  },
  {
    id: "rev-004",
    customerName: "Ravi Jayawardena",
    rating: 4,
    reviewText: "Great quality earrings. My wife is very happy with them. The only reason for 4 stars instead of 5 is the delivery took a bit longer than expected.",
    productId: "prod-diamond-studs",
    status: "approved",
    verifiedPurchase: true,
  },
  {
    id: "rev-005",
    customerName: "Malini Gunasekara",
    rating: 5,
    reviewText: "Beautiful gold bangles with traditional designs. The weight and purity are exactly as described. Very satisfied with my purchase!",
    productId: "prod-gold-bangle",
    status: "approved",
    featured: true,
    verifiedPurchase: true,
  },
  {
    id: "rev-006",
    customerName: "Dinesh Wijesinghe",
    rating: 5,
    reviewText: "Excellent service and quality. I've been a customer for years and never been disappointed. The custom design service is particularly impressive.",
    status: "approved",
    featured: true,
    verifiedPurchase: false,
  },
];

async function seedDatabase() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    // Clear existing data
    console.log("\nClearing existing data...");
    await Category.deleteMany({});
    await Metal.deleteMany({});
    await Gem.deleteMany({});
    await Product.deleteMany({});
    await Branch.deleteMany({});
    await Review.deleteMany({});
    console.log("Existing data cleared");

    // Insert categories
    console.log("\nInserting categories...");
    await Category.insertMany(categories);
    console.log(`Inserted ${categories.length} categories`);

    // Insert metals
    console.log("\nInserting metals...");
    await Metal.insertMany(metals);
    console.log(`Inserted ${metals.length} metals`);

    // Insert gems
    console.log("\nInserting gems...");
    await Gem.insertMany(gems);
    console.log(`Inserted ${gems.length} gems`);

    // Insert products
    console.log("\nInserting products...");
    await Product.insertMany(products);
    console.log(`Inserted ${products.length} products`);

    // Insert branches
    console.log("\nInserting branches...");
    await Branch.insertMany(branches);
    console.log(`Inserted ${branches.length} branches`);

    // Insert reviews
    console.log("\nInserting reviews...");
    await Review.insertMany(reviews);
    console.log(`Inserted ${reviews.length} reviews`);

    console.log("\n✅ Database seeded successfully!");
    console.log("\nSummary:");
    console.log(`- Categories: ${categories.length}`);
    console.log(`- Metals: ${metals.length}`);
    console.log(`- Gems: ${gems.length}`);
    console.log(`- Products: ${products.length}`);
    console.log(`- Branches: ${branches.length}`);
    console.log(`- Reviews: ${reviews.length}`);

  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("\nDisconnected from MongoDB");
  }
}

// Run the seed function
seedDatabase();
