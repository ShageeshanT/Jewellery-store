export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  images: string[];
  category: string;
  subcategory: string;
  materials: string[];
  gemstone?: string;
  carat?: number;
  dimensions?: string;
  weight?: string;
  features: string[];
  certification?: string;
  isNew?: boolean;
  isLimited?: boolean;
  isBestseller?: boolean;
  rating: number;
  reviews: number;
  sku: string;
  availability: 'in-stock' | 'limited' | 'pre-order' | 'out-of-stock';
  tags: string[];
  brand?: string;
  collection?: string;
  style: string;
  occasion?: string[];
  gender: 'unisex' | 'women' | 'men';
}

export const products: Product[] = [
  // Engagement Rings
  {
    id: 'ring-001',
    name: 'Eternal Harmony Solitaire Diamond Ring',
    description: 'A timeless classic featuring a brilliant round-cut diamond set in 18K white gold with a delicate four-prong setting that maximizes brilliance.',
    price: 12500,
    salePrice: 11250,
    images: ['/api/placeholder/800/800', '/api/placeholder/800/800', '/api/placeholder/800/800'],
    category: 'rings',
    subcategory: 'engagement',
    materials: ['18K White Gold'],
    gemstone: 'Round Brilliant Diamond',
    carat: 1.25,
    dimensions: 'Band Width: 2mm, Setting Height: 6mm',
    weight: '3.2g',
    features: [
      'GIA Certified Diamond (G Color, VS1 Clarity)',
      'Excellent Cut Grade',
      'Laser Inscribed',
      'Conflict-Free Guarantee',
      'Lifetime Warranty'
    ],
    certification: 'GIA',
    isNew: true,
    isBestseller: true,
    rating: 4.9,
    reviews: 127,
    sku: 'ER-001-125-CW-18K',
    availability: 'in-stock',
    tags: ['engagement', 'solitaire', 'classic', 'white-gold', 'diamond'],
    collection: 'Eternal Love',
    style: 'Classic',
    occasion: ['engagement', 'anniversary', 'proposal'],
    gender: 'women'
  },
  {
    id: 'ring-002',
    name: 'Vintage Inspired Halo Diamond Ring',
    description: 'Romantic vintage design with a cushion-cut center diamond surrounded by a halo of pavé diamonds and milgrain detailing on the band.',
    price: 18750,
    images: ['/api/placeholder/800/800', '/api/placeholder/800/800', '/api/placeholder/800/800'],
    category: 'rings',
    subcategory: 'engagement',
    materials: ['Platinum'],
    gemstone: 'Cushion Cut Diamond',
    carat: 2.0,
    dimensions: 'Band Width: 2.5mm, Setting Height: 8mm',
    weight: '5.8g',
    features: [
      'Total Diamond Weight: 2.35ct',
      'GIA Certified (F Color, VVS2 Clarity)',
      'Hand-Engraved Details',
      'Art Deco Inspired Design',
      'Complimentary Cleaning Kit'
    ],
    certification: 'GIA',
    isLimited: true,
    rating: 5.0,
    reviews: 89,
    sku: 'ER-002-200-PT-HALO',
    availability: 'limited',
    tags: ['engagement', 'halo', 'vintage', 'platinum', 'cushion-cut'],
    collection: 'Heritage Collection',
    style: 'Vintage',
    occasion: ['engagement', 'anniversary', 'milestone'],
    gender: 'women'
  },
  {
    id: 'ring-003',
    name: 'Modern Emerald Cut Three-Stone Ring',
    description: 'Contemporary elegance with an emerald-cut center diamond flanked by two trilliant-cut side diamonds in a sleek platinum setting.',
    price: 22500,
    images: ['/api/placeholder/800/800', '/api/placeholder/800/800', '/api/placeholder/800/800'],
    category: 'rings',
    subcategory: 'engagement',
    materials: ['Platinum'],
    gemstone: 'Emerald Cut Diamond',
    carat: 2.5,
    dimensions: 'Band Width: 3mm, Setting Height: 7mm',
    weight: '6.2g',
    features: [
      'Total Diamond Weight: 3.25ct',
      'AGS Certified (E Color, VVS1 Clarity)',
      'Bezel Set Side Stones',
      'Tapered Platinum Band',
      'Hidden Gallery Detailing'
    ],
    certification: 'AGS',
    isBestseller: true,
    rating: 4.8,
    reviews: 156,
    sku: 'ER-003-250-PT-THREE',
    availability: 'in-stock',
    tags: ['engagement', 'three-stone', 'modern', 'emerald-cut', 'platinum'],
    collection: 'Contemporary Classics',
    style: 'Modern',
    occasion: ['engagement', 'anniversary'],
    gender: 'women'
  },

  // Wedding Bands
  {
    id: 'band-001',
    name: 'Classic Eternity Diamond Wedding Band',
    description: 'An uninterrupted circle of brilliant-cut diamonds set in 18K yellow gold, symbolizing endless love and commitment.',
    price: 8750,
    images: ['/api/placeholder/800/800', '/api/placeholder/800/800', '/api/placeholder/800/800'],
    category: 'bands',
    subcategory: 'wedding',
    materials: ['18K Yellow Gold'],
    gemstone: 'Round Brilliant Diamonds',
    dimensions: 'Band Width: 3mm, Diamond Height: 2mm',
    weight: '4.1g',
    features: [
      'Total Diamond Weight: 1.50ct',
      'Shared Prong Setting',
      'Comfort Fit Interior',
      'Full Eternity Design',
      'Complimentary Engraving'
    ],
    rating: 4.9,
    reviews: 234,
    sku: 'WB-001-150-YG-FULL',
    availability: 'in-stock',
    tags: ['wedding', 'eternity', 'yellow-gold', 'diamond', 'classic'],
    collection: 'Bridal Collection',
    style: 'Classic',
    occasion: ['wedding', 'anniversary'],
    gender: 'unisex'
  },
  {
    id: 'band-002',
    name: 'Minimalist Platinum Wedding Band',
    description: 'Sleek and sophisticated, this hammered platinum band features subtle texture for a modern yet timeless appeal.',
    price: 3200,
    images: ['/api/placeholder/800/800', '/api/placeholder/800/800', '/api/placeholder/800/800'],
    category: 'bands',
    subcategory: 'wedding',
    materials: ['Platinum'],
    dimensions: 'Band Width: 4mm, Thickness: 2mm',
    weight: '7.8g',
    features: [
      '950 Platinum Purity',
      'Hand-Hammered Finish',
      'Comfort Fit Design',
      'Hypoallergenic',
      'Lifetime Sizing Guarantee'
    ],
    isBestseller: true,
    rating: 4.7,
    reviews: 189,
    sku: 'WB-002-PT-HAMMERED',
    availability: 'in-stock',
    tags: ['wedding', 'minimalist', 'platinum', 'hammered', 'unisex'],
    collection: 'Modern Essentials',
    style: 'Minimalist',
    occasion: ['wedding', 'daily-wear'],
    gender: 'unisex'
  },

  // Necklaces
  {
    id: 'necklace-001',
    name: 'Floating Diamond Pendant Necklace',
    description: 'A single brilliant-cut diamond appears to float magically in this sophisticated 18K white gold pendant setting.',
    price: 6500,
    salePrice: 5850,
    images: ['/api/placeholder/800/800', '/api/placeholder/800/800', '/api/placeholder/800/800'],
    category: 'necklaces',
    subcategory: 'pendants',
    materials: ['18K White Gold'],
    gemstone: 'Round Brilliant Diamond',
    carat: 0.75,
    dimensions: 'Pendant: 8mm diameter, Chain: 18"',
    weight: '2.8g',
    features: [
      'GIA Certified Diamond (H Color, VS2 Clarity)',
      'Tension Setting',
      'Adjustable Chain (16-18")',
      'Lobster Clasp',
      'Gift Box Included'
    ],
    certification: 'GIA',
    isNew: true,
    rating: 4.8,
    reviews: 67,
    sku: 'NP-001-075-CW-PENDANT',
    availability: 'in-stock',
    tags: ['necklace', 'pendant', 'diamond', 'white-gold', 'minimalist'],
    collection: 'Everyday Luxury',
    style: 'Modern',
    occasion: ['birthday', 'anniversary', 'graduation'],
    gender: 'women'
  },
  {
    id: 'necklace-002',
    name: 'Pearl & Diamond Strand Necklace',
    description: 'Elegant 18-inch strand of matched Akoya pearls accented with diamond rondelles and a decorative clasp.',
    price: 12500,
    images: ['/api/placeholder/800/800', '/api/placeholder/800/800', '/api/placeholder/800/800'],
    category: 'necklaces',
    subcategory: 'pearls',
    materials: ['18K White Gold'],
    gemstone: 'Akoya Pearls & Round Diamonds',
    dimensions: 'Length: 18", Pearl Size: 6.5-7mm',
    weight: '28.5g',
    features: [
      '52 Matched Akoya Pearls',
      '12 Diamond Rondelles (0.24ct total)',
      'Decorative Diamond Clasp',
      'Silk Knot Between Each Pearl',
      'Appraisal Certificate Included'
    ],
    isLimited: true,
    rating: 5.0,
    reviews: 43,
    sku: 'NL-002-PEARL-STRAND',
    availability: 'limited',
    tags: ['necklace', 'pearls', 'diamonds', 'classic', 'elegant'],
    collection: 'Timeless Elegance',
    style: 'Classic',
    occasion: ['wedding', 'anniversary', 'milestone'],
    gender: 'women'
  },

  // Earrings
  {
    id: 'earring-001',
    name: 'Diamond Hoop Earrings',
    description: 'Classic 18K yellow gold hoops lined with pavé diamonds for continuous sparkle and timeless elegance.',
    price: 5250,
    images: ['/api/placeholder/800/800', '/api/placeholder/800/800', '/api/placeholder/800/800'],
    category: 'earrings',
    subcategory: 'hoops',
    materials: ['18K Yellow Gold'],
    gemstone: 'Round Brilliant Diamonds',
    dimensions: 'Diameter: 35mm, Width: 4mm',
    weight: '8.2g per pair',
    features: [
      'Total Diamond Weight: 1.20ct per pair',
      'Hinged Back Closure',
      'Inside-Out Setting',
      'Safety Locks',
      'Complimentary Cleaning Solution'
    ],
    isBestseller: true,
    rating: 4.9,
    reviews: 278,
    sku: 'ER-001-120-YG-HOOPS',
    availability: 'in-stock',
    tags: ['earrings', 'hoops', 'diamond', 'yellow-gold', 'classic'],
    collection: 'Essential Collection',
    style: 'Classic',
    occasion: ['birthday', 'anniversary', 'daily-wear'],
    gender: 'women'
  },
  {
    id: 'earring-002',
    name: 'Tanzanite & Diamond Drop Earrings',
    description: 'Vibrant tanzanite gemstones crowned with brilliant diamonds in elegant white gold drop settings.',
    price: 7800,
    images: ['/api/placeholder/800/800', '/api/placeholder/800/800', '/api/placeholder/800/800'],
    category: 'earrings',
    subcategory: 'drops',
    materials: ['18K White Gold'],
    gemstone: 'Tanzanite & Round Diamonds',
    dimensions: 'Length: 45mm, Width: 12mm',
    weight: '6.5g per pair',
    features: [
      'Total Tanzanite Weight: 4.25ct per pair',
      'Total Diamond Weight: 0.50ct per pair',
      'French Wire Backs',
      'Secure Omega Backs',
      'Gift Box and Certificate'
    ],
    isNew: true,
    rating: 4.8,
    reviews: 92,
    sku: 'ER-002-TANZ-DROP',
    availability: 'in-stock',
    tags: ['earrings', 'drops', 'tanzanite', 'diamonds', 'blue'],
    collection: 'Gemstone Dreams',
    style: 'Elegant',
    occasion: ['birthday', 'anniversary', 'special-occasion'],
    gender: 'women'
  },

  // Bracelets
  {
    id: 'bracelet-001',
    name: 'Tennis Bracelet with Round Diamonds',
    description: 'An uninterrupted line of perfectly matched brilliant-cut diamonds set in flexible 18K white gold for ultimate comfort.',
    price: 14500,
    images: ['/api/placeholder/800/800', '/api/placeholder/800/800', '/api/placeholder/800/800'],
    category: 'bracelets',
    subcategory: 'tennis',
    materials: ['18K White Gold'],
    gemstone: 'Round Brilliant Diamonds',
    dimensions: 'Length: 7", Width: 5mm',
    weight: '18.5g',
    features: [
      'Total Diamond Weight: 6.00ct',
      '30 Round Brilliant Diamonds',
      'Box Clasp with Safety Lock',
      'Flexible Setting',
      'Complimentary Sizing'
    ],
    isBestseller: true,
    rating: 4.9,
    reviews: 145,
    sku: 'BR-001-600-CW-TENNIS',
    availability: 'in-stock',
    tags: ['bracelet', 'tennis', 'diamond', 'white-gold', 'luxury'],
    collection: 'Signature Pieces',
    style: 'Classic',
    occasion: ['anniversary', 'milestone', 'luxury-gift'],
    gender: 'women'
  },
  {
    id: 'bracelet-002',
    name: 'Pearl and Diamond Tennis Bracelet',
    description: 'Alternating Akoya pearls and brilliant diamonds create a sophisticated play of texture and light.',
    price: 9800,
    images: ['/api/placeholder/800/800', '/api/placeholder/800/800', '/api/placeholder/800/800'],
    category: 'bracelets',
    subcategory: 'tennis',
    materials: ['18K Yellow Gold'],
    gemstone: 'Akoya Pearls & Round Diamonds',
    dimensions: 'Length: 7", Width: 6mm',
    weight: '22.3g',
    features: [
      'Total Diamond Weight: 2.25ct',
      '15 Akoya Pearls (6-6.5mm)',
      'Double Safety Clasp',
      'Adjustable Extender',
      'Certificate of Authenticity'
    ],
    isLimited: true,
    rating: 5.0,
    reviews: 67,
    sku: 'BR-002-PEARL-TENNIS',
    availability: 'limited',
    tags: ['bracelet', 'pearls', 'diamonds', 'yellow-gold', 'classic'],
    collection: 'Timeless Elegance',
    style: 'Classic',
    occasion: ['wedding', 'anniversary', 'milestone'],
    gender: 'women'
  },

  // Men's Jewelry
  {
    id: 'men-ring-001',
    name: 'Signet Ring with Onyx and Diamonds',
    description: 'Bold masculine design featuring black onyx accented with pavé diamonds in substantial 18K yellow gold.',
    price: 4200,
    images: ['/api/placeholder/800/800', '/api/placeholder/800/800', '/api/placeholder/800/800'],
    category: 'rings',
    subcategory: 'mens',
    materials: ['18K Yellow Gold'],
    gemstone: 'Black Onyx & Round Diamonds',
    dimensions: 'Face: 12mm x 10mm, Band Width: 6mm',
    weight: '12.5g',
    features: [
      'Total Diamond Weight: 0.45ct',
      'Polished Black Onyx',
      'Solid Gold Construction',
      'Comfort Fit Interior',
      'Custom Engraving Available'
    ],
    isNew: true,
    rating: 4.7,
    reviews: 34,
    sku: 'MR-001-ONYX-DIAMOND',
    availability: 'in-stock',
    tags: ['mens', 'signet', 'onyx', 'diamonds', 'bold'],
    collection: 'Gentlemen\'s Collection',
    style: 'Bold',
    occasion: ['graduation', 'achievement', 'milestone'],
    gender: 'men'
  },
  {
    id: 'men-bracelet-001',
    name: 'Link Bracelet in Platinum',
    description: 'Sophisticated interlocking links in brushed platinum create a refined statement of masculine elegance.',
    price: 6800,
    images: ['/api/placeholder/800/800', '/api/placeholder/800/800', '/api/placeholder/800/800'],
    category: 'bracelets',
    subcategory: 'mens',
    materials: ['Platinum'],
    dimensions: 'Length: 8", Width: 8mm',
    weight: '45.2g',
    features: [
      '950 Platinum Purity',
      'Brushed Finish',
      'Hidden Box Clasp',
      'Double Safety Lock',
      'Lifetime Warranty'
    ],
    isBestseller: true,
    rating: 4.9,
    reviews: 89,
    sku: 'MB-001-PT-LINKS',
    availability: 'in-stock',
    tags: ['mens', 'platinum', 'links', 'luxury', 'modern'],
    collection: 'Gentlemen\'s Collection',
    style: 'Modern',
    occasion: ['achievement', 'milestone', 'luxury-gift'],
    gender: 'men'
  }
];

