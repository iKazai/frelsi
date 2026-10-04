import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CartDrawer } from "./components/CartDrawer";
import { ProductDetail } from "./components/ProductDetail";
import { PRODUCTS } from "./products";
import type { CartItem, Product, Size } from "./types";

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<Size>("M");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("frelsi_merch_drop_visited");
    if (!hasVisited) {
      setShowSplash(true);
      const timer = setTimeout(() => {
        setShowSplash(false);
        sessionStorage.setItem("frelsi_merch_drop_visited", "true");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isCartOpen) {
        if (event.key === "Escape") setIsCartOpen(false);
        return;
      }
      if (selectedProduct) {
        if (event.key === "Escape") setSelectedProduct(null);
        return;
      }

      if (event.key === "ArrowLeft") {
        setCurrentIndex((previous) => (previous > 0 ? previous - 1 : PRODUCTS.length - 1));
      } else if (event.key === "ArrowRight") {
        setCurrentIndex((previous) => (previous < PRODUCTS.length - 1 ? previous + 1 : 0));
      } else if (event.key === "Enter") {
        setSelectedProduct(PRODUCTS[currentIndex]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, selectedProduct, isCartOpen]);

  const addToCart = () => {
    if (!selectedProduct) return;

    if (selectedProduct.hasSizes) {
      const stockAvailable = (selectedProduct.stock as Record<Size, number>)[selectedSize];
      if (stockAvailable <= 0) return;
    }

    setCart((previous) => {
      const existing = previous.find(
        (item) => item.id === selectedProduct.id && (!selectedProduct.hasSizes || item.size === selectedSize),
      );
      if (existing) {
        return previous.map((item) => (item === existing ? { ...item, quantity: item.quantity + 1 } : item));
      }

      return [
        ...previous,
        {
          id: selectedProduct.id,
          name: selectedProduct.name,
          price: selectedProduct.price,
          size: selectedProduct.hasSizes ? selectedSize : undefined,
          quantity: 1,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const goToPrevious = () => setCurrentIndex((previous) => (previous > 0 ? previous - 1 : PRODUCTS.length - 1));
  const goToNext = () => setCurrentIndex((previous) => (previous < PRODUCTS.length - 1 ? previous + 1 : 0));

  return (
    <div className="relative w-screen h-[100dvh] bg-[#000000] text-[#E0E0E0] font-mono select-none overflow-hidden flex flex-col justify-between">
      <div
        className="pointer-events-none absolute inset-0 z-50 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <AnimatePresence>
        {showSplash && (
          <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} className="absolute inset-0 z-[100] bg-[#000000] flex flex-col items-center justify-center p-6 text-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="space-y-4">
              <p className="text-xs text-[#555] tracking-[0.3em]">CHARGEMENT MATRICIEL</p>
              <p className="text-sm font-bold tracking-[0.2em] text-[#EDEDED]">[ DROP.001 // ARCHIVE ]</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="relative z-30 flex items-center justify-between px-6 md:px-12 py-6 border-b border-[#141414]">
        <div className="flex items-center space-x-3">
          <span className="inline-block w-2 h-2 bg-[#E0E0E0]" />
          <span className="text-xs tracking-[0.2em] font-medium text-[#EDEDED]">FRELSI // MERCH DROP</span>
        </div>
        <button onClick={() => setIsCartOpen(true)} className="text-xs tracking-[0.15em] text-[#888] hover:text-[#FFF] transition-colors focus:outline-none">
          [ PANIER : {totalCartCount} ]
        </button>
      </header>

      <main className="relative flex-1 w-full flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          {!selectedProduct && (
            <motion.div key="carousel-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="relative w-full h-full flex flex-col items-center justify-center">
              <div className="relative w-full max-w-5xl h-[340px] md:h-[420px] flex items-center justify-center">
                {PRODUCTS.map((product, index) => {
                  const offset = index - currentIndex;
                  const isCenter = offset === 0;
                  return (
                    <motion.div
                      key={product.id}
                      onClick={() => (isCenter ? setSelectedProduct(product) : setCurrentIndex(index))}
                      animate={{ x: offset * 280, scale: isCenter ? 1 : 0.68, opacity: isCenter ? 1 : 0.28, zIndex: isCenter ? 20 : 10 }}
                      transition={{ type: "spring", stiffness: 260, damping: 28 }}
                      className="absolute w-[220px] h-[220px] md:w-[320px] md:h-[320px] cursor-pointer flex flex-col items-center justify-center group"
                    >
                      <div className="w-full h-full flex items-center justify-center">{product.imageSvg}</div>
                      {isCenter && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-center">
                          <p className="text-xs tracking-[0.2em] font-semibold text-[#EDEDED]">{product.name}</p>
                          <p className="text-xs text-[#666] mt-1 tracking-widest">{product.price.toFixed(2)} EUR</p>
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              <div className="absolute bottom-6 flex items-center space-x-10 text-xs tracking-[0.25em] text-[#555]">
                <button aria-label="Produit précédent" onClick={goToPrevious} className="hover:text-[#FFF] transition-colors focus:outline-none">[ ← ]</button>
                <span className="text-[#333]">0{currentIndex + 1} / 0{PRODUCTS.length}</span>
                <button aria-label="Produit suivant" onClick={goToNext} className="hover:text-[#FFF] transition-colors focus:outline-none">[ → ]</button>
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

      <footer className="relative z-30 px-6 md:px-12 py-4 border-t border-[#141414] flex justify-end items-center text-[10px] text-[#444] tracking-widest">
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
