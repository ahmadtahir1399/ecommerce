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

export const ColorSelector = ({
  colors,
  selectedColor,
  setSelectedColor,
}: ColorSelectorProps): JSX.Element => (
  <div className="space-y-4">
    <h3 className="font-semibold">Color</h3>
    <div className="flex gap-3">
      {colors.map(
        (color: { name: React.Key | null | undefined; class: any }) => (
          <button
            key={color.name}
            onClick={() =>
              color.name && setSelectedColor(color.name.toString())
            }
            className={`w-10 h-10 rounded-full ${color.class} 
           transition-transform ${
             selectedColor === color.name
               ? "scale-110 ring-2 ring-blue-500 ring-offset-2"
               : "hover:scale-105"
           }`}
            title={color.name?.toString()}
          >
            {selectedColor === color.name && (
              <Check className="w-6 h-6 mx-auto text-white" />
            )}
          </button>
        )
      )}
    </div>
  </div>
);
