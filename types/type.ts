export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  size: string;
  image: string;
  color: string;
}

export interface Review {
  id: number;

  name: string;

  email: string;

  rating: number;

  comment: string;

  date: string;

  verified?: boolean;

  likes?: number;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  images: string[];
  stock: number;
}

export interface Color {
  name: string;
  class: string;
}

export interface ProductImagesProps {
  images: string[];
  name: string;
}

export interface ProductDetailsProps {
  product: Product;
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  quantity: number;
  setQuantity: (quantity: number) => void;
  sizes: string[];
  colors: Color[];
  isWishlisted: boolean;
  setIsWishlisted: (isWishlisted: boolean) => void;
  addToCart: () => void;
  cart: CartItem[];
}

export interface ColorSelectorProps {
  colors: Color[];
  selectedColor: string;
  setSelectedColor: (color: string) => void;
}

export interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string;
  setSelectedSize: (size: string) => void;
}

export interface QuantitySelectorProps {
  quantity: number;
  setQuantity: (quantity: number) => void;
}

export interface ActionButtonsProps {
  selectedSize: string;
  selectedColor: string;
  addToCart: () => void;
  isWishlisted: boolean;
  setIsWishlisted: (isWishlisted: boolean) => void;
  cart: CartItem[];
}

export interface ProductTabsProps {
  additionalInfo: Record<string, string>;
  reviews: Review[];
  form: any;
  onSubmitReview: (data: any) => void;
}

export interface ReviewFormProps {
  form: any;
  onSubmit: (data: any) => void;
}

export interface ReviewListProps {
  reviews: Review[];
}

export interface CartSheetProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  updateQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
  total: number;
}

export interface CartItemProps {
  item: CartItem;
  updateQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
}

export interface InfoPanelProps {
 title: string;
 content: string;
 isOpen: boolean;
 onToggle: () => void;
}