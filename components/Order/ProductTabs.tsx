"use client";
import React, { JSX, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as z from "zod";
import { Review, ProductTabsProps } from "@/types/type";
import { ReviewForm } from "./ReviewForm";
import { ReviewList } from "./ReviewList";
import { InfoPanel } from "./InfoPanel";

const reviewSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  rating: z.number().min(1).max(5),
  comment: z.string().min(10, "Review must be at least 10 characters"),
});

export const ProductTabs = ({
  additionalInfo,
  reviews: initialReviews,
  form,
  onSubmitReview,
}: ProductTabsProps): JSX.Element => {
  const [activeTab, setActiveTab] = useState<"info" | "reviews">("info");
  const [reviews, setReviews] = useState<Review[]>(() => {
    const stored = localStorage.getItem("productReviews");
    return stored ? JSON.parse(stored) : initialReviews;
  });
  const [openInfo, setOpenInfo] = useState<string>("");

  const handleSubmitReview = (data: z.infer<typeof reviewSchema>) => {
    const newReview: Review = {
      id: Date.now(),
      ...data,
      date: new Date().toLocaleDateString(),
      verified: true,
      likes: 0,
    };
    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem("productReviews", JSON.stringify(updatedReviews));
    onSubmitReview(data);
  };

  const handleLikeReview = (reviewId: number) => {
    const updatedReviews = reviews.map((review) =>
      review.id === reviewId
        ? { ...review, likes: (review.likes || 0) + 1 }
        : review
    );
    setReviews(updatedReviews);
    localStorage.setItem("productReviews", JSON.stringify(updatedReviews));
  };

  return (
    <div className="mt-16">
      <nav className="flex border-b border-gray-200">
        {[
          { id: "info", label: "Additional Information" },
          { id: "reviews", label: `Reviews (${reviews.length})` },
        ].map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as "info" | "reviews")}
            className={`relative px-8 py-4 text-lg font-medium transition-colors
               ${
                 activeTab === tab.id
                   ? "text-blue-600"
                   : "text-gray-500 hover:text-gray-700"
               }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </nav>

      <AnimatePresence mode="wait">
        {activeTab === "info" ? (
          <motion.div
            key="info"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-8 space-y-4"
          >
            {Object.entries(additionalInfo).map(([key, value]) => (
              <InfoPanel
                key={key}
                title={key}
                content={value}
                isOpen={openInfo === key}
                onToggle={() => setOpenInfo(openInfo === key ? "" : key)}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="reviews"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-8"
          >
            <ReviewForm form={form} onSubmit={handleSubmitReview} />
            <ReviewList reviews={reviews} onLike={handleLikeReview} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
