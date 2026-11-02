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

export const QuantitySelector = ({
  quantity,
  setQuantity,
}: QuantitySelectorProps): JSX.Element => (
  <div className="flex items-center gap-4">
    <Button
      variant="outline"
      size="icon"
      onClick={() => setQuantity(Math.max(1, quantity - 1))}
      className="h-12 w-12"
    >
      <Minus className="h-4 w-4" />
    </Button>
    <span className="w-12 text-center text-xl font-semibold">{quantity}</span>
    <Button
      variant="outline"
      size="icon"
      onClick={() => setQuantity(quantity + 1)}
      className="h-12 w-12"
    >
      <Plus className="h-4 w-4" />
    </Button>
  </div>
);
