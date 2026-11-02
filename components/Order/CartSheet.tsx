"use client";
import React, { JSX } from "react";
import { AnimatePresence } from "framer-motion";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { CartItem } from "./CartItem";
import { CartSheetProps } from "@/types/type";

export const CartSheet = ({
    isOpen,
    onClose,
    cart,
    updateQuantity,
    removeItem,
    total,
  }: CartSheetProps): JSX.Element => (
  <Sheet open={isOpen} onOpenChange={onClose}>
    <SheetContent className="w-full sm:max-w-lg">
      <SheetHeader>
        <SheetTitle className="text-2xl font-bold">Your Cart</SheetTitle>
      </SheetHeader>

      <ScrollArea className="h-[calc(100vh-280px)] mt-6">
        <AnimatePresence>
          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
            />
          ))}
        </AnimatePresence>
      </ScrollArea>

      <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t">
        <div className="space-y-4">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <Button className="w-full h-12 text-lg" disabled={cart.length === 0}>
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </SheetContent>
  </Sheet>
);