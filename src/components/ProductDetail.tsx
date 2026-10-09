import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Product, ShirtColor, ShirtView, Size } from "../types";

interface ProductDetailProps {
  product: Product;
  selectedSize: Size;
  onSelectSize: (size: Size) => void;
  onAddToCart: (color?: ShirtColor, imageUrl?: string) => void;
  onClose: () => void;
}

export function ProductDetail({ product, selectedSize, onSelectSize, onAddToCart, onClose }: ProductDetailProps) {
  const [selectedColor, setSelectedColor] = useState<ShirtColor>("noir");
  const [selectedView, setSelectedView] = useState<ShirtView>("avant");

  const activeVariant = product.colorVariants?.find(
    (v) => v.color === selectedColor && v.view === selectedView,
  );

  const displayImageUrl = activeVariant ? activeVariant.url : product.imageUrl;

  const handleSelectVariant = (color: ShirtColor, view: ShirtView) => {
    setSelectedColor(color);
    setSelectedView(view);
  };

  return (
    <motion.div
      key="detail-view"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="absolute inset-0 z-40 bg-[#000000] flex flex-col md:flex-row items-center justify-between p-6 md:p-12 lg:p-16 overflow-y-auto"
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 md:top-8 md:right-12 text-xs tracking-widest text-[#777] hover:text-[#FFF] border border-[#222] hover:border-[#555] px-3 py-1.5 transition-colors focus:outline-none z-50 bg-[#080808]"
      >
        [ FERMER ✕ ]
      </button>

      {/* Colonne visuelle / Galerie */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center my-6 md:my-0">
        <div className="relative w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] md:w-[360px] md:h-[360px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {displayImageUrl ? (
              <motion.img
                key={displayImageUrl}
                src={displayImageUrl}
                alt={product.name}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.25 }}
                className={`max-w-full max-h-full object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)] ${
                  product.id === "pinz-frelsi" ? "rounded-lg border border-[#262626]" : ""
                }`}
              />
            ) : (
              <motion.div
                key="svg-preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full flex items-center justify-center"
              >
                {product.imageSvg}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Petites vignettes photos pour le T-shirt */}
        {product.colorVariants && product.colorVariants.length > 0 && (
          <div className="mt-6 flex flex-col items-center space-y-2">
            <span className="text-[10px] tracking-[0.25em] text-[#555] uppercase">
              VIGNETTES // GALERIE PHOTOS
            </span>
            <div className="flex items-center space-x-2.5">
              {product.colorVariants.map((variant) => {
                const isSelected = selectedColor === variant.color && selectedView === variant.view;
                return (
                  <button
                    key={`${variant.color}-${variant.view}`}
                    onClick={() => handleSelectVariant(variant.color, variant.view)}
                    className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded border transition-all p-1 flex flex-col items-center justify-center bg-[#0C0C0C] hover:bg-[#141414] focus:outline-none ${
                      isSelected
                        ? "border-[#E50914] shadow-[0_0_12px_rgba(229,9,20,0.5)] scale-105"
                        : "border-[#222] hover:border-[#555] opacity-60 hover:opacity-100"
                    }`}
                    title={variant.label}
                  >
                    <img
                      src={variant.url}
                      alt={variant.label}
                      className="w-full h-full object-contain pointer-events-none"
                    />
                    <span className="absolute bottom-0 text-[7px] tracking-wider text-[#999] uppercase bg-black/75 px-1 rounded">
                      {variant.color === "noir" ? "N" : "B"} · {variant.view === "avant" ? "Face" : "Dos"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Colonne détails et configuration */}
      <div className="w-full md:w-1/2 h-auto flex flex-col justify-center max-w-md space-y-5">
        <div className="space-y-1.5">
          <p className="text-[10px] tracking-[0.3em] text-[#555]">RÉFÉRENCE : {product.sku}</p>
          <h1 className="text-sm md:text-base font-bold tracking-[0.15em] text-[#FFF]">{product.name}</h1>
          <p className="text-xs md:text-sm text-[#AAA] tracking-widest">{product.price.toFixed(2)} EUR</p>
        </div>

        <p className="text-xs leading-relaxed text-[#777] border-l border-[#222] pl-3">{product.description}</p>

        {/* Sélecteur de couleur (si disponible) */}
        {product.hasColorSelection && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] tracking-[0.2em] text-[#555]">COULEUR :</span>
              <span className="text-xs tracking-wider text-[#EDEDED] font-semibold uppercase">
                {selectedColor}
              </span>
            </div>
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setSelectedColor("noir")}
                className={`px-4 py-2 text-xs border tracking-wider flex items-center space-x-2 transition-all focus:outline-none ${
                  selectedColor === "noir"
                    ? "border-[#EDEDED] text-[#FFF] bg-[#171717]"
                    : "border-[#262626] text-[#777] hover:border-[#444] hover:text-[#CCC]"
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#111] border border-[#555]" />
                <span>NOIR</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedColor("blanc")}
                className={`px-4 py-2 text-xs border tracking-wider flex items-center space-x-2 transition-all focus:outline-none ${
                  selectedColor === "blanc"
                    ? "border-[#EDEDED] text-[#FFF] bg-[#171717]"
                    : "border-[#262626] text-[#777] hover:border-[#444] hover:text-[#CCC]"
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#EEE] border border-[#999]" />
                <span>BLANC</span>
              </button>
            </div>
          </div>
        )}

        {/* Sélecteur de vue (Recto / Verso) pour T-shirt */}
        {product.hasColorSelection && (
          <div className="space-y-2">
            <span className="text-[10px] tracking-[0.2em] text-[#555]">ANGLE DE VUE :</span>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => setSelectedView("avant")}
                className={`px-3 py-1.5 text-xs border tracking-wider transition-all focus:outline-none ${
                  selectedView === "avant"
                    ? "border-[#EDEDED] text-[#FFF] bg-[#171717]"
                    : "border-[#262626] text-[#777] hover:border-[#444] hover:text-[#BBB]"
                }`}
              >
                [ RECTO // AVANT ]
              </button>
              <button
                type="button"
                onClick={() => setSelectedView("dos")}
                className={`px-3 py-1.5 text-xs border tracking-wider transition-all focus:outline-none ${
                  selectedView === "dos"
                    ? "border-[#EDEDED] text-[#FFF] bg-[#171717]"
                    : "border-[#262626] text-[#777] hover:border-[#444] hover:text-[#BBB]"
                }`}
              >
                [ VERSO // DOS ]
              </button>
            </div>
          </div>
        )}

        {/* Sélecteur de taille (si applicable) */}
        {product.hasSizes && (
          <div className="space-y-2">
            <span className="text-[10px] tracking-[0.2em] text-[#555]">TAILLE :</span>
            <div className="flex space-x-2">
              {(["S", "M", "L", "XL"] as Size[]).map((size) => {
                const stockCount = (product.stock as Record<Size, number>)[size];
                const isSoldOut = stockCount <= 0;
                const isSelected = selectedSize === size;

                return (
                  <button
                    key={size}
                    disabled={isSoldOut}
                    onClick={() => onSelectSize(size)}
                    className={`w-10 h-10 text-xs border transition-all flex items-center justify-center focus:outline-none ${
                      isSelected
                        ? "border-[#EDEDED] text-[#FFF] bg-[#141414]"
                        : isSoldOut
                        ? "border-[#1A1A1A] text-[#333] cursor-not-allowed line-through"
                        : "border-[#262626] text-[#777] hover:border-[#444] hover:text-[#BBB]"
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <button
          onClick={() => onAddToCart(product.hasColorSelection ? selectedColor : undefined, displayImageUrl)}
          className="w-full py-3.5 bg-[#EDEDED] text-[#000] text-xs font-semibold tracking-[0.2em] hover:bg-[#FFF] active:scale-[0.99] transition-all focus:outline-none"
        >
          AJOUTER AU PANIER
        </button>
      </div>
    </motion.div>
  );
}
