"use client";
import React, { JSX, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade } from "swiper/modules";
import { motion, AnimatePresence, MotionValue } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Rating from "@/components/ui/Rating";
import {
  ShoppingCart,
  Heart,
  Minus,
  Plus,
  X,
  ArrowLeft,
  Check,
  MessageSquare,
  Shirt,
  WashingMachine,
  Truck,
  RotateCcw,
  Ruler,
  Globe,
  LucideIcon,
  ThumbsUp,
  ChevronDown,
} from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import {
  type CartItem,
  Review,
  Product,
  Color,
  ProductImagesProps,
  ProductDetailsProps,
  ColorSelectorProps,
  SizeSelectorProps,
  QuantitySelectorProps,
  ActionButtonsProps,
  ProductTabsProps,
  ReviewFormProps,
  ReviewListProps,
  CartSheetProps,
  CartItemProps,
  InfoPanelProps,
} from "@/types/type";
import { ProductImages } from "@/components/Order/ProductImages";
import { ProductDetails } from "@/components/Order/ProductDetails";
import { ProductTabs } from "@/components/Order/ProductTabs";
import { CartSheet } from "@/components/Order/CartSheet";

const reviewSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  rating: z.number().min(1).max(5),
  comment: z.string().min(10, "Review must be at least 10 characters"),
});

const Order = (): JSX.Element => {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      name: "",
      email: "",
      rating: 5,
      comment: "",
    },
  });

  const sizes = ["XS", "S", "M", "L", "XL"];
  const colors: Color[] = [
    { name: "Black", class: "bg-black" },
    { name: "White", class: "bg-white border border-gray-200" },
    { name: "Navy", class: "bg-navy-500" },
  ];

  const product: Product = {
    id: 1,
    name: "Premium Cotton T-Shirt",
    price: 29.99,
    description: `Experience unmatched comfort with our Premium Cotton T-Shirt.`,
    images: ["/pic1.webp", "/pic2.webp", "/pic3.webp", "/pic4.webp"],
    stock: 50,
  };

  const additionalInfo = {
    material: "100% Organic Cotton",
    care: "Machine wash cold, tumble dry low",
    shipping: "Free shipping on orders over $50",
    returns: "30-day return policy",
    sizing: "True to size. For a looser fit, size up",
    origin: "Made in Portugal",
  };

  const updateCartQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCart((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const addToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast({
        title: "Please select both size and color",
        variant: "destructive",
      });
      return;
    }

    const existingItem = cart.find(
      (item) => item.size === selectedSize && item.color === selectedColor
    );

    if (existingItem) {
      updateCartQuantity(existingItem.id, existingItem.quantity + quantity);
      toast({
        title: "Cart updated!",
        description: `Quantity increased by ${quantity}`,
      });
    } else {
      const newItem: CartItem = {
        id: Date.now(),
        name: product.name,
        price: product.price,
        quantity,
        size: selectedSize,
        color: selectedColor,
        image: product.images[0],
      };
      setCart((prev) => [...prev, newItem]);
      toast({
        title: "Added to cart!",
        description: `${quantity} x ${product.name} (${selectedSize})`,
      });
    }
    setIsSheetOpen(true);
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    toast({
      title: "Item removed from cart",
      variant: "destructive",
    });
  };

  const onSubmitReview = (data: z.infer<typeof reviewSchema>) => {
    const newReview = {
      id: Date.now(),
      ...data,
      date: new Date().toLocaleDateString(),
    };
    setReviews((prev) => [newReview, ...prev]);
    form.reset();
    toast({
      title: "Review submitted successfully!",
    });
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen"
    >
      <div className="container mx-auto px-4 py-8">
        <BackButton />

        <div className="grid lg:grid-cols-2 gap-12">
          <ProductImages images={product.images} name={product.name} />

          <ProductDetails
            product={product}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            quantity={quantity}
            setQuantity={setQuantity}
            sizes={sizes}
            colors={colors}
            isWishlisted={isWishlisted}
            setIsWishlisted={setIsWishlisted}
            addToCart={addToCart}
            cart={cart}
          />
        </div>

        <ProductTabs
          additionalInfo={additionalInfo}
          reviews={reviews}
          form={form}
          onSubmitReview={onSubmitReview}
        />
      </div>

      <CartSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        cart={cart}
        updateQuantity={updateCartQuantity}
        removeItem={removeFromCart}
        total={total}
      />
    </motion.div>
  );
};

export default Order;

const BackButton = (): JSX.Element => (
  <motion.button
    whileHover={{ x: -5 }}
    className="flex items-center gap-2 text-gray-600 mb-8"
    onClick={() => window.history.back()}
  >
    <ArrowLeft size={20} />
    Back to Shopping
  </motion.button>
);
