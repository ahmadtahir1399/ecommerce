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

export const ProductImages = ({
  images,
  name,
}: ProductImagesProps): JSX.Element => (
  <Swiper
    modules={[Navigation, Pagination, EffectFade]}
    effect="fade"
    navigation
    pagination={{ clickable: true }}
    className="w-full aspect-square rounded-2xl overflow-hidden shadow-lg"
    style={
      {
        "--swiper-theme-color": "#2563eb",
        "--swiper-pagination-color": "#2563eb",
      } as React.CSSProperties
    }
  >
    {images.map(
      (img: string | undefined, idx: React.Key | null | undefined) => (
        <SwiperSlide key={idx}>
          <div className="relative w-full h-full bg-white">
            <img
              src={img}
              alt={`${name} view ${Number(idx) + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        </SwiperSlide>
      )
    )}
  </Swiper>
);
