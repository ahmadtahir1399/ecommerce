import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  onChange?: (value: number) => void;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
}

const Rating = ({
  value,
  onChange,
  readonly = false,
  size = "md",
}: RatingProps) => {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((rating) => (
        <button
          key={rating}
          type="button"
          onClick={() => !readonly && onChange?.(rating)}
          className={cn(
            "rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
            readonly ? "cursor-default" : "cursor-pointer"
          )}
          disabled={readonly}
        >
          <Star
            className={cn(
              sizes[size],
              "transition-colors",
              rating <= value
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-200 text-gray-200"
            )}
          />
        </button>
      ))}
    </div>
  );
};

export default Rating;
