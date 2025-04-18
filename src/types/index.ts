export interface SocialLink {
  platform: 'facebook' | 'twitter' | 'instagram' | 'youtube' | 'soundcloud';
  url: string;
}

export interface Event {
  id: string;
  title: string;
  date: Date;
  location: string;
  description: string;
  imageUrl?: string;
  ticketUrl?: string;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  coverArt: string;
  streamUrl: string;
  duration: number;
  releaseDate: Date;
}

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

export interface Video {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  duration: number;
  description?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon?: React.ComponentType;
  children?: Omit<NavItem, 'children'>[];
}

// Theme types
export type Theme = 'light' | 'dark' | 'system';

// API Response types
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
} 