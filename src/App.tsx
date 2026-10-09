import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CartDrawer } from "./components/CartDrawer";
import { ProductDetail } from "./components/ProductDetail";
import { PRODUCTS } from "./products";
import type { CartItem, Product, ShirtColor, Size } from "./types";

export default function App() {
  const [virtualIndex, setVirtualIndex] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<Size>("M");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [spacing, setSpacing] = useState(320);

  const videoRef = useRef<HTMLVideoElement>(null);
  const hasDragged = useRef(false);

  const totalProducts = PRODUCTS.length;
  const currentRealIndex = ((virtualIndex % totalProducts) + totalProducts) % totalProducts;

  // Calcul adaptatif du spacing responsive
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSpacing(210);
      } else if (window.innerWidth < 1024) {
        setSpacing(260);
      } else {
        setSpacing(320);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Déclenchement automatique de la lecture vidéo et timer de sécurité
  useEffect(() => {
    if (showSplash) {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
      const safetyTimer = setTimeout(() => {
        setShowSplash(false);
      }, 7000);
      return () => clearTimeout(safetyTimer);
    }
  }, [showSplash]);

  const goToPrevious = () => setVirtualIndex((previous) => previous - 1);
  const goToNext = () => setVirtualIndex((previous) => previous + 1);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (showSplash) {
        if (event.key === "Escape" || event.key === "Enter" || event.key === " ") {
          setShowSplash(false);
        }
        return;
      }
      if (isCartOpen) {
        if (event.key === "Escape") setIsCartOpen(false);
        return;
      }
      if (selectedProduct) {
        if (event.key === "Escape") setSelectedProduct(null);
        return;
      }

      if (event.key === "ArrowLeft") {
        goToPrevious();
      } else if (event.key === "ArrowRight") {
        goToNext();
      } else if (event.key === "Enter") {
        setSelectedProduct(PRODUCTS[currentRealIndex]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentRealIndex, selectedProduct, isCartOpen, showSplash]);

  const addToCart = (selectedColor?: ShirtColor, imageUrl?: string) => {
    if (!selectedProduct) return;

    if (selectedProduct.hasSizes) {
      const stockAvailable = (selectedProduct.stock as Record<Size, number>)[selectedSize];
      if (stockAvailable <= 0) return;
    }

    setCart((previous) => {
      const existing = previous.find(
        (item) =>
          item.id === selectedProduct.id &&
          (!selectedProduct.hasSizes || item.size === selectedSize) &&
          (!selectedProduct.hasColorSelection || item.color === selectedColor),
      );
      if (existing) {
        return previous.map((item) =>
          item === existing ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [
        ...previous,
        {
          id: selectedProduct.id,
          name: selectedProduct.name,
          price: selectedProduct.price,
          size: selectedProduct.hasSizes ? selectedSize : undefined,
          color: selectedColor,
          imageUrl: imageUrl || selectedProduct.imageUrl,
          quantity: 1,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="relative w-screen h-[100dvh] bg-[#000000] text-[#E0E0E0] font-mono select-none overflow-hidden flex flex-col justify-between">
      {/* Texture de fond bruitée */}
      <div
        className="pointer-events-none absolute inset-0 z-50 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Splashscreen Vidéo */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-[100] bg-[#000000] flex items-center justify-center overflow-hidden"
          >
            <video
              ref={videoRef}
              src={`${import.meta.env.BASE_URL}assets/videos/splashscreen-video.webm`}
              autoPlay
              muted
              playsInline
              onEnded={() => setShowSplash(false)}
              className="w-full h-full object-cover md:object-contain cursor-pointer"
              onClick={() => setShowSplash(false)}
            />
            <button
              onClick={() => setShowSplash(false)}
              className="absolute top-6 right-6 md:top-8 md:right-10 text-xs tracking-[0.2em] text-[#AAA] hover:text-[#FFF] bg-[#000]/75 hover:bg-[#000] border border-[#333] px-3.5 py-1.5 transition-all focus:outline-none z-20 cursor-pointer"
            >
              PASSER [✕]
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header avec Logo Rouge FRELSI */}
      <header className="relative z-30 flex items-center justify-between px-6 md:px-12 py-5 border-b border-[#141414]">
        <div
          className="flex items-center space-x-3 cursor-pointer group"
          onClick={() => setShowSplash(true)}
          title="Revoir l'introduction vidéo"
        >
          <img
            src={`${import.meta.env.BASE_URL}assets/images/logo-rouge.png`}
            alt="FRELSI"
            className="h-6 md:h-8 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
          />
        </div>
        <button
          onClick={() => setIsCartOpen(true)}
          className="text-xs tracking-[0.15em] text-[#888] hover:text-[#FFF] transition-colors focus:outline-none"
        >
          [ PANIER : {totalCartCount} ]
        </button>
      </header>

      {/* Zone Carousel & Détail */}
      <main className="relative flex-1 w-full flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          {!selectedProduct && (
            <motion.div
              key="carousel-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full flex flex-col items-center justify-center"
            >
              {/* Carousel draggable / swipeable avec boucle sans fin */}
              <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragStart={() => {
                  hasDragged.current = false;
                }}
                onDrag={(_, info) => {
                  if (Math.abs(info.offset.x) > 6) {
                    hasDragged.current = true;
                  }
                }}
                onDragEnd={(_, info) => {
                  const swipeThreshold = 40;
                  const velocityThreshold = 200;
                  if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
                    goToNext();
                  } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
                    goToPrevious();
                  }
                  setTimeout(() => {
                    hasDragged.current = false;
                  }, 120);
                }}
                className="relative w-full max-w-5xl h-[360px] md:h-[440px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y"
              >
                {[-2, -1, 0, 1, 2].map((offset) => {
                  const slotIndex = virtualIndex + offset;
                  const productIndex = ((slotIndex % totalProducts) + totalProducts) % totalProducts;
                  const product = PRODUCTS[productIndex];
                  const isCenter = offset === 0;

                  return (
                    <motion.div
                      key={slotIndex}
                      onClick={() => {
                        if (hasDragged.current) return;
                        if (isCenter) {
                          setSelectedProduct(product);
                        } else if (offset < 0) {
                          goToPrevious();
                        } else if (offset > 0) {
                          goToNext();
                        }
                      }}
                      animate={{
                        x: offset * spacing,
                        scale: isCenter ? 1 : Math.abs(offset) === 1 ? 0.68 : 0.45,
                        opacity: isCenter ? 1 : Math.abs(offset) === 1 ? 0.28 : 0,
                        zIndex: isCenter ? 30 : Math.abs(offset) === 1 ? 20 : 10,
                      }}
                      transition={{ type: "spring", stiffness: 260, damping: 28 }}
                      className={`absolute w-[220px] h-[220px] md:w-[320px] md:h-[320px] flex flex-col items-center justify-center group select-none ${
                        isCenter
                          ? "cursor-pointer"
                          : Math.abs(offset) === 1
                          ? "cursor-pointer"
                          : "pointer-events-none"
                      }`}
                    >
                      <div className="w-full h-full flex items-center justify-center p-2">
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            draggable={false}
                            className={`max-w-full max-h-full object-contain pointer-events-none select-none drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)] ${
                              product.id === "pinz-frelsi" ? "rounded-lg border border-[#222]" : ""
                            }`}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center pointer-events-none">
                            {product.imageSvg}
                          </div>
                        )}
                      </div>

                      {isCenter && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25 }}
                          className="mt-4 text-center pointer-events-none"
                        >
                          <p className="text-xs tracking-[0.2em] font-semibold text-[#EDEDED]">{product.name}</p>
                          <p className="text-xs text-[#777] mt-1 tracking-widest">{product.price.toFixed(2)} EUR</p>
                          <p className="text-[10px] text-[#444] mt-1 tracking-[0.2em]">[ CLIQUER POUR DÉTAILS ]</p>
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Contrôles de navigation et indicateur de position */}
              <div className="absolute bottom-6 flex items-center space-x-10 text-xs tracking-[0.25em] text-[#555]">
                <button
                  aria-label="Produit précédent"
                  onClick={goToPrevious}
                  className="hover:text-[#FFF] transition-colors focus:outline-none cursor-pointer"
                >
                  [ ← ]
                </button>
                <span className="text-[#444] font-mono">
                  0{currentRealIndex + 1} / 0{totalProducts}
                </span>
                <button
                  aria-label="Produit suivant"
                  onClick={goToNext}
                  className="hover:text-[#FFF] transition-colors focus:outline-none cursor-pointer"
                >
                  [ → ]
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedProduct && (
            <ProductDetail
              product={selectedProduct}
              selectedSize={selectedSize}
              onSelectSize={setSelectedSize}
              onAddToCart={addToCart}
              onClose={() => setSelectedProduct(null)}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative z-30 px-6 md:px-12 py-4 border-t border-[#141414] flex justify-between items-center text-[10px] text-[#444] tracking-widest">
        <span>SWIPE OU TOUCHES FLÉCHÉES POUR DÉFILER</span>
        <span>DROITS RÉSERVÉS © {new Date().getFullYear()}</span>
      </footer>

      <CartDrawer
        isOpen={isCartOpen}
        cart={cart}
        subtotal={cartSubtotal}
        onClose={() => setIsCartOpen(false)}
        onRemove={(index) => setCart((previous) => previous.filter((_, itemIndex) => itemIndex !== index))}
      />
    </div>
  );
}
