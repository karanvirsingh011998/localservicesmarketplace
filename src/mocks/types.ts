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
  customerName?: string;
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
  customerName?: string;
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
