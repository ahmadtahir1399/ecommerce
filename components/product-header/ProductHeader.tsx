"use client";
import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import Link from "next/link";

interface ProductHeaderProps {
  images?: string[];
  autoPlayInterval?: number;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({
  images = ["/pic1.webp", "/pic2.webp", "/pic3.webp"],
  autoPlayInterval = 3000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && !isHovered) {
      timer = setInterval(nextSlide, autoPlayInterval);
    }
    return () => clearInterval(timer);
  }, [isPlaying, nextSlide, autoPlayInterval, isHovered]);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === " ") {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [nextSlide, prevSlide]);

  const getSlideStyle = (index: number): React.CSSProperties => {
    const diff = (index - currentIndex + images.length) % images.length;
    let translateX = 0;
    let scale = 1;
    let zIndex = 0;
    let opacity = 1;
    let filter = "none";

    if (diff === 0) {
      translateX = 0;
      scale = 1;
      zIndex = 3;
      opacity = 1;
      filter = "none";
    } else if (diff === 1 || (diff === -2 && images.length === 3)) {
      translateX = 30;
      scale = 0.8;
      zIndex = 2;
      opacity = 0.3;
      filter = "blur(4px)";
    } else if (diff === -1 || (diff === 2 && images.length === 3)) {
      translateX = -30;
      scale = 0.8;
      zIndex = 1;
      opacity = 0.3;
      filter = "blur(4px)";
    }

    return {
      transform: `translateX(${translateX}%) scale(${scale})`,
      zIndex,
      opacity,
      filter,
      transition: "all 0.5s ease-in-out",
      position: "absolute",
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    };
  };

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 30;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();

    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
      <div
        className="relative w-full max-w-6xl mx-auto h-full flex items-center justify-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="relative w-full h-full">
          {images.map((img, index) => (
            <div key={index} style={getSlideStyle(index)}>
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                className="w-auto h-full max-h-[70vh] object-contain rounded-lg"
                draggable="false"
                loading="eager"
              />
              <Link
                href={`/order${index + 1}`}
                className="absolute bottom-[10px] left-1/2 -translate-x-1/2
               bg-[#0f172a] hover:bg-[#1e293b]
               text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500
               font-extrabold py-4 px-10 rounded-xl
               transform hover:scale-105 transition-all duration-300
               shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:shadow-[0_0_30px_rgba(59,130,246,0.8)]
               backdrop-blur-lg 
               border-2 border-cyan-500/30
               text-xl tracking-wider
               before:content-[''] before:absolute before:inset-0 
               before:bg-gradient-to-r before:from-cyan-400 before:to-blue-500
               before:opacity-0 before:transition-opacity before:duration-300
               hover:before:opacity-10
               after:content-['ORDER_NOW'] after:absolute after:inset-0
               after:flex after:items-center after:justify-center
               after:bg-gradient-to-r after:from-cyan-400 after:to-blue-500
               after:bg-clip-text after:text-transparent
               group
               z-20"
              >
                <span className="relative z-10 group-hover:animate-pulse">
                  ORDER NOW
                </span>
              </Link>
            </div>
          ))}
        </div>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute hidden top-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full z-10 transition-all"
          aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4" />
          )}
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 bg-white/80 rounded-full transition-all ${
                index === currentIndex ? "w-6" : "w-2"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      <div className="slider-angular-shape-right hidden md:block lg:block"></div>
      <button
        onClick={prevSlide}
        className="absolute lg:left-[0%] md:left-[0%] left-[0%] top-1/2 -translate-y-1/2 lg:text-white md:text-white text-black p-2 rounded-full z-10 transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-9 h-9" />
      </button>

      <div>
        <div className="slider-angular-shape-left relative hidden md:block lg:block"></div>
        <button
          onClick={nextSlide}
          className="absolute lg:right-[0%] md:right-[0%] right-[0%] top-1/2 -translate-y-1/2 lg:text-white md:text-white text-black p-2 rounded-full z-10 transition-all"
          aria-label="Next slide"
        >
          <ChevronRight className="w-9 h-9" />
        </button>
      </div>
    </div>
  );
};

export default ProductHeader;