export const categories = [
  {
    id: 'rings',
    name: 'Rings',
    description: 'Engagement, wedding, and fashion rings',
    itemCount: 156,
    featured: true
  },
  {
    id: 'necklaces',
    name: 'Necklaces',
    description: 'Pendants, chains, and statement pieces',
    itemCount: 98,
    featured: true
  },
  {
    id: 'earrings',
    name: 'Earrings',
    description: 'Studs, hoops, and drop earrings',
    itemCount: 143,
    featured: true
  },
  {
    id: 'bracelets',
    name: 'Bracelets',
    description: 'Tennis bracelets, cuffs, and chains',
    itemCount: 67,
    featured: false
  },
  {
    id: 'brooches',
    name: 'Brooches',
    description: 'Vintage and contemporary pins',
    itemCount: 34,
    featured: false
  },
  {
    id: 'sets',
    name: 'Jewellery Sets',
    description: 'Coordinated pieces for complete looks',
    itemCount: 29,
    featured: false
  }
];

export const collections = [
  {
    id: 'eternal-love',
    name: 'Eternal Love',
    description: 'Classic engagement and wedding pieces',
    image: '/api/placeholder/400/250',
    itemCount: 45,
    priceRange: { min: 2500, max: 50000 },
    featured: true,
    isNew: false,
    tags: ['engagement', 'wedding', 'romantic']
  },
  {
    id: 'heritage-collection',
    name: 'Heritage Collection',
    description: 'Vintage-inspired designs with modern craftsmanship',
    image: '/api/placeholder/400/250',
    itemCount: 28,
    priceRange: { min: 1800, max: 35000 },
    featured: true,
    isNew: false,
    tags: ['vintage', 'classic', 'art-deco']
  },
  {
    id: 'contemporary-classics',
    name: 'Contemporary Classics',
    description: 'Modern designs that stand the test of time',
    image: '/api/placeholder/400/250',
    itemCount: 36,
    priceRange: { min: 1200, max: 28000 },
    featured: true,
    isNew: true,
    tags: ['modern', 'sleek', 'minimalist']
  },
  {
    id: 'gemstone-dreams',
    name: 'Gemstone Dreams',
    description: 'Vibrant colored gemstones in exquisite settings',
    image: '/api/placeholder/400/250',
    itemCount: 42,
    priceRange: { min: 800, max: 22000 },
    featured: false,
    isNew: true,
    tags: ['colored-gems', 'vibrant', 'unique']
  }
];

