export const brands = ["OPPO", "VIVO", "SAMSUNG", "APPLE", "REALME", "ONEPLUS", "MI", "HP"];

export const PRODUCTS = [
  {
    id: 1,
    name: "iPhone 17 Pro",
    brand: "Apple",
    category: "Mobile", // Added Category
    basePrice: "1,29,900",
    originalPrice: "1,39,900",
    image: "/assets/iphone17pro.webp",
    description: "Experience the future of mobile technology.",
    variants: [
      { ram: "8GB", storage: "128GB", price: "1,29,900", discount: "7%" },
      { ram: "8GB", storage: "256GB", price: "1,39,900", discount: "5%" }
    ]
  },
  {
    id: 2,
    name: "Samsung Galaxy S26 Ultra",
    brand: "Samsung",
    category: "Mobile", // Added Category
    basePrice: "1,24,999",
    originalPrice: "1,44,999",
    image: "/assets/s26-ultra.webp",
    description: "The ultimate flagship with AI capabilities.",
    variants: [
      { ram: "12GB", storage: "256GB", price: "1,24,999", discount: "14%" },
      { ram: "12GB", storage: "512GB", price: "1,34,999", discount: "10%" }
    ]
  },
  {
    id: 3,
    name: "Oppo F33 Series",
    brand: "Oppo",
    category: "Mobile", // Added Category
    basePrice: "26,999",
    originalPrice: "29,999",
    image: "/assets/oppo-f33-pro.webp",
    description: "Sleek design with professional-grade cameras.",
    variants: [
      { ram: "8GB", storage: "128GB", price: "26,999", discount: "10%" },
      { ram: "12GB", storage: "256GB", price: "28,999", discount: "5%" }
    ]
  },
 {
  id: 4,
  name: "HP Victus Gaming", // Updated name to match the image
  brand: "HP",
  category: "Hp laptop",
  basePrice: "68,990",
  originalPrice: "75,990",
  image: "/assets/hp-victus.webp", // CORRECTED LINK
  description: "High-performance gaming laptop with lightning-fast refresh rates.",
  variants: [
    { ram: "16GB", storage: "512GB", price: "68,990", discount: "9%" }
  ]
}
];