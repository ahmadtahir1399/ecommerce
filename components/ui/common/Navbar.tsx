"use client";
import React, { memo, useState, useEffect } from "react";
import { LayoutGrid } from "lucide-react";

const NAV_ITEMS = [
  { label: "HOME", path: "/" },
  { label: "ABOUT", path: "/about" },
  { label: "SHOP", path: "/shop" },
  { label: "FAQ", path: "/faq" },
];

const SplitText = ({
  text,
  isOpen,
  delay = 0,
}: {
  text: string;
  isOpen: boolean;
  delay?: number;
}) => {
  return (
    <span className="inline-block overflow-hidden">
      {text.split("").map((char, index) => (
        <span
          key={index}
          className={`inline-block transition-all duration-500 transform
            ${
              isOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-full opacity-0"
            }`}
          style={{
            transitionDelay: `${delay + index * 50}ms`,
            transitionTimingFunction: "cubic-bezier(0.7, 0, 0.2, 1)",
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
};

interface NavButtonProps {
  label: string;
  index: number;
  isLoaded: boolean;
}

const NavButton = memo(({ label, index, isLoaded }: NavButtonProps) => {
  NavButton.displayName = "NavButton";
  return (
    <button
      className={`px-2 pt-[2px] rounded-full border border-black text-black hover:bg-black hover:text-white transition-all duration-500 text-[13px]
        transform ${
          isLoaded ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
        }`}
      style={{
        transitionDelay: `${1200 + index * 100}ms`,
        transitionTimingFunction: "cubic-bezier(0.64, 0, 0.21, 1)",
      }}
    >
      {label}
    </button>
  );
});

const InitialLoader = ({ isLoaded = false }) => {
  const [progress, setProgress] = useState(0);
  const [textState, setTextState] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 2;
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return newProgress;
      });
    }, 15);

    const timeline = [
      { action: () => setTextState(1), delay: 1500 },
      { action: () => setTextState(2), delay: 1800 },
      { action: () => setIsVisible(false), delay: 2500 },
    ];

    timeline.forEach(({ action, delay }) => {
      setTimeout(action, delay);
    });

    return () => {
      clearInterval(progressInterval);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div
        className={`fixed inset-0     bg-black z-[70] flex items-center justify-center
          transition-all duration-700 ease-out
          ${
            textState === 2
              ? "-translate-y-full opacity-0"
              : "translate-y-0 opacity-100"
          }`}
        style={{
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div className="relative">
          <span className="text-6xl font-bold text-white/20 tracking-widest">
            STORE
          </span>
          <span
            className="absolute inset-0 text-6xl font-bold text-white tracking-widest overflow-hidden"
            style={{
              width: `${progress}%`,
              transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            STORE
          </span>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-[60] transition-all duration-700 pointer-events-none
          ${isLoaded ? "opacity-0" : "opacity-100"}`}
        style={{
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div
          className="absolute inset-0 bg-black origin-top transition-transform duration-700"
          style={{
            transform: isLoaded ? "scaleY(0)" : "scaleY(1)",
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            transitionDelay: "0.2s",
          }}
        />
        <div
          className="absolute inset-0 bg-white origin-top transition-transform duration-700"
          style={{
            transform: isLoaded ? "scaleY(0)" : "scaleY(1)",
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            transitionDelay: "0.1s",
          }}
        />
      </div>
    </>
  );
};

const Logo = memo(({ isLoaded }: { isLoaded: boolean }) => {
  Logo.displayName = "Logo";
  return (
    <>
      <div
        className={`lg:hidden md:hidden text-black text-xl font-bold
        transition-all duration-1000 transform
        ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        style={{
          transitionDelay: "800ms",
          transitionTimingFunction: "cubic-bezier(0.64, 0, 0.21, 1)",
        }}
      >
        STORE
      </div>

      <div
        className={`lg:flex md:flex hidden logo-angular-shape absolute left-1/2 h-[54px] -translate-x-1/2 items-center justify-center bg-black
        transition-all duration-[1.2s] transform
        ${isLoaded ? "scale-100 opacity-100" : "scale-150 opacity-0"}`}
        style={{
          transitionDelay: "500ms",
          transitionTimingFunction: "cubic-bezier(0.64, 0, 0.21, 1)",
        }}
      >
        <span
          className={`text-2xl font-bold tracking-wider text-white
          transition-all duration-1000 transform
          ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{
            transitionDelay: "900ms",
            transitionTimingFunction: "cubic-bezier(0.64, 0, 0.21, 1)",
          }}
        >
          STORE
        </span>
      </div>
    </>
  );
});

const MobileMenu = memo(
  ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    MobileMenu.displayName = "MobileMenu";
    const [isAnimating, setIsAnimating] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
      if (isOpen) {
        setIsAnimating(true);
        setIsClosing(false);
      } else {
        setIsClosing(true);
        const timer = setTimeout(() => {
          setIsClosing(false);
          setIsAnimating(false);
        }, 1000);
        return () => clearTimeout(timer);
      }
    }, [isOpen]);

    if (!isOpen && !isAnimating) return null;

    const handleClose = () => {
      setIsClosing(true);
      setTimeout(onClose, 300);
    };

    return (
      <>
        <div
          className={`fixed lg:hidden md:hidden inset-0 z-50 transition-all duration-700
            ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
          onTransitionEnd={() => !isOpen && !isClosing && setIsAnimating(false)}
        >
          <div
            className={`absolute inset-0 bg-black transition-transform duration-700 origin-top
            ${isOpen ? "scale-y-100" : isClosing ? "scale-y-0" : ""}`}
            style={{ transitionTimingFunction: "cubic-bezier(0.7, 0, 0.2, 1)" }}
          />
          <div
            className={`absolute inset-0 bg-white mix-blend-difference transition-transform duration-500 origin-top
            ${isOpen ? "scale-y-100" : isClosing ? "scale-y-0" : ""}`}
            style={{
              transitionDelay: isOpen ? "100ms" : "0ms",
              transitionTimingFunction: "cubic-bezier(0.7, 0, 0.2, 1)",
            }}
          />
        </div>

        <div
          className={`fixed bg-black lg:hidden md:hidden inset-0 z-50 transition-all duration-700
          ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        >
          <div className="flex justify-between items-center p-4 overflow-hidden">
            <div className="overflow-hidden">
              <span
                className={`text-2xl font-bold tracking-wider text-white block transition-transform duration-700
                ${isOpen ? "translate-y-0" : "translate-y-full"}`}
                style={{ transitionDelay: "400ms" }}
              >
                <SplitText text="STORE" isOpen={isOpen} delay={500} />
              </span>
            </div>
            <button
              onClick={handleClose}
              className="p-2 text-white hover:text-gray-300 transition-all duration-500 transform"
            >
              <LayoutGrid
                size={20}
                className={`transform transition-all duration-500
                  ${isOpen ? "rotate-0 scale-100" : "rotate-90 scale-0"}`}
                style={{ transitionDelay: "200ms" }}
              />
            </button>
          </div>

          <div className="flex flex-col space-y-8 px-8 pt-20">
            {NAV_ITEMS.map(({ label, path }, index) => (
              <div
                key={path}
                className="overflow-hidden"
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <button
                  className={`text-white text-lg font-normal 
                    transition-all duration-700 text-left transform group
                    ${isOpen ? "translate-x-0" : "-translate-x-8"}`}
                  style={{
                    transitionDelay: `${index * 100 + 500}ms`,
                    transitionTimingFunction: "cubic-bezier(0.7, 0, 0.2, 1)",
                  }}
                >
                  <div className="relative overflow-hidden">
                    <span className="block transition-transform duration-500 group-hover:-translate-y-full">
                      <SplitText
                        text={label}
                        isOpen={isOpen}
                        delay={700 + index * 100}
                      />
                    </span>
                    <span className="absolute top-0 left-0 block transition-transform duration-500 translate-y-full group-hover:translate-y-0">
                      <SplitText
                        text={label}
                        isOpen={isOpen}
                        delay={700 + index * 100}
                      />
                    </span>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
);

const MenuButton = memo(
  ({
    onClick,
    isOpen,
    isLoaded,
  }: {
    onClick: () => void;
    isOpen: boolean;
    isLoaded: boolean;
  }) => {
    MenuButton.displayName = "MenuButton";
    return (
      <button
        onClick={onClick}
        className={`p-2 text-black hover:bg-black hover:text-white rounded-lg 
          transition-all duration-500 transform
          ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        style={{
          transitionDelay: "1000ms",
          transitionTimingFunction: "cubic-bezier(0.64, 0, 0.21, 1)",
        }}
      >
        {isOpen ? (
          <LayoutGrid
            size={20}
            className="transform transition-transform duration-500 rotate-0 hover:rotate-180"
          />
        ) : (
          <LayoutGrid
            size={20}
            className="transform transition-transform duration-300 hover:scale-110"
          />
        )}
      </button>
    );
  }
);

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <InitialLoader isLoaded={isLoaded} />

      <nav className="relative w-full h-16 bg-white">
        <div className="relative px-2 py-1 flex justify-between items-center">
          <div className="flex space-x-3 z-10">
            <div className="lg:flex md:flex hidden space-x-3">
              {NAV_ITEMS.map(({ label, path }, index) => (
                <NavButton
                  key={path}
                  label={label}
                  index={index}
                  isLoaded={isLoaded}
                />
              ))}
            </div>
          </div>

          <Logo isLoaded={isLoaded} />

          <div className="z-10">
            <MenuButton
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              isOpen={isMobileMenuOpen}
              isLoaded={isLoaded}
            />
          </div>
        </div>

        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      </nav>
    </>
  );
};

export default memo(Navbar);