export const consultants = [
  {
    id: 'consultant-001',
    name: 'Dr. Sarah Mitchell',
    title: 'GIA Graduate Gemologist',
    expertise: ['Diamond Grading', 'Custom Design', 'Investment Guidance'],
    rating: 5.0,
    reviews: 234,
    languages: ['English', 'Spanish'],
    bio: 'With over 20 years of experience in gemology and custom jewellery design, Dr. Mitchell has helped thousands of clients find their perfect piece.'
  },
  {
    id: 'consultant-002',
    name: 'Michael Chen',
    title: 'Master Goldsmith',
    expertise: ['Craftsmanship', 'Repairs', 'Restoration'],
    rating: 4.9,
    reviews: 189,
    languages: ['English', 'Mandarin'],
    bio: 'A third-generation goldsmith with expertise in both traditional techniques and modern jewelry technology.'
  },
  {
    id: 'consultant-003',
    name: 'Isabella Rodriguez',
    title: 'Luxury Style Consultant',
    expertise: ['Fashion Trends', 'Styling', 'Personal Shopping'],
    rating: 4.8,
    reviews: 156,
    languages: ['English', 'French', 'Italian'],
    bio: 'Former fashion editor turned jewellery consultant, Isabella helps clients express their personal style through curated pieces.'
  }
];

