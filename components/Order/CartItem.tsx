"use client";
import React, { JSX } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Minus, Plus, X } from "lucide-react";
import { CartItemProps } from "@/types/type";

export const CartItem = ({
  item,
  updateQuantity,
  removeItem,
}: CartItemProps): JSX.Element => (
  <motion.div
    initial={{ x: -20, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: 20, opacity: 0 }}
    className="flex gap-4 py-4 border-b"
  >
    <img
      src={item.image}
      alt={item.name}
      className="w-24 h-24 object-cover rounded-lg"
    />
    <div className="flex-1">
      <h3 className="font-semibold">{item.name}</h3>
      <p className="text-sm text-gray-500">
        Size: {item.size} | Color: {item.color}
      </p>
      <div className="flex items-center gap-2 mt-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="h-8 w-8"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-8 text-center">{item.quantity}</span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="h-8 w-8"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <p className="font-semibold mt-1">
        ${(item.price * item.quantity).toFixed(2)}
      </p>
    </div>
    <Button
      variant="ghost"
      size="icon"
      onClick={() => removeItem(item.id)}
      className="h-8 w-8"
    >
      <X className="h-4 w-4" />
    </Button>
  </motion.div>
);
