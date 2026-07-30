import type { Category, Subcategory } from './types';

export const categories: Category[] = [
  {
    "id": "cat-home",
    "name": "Home Services",
    "icon": "home",
    "color": "#0EA5E9",
    "featured": true,
    "popular": true
  },
  {
    "id": "cat-repair",
    "name": "Repair & Maintenance",
    "icon": "construct",
    "color": "#F59E0B",
    "featured": true,
    "popular": true
  },
  {
    "id": "cat-appliance",
    "name": "Appliance Repair",
    "icon": "tv",
    "color": "#06B6D4",
    "featured": true,
    "popular": true
  },
  {
    "id": "cat-tech",
    "name": "Tech Services",
    "icon": "laptop",
    "color": "#6366F1",
    "featured": false,
    "popular": true
  },
  {
    "id": "cat-interior",
    "name": "Interior & Renovation",
    "icon": "color-palette",
    "color": "#8B5CF6",
    "featured": false,
    "popular": true
  },
  {
    "id": "cat-garden",
    "name": "Outdoor & Garden",
    "icon": "leaf",
    "color": "#22C55E",
    "featured": true,
    "popular": true
  },
  {
    "id": "cat-moving",
    "name": "Moving & Transport",
    "icon": "car",
    "color": "#EA580C",
    "featured": true,
    "popular": true
  },
  {
    "id": "cat-auto",
    "name": "Automotive",
    "icon": "car",
    "color": "#334155",
    "featured": true,
    "popular": true
  },
  {
    "id": "cat-beauty",
    "name": "Beauty & Wellness",
    "icon": "cut",
    "color": "#EC4899",
    "featured": true,
    "popular": false
  },
  {
    "id": "cat-health",
    "name": "Health & Fitness",
    "icon": "fitness",
    "color": "#14B8A6",
    "featured": true,
    "popular": false
  },
  {
    "id": "cat-edu",
    "name": "Education",
    "icon": "school",
    "color": "#3B82F6",
    "featured": true,
    "popular": false
  },
  {
    "id": "cat-events",
    "name": "Events & Photography",
    "icon": "camera",
    "color": "#A855F7",
    "featured": true,
    "popular": false
  },
  {
    "id": "cat-pet",
    "name": "Pet Care",
    "icon": "paw",
    "color": "#D97706",
    "featured": true,
    "popular": false
  },
  {
    "id": "cat-family",
    "name": "Family & Child Care",
    "icon": "people",
    "color": "#F43F5E",
    "featured": false,
    "popular": false
  },
  {
    "id": "cat-pro",
    "name": "Professional Services",
    "icon": "briefcase",
    "color": "#0F766E",
    "featured": false,
    "popular": false
  },
  {
    "id": "cat-docs",
    "name": "Document & Government Services",
    "icon": "document",
    "color": "#475569",
    "featured": false,
    "popular": false
  },
  {
    "id": "cat-security",
    "name": "Security Services",
    "icon": "shield",
    "color": "#1E293B",
    "featured": false,
    "popular": false
  },
  {
    "id": "cat-biz",
    "name": "Business Services",
    "icon": "storefront",
    "color": "#2563EB",
    "featured": false,
    "popular": false
  },
  {
    "id": "cat-pest",
    "name": "Pest Control",
    "icon": "bug",
    "color": "#84CC16",
    "featured": true,
    "popular": false
  },
  {
    "id": "cat-water",
    "name": "Water & Plumbing",
    "icon": "water",
    "color": "#0284C7",
    "featured": true,
    "popular": false
  },
  {
    "id": "cat-electrical",
    "name": "Electrical Services",
    "icon": "flash",
    "color": "#EAB308",
    "featured": true,
    "popular": false
  },
  {
    "id": "cat-tailor",
    "name": "Tailoring & Fabric",
    "icon": "shirt",
    "color": "#DB2777",
    "featured": false,
    "popular": false
  },
  {
    "id": "cat-errands",
    "name": "Delivery & Errands",
    "icon": "bicycle",
    "color": "#0891B2",
    "featured": false,
    "popular": false
  },
  {
    "id": "cat-realty",
    "name": "Real Estate Services",
    "icon": "home",
    "color": "#7C3AED",
    "featured": false,
    "popular": false
  },
  {
    "id": "cat-emergency",
    "name": "Emergency Services",
    "icon": "alert-circle",
    "color": "#EF4444",
    "featured": false,
    "popular": false
  },
  {
    "id": "cat-lifestyle",
    "name": "Lifestyle Services",
    "icon": "sparkles",
    "color": "#C026D3",
    "featured": false,
    "popular": false
  },
  {
    "id": "cat-industrial",
    "name": "Industrial Services",
    "icon": "hardwareChip",
    "color": "#64748B",
    "featured": false,
    "popular": false
  },
  {
    "id": "cat-digital",
    "name": "Digital Services",
    "icon": "globe",
    "color": "#4F46E5",
    "featured": false,
    "popular": false
  }
];

