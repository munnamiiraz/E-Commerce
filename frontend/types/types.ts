export interface IImage {
  publicId: string;
  url: string;
}
export interface Review {
  id: string;
  rating: number;
  comment: string;
  name: string;
  date: string;
}

export interface Specification {
  key: string;
  value: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  quantity: number
  originalPrice: number;
  discountPrice: number;
  lowStock: number;
  sold: number;
  image: IImage[];
  rating: number;
  totalSolds: number;
  totalReviews: number;
  topPerforming: boolean;
  reviews: Review[];
  specifications: Specification[];
  status: 'active' | 'draft' | 'out-of-stock';
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  name: string;
  date: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface Specification {
  key: string;
  value: string;
}
export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  product: Product;
}

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  avatarUrl: string | null;
  coverUrl: string | null
  cover: string | null;
  points: number
  totalOrders: number
  totalReviews: number
  designation: string
  createdAt: Date
}