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
export const ReviewList = ({
  reviews,
  onLike,
}: {
  reviews: Review[];
  onLike: (id: number) => void;
}): JSX.Element => (
  <div className="mt-12 space-y-6">
    {reviews.length === 0 ? (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12 bg-gray-50 rounded-xl"
      >
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          No Reviews Yet
        </h3>
        <p className="text-gray-500">Be the first to review this product</p>
      </motion.div>
    ) : (
      reviews.map((review, i) => (
        <motion.div
          key={review.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-lg">
                {review.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-lg">{review.name}</h4>
                {review.verified && (
                  <span className="text-green-600 text-sm flex items-center">
                    <Check className="w-4 h-4 mr-1" />
                    Verified Purchase
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500">{review.date}</p>
            </div>
          </div>

          <div className="mb-3">
            <Rating value={review.rating} readonly />
            <span className="ml-2 text-sm text-gray-500">
              {review.rating}/5
            </span>
          </div>

          <p className="text-gray-700 leading-relaxed">{review.comment}</p>

          <div className="mt-4 flex items-center gap-4">
            <button
              onClick={() => onLike(review.id)}
              className="text-sm text-gray-500 hover:text-blue-600 transition-colors flex items-center gap-1"
            >
              <ThumbsUp className="w-4 h-4" />
              {review.likes || 0} Helpful
            </button>
            <button className="text-sm text-gray-500 hover:text-red-600 transition-colors">
              Report
            </button>
          </div>
        </motion.div>
      ))
    )}
  </div>
);
