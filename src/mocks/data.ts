export type Category = {
  id: string;
  name: string;
  icon: string;
  color: string;
  featured?: boolean;
  popular?: boolean;
};

export type Subcategory = {
  id: string;
  categoryId: string;
  name: string;
};

export type Service = {
  id: string;
  categoryId: string;
  subcategoryId: string;
  name: string;
  description: string;
  priceFrom: number;
  durationMins: number;
  rating: number;
  bookings: number;
  image: string;
  emergency?: boolean;
};

export type Provider = {
  id: string;
  name: string;
  title: string;
  rating: number;
  reviews: number;
  jobs: number;
  experienceYears: number;
  distanceKm: number;
  verified: boolean;
  avatar: string;
  cover: string;
  bio: string;
  languages: string[];
  priceFrom: number;
  available: boolean;
  services: string[];
};

export type Offer = {
  id: string;
  title: string;
  subtitle: string;
  code: string;
  discount: string;
  color: string;
};

export type Booking = {
  id: string;
  serviceName: string;
  providerName: string;
  status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
  date: string;
  time: string;
  price: number;
  address: string;
};

export type MessageThread = {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatar: string;
};

export type Address = {
  id: string;
  label: string;
  line1: string;
  city: string;
  pin: string;
};

export type Review = {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
};

export const categories: Category[] = [
  { id: 'c1', name: 'Plumbing', icon: 'water', color: '#2563EB', featured: true, popular: true },
  { id: 'c2', name: 'Electrical', icon: 'flash', color: '#F59E0B', featured: true, popular: true },
  { id: 'c3', name: 'Cleaning', icon: 'sparkles', color: '#10B981', featured: true },
  { id: 'c4', name: 'AC Repair', icon: 'snow', color: '#06B6D4', popular: true },
  { id: 'c5', name: 'Painting', icon: 'color-palette', color: '#8B5CF6' },
  { id: 'c6', name: 'Carpentry', icon: 'hammer', color: '#D97706' },
  { id: 'c7', name: 'Appliance', icon: 'tv', color: '#EC4899' },
  { id: 'c8', name: 'Pest Control', icon: 'bug', color: '#84CC16' },
  { id: 'c9', name: 'Emergency', icon: 'alert-circle', color: '#EF4444', featured: true },
];

export const subcategories: Subcategory[] = [
  { id: 's1', categoryId: 'c1', name: 'Leak Fix' },
  { id: 's2', categoryId: 'c1', name: 'Tap Installation' },
  { id: 's3', categoryId: 'c1', name: 'Bathroom Cleaning' },
  { id: 's4', categoryId: 'c2', name: 'Wiring' },
  { id: 's5', categoryId: 'c2', name: 'Fan Repair' },
  { id: 's6', categoryId: 'c2', name: 'Switchboard' },
  { id: 's7', categoryId: 'c3', name: 'Home Deep Clean' },
  { id: 's8', categoryId: 'c3', name: 'Sofa Cleaning' },
  { id: 's9', categoryId: 'c4', name: 'Gas Refill' },
  { id: 's10', categoryId: 'c4', name: 'AC Service' },
];

export const services: Service[] = [
  {
    id: 'svc1',
    categoryId: 'c1',
    subcategoryId: 's1',
    name: 'Pipe Leak Repair',
    description: 'Fix dripping pipes and joints with warranty on parts.',
    priceFrom: 299,
    durationMins: 60,
    rating: 4.8,
    bookings: 1240,
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800',
  },
  {
    id: 'svc2',
    categoryId: 'c2',
    subcategoryId: 's4',
    name: 'Home Wiring Check',
    description: 'Safety inspection and minor wiring fixes.',
    priceFrom: 499,
    durationMins: 90,
    rating: 4.7,
    bookings: 980,
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800',
  },
  {
    id: 'svc3',
    categoryId: 'c3',
    subcategoryId: 's7',
    name: '2BHK Deep Cleaning',
    description: 'Kitchen, bathrooms, floors, and dusting included.',
    priceFrom: 1499,
    durationMins: 180,
    rating: 4.9,
    bookings: 2100,
    image: 'https://images.unsplash.com/photo-1581579186913-45ac3e6efe93?w=800',
  },
  {
    id: 'svc4',
    categoryId: 'c4',
    subcategoryId: 's10',
    name: 'AC Full Service',
    description: 'Filter clean, gas check, and cooling diagnostics.',
    priceFrom: 699,
    durationMins: 75,
    rating: 4.6,
    bookings: 1560,
    image: 'https://images.unsplash.com/photo-1631545806609-5b0c0c0c0c0c?w=800',
    emergency: true,
  },
  {
    id: 'svc5',
    categoryId: 'c9',
    subcategoryId: 's1',
    name: 'Emergency Plumber',
    description: '30–60 min response for urgent water issues.',
    priceFrom: 799,
    durationMins: 45,
    rating: 4.8,
    bookings: 640,
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800',
    emergency: true,
  },
];

