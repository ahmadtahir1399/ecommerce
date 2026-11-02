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

export const ActionButtons = ({
  selectedSize,
  selectedColor,
  addToCart,
  isWishlisted,
  setIsWishlisted,
  cart,
}: ActionButtonsProps): JSX.Element => (
  <div className="flex gap-4">
    <Button
      className="flex-1 h-14 text-lg"
      onClick={addToCart}
      disabled={!selectedSize || !selectedColor}
    >
      <ShoppingCart className="mr-2" />
      {cart.length === 0 ? "Add to Cart" : "Open Cart"}
    </Button>
    <Button
      variant="outline"
      size="icon"
      className="h-14 w-14"
      onClick={() => setIsWishlisted(!isWishlisted)}
    >
      <Heart
        className={`h-6 w-6 transition-colors ${
          isWishlisted ? "fill-red-500 text-red-500" : ""
        }`}
      />
    </Button>
  </div>
);