export const subcategories: Subcategory[] = [
  {
    "id": "cat-home-s1",
    "categoryId": "cat-home",
    "name": "Home Cleaning"
  },
  {
    "id": "cat-home-s2",
    "categoryId": "cat-home",
    "name": "Deep Cleaning"
  },
  {
    "id": "cat-home-s3",
    "categoryId": "cat-home",
    "name": "Sofa Cleaning"
  },
  {
    "id": "cat-home-s4",
    "categoryId": "cat-home",
    "name": "Carpet Cleaning"
  },
  {
    "id": "cat-home-s5",
    "categoryId": "cat-home",
    "name": "Mattress Cleaning"
  },
  {
    "id": "cat-home-s6",
    "categoryId": "cat-home",
    "name": "Bathroom Cleaning"
  },
  {
    "id": "cat-home-s7",
    "categoryId": "cat-home",
    "name": "Kitchen Cleaning"
  },
  {
    "id": "cat-home-s8",
    "categoryId": "cat-home",
    "name": "Water Tank Cleaning"
  },
  {
    "id": "cat-home-s9",
    "categoryId": "cat-home",
    "name": "Window Cleaning"
  },
  {
    "id": "cat-repair-s1",
    "categoryId": "cat-repair",
    "name": "Electrician"
  },
  {
    "id": "cat-repair-s2",
    "categoryId": "cat-repair",
    "name": "Plumber"
  },
  {
    "id": "cat-repair-s3",
    "categoryId": "cat-repair",
    "name": "Carpenter"
  },
  {
    "id": "cat-repair-s4",
    "categoryId": "cat-repair",
    "name": "Painter"
  },
  {
    "id": "cat-repair-s5",
    "categoryId": "cat-repair",
    "name": "Handyman"
  },
  {
    "id": "cat-repair-s6",
    "categoryId": "cat-repair",
    "name": "Mason"
  },
  {
    "id": "cat-repair-s7",
    "categoryId": "cat-repair",
    "name": "Welder"
  },
  {
    "id": "cat-repair-s8",
    "categoryId": "cat-repair",
    "name": "Glass Repair"
  },
  {
    "id": "cat-repair-s9",
    "categoryId": "cat-repair",
    "name": "Door Repair"
  },
  {
    "id": "cat-repair-s10",
    "categoryId": "cat-repair",
    "name": "Window Repair"
  },
  {
    "id": "cat-repair-s11",
    "categoryId": "cat-repair",
    "name": "Ceiling Repair"
  },
  {
    "id": "cat-repair-s12",
    "categoryId": "cat-repair",
    "name": "Furniture Repair"
  },
  {
    "id": "cat-appliance-s1",
    "categoryId": "cat-appliance",
    "name": "AC Repair"
  },
  {
    "id": "cat-appliance-s2",
    "categoryId": "cat-appliance",
    "name": "Refrigerator Repair"
  },
  {
    "id": "cat-appliance-s3",
    "categoryId": "cat-appliance",
    "name": "Washing Machine Repair"
  },
  {
    "id": "cat-appliance-s4",
    "categoryId": "cat-appliance",
    "name": "Microwave Repair"
  },
  {
    "id": "cat-appliance-s5",
    "categoryId": "cat-appliance",
    "name": "Water Purifier Repair"
  },
  {
    "id": "cat-appliance-s6",
    "categoryId": "cat-appliance",
    "name": "Geyser Repair"
  },
  {
    "id": "cat-appliance-s7",
    "categoryId": "cat-appliance",
    "name": "Chimney Repair"
  },
  {
    "id": "cat-appliance-s8",
    "categoryId": "cat-appliance",
    "name": "Dishwasher Repair"
  },
  {
    "id": "cat-appliance-s9",
    "categoryId": "cat-appliance",
    "name": "TV Repair"
  },
  {
    "id": "cat-appliance-s10",
    "categoryId": "cat-appliance",
    "name": "Fan Repair"
  },
  {
    "id": "cat-appliance-s11",
    "categoryId": "cat-appliance",
    "name": "Cooler Repair"
  },
  {
    "id": "cat-appliance-s12",
    "categoryId": "cat-appliance",
    "name": "Inverter Repair"
  },
  {
    "id": "cat-tech-s1",
    "categoryId": "cat-tech",
    "name": "Laptop Repair"
  },
  {
    "id": "cat-tech-s2",
    "categoryId": "cat-tech",
    "name": "Computer Repair"
  },
  {
    "id": "cat-tech-s3",
    "categoryId": "cat-tech",
    "name": "Mobile Repair"
  },
  {
    "id": "cat-tech-s4",
    "categoryId": "cat-tech",
    "name": "Tablet Repair"
  },
  {
    "id": "cat-tech-s5",
    "categoryId": "cat-tech",
    "name": "Printer Repair"
  },
  {
    "id": "cat-tech-s6",
    "categoryId": "cat-tech",
    "name": "CCTV Installation"
  },
  {
    "id": "cat-tech-s7",
    "categoryId": "cat-tech",
    "name": "Wi-Fi Setup"
  },
  {
    "id": "cat-tech-s8",
    "categoryId": "cat-tech",
    "name": "Smart Home Installation"
  },
  {
    "id": "cat-tech-s9",
    "categoryId": "cat-tech",
    "name": "Data Recovery"
  },
  {
    "id": "cat-interior-s1",
    "categoryId": "cat-interior",
    "name": "Interior Designer"
  },
  {
    "id": "cat-interior-s2",
    "categoryId": "cat-interior",
    "name": "Modular Kitchen"
  },
  {
    "id": "cat-interior-s3",
    "categoryId": "cat-interior",
    "name": "False Ceiling"
  },
  {
    "id": "cat-interior-s4",
    "categoryId": "cat-interior",
    "name": "Flooring"
  },
  {
    "id": "cat-interior-s5",
    "categoryId": "cat-interior",
    "name": "Wallpaper Installation"
  },
  {
    "id": "cat-interior-s6",
    "categoryId": "cat-interior",
    "name": "POP Work"
  },
  {
    "id": "cat-interior-s7",
    "categoryId": "cat-interior",
    "name": "Wood Polishing"
  },
  {
    "id": "cat-interior-s8",
    "categoryId": "cat-interior",
    "name": "Curtain Installation"
  },
  {
    "id": "cat-garden-s1",
    "categoryId": "cat-garden",
    "name": "Gardening"
  },
  {
    "id": "cat-garden-s2",
    "categoryId": "cat-garden",
    "name": "Lawn Care"
  },
  {
    "id": "cat-garden-s3",
    "categoryId": "cat-garden",
    "name": "Tree Trimming"
  },
  {
    "id": "cat-garden-s4",
    "categoryId": "cat-garden",
    "name": "Landscaping"
  },
  {
    "id": "cat-garden-s5",
    "categoryId": "cat-garden",
    "name": "Irrigation Setup"
  },
  {
    "id": "cat-garden-s6",
    "categoryId": "cat-garden",
    "name": "Outdoor Cleaning"
  },
  {
    "id": "cat-moving-s1",
    "categoryId": "cat-moving",
    "name": "Packers & Movers"
  },
  {
    "id": "cat-moving-s2",
    "categoryId": "cat-moving",
    "name": "House Shifting"
  },
  {
    "id": "cat-moving-s3",
    "categoryId": "cat-moving",
    "name": "Office Relocation"
  },
  {
    "id": "cat-moving-s4",
    "categoryId": "cat-moving",
    "name": "Loading & Unloading"
  },
  {
    "id": "cat-moving-s5",
    "categoryId": "cat-moving",
    "name": "Furniture Shifting"
  },
  {
    "id": "cat-moving-s6",
    "categoryId": "cat-moving",
    "name": "Bike Transport"
  },
  {
    "id": "cat-moving-s7",
    "categoryId": "cat-moving",
    "name": "Car Transport"
  },
  {
    "id": "cat-auto-s1",
    "categoryId": "cat-auto",
    "name": "Car Wash"
  },
  {
    "id": "cat-auto-s2",
    "categoryId": "cat-auto",
    "name": "Bike Wash"
  },
  {
    "id": "cat-auto-s3",
    "categoryId": "cat-auto",
    "name": "Car Detailing"
  },
  {
    "id": "cat-auto-s4",
    "categoryId": "cat-auto",
    "name": "Car Repair"
  },
  {
    "id": "cat-auto-s5",
    "categoryId": "cat-auto",
    "name": "Bike Repair"
  },
  {
    "id": "cat-auto-s6",
    "categoryId": "cat-auto",
    "name": "Puncture Repair"
  },
  {
    "id": "cat-auto-s7",
    "categoryId": "cat-auto",
    "name": "Battery Replacement"
  },
  {
    "id": "cat-auto-s8",
    "categoryId": "cat-auto",
    "name": "Car Towing"
  },
  {
    "id": "cat-beauty-s1",
    "categoryId": "cat-beauty",
    "name": "Haircut"
  },
  {
    "id": "cat-beauty-s2",
    "categoryId": "cat-beauty",
    "name": "Hair Styling"
  },
  {
    "id": "cat-beauty-s3",
    "categoryId": "cat-beauty",
    "name": "Hair Spa"
  },
  {
    "id": "cat-beauty-s4",
    "categoryId": "cat-beauty",
    "name": "Facial"
  },
  {
    "id": "cat-beauty-s5",
    "categoryId": "cat-beauty",
    "name": "Makeup Artist"
  },
  {
    "id": "cat-beauty-s6",
    "categoryId": "cat-beauty",
    "name": "Manicure"
  },
  {
    "id": "cat-beauty-s7",
    "categoryId": "cat-beauty",
    "name": "Pedicure"
  },
  {
    "id": "cat-beauty-s8",
    "categoryId": "cat-beauty",
    "name": "Waxing"
  },
  {
    "id": "cat-beauty-s9",
    "categoryId": "cat-beauty",
    "name": "Massage Therapy"
  },
  {
    "id": "cat-beauty-s10",
    "categoryId": "cat-beauty",
    "name": "Spa at Home"
  },
  {
    "id": "cat-beauty-s11",
    "categoryId": "cat-beauty",
    "name": "Bridal Makeup"
  },
  {
    "id": "cat-beauty-s12",
    "categoryId": "cat-beauty",
    "name": "Groom Makeup"
  },
  {
    "id": "cat-health-s1",
    "categoryId": "cat-health",
    "name": "Personal Trainer"
  },
  {
    "id": "cat-health-s2",
    "categoryId": "cat-health",
    "name": "Yoga Trainer"
  },
  {
    "id": "cat-health-s3",
    "categoryId": "cat-health",
    "name": "Dietitian"
  },
  {
    "id": "cat-health-s4",
    "categoryId": "cat-health",
    "name": "Nutritionist"
  },
  {
    "id": "cat-health-s5",
    "categoryId": "cat-health",
    "name": "Physiotherapist"
  },
  {
    "id": "cat-health-s6",
    "categoryId": "cat-health",
    "name": "Home Nurse"
  },
  {
    "id": "cat-health-s7",
    "categoryId": "cat-health",
    "name": "Caregiver"
  },
  {
    "id": "cat-health-s8",
    "categoryId": "cat-health",
    "name": "Elder Care"
  },
  {
    "id": "cat-edu-s1",
    "categoryId": "cat-edu",
    "name": "Home Tutor"
  },
  {
    "id": "cat-edu-s2",
    "categoryId": "cat-edu",
    "name": "Online Tutor"
  },
  {
    "id": "cat-edu-s3",
    "categoryId": "cat-edu",
    "name": "Language Classes"
  },
  {
    "id": "cat-edu-s4",
    "categoryId": "cat-edu",
    "name": "Music Classes"
  },
  {
    "id": "cat-edu-s5",
    "categoryId": "cat-edu",
    "name": "Dance Classes"
  },
  {
    "id": "cat-edu-s6",
    "categoryId": "cat-edu",
    "name": "Art Classes"
  },
  {
    "id": "cat-edu-s7",
    "categoryId": "cat-edu",
    "name": "Coding Classes"
  },
  {
    "id": "cat-edu-s8",
    "categoryId": "cat-edu",
    "name": "Exam Preparation"
  },
  {
    "id": "cat-events-s1",
    "categoryId": "cat-events",
    "name": "Photographer"
  },
  {
    "id": "cat-events-s2",
    "categoryId": "cat-events",
    "name": "Videographer"
  },
  {
    "id": "cat-events-s3",
    "categoryId": "cat-events",
    "name": "Wedding Photography"
  },
  {
    "id": "cat-events-s4",
    "categoryId": "cat-events",
    "name": "Event Decoration"
  },
  {
    "id": "cat-events-s5",
    "categoryId": "cat-events",
    "name": "DJ"
  },
  {
    "id": "cat-events-s6",
    "categoryId": "cat-events",
    "name": "Live Music"
  },
  {
    "id": "cat-events-s7",
    "categoryId": "cat-events",
    "name": "Caterers"
  },
  {
    "id": "cat-events-s8",
    "categoryId": "cat-events",
    "name": "Balloon Decoration"
  },
  {
    "id": "cat-events-s9",
    "categoryId": "cat-events",
    "name": "Event Planner"
  },
  {
    "id": "cat-pet-s1",
    "categoryId": "cat-pet",
    "name": "Pet Grooming"
  },
  {
    "id": "cat-pet-s2",
    "categoryId": "cat-pet",
    "name": "Pet Walking"
  },
  {
    "id": "cat-pet-s3",
    "categoryId": "cat-pet",
    "name": "Pet Boarding"
  },
  {
    "id": "cat-pet-s4",
    "categoryId": "cat-pet",
    "name": "Veterinary Visit"
  },
  {
    "id": "cat-pet-s5",
    "categoryId": "cat-pet",
    "name": "Dog Training"
  },
  {
    "id": "cat-pet-s6",
    "categoryId": "cat-pet",
    "name": "Aquarium Cleaning"
  },
  {
    "id": "cat-family-s1",
    "categoryId": "cat-family",
    "name": "Babysitting"
  },
  {
    "id": "cat-family-s2",
    "categoryId": "cat-family",
    "name": "Nanny"
  },
  {
    "id": "cat-family-s3",
    "categoryId": "cat-family",
    "name": "Child Tutor"
  },
  {
    "id": "cat-family-s4",
    "categoryId": "cat-family",
    "name": "Elder Care"
  },
  {
    "id": "cat-family-s5",
    "categoryId": "cat-family",
    "name": "Home Nurse"
  },
  {
    "id": "cat-pro-s1",
    "categoryId": "cat-pro",
    "name": "Chartered Accountant"
  },
  {
    "id": "cat-pro-s2",
    "categoryId": "cat-pro",
    "name": "Tax Consultant"
  },
  {
    "id": "cat-pro-s3",
    "categoryId": "cat-pro",
    "name": "Lawyer"
  },
  {
    "id": "cat-pro-s4",
    "categoryId": "cat-pro",
    "name": "Notary"
  },
  {
    "id": "cat-pro-s5",
    "categoryId": "cat-pro",
    "name": "Financial Advisor"
  },
  {
    "id": "cat-pro-s6",
    "categoryId": "cat-pro",
    "name": "Insurance Advisor"
  },
  {
    "id": "cat-pro-s7",
    "categoryId": "cat-pro",
    "name": "Business Consultant"
  },
  {
    "id": "cat-docs-s1",
    "categoryId": "cat-docs",
    "name": "Passport Assistance"
  },
  {
    "id": "cat-docs-s2",
    "categoryId": "cat-docs",
    "name": "PAN Card Services"
  },
  {
    "id": "cat-docs-s3",
    "categoryId": "cat-docs",
    "name": "Aadhaar Update"
  },
  {
    "id": "cat-docs-s4",
    "categoryId": "cat-docs",
    "name": "Driving License Assistance"
  },
  {
    "id": "cat-docs-s5",
    "categoryId": "cat-docs",
    "name": "GST Registration"
  },
  {
    "id": "cat-docs-s6",
    "categoryId": "cat-docs",
    "name": "Company Registration"
  },
  {
    "id": "cat-docs-s7",
    "categoryId": "cat-docs",
    "name": "Visa Assistance"
  },
  {
    "id": "cat-security-s1",
    "categoryId": "cat-security",
    "name": "Security Guard"
  },
  {
    "id": "cat-security-s2",
    "categoryId": "cat-security",
    "name": "Bouncer"
  },
  {
    "id": "cat-security-s3",
    "categoryId": "cat-security",
    "name": "CCTV Monitoring"
  },
  {
    "id": "cat-security-s4",
    "categoryId": "cat-security",
    "name": "Home Security Installation"
  },
  {
    "id": "cat-security-s5",
    "categoryId": "cat-security",
    "name": "Access Control Setup"
  },
  {
    "id": "cat-biz-s1",
    "categoryId": "cat-biz",
    "name": "Office Cleaning"
  },
  {
    "id": "cat-biz-s2",
    "categoryId": "cat-biz",
    "name": "Commercial Painting"
  },
  {
    "id": "cat-biz-s3",
    "categoryId": "cat-biz",
    "name": "Pest Control"
  },
  {
    "id": "cat-biz-s4",
    "categoryId": "cat-biz",
    "name": "Office IT Support"
  },
  {
    "id": "cat-biz-s5",
    "categoryId": "cat-biz",
    "name": "Office Maintenance"
  },
  {
    "id": "cat-biz-s6",
    "categoryId": "cat-biz",
    "name": "Reception Staff"
  },
  {
    "id": "cat-biz-s7",
    "categoryId": "cat-biz",
    "name": "Data Entry"
  },
  {
    "id": "cat-pest-s1",
    "categoryId": "cat-pest",
    "name": "General Pest Control"
  },
  {
    "id": "cat-pest-s2",
    "categoryId": "cat-pest",
    "name": "Termite Treatment"
  },
  {
    "id": "cat-pest-s3",
    "categoryId": "cat-pest",
    "name": "Rodent Control"
  },
  {
    "id": "cat-pest-s4",
    "categoryId": "cat-pest",
    "name": "Mosquito Control"
  },
  {
    "id": "cat-pest-s5",
    "categoryId": "cat-pest",
    "name": "Bed Bug Treatment"
  },
  {
    "id": "cat-pest-s6",
    "categoryId": "cat-pest",
    "name": "Cockroach Treatment"
  },
  {
    "id": "cat-water-s1",
    "categoryId": "cat-water",
    "name": "Borewell Services"
  },
  {
    "id": "cat-water-s2",
    "categoryId": "cat-water",
    "name": "Water Tank Installation"
  },
  {
    "id": "cat-water-s3",
    "categoryId": "cat-water",
    "name": "RO Installation"
  },
  {
    "id": "cat-water-s4",
    "categoryId": "cat-water",
    "name": "Pipe Fitting"
  },
  {
    "id": "cat-water-s5",
    "categoryId": "cat-water",
    "name": "Leak Detection"
  },
  {
    "id": "cat-electrical-s1",
    "categoryId": "cat-electrical",
    "name": "Wiring"
  },
  {
    "id": "cat-electrical-s2",
    "categoryId": "cat-electrical",
    "name": "Switch Installation"
  },
  {
    "id": "cat-electrical-s3",
    "categoryId": "cat-electrical",
    "name": "Light Installation"
  },
  {
    "id": "cat-electrical-s4",
    "categoryId": "cat-electrical",
    "name": "Fan Installation"
  },
  {
    "id": "cat-electrical-s5",
    "categoryId": "cat-electrical",
    "name": "Generator Repair"
  },
  {
    "id": "cat-electrical-s6",
    "categoryId": "cat-electrical",
    "name": "Solar Panel Installation"
  },
  {
    "id": "cat-electrical-s7",
    "categoryId": "cat-electrical",
    "name": "EV Charger Installation"
  },
  {
    "id": "cat-tailor-s1",
    "categoryId": "cat-tailor",
    "name": "Tailor"
  },
  {
    "id": "cat-tailor-s2",
    "categoryId": "cat-tailor",
    "name": "Alteration"
  },
  {
    "id": "cat-tailor-s3",
    "categoryId": "cat-tailor",
    "name": "Boutique Services"
  },
  {
    "id": "cat-tailor-s4",
    "categoryId": "cat-tailor",
    "name": "Curtain Stitching"
  },
  {
    "id": "cat-tailor-s5",
    "categoryId": "cat-tailor",
    "name": "Upholstery"
  },
  {
    "id": "cat-errands-s1",
    "categoryId": "cat-errands",
    "name": "Grocery Pickup"
  },
  {
    "id": "cat-errands-s2",
    "categoryId": "cat-errands",
    "name": "Medicine Delivery"
  },
  {
    "id": "cat-errands-s3",
    "categoryId": "cat-errands",
    "name": "Parcel Delivery"
  },
  {
    "id": "cat-errands-s4",
    "categoryId": "cat-errands",
    "name": "Document Delivery"
  },
  {
    "id": "cat-errands-s5",
    "categoryId": "cat-errands",
    "name": "Personal Shopper"
  },
  {
    "id": "cat-errands-s6",
    "categoryId": "cat-errands",
    "name": "Queue Standing"
  },
  {
    "id": "cat-realty-s1",
    "categoryId": "cat-realty",
    "name": "Property Inspection"
  },
  {
    "id": "cat-realty-s2",
    "categoryId": "cat-realty",
    "name": "Home Staging"
  },
  {
    "id": "cat-realty-s3",
    "categoryId": "cat-realty",
    "name": "Property Photography"
  },
  {
    "id": "cat-realty-s4",
    "categoryId": "cat-realty",
    "name": "Rental Assistance"
  },
  {
    "id": "cat-realty-s5",
    "categoryId": "cat-realty",
    "name": "Broker Services"
  },
  {
    "id": "cat-emergency-s1",
    "categoryId": "cat-emergency",
    "name": "Emergency Electrician"
  },
  {
    "id": "cat-emergency-s2",
    "categoryId": "cat-emergency",
    "name": "Emergency Plumber"
  },
  {
    "id": "cat-emergency-s3",
    "categoryId": "cat-emergency",
    "name": "Emergency Locksmith"
  },
  {
    "id": "cat-emergency-s4",
    "categoryId": "cat-emergency",
    "name": "Emergency AC Repair"
  },
  {
    "id": "cat-emergency-s5",
    "categoryId": "cat-emergency",
    "name": "Emergency Towing"
  },
  {
    "id": "cat-lifestyle-s1",
    "categoryId": "cat-lifestyle",
    "name": "Personal Shopper"
  },
  {
    "id": "cat-lifestyle-s2",
    "categoryId": "cat-lifestyle",
    "name": "Home Organizer"
  },
  {
    "id": "cat-lifestyle-s3",
    "categoryId": "cat-lifestyle",
    "name": "Closet Organizer"
  },
  {
    "id": "cat-lifestyle-s4",
    "categoryId": "cat-lifestyle",
    "name": "Personal Assistant"
  },
  {
    "id": "cat-lifestyle-s5",
    "categoryId": "cat-lifestyle",
    "name": "Concierge Services"
  },
  {
    "id": "cat-industrial-s1",
    "categoryId": "cat-industrial",
    "name": "Machine Repair"
  },
  {
    "id": "cat-industrial-s2",
    "categoryId": "cat-industrial",
    "name": "Factory Cleaning"
  },
  {
    "id": "cat-industrial-s3",
    "categoryId": "cat-industrial",
    "name": "Warehouse Maintenance"
  },
  {
    "id": "cat-industrial-s4",
    "categoryId": "cat-industrial",
    "name": "Equipment Installation"
  },
  {
    "id": "cat-digital-s1",
    "categoryId": "cat-digital",
    "name": "Graphic Design"
  },
  {
    "id": "cat-digital-s2",
    "categoryId": "cat-digital",
    "name": "Website Development"
  },
  {
    "id": "cat-digital-s3",
    "categoryId": "cat-digital",
    "name": "App Development"
  },
  {
    "id": "cat-digital-s4",
    "categoryId": "cat-digital",
    "name": "SEO"
  },
  {
    "id": "cat-digital-s5",
    "categoryId": "cat-digital",
    "name": "Digital Marketing"
  },
  {
    "id": "cat-digital-s6",
    "categoryId": "cat-digital",
    "name": "Content Writing"
  },
  {
    "id": "cat-digital-s7",
    "categoryId": "cat-digital",
    "name": "Video Editing"
  },
  {
    "id": "cat-digital-s8",
    "categoryId": "cat-digital",
    "name": "Social Media Management"
  }
];