export const providers: Provider[] = [
  {
    id: 'p1',
    name: 'Ravi Kumar',
    title: 'Master Plumber',
    rating: 4.9,
    reviews: 312,
    jobs: 1280,
    experienceYears: 8,
    distanceKm: 1.2,
    verified: true,
    avatar: 'https://i.pravatar.cc/150?u=p1',
    cover: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200',
    bio: 'Licensed plumber specializing in residential repairs and bathroom fittings.',
    languages: ['English', 'Hindi', 'Kannada'],
    priceFrom: 299,
    available: true,
    services: ['svc1', 'svc5'],
  },
  {
    id: 'p2',
    name: 'Ananya Shah',
    title: 'Electrician',
    rating: 4.8,
    reviews: 198,
    jobs: 860,
    experienceYears: 6,
    distanceKm: 2.4,
    verified: true,
    avatar: 'https://i.pravatar.cc/150?u=p2',
    cover: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1200',
    bio: 'Certified electrician for wiring, fans, and switchboard upgrades.',
    languages: ['English', 'Hindi'],
    priceFrom: 399,
    available: true,
    services: ['svc2'],
  },
  {
    id: 'p3',
    name: 'CleanCo Team',
    title: 'Home Cleaning Pros',
    rating: 4.7,
    reviews: 540,
    jobs: 3200,
    experienceYears: 5,
    distanceKm: 3.1,
    verified: true,
    avatar: 'https://i.pravatar.cc/150?u=p3',
    cover: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200',
    bio: 'Trained crew for deep cleaning and move-in/move-out packages.',
    languages: ['English', 'Kannada', 'Tamil'],
    priceFrom: 999,
    available: false,
    services: ['svc3'],
  },
];

export const offers: Offer[] = [
  {
    id: 'o1',
    title: 'First booking 20% off',
    subtitle: 'New customers only',
    code: 'WELCOME20',
    discount: '20%',
    color: '#1B4DFF',
  },
  {
    id: 'o2',
    title: 'AC service combo',
    subtitle: 'Save on dual unit service',
    code: 'COOL150',
    discount: '₹150',
    color: '#0D9488',
  },
  {
    id: 'o3',
    title: 'Weekend cleaning deal',
    subtitle: 'Sat–Sun deep clean',
    code: 'CLEAN99',
    discount: '₹99',
    color: '#7C3AED',
  },
];

export const bookings: Booking[] = [
  {
    id: 'b1',
    serviceName: 'Pipe Leak Repair',
    providerName: 'Ravi Kumar',
    status: 'in_progress',
    date: '2026-07-30',
    time: '4:00 PM',
    price: 499,
    address: '12, 5th Cross, Koramangala',
  },
  {
    id: 'b2',
    serviceName: 'AC Full Service',
    providerName: 'Ananya Shah',
    status: 'accepted',
    date: '2026-08-01',
    time: '11:00 AM',
    price: 699,
    address: 'Flat 3B, Indiranagar',
  },
  {
    id: 'b3',
    serviceName: '2BHK Deep Cleaning',
    providerName: 'CleanCo Team',
    status: 'completed',
    date: '2026-07-20',
    time: '9:00 AM',
    price: 1499,
    address: 'HSR Layout Sector 2',
  },
];

export const threads: MessageThread[] = [
  {
    id: 'm1',
    name: 'Ravi Kumar',
    lastMessage: 'On my way — 10 mins.',
    time: '2m',
    unread: 2,
    avatar: 'https://i.pravatar.cc/150?u=p1',
  },
  {
    id: 'm2',
    name: 'Ananya Shah',
    lastMessage: 'Please share the flat number.',
    time: '1h',
    unread: 0,
    avatar: 'https://i.pravatar.cc/150?u=p2',
  },
];

export const addresses: Address[] = [
  {
    id: 'a1',
    label: 'Home',
    line1: '12, 5th Cross, Koramangala',
    city: 'Bengaluru',
    pin: '560034',
  },
  {
    id: 'a2',
    label: 'Office',
    line1: 'WeWork, Outer Ring Road',
    city: 'Bengaluru',
    pin: '560103',
  },
];

export const reviews: Review[] = [
  {
    id: 'r1',
    author: 'Meera P.',
    rating: 5,
    text: 'Fixed the leak quickly and cleaned up after.',
    date: '2 days ago',
  },
  {
    id: 'r2',
    author: 'Arjun S.',
    rating: 4,
    text: 'Professional and on time. Fair pricing.',
    date: '1 week ago',
  },
];

export const trendingSearches = [
  'AC service',
  'Plumber near me',
  'Deep cleaning',
  'Fan repair',
  'Emergency electrician',
];

export const recentSearches = ['Pipe leak', 'Sofa cleaning', 'Switchboard'];

export const timeSlots = [
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM',
  '6:00 PM',
];

export const galleryImages = [
  'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800',
  'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800',
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800',
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800',
];
