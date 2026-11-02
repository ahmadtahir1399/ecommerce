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
import { ProductHeader } from "./ProductHeader";
import { ColorSelector } from "./ColorSelector";
import { ProductDescription } from "./ProductDescription";
import { SizeSelector } from "./SizeSelector";
import { QuantitySelector } from "./QuantitySelector";
import { ActionButtons } from "./ActionButtons";

export const ProductDetails = ({
  product,
  selectedSize,
  setSelectedSize,
  selectedColor,
  setSelectedColor,
  quantity,
  setQuantity,
  sizes,
  colors,
  isWishlisted,
  setIsWishlisted,
  addToCart,
  cart,
}: ProductDetailsProps): JSX.Element => (
  <div className="space-y-8">
    <ProductHeader product={product} />
    <ProductDescription description={product.description} />
    <ColorSelector
      colors={colors}
      selectedColor={selectedColor}
      setSelectedColor={setSelectedColor}
    />
    <SizeSelector
      sizes={sizes}
      selectedSize={selectedSize}
      setSelectedSize={setSelectedSize}
    />
    <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
    <ActionButtons
      selectedSize={selectedSize}
      selectedColor={selectedColor}
      addToCart={addToCart}
      isWishlisted={isWishlisted}
      setIsWishlisted={setIsWishlisted}
      cart={cart}
    />
  </div>
);