export const featuredQuickAccess: Array<Category & { categoryId: string }> = [
  {
    "id": "feat-clean",
    "name": "Home Cleaning",
    "icon": "sparkles",
    "color": "#0EA5E9",
    "categoryId": "cat-home",
    "featured": true,
    "popular": true
  },
  {
    "id": "feat-elec",
    "name": "Electrician",
    "icon": "flash",
    "color": "#EAB308",
    "categoryId": "cat-electrical",
    "featured": true,
    "popular": true
  },
  {
    "id": "feat-plumb",
    "name": "Plumber",
    "icon": "water",
    "color": "#0284C7",
    "categoryId": "cat-water",
    "featured": true,
    "popular": true
  },
  {
    "id": "feat-carp",
    "name": "Carpenter",
    "icon": "hammer",
    "color": "#F59E0B",
    "categoryId": "cat-repair",
    "featured": true,
    "popular": true
  },
  {
    "id": "feat-ac",
    "name": "AC Repair",
    "icon": "snow",
    "color": "#06B6D4",
    "categoryId": "cat-appliance",
    "featured": true,
    "popular": true
  },
  {
    "id": "feat-appl",
    "name": "Appliance Repair",
    "icon": "tv",
    "color": "#06B6D4",
    "categoryId": "cat-appliance",
    "featured": true,
    "popular": true
  },
  {
    "id": "feat-beauty",
    "name": "Beauty at Home",
    "icon": "cut",
    "color": "#EC4899",
    "categoryId": "cat-beauty",
    "featured": true,
    "popular": true
  },
  {
    "id": "feat-movers",
    "name": "Packers & Movers",
    "icon": "car",
    "color": "#EA580C",
    "categoryId": "cat-moving",
    "featured": true,
    "popular": true
  },
  {
    "id": "feat-pest",
    "name": "Pest Control",
    "icon": "bug",
    "color": "#84CC16",
    "categoryId": "cat-pest",
    "featured": true,
    "popular": true
  },
  {
    "id": "feat-garden",
    "name": "Gardening",
    "icon": "leaf",
    "color": "#22C55E",
    "categoryId": "cat-garden",
    "featured": true,
    "popular": true
  },
  {
    "id": "feat-photo",
    "name": "Photography",
    "icon": "camera",
    "color": "#A855F7",
    "categoryId": "cat-events",
    "featured": true,
    "popular": true
  },
  {
    "id": "feat-trainer",
    "name": "Personal Trainer",
    "icon": "fitness",
    "color": "#14B8A6",
    "categoryId": "cat-health",
    "featured": true,
    "popular": true
  },
  {
    "id": "feat-tutor",
    "name": "Home Tutor",
    "icon": "school",
    "color": "#3B82F6",
    "categoryId": "cat-edu",
    "featured": true,
    "popular": true
  },
  {
    "id": "feat-car",
    "name": "Car Services",
    "icon": "car",
    "color": "#334155",
    "categoryId": "cat-auto",
    "featured": true,
    "popular": true
  },
  {
    "id": "feat-pet",
    "name": "Pet Care",
    "icon": "paw",
    "color": "#D97706",
    "categoryId": "cat-pet",
    "featured": true,
    "popular": true
  }
];

export const featuredCategoryIds = featuredQuickAccess.map((f) => f.categoryId);