// Helper functions
export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.isBestseller || product.isNew);
};

export const getNewArrivals = (): Product[] => {
  return products.filter(product => product.isNew);
};

export const getLimitedEdition = (): Product[] => {
  return products.filter(product => product.isLimited);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product =>
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

export const filterProducts = (
  products: Product[],
  filters: {
    category?: string;
    priceRange?: { min: number; max: number };
    materials?: string[];
    gemstone?: string;
    availability?: string;
    rating?: number;
  }
): Product[] => {
  return products.filter(product => {
    if (filters.category && product.category !== filters.category) return false;
    if (filters.priceRange &&
        (product.price < filters.priceRange.min ||
         product.price > filters.priceRange.max)) return false;
    if (filters.materials &&
        !filters.materials.some(material => product.materials.includes(material))) return false;
    if (filters.gemstone && product.gemstone !== filters.gemstone) return false;
    if (filters.availability && product.availability !== filters.availability) return false;
    if (filters.rating && product.rating < filters.rating) return false;
    return true;
  });
};

export const getRelatedProducts = (product: Product, limit: number = 4): Product[] => {
  return products
    .filter(p =>
      p.id !== product.id &&
      (p.category === product.category ||
       p.collection === product.collection ||
       p.style === product.style)
    )
    .sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0))
    .slice(0, limit);
};